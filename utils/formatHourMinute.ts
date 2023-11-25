export default function formatHourMinute(minutes: number): string {
  if (isNaN(minutes) || minutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesText =
    remainingMinutes > 0
      ? `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
      : "";

  const separator = hoursText && minutesText ? " " : "";

  return `${hoursText}${separator}${minutesText}`;
}
