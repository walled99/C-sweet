// Localization mappings for Arabic UI
export const unitLabels: Record<string, string> = {
  kg: 'كجم',
  g: 'جرام',
  piece: 'قطعة',
  pack: 'عبوة',
};

export const currencyLabel = 'ج.م';

/**
 * Format a price with Arabic currency label
 */
export function formatPrice(price: number): string {
  return `${price} ${currencyLabel}`;
}

/**
 * Format a price with unit for display (e.g., "120 ج.م / كجم")
 */
export function formatPriceWithUnit(price: number, unit: string): string {
  const unitLabel = unitLabels[unit] || unit;
  return `${price} ${currencyLabel} / ${unitLabel}`;
}

/**
 * Format quantity with Arabic unit label
 */
export function formatQuantity(qty: number, unit: string): string {
  const unitLabel = unitLabels[unit] || unit;
  return `${qty} ${unitLabel}`;
}
