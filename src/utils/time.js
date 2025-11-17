export default function convertToTime(dt) {
  return new Date(dt * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
