export function formatBytes(bytes: number) {
  // Conversion Factors
  const KILO = 1024 ** 1;
  const MEGA = 1024 ** 2;
  const GIGA = 1024 ** 3;

  let values = bytes;
  let unit = "B";
  if (bytes > GIGA) {
    values = bytes / GIGA;
    unit = "GB";
  } else if (bytes > MEGA) {
    values = bytes / MEGA
    unit = "MB";
  } else if (bytes > KILO) {
    values = bytes / KILO;
    unit = "KB";
  }

  return `${values.toFixed(2)} ${unit}`;
}
