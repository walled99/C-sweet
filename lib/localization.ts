import { Category } from '@/types';

// Localization mappings for Arabic UI
export const unitLabels: Record<string, string> = {
  kg: 'كجم',
  g: 'جرام',
  piece: 'قطعة',
  pack: 'عبوة',
};

export const currencyLabel = 'ج.م';

export const categoryLabels: Record<Category, string> = {
  coffee_roastery: 'قسم البن والمحمصات',
  nuts: 'قسم المكسرات',
  cheese: 'الأجبان',
  halva_jam: 'حلاوة ومربى',
  olives_pickles: 'زيتون و مخللات',
  appetizers_salads: 'قسم المقبلات والسلطات',
  luncheon_cold_cuts: 'قسم اللانشون واللحوم الباردة',
  ready_to_cook: 'قسم المنتجات الجاهزة للطهي',
  sweets: 'قسم الحلويات',
  kibbeh_sambousek: 'قسم الكبيبة والسمبوسك',
  dried_fruits: 'فواكه مجففه',
  bakery: 'قسم المخبوزات',
  oil_ghee: 'قسم الزيت والسمنة',
  zaatar_legumes: 'قسم الزعتر والبقوليات',
  snacks: 'قسم التسالي',
  spices_seasonings: 'قسم البهارات والتوابل',
  hospitality: 'قسم الضيافات',
  honey: 'قسم العسل',
  ice_cream_cake: 'تورت آيس كريم',
  dates: 'التمور',
  yamish: 'ياميش',
  pancake_waffle_crepe: 'قسم البان كيك و الوافل والكريب',
  home_made: 'منتجات صنع بيتي',
  arabic_ice_cream: 'بوظة عربي',
  cakes: 'تورت',
  sandwiches: 'قسم ساندويتش سوريا ماركت',
};

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
 * Format quantity with Arabic unit label (removes trailing zeros)
 */
export function formatQuantity(qty: number, unit: string): string {
  const unitLabel = unitLabels[unit] || unit;
  // Remove trailing zeros for clean display (e.g., "0.500" → "0.5")
  const formattedQty = Number(qty).toString();
  return `${formattedQty} ${unitLabel}`;
}

