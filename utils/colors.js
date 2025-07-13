/**
 * Lighten a hex color by a given percent (0-100)
 * Example: lighten('#204080', 45)
 */
export function lighten(hex, percent) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const num = parseInt(hex, 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Accepts a hex color string like "#3366cc"
export function getContrastTextColor(bgColor) {
  // Remove # if present
  const color = bgColor.replace('#', '');
  // Parse r, g, b values
  const r = parseInt(color.substring(0,2), 16);
  const g = parseInt(color.substring(2,4), 16);
  const b = parseInt(color.substring(4,6), 16);
  // Calculate luminance
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
  // If it's bright, return black. If it's dark, return white.
  return luminance > 0.6 ? '#000' : '#fff';
}

