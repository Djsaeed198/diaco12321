/**
 * Google Sheets API Helper for Diaco Immigration Portal
 * Uses OAuth 2.0 access token obtained via Firebase Auth (GoogleAuthProvider with spreadsheets scope)
 *
 * - FIXED_SPREADSHEET_ID is the shared Diaco leads sheet.
 * - For a shared sheet owned by Diaco (not by the end-user), the access token
 *   must belong to an account with Editor access to that sheet, or writes should
 *   be handled via the backend proxy (/api/newsletter) using a Service Account.
 */

export interface SheetRowData {
  email: string;
  topic: string;
  jalaliDate?: string;
  timestamp?: string;
  source?: string;
}

/** شناسه شیت ثابت دیاکو */
export const FIXED_SPREADSHEET_ID = '1GnttAb512ZXPGevBXlqmP0pXYqSfVU5dmaqlSoyelhc';

/** لینک قابل مشاهده شیت ثابت */
export const FIXED_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${FIXED_SPREADSHEET_ID}/edit`;

const STORAGE_KEY_SHEET_ID = 'diaco_active_sheet_id';
const STORAGE_KEY_SHEET_TITLE = 'diaco_active_sheet_title';
const DEFAULT_TAB = 'متقاضیان خبرنامه';

/* ------------------------------------------------------------------ */
/* Storage helpers                                                    */
/* ------------------------------------------------------------------ */

export function getStoredSheetId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_SHEET_ID);
}

export function getStoredSheetTitle(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_SHEET_TITLE);
}

export function saveStoredSheetId(sheetId: string, title?: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SHEET_ID, sheetId);
  if (title) {
    localStorage.setItem(STORAGE_KEY_SHEET_TITLE, title);
  }
}

export function clearStoredSheetId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_SHEET_ID);
  localStorage.removeItem(STORAGE_KEY_SHEET_TITLE);
}

/* ------------------------------------------------------------------ */
/* Security helper (CSV / formula injection protection)               */
/* ------------------------------------------------------------------ */

function sanitizeCell(value: unknown): string {
  const v = String(value ?? '').trim();
  // Prevent Google Sheets formula injection
  return /^[=+\-@]/.test(v) ? `'${v}` : v;
}

/* ------------------------------------------------------------------ */
/* Create a per-user spreadsheet (kept for backwards compatibility)   */
/* ------------------------------------------------------------------ */

export async function createLeadsSpreadsheet(
  accessToken: string,
  customTitle = 'خبرنامه و متقاضیان مهاجرت دیاکو - Diaco Leads'
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; title: string }> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: customTitle,
      },
      sheets: [
        {
          properties: {
            title: DEFAULT_TAB,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'ایمیل متقاضی' } },
                    { userEnteredValue: { stringValue: 'حوزه علاقه‌مندی' } },
                    { userEnteredValue: { stringValue: 'تاریخ شمسی' } },
                    { userEnteredValue: { stringValue: 'زمان دقیق (ISO)' } },
                    { userEnteredValue: { stringValue: 'منبع ثبت' } },
                    { userEnteredValue: { stringValue: 'وضعیت بررسی' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `خطا در ایجاد شیت در گوگل (${response.status})`
    );
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId as string;
  const spreadsheetUrl =
    (data.spreadsheetUrl as string) ||
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  const title = (data.properties?.title as string) || customTitle;

  saveStoredSheetId(spreadsheetId, title);

  return {
    spreadsheetId,
    spreadsheetUrl,
    title,
  };
}

/* ------------------------------------------------------------------ */
/* Get spreadsheet details                                            */
/* ------------------------------------------------------------------ */

export async function getSpreadsheetDetails(
  accessToken: string,
  spreadsheetId: string
): Promise<{ title: string; sheets: string[] }> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties.title`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401) {
      throw new Error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
    }
    if (res.status === 403) {
      throw new Error('دسترسی به شیت دیاکو وجود ندارد. لطفاً با مدیر سیستم تماس بگیرید.');
    }
    throw new Error(err?.error?.message || 'امکان دسترسی به شیت مورد نظر وجود ندارد.');
  }

  const data = await res.json();
  const title = (data.properties?.title as string) || 'Google Sheet';
  const sheets = (data.sheets || []).map(
    (s: { properties?: { title?: string } }) => s.properties?.title || 'Sheet1'
  );

  return { title, sheets };
}

/* ------------------------------------------------------------------ */
/* Core append function (defaults to FIXED_SPREADSHEET_ID)            */
/* ------------------------------------------------------------------ */

export async function appendSubscriberToGoogleSheet(
  accessToken: string,
  spreadsheetId: string = FIXED_SPREADSHEET_ID,
  lead: SheetRowData
): Promise<{ success: boolean; spreadsheetUrl: string }> {
  if (!lead?.email || !lead.email.trim()) {
    throw new Error('ایمیل متقاضی الزامی است.');
  }

  const targetSpreadsheetId = spreadsheetId || FIXED_SPREADSHEET_ID;
  const now = new Date();
  const jalaliDate =
    lead.jalaliDate ||
    new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Tehran',
    }).format(now);

  const rowValues = [
    sanitizeCell(lead.email.trim().toLowerCase()),
    sanitizeCell(lead.topic || 'تمکن مالی اتریش'),
    sanitizeCell(jalaliDate),
    sanitizeCell(lead.timestamp || now.toISOString()),
    sanitizeCell(lead.source || 'پرتال دیاکو (فرم خبرنامه)'),
    sanitizeCell('در انتظار ارتباط کارشناس'),
  ];

  // Resolve tab
  let targetTab = DEFAULT_TAB;
  try {
    const details = await getSpreadsheetDetails(accessToken, targetSpreadsheetId);
    if (details.sheets && details.sheets.length > 0) {
      targetTab = details.sheets.includes(DEFAULT_TAB) ? DEFAULT_TAB : details.sheets[0];
    }
  } catch {
    targetTab = 'Sheet1';
  }

  const range = encodeURIComponent(`${targetTab}!A:F`);
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${targetSpreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const appendRes = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!appendRes.ok) {
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${targetSpreadsheetId}/values/A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const fallbackRes = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    });

    if (!fallbackRes.ok) {
      const err = await fallbackRes.json().catch(() => ({}));
      if (fallbackRes.status === 401) {
        throw new Error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
      }
      if (fallbackRes.status === 403) {
        throw new Error('اجازه نوشتن در شیت دیاکو وجود ندارد. لطفاً با مدیر سیستم تماس بگیرید.');
      }
      throw new Error(err?.error?.message || 'خطا در ثبت ردیف در گوگل شیت.');
    }
  }

  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${targetSpreadsheetId}/edit`;
  return { success: true, spreadsheetUrl };
}

/* ------------------------------------------------------------------ */
/* Convenience: always write into the shared Diaco sheet              */
/* ------------------------------------------------------------------ */

export async function appendToFixedSheet(
  accessToken: string,
  lead: SheetRowData
): Promise<{ success: boolean; spreadsheetUrl: string }> {
  return appendSubscriberToGoogleSheet(accessToken, FIXED_SPREADSHEET_ID, lead);
}
