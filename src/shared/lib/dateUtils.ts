import dayjs from 'dayjs';

/**
 * Formats date like value into human readable string
 * TODO - add format argument
 */
export function dateToDateHuman(value: Date | string | number): string | null {
  const dateObj = dayjs(value);

  if (value !== undefined && value !== null && dateObj.isValid()) {
    return dateObj.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return null;
}

/**
 * Formats date like value into value for datetime-local input (YYYY-MM-DDTHH:MM)
 */
export function dateToDateTimeInputValue(value: Date | string | number): string {
  const dateObj = dayjs(value);

  if (value !== undefined && value !== null && dayjs(value).isValid()) {
    const date = dateObj.toDate();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return '';
}
