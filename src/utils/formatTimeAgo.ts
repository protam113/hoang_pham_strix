import {
  differenceInHours,
  formatDistanceToNow,
  format,
  isValid,
} from 'date-fns';

export function formatSmartDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  if (!isValid(date)) return 'Invalid date';

  const hoursAgo = differenceInHours(new Date(), date);

  if (hoursAgo < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  } else {
    return format(date, 'yyyy/MM/dd');
  }
}
