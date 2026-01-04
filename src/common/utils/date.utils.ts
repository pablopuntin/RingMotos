export function parseLocalDate(
  date: string,
  endOfDay = false,
): Date {
  const [year, month, day] = date.split('-').map(Number);

  return endOfDay
    ? new Date(year, month - 1, day, 23, 59, 59, 999)
    : new Date(year, month - 1, day, 0, 0, 0, 0);
}
