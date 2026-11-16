import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { injectSeoToHtml, getPageSeo } from './server/seoRenderer.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Enable proxy trust for reverse proxies (Google Cloud Run / Load Balancer)
app.set('trust proxy', 1);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Local JSON fallback store when Google Sheets credentials are not yet configured in .env
const LOCAL_LEADS_FILE = path.join(__dirname, 'newsletter-subscribers.json');

function saveToLocalFallback(record: { email: string; topic?: string; timestamp: string }) {
  try {
    let list: Array<{ email: string; topic?: string; timestamp: string }> = [];
    if (fs.existsSync(LOCAL_LEADS_FILE)) {
      const content = fs.readFileSync(LOCAL_LEADS_FILE, 'utf-8');
      list = JSON.parse(content || '[]');
    }
    list.unshift(record);
    fs.writeFileSync(LOCAL_LEADS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to local fallback lead file:', err);
  }
}

// Rate limiter configured for reverse proxy environments with validation disabled to prevent ERR_ERL_* crashes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                   // 20 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  validate: false,           // Disables strict header validation that causes crashes behind Cloud Run reverse proxies
  keyGenerator: (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0].trim();
    }
    if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
      return xForwardedFor[0].trim();
    }
    return req.ip || req.socket?.remoteAddress || 'unknown-client';
  },
  message: { success: false, error: 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً بعداً تلاش فرمایید.' },
});

/**
 * Normalizes and validates PEM private keys to prevent OpenSSL DECODER routines::unsupported errors
 */
function normalizeAndValidatePrivateKey(rawKey: string | undefined): string | null {
  if (!rawKey) return null;
  let key = rawKey.trim();
  if (!key) return null;

  // Strip wrapping quotes (single or double) often added in env files
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }

  // Replace literal '\n' string escapes with actual newline characters
  key = key.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');

  // If PEM boundaries are missing, format with standard PKCS#8 private key header/footer
  if (!key.includes('-----BEGIN')) {
    key = `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`;
  }

  // Pre-validate that Node crypto / OpenSSL can decode this private key
  try {
    crypto.createPrivateKey(key);
    return key;
  } catch {
    console.warn('[Google Sheets Auth] Warning: Private key cannot be decoded by OpenSSL. Check GOOGLE_PRIVATE_KEY format.');
    return null;
  }
}

/** شناسه شیت ثابت دیاکو */
const FIXED_SPREADSHEET_ID = '1GnttAb512ZXPGevBXlqmP0pXYqSfVU5dmaqlSoyelhc';
const DEFAULT_SHEET_TAB = 'متقاضیان خبرنامه';

function sanitizeCell(value: unknown): string {
  const v = String(value ?? '').trim();
  return /^[=+\-@]/.test(v) ? `'${v}` : v;
}

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getServiceAccountAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claimSet = base64UrlEncode(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: nowSec + 3600,
      iat: nowSec,
    }),
  );
  const signingInput = `${header}.${claimSet}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const signature = base64UrlEncode(signer.sign(privateKey));
  const assertion = `${signingInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!tokenRes.ok) {
    throw new Error(`OAuth token exchange failed (${tokenRes.status})`);
  }
  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error('OAuth token response missing access_token');
  }
  return tokenData.access_token;
}

interface LightweightSheetsClient {
  appendRow: (spreadsheetId: string, range: string, values: string[][]) => Promise<void>;
}

/**
 * Helper to obtain a lightweight authenticated Google Sheets client without bundling googleapis.
 */
async function getGoogleSheetsClient(): Promise<{ sheets: LightweightSheetsClient; spreadsheetId: string } | null> {
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID ||
    process.env.SPREADSHEET_ID ||
    FIXED_SPREADSHEET_ID;

  let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_SA_CLIENT_EMAIL;
  let rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_SA_PRIVATE_KEY;

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (keyPath && fs.existsSync(keyPath)) {
    try {
      const json = JSON.parse(fs.readFileSync(keyPath, 'utf8')) as {
        client_email?: string;
        private_key?: string;
      };
      clientEmail = json.client_email || clientEmail;
      rawPrivateKey = json.private_key || rawPrivateKey;
    } catch (fileErr) {
      console.warn('[Google Sheets] Service account key file load failed:', fileErr);
      return null;
    }
  }

  if (clientEmail && rawPrivateKey) {
    const validPrivateKey = normalizeAndValidatePrivateKey(rawPrivateKey);
    if (!validPrivateKey) {
      return null;
    }

    const capturedEmail = clientEmail;
    const sheets: LightweightSheetsClient = {
      async appendRow(targetSpreadsheetId: string, range: string, values: string[][]) {
        const accessToken = await getServiceAccountAccessToken(capturedEmail, validPrivateKey);
        const encodedRange = encodeURIComponent(range);
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(targetSpreadsheetId)}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values }),
          },
        );
        if (!res.ok) {
          throw new Error(`Sheets append failed (${res.status})`);
        }
      },
    };
    return { sheets, spreadsheetId };
  }

  return null;
}

