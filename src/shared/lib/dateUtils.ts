export function unixToDateHuman(unix: string) {
  const date = new Date(Number(unix) * 1000);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
