/**
 * Accurate Gregorian to Jalali (Solar Hijri) date converter
 */
export function getPersianJalaliDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('fa-IR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(date);
  } catch {
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const gDay = date.getDate();

    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    // Leap year calculation for Gregorian
    const isGLeap = (gYear % 4 === 0 && gYear % 100 !== 0) || gYear % 400 === 0;
    if (isGLeap) gDaysInMonth[1] = 29;

    let gy = gYear - 1600;
    let gm = gMonth - 1;
    let gd = gDay - 1;

    let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) {
      gDayNo += gDaysInMonth[i];
    }
    gDayNo += gd;

    let jDayNo = gDayNo - 79;

    let jNp = Math.floor(jDayNo / 12053);
    jDayNo %= 12053;

    let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
    jDayNo %= 1461;

    if (jDayNo >= 366) {
      jy += Math.floor((jDayNo - 1) / 365);
      jDayNo = (jDayNo - 1) % 365;
    }

    let jm = 0;
    for (let i = 0; i < 11 && jDayNo >= jDaysInMonth[i]; ++i) {
      jDayNo -= jDaysInMonth[i];
      jm = i + 1;
    }
    let jd = jDayNo + 1;

    const persianMonths = [
      'فروردین', 'اردیبهشت', 'خرداد',
      'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر',
      'دی', 'بهمن', 'اسفند'
    ];

    const monthName = persianMonths[jm] || 'فروردین';
    return `${toPersianDigits(jd)} ${monthName} ${toPersianDigits(jy)}`;
  }
}

export const formatPersianDate = getPersianJalaliDate;

export function toPersianDigits(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (x) => persianDigits[parseInt(x, 10)]);
}

