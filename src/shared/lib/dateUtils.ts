import dayjs from 'dayjs';

/**
 * Formats date like value into human readable string
 * TODO - add format argument
 */
export function dateToDateHuman(value: Date | string | number): string | null {
  if (dayjs(value).isValid()) {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return null;
}
