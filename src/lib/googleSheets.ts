/**
 * Google Sheets API Helper for Diaco Immigration Portal
 * Uses OAuth 2.0 access token obtained via Firebase Auth (GoogleAuthProvider with spreadsheets scope)
 */

export interface SheetRowData {
  email: string;
  topic: string;
  jalaliDate?: string;
  timestamp?: string;
  source?: string;
}

const STORAGE_KEY_SHEET_ID = 'diaco_active_sheet_id';
const STORAGE_KEY_SHEET_TITLE = 'diaco_active_sheet_title';

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

/**
 * Creates a dedicated new Google Sheet in the user's Google Drive for Diaco newsletter leads
 */
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
            title: 'متقاضیان خبرنامه',
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
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  saveStoredSheetId(spreadsheetId, customTitle);

  return {
    spreadsheetId,
    spreadsheetUrl,
    title: customTitle,
  };
}

/**
 * Fetches information about a spreadsheet by ID
 */
export async function getSpreadsheetDetails(
  accessToken: string,
  spreadsheetId: string
): Promise<{ title: string; sheets: string[] }> {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties.title`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'امکان دسترسی به شیت مورد نظر وجود ندارد.');
  }

  const data = await res.json();
  const title = data.properties?.title || 'Google Sheet';
  const sheets = (data.sheets || []).map((s: any) => s.properties?.title || 'Sheet1');

  return { title, sheets };
}

/**
 * Appends a subscriber lead row to the user's Google Sheet
 */
export async function appendSubscriberToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  lead: SheetRowData
): Promise<{ success: boolean; spreadsheetUrl: string }> {
  const now = new Date();
  const jalaliDate =
    lead.jalaliDate ||
    new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Tehran',
    }).format(now);

  const rowValues = [
    lead.email.trim().toLowerCase(),
    lead.topic || 'تمکن مالی اتریش',
    jalaliDate,
    lead.timestamp || now.toISOString(),
    lead.source || 'پرتال دیاکو (فرم خبرنامه)',
    'در انتظار ارتباط کارشناس',
  ];

  // Try finding the first tab name
  let targetTab = 'متقاضیان خبرنامه';
  try {
    const details = await getSpreadsheetDetails(accessToken, spreadsheetId);
    if (details.sheets && details.sheets.length > 0) {
      // Pick the first sheet or 'متقاضیان خبرنامه' if exists
      targetTab = details.sheets.includes('متقاضیان خبرنامه') ? 'متقاضیان خبرنامه' : details.sheets[0];
    }
  } catch {
    // fallback to Sheet1 or default
    targetTab = 'Sheet1';
  }

  const range = encodeURIComponent(`${targetTab}!A:F`);
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

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
    // If targetTab failed, try generic range
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
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
      throw new Error(err?.error?.message || 'خطا در ثبت ردیف در گوگل شیت.');
    }
  }

  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  return { success: true, spreadsheetUrl };
}
