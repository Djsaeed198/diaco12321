export const toPersianDigits = (input: string | number): string =>
  String(input).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export const formatPersianNumber = (n: number): string =>
  toPersianDigits(n.toLocaleString('fa-IR'));

export const formatMonthRange = ([a, b]: [number, number]): string =>
  `${toPersianDigits(a)} الی ${toPersianDigits(b)} ماه`;
