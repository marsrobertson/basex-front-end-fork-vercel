export function toDateTimeString(date: Date): string {
  const dd: string = date.getDate().toString().padStart(2, '0');
  const mm: string = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
  const yyyy: string = date.getFullYear().toString();

  const hh: string = date.getHours().toString().padStart(2, '0');
  const min: string = date.getMinutes().toString().padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}