/**
 * Append row to Google Sheets
 */
async function appendEmailToGoogleSheet(
  spreadsheetId: string,
  sheets: LightweightSheetsClient,
  email: string,
  topic: string = 'عمومی'
) {
  const now = new Date();
  const timestampIso = now.toISOString();
  const jalaliDate = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Tehran',
  }).format(now);

  const values = [
    [
      sanitizeCell(email.trim().toLowerCase()),
      sanitizeCell(topic),
      sanitizeCell(jalaliDate),
      sanitizeCell(timestampIso),
      sanitizeCell('پرتال دیاکو (فرم خبرنامه)'),
      sanitizeCell('در انتظار ارتباط کارشناس'),
    ],
  ];

  try {
    await sheets.appendRow(spreadsheetId, `${DEFAULT_SHEET_TAB}!A:F`, values);
  } catch {
    await sheets.appendRow(spreadsheetId, 'A:F', values);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Diaco Holding Backend',
  });
});

app.post('/api/newsletter', limiter, async (req, res) => {
  try {
    const { email, topic } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'آدرس ایمیل نامعتبر است. لطفاً یک ایمیل صحیح وارد فرمایید.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanTopic = typeof topic === 'string' ? topic.trim() : 'اتریش‌نشین (جامعه ایرانیان اتریش)';
    const nowIso = new Date().toISOString();

    // Always preserve locally so no lead is lost
    saveToLocalFallback({
      email: cleanEmail,
      topic: cleanTopic,
      timestamp: nowIso,
    });

    // Check if client supplied an OAuth Bearer token and spreadsheetId (defaults to FIXED_SPREADSHEET_ID)
    const authHeader = req.headers.authorization;
    const clientBearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const clientSpreadsheetId =
      typeof req.body.spreadsheetId === 'string' && req.body.spreadsheetId.trim()
        ? req.body.spreadsheetId.trim()
        : FIXED_SPREADSHEET_ID;

    if (clientBearerToken && clientSpreadsheetId) {
      try {
        const now = new Date();
        const jalaliDate = new Intl.DateTimeFormat('fa-IR', {
          dateStyle: 'full',
          timeStyle: 'medium',
          timeZone: 'Asia/Tehran',
        }).format(now);

        const rowBody = JSON.stringify({
          values: [
            [
              sanitizeCell(cleanEmail),
              sanitizeCell(cleanTopic),
              sanitizeCell(jalaliDate),
              sanitizeCell(nowIso),
              sanitizeCell('پرتال دیاکو (خبرنامه اتریش‌نشین)'),
              sanitizeCell('در انتظار ارتباط کارشناس'),
            ],
          ],
        });

        const tabRange = encodeURIComponent(`${DEFAULT_SHEET_TAB}!A:F`);
        let sheetRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(clientSpreadsheetId)}/values/${tabRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${clientBearerToken}`,
              'Content-Type': 'application/json',
            },
            body: rowBody,
          }
        );

        if (!sheetRes.ok) {
          sheetRes = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(clientSpreadsheetId)}/values/A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${clientBearerToken}`,
                'Content-Type': 'application/json',
              },
              body: rowBody,
            }
          );
        }

        if (sheetRes.ok) {
          console.log(`[Google Sheets OAuth] Successfully added subscriber: ${cleanEmail}`);
          return res.status(200).json({
            success: true,
            message: 'عضویت شما با موفقیت در خبرنامه اتریش‌نشین دیاکو و گوگل‌شیت ثبت گردید.',
            syncedToGoogleSheet: true,
            spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${clientSpreadsheetId}/edit`,
          });
        }
      } catch (tokenErr) {
        console.warn('[Google Sheets OAuth Bearer Error]:', tokenErr);
      }
    }

    const googleSheets = await getGoogleSheetsClient();

    if (googleSheets) {
      try {
        await appendEmailToGoogleSheet(
          googleSheets.spreadsheetId,
          googleSheets.sheets,
          cleanEmail,
          cleanTopic
        );
        console.log(`[Google Sheets Service Account] Successfully added subscriber: ${cleanEmail}`);
        return res.status(200).json({
          success: true,
          message: 'عضویت شما با موفقیت در خبرنامه دیاکو و سیستم گوگل‌شیت ثبت گردید.',
          syncedToGoogleSheet: true,
          spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${googleSheets.spreadsheetId}/edit`,
        });
      } catch (sheetError: any) {
        console.warn('[Google Sheets Sync Notice]:', sheetError?.message || sheetError);
        return res.status(200).json({
          success: true,
          message: 'عضویت شما با موفقیت در سیستم دیاکو ثبت شد.',
          syncedToGoogleSheet: false,
          warning: 'ثبت در گوگل‌شیت به دلیل دسترسی به تاخیر افتاد.',
        });
      }
    } else {
      console.log(`[Local Store] Added subscriber: ${cleanEmail}`);
      return res.status(200).json({
        success: true,
        message: 'عضویت شما با موفقیت در خبرنامه اتریش‌نشین ثبت گردید.',
        syncedToGoogleSheet: false,
        note: 'ثبت در حافظه پرتال انجام شد (در صورت اتصال به حساب گوگل، ردیف مستقیماً در گوگل‌شیت شما درج می‌گردد).',
      });
    }
  } catch (err: any) {
    console.error('Newsletter endpoint error:', err);
    return res.status(500).json({
      success: false,
      error: 'متاسفانه در برقراری ارتباط خطایی رخ داد. لطفاً لحظاتی بعد مجدداً تلاش نمایید.',
    });
  }
});

