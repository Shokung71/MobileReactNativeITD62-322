export function required(v) {
  return v !== undefined && v !== null && String(v).trim() !== '';
}

export function toIntArray(str) {
  if (Array.isArray(str)) return str.map(Number).filter(n => !isNaN(n));
  return String(str || '')
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(n => !isNaN(n));
}
