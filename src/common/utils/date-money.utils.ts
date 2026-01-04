// src/common/utils/date-money.utils.ts

export function parseLocalDate(
  date: string,
  endOfDay = false,
): Date {
  const [year, month, day] = date.split('-').map(Number);

  return endOfDay
    ? new Date(year, month - 1, day, 23, 59, 59, 999)
    : new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Si no se envía rango:
 * - from = hoy - 1 año
 * - to = hoy
 */
export function resolveDateRange(
  from?: string,
  to?: string,
): { from: Date; to: Date } {
  const today = new Date();

  const resolvedFrom = from
    ? parseLocalDate(from)
    : new Date(today.getFullYear() - 1, today.getMonth(), today.getDate(), 0, 0, 0, 0);

  const resolvedTo = to
    ? parseLocalDate(to, true)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

  return { from: resolvedFrom, to: resolvedTo };
}

/**
 * Evita floats raros tipo 30002600.040000007
 */
export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
