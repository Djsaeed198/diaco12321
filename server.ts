import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

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
  } catch (cryptoErr) {
    console.warn('[Google Sheets Auth] Warning: Private key cannot be decoded by OpenSSL. Check GOOGLE_PRIVATE_KEY format.');
    return null;
  }
}

/**
 * Helper to obtain an authenticated Google Sheets client.
 * Supports:
 *  1. Service Account JSON file (via GOOGLE_SERVICE_ACCOUNT_KEY_PATH)
 *  2. Direct environment variables (GOOGLE_SERVICE_ACCOUNT_EMAIL & GOOGLE_PRIVATE_KEY)
 */
async function getGoogleSheetsClient() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || process.env.SPREADSHEET_ID;
  if (!spreadsheetId) {
    return null;
  }

  // 1. Check if a service account key file path is provided
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (keyPath && fs.existsSync(keyPath)) {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      return {
        sheets: google.sheets({ version: 'v4', auth }),
        spreadsheetId,
      };
    } catch (fileErr) {
      console.warn('[Google Sheets] Service account key file load failed:', fileErr);
      return null;
    }
  }

  // 2. Check if credentials are provided directly in env
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (clientEmail && rawPrivateKey) {
    const validPrivateKey = normalizeAndValidatePrivateKey(rawPrivateKey);
    if (!validPrivateKey) {
      return null;
    }

    try {
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: validPrivateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      return {
        sheets: google.sheets({ version: 'v4', auth }),
        spreadsheetId,
      };
    } catch (jwtErr) {
      console.warn('[Google Sheets] Failed to initialize JWT auth:', jwtErr);
      return null;
    }
  }

  return null;
}

/**
 * Append row to Google Sheets
 */
async function appendEmailToGoogleSheet(
  spreadsheetId: string,
  sheets: ReturnType<typeof google.sheets>,
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
      email,
      topic,
      jalaliDate,
      timestampIso,
      'پرتال دیاکو (خبرنامه هوشمند)',
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:E',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values,
    },
  });
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

    // Check if client supplied an OAuth Bearer token and spreadsheetId
    const authHeader = req.headers.authorization;
    const clientBearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const clientSpreadsheetId = req.body.spreadsheetId;

    if (clientBearerToken && clientSpreadsheetId) {
      try {
        const now = new Date();
        const jalaliDate = new Intl.DateTimeFormat('fa-IR', {
          dateStyle: 'full',
          timeStyle: 'medium',
          timeZone: 'Asia/Tehran',
        }).format(now);

        const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(clientSpreadsheetId)}/values/A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
        const sheetRes = await fetch(appendUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${clientBearerToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [
              [
                cleanEmail,
                cleanTopic,
                jalaliDate,
                nowIso,
                'پرتال دیاکو (خبرنامه اتریش‌نشین)',
                'جدید'
              ]
            ]
          })
        });

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

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Diaco Fullstack Server running at http://localhost:${PORT}`);
  });
}

startServer();
