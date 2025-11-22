export default function timeAgo(timestamp: number) {
  const now = Date.now(); // current time in ms
  const diff = now - timestamp; // difference in ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 30) return `${days}d`;
  if (months < 12) return `${months}months`;
  if (years == 1) {
    return `${years}yr`;
  } else {
    return `${years}yrs`;
  }
}