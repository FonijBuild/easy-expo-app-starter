export function formatDate(value: string | Date, locale: string): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
}
