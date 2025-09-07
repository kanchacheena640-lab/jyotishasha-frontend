import { formatDate } from './dateFormatter';

export function replaceIsoDates(text: string): string {
  return text.replace(/\b\d{4}-\d{2}-\d{2}\b/g, (match) => formatDate(match));
}