// Endpoint to view saved subscribers (for transparency and admin review)
app.get('/api/newsletter/subscribers', (_req, res) => {
  try {
    if (fs.existsSync(LOCAL_LEADS_FILE)) {
      const content = fs.readFileSync(LOCAL_LEADS_FILE, 'utf-8');
      const list = JSON.parse(content || '[]');
      return res.json({ success: true, count: list.length, subscribers: list });
    }
    return res.json({ success: true, count: 0, subscribers: [] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to read subscribers.' });
  }
});

// ============================================================
// 🤖 Technical SEO Endpoints: robots.txt & sitemap.xml
// ============================================================
app.get('/robots.txt', (_req, res) => {
  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(robotsPath);
  }
  res.type('text/plain').send('User-agent: *\nAllow: /\nSitemap: https://www.dia-co.ir/sitemap.xml\n');
});

app.get('/sitemap.xml', (_req, res) => {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(sitemapPath);
  }
  res.status(404).type('text/plain').send('Sitemap not found');
});

// Endpoint to inspect and audit resolved SEO metadata for any route
app.get('/api/seo/inspect', (req, res) => {
  const targetPath = (req.query.path as string) || '/';
  const seo = getPageSeo(targetPath);
  return res.json({ success: true, path: targetPath, seo });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    // Dynamic Server-Side HTML Rendering in Dev:
    // Transforms HTML with Vite and injects route-specific SEO meta tags, canonical, and initial semantic HTML
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes, Vite internals, and static assets
      if (
        url.startsWith('/api') ||
        url.startsWith('/@') ||
        url.startsWith('/node_modules') ||
        (url.includes('.') && !url.endsWith('.html'))
      ) {
        return next();
      }

      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const html = injectSeoToHtml(template, url);
        res.status(200).set({ 'Content-Type': 'text/html; charset=UTF-8' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { index: false }));
      app.get('*', (req, res, next) => {
        const url = req.originalUrl;
        if (url.startsWith('/api') || (url.includes('.') && !url.endsWith('.html'))) {
          return next();
        }
        const templatePath = path.join(distPath, 'index.html');
        if (fs.existsSync(templatePath)) {
          const rawHtml = fs.readFileSync(templatePath, 'utf-8');
          const html = injectSeoToHtml(rawHtml, url);
          return res.status(200).set({ 'Content-Type': 'text/html; charset=UTF-8' }).end(html);
        }
        return res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Diaco Fullstack Server running at http://localhost:${PORT}`);
  });
}

startServer();
