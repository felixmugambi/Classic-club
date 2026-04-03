import { formatDistanceToNowStrict, format, parseISO } from 'date-fns';

export const getRelativeTime = (timestamp: string) => {
  const date = parseISO(timestamp);
  const now = new Date();
  const msDiff = now.getTime() - date.getTime();

  const minutes = Math.floor(msDiff / 60000);
  const hours = Math.floor(msDiff / (1000 * 60 * 60));
  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  // If over 24 hours, show exact date instead
  return format(date, 'MMM d, yyyy'); // e.g., "Jun 28, 2025"
};
