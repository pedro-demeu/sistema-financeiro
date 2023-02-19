export function transformDate(date: Date): string {
  const dayToFormat = date.getDate().toString();
  const day = dayToFormat.length === 1 ? "0" + dayToFormat : dayToFormat;
  const monthToFormat = (date.getMonth() + 1).toString();
  const month =
    monthToFormat.length === 1 ? "0" + monthToFormat : monthToFormat;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
