import { Product } from '@/types';
import { supabase } from './supabase';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data || []).map(product => ({
    id: String(product.id),
    name: product.name,
    price: Number(product.price),
    category: product.category,
    imageUrl: product.image_url,
    isAvailable: product.is_available,
    unit: product.unit,
    minOrder: Number(product.min_order),
    step: Number(product.step)
  }));
}

// Keep the old array for backward compatibility during migration if needed, 
// but we will eventually replace all imports.
export const staticProducts: Product[] = [
  // ... current products ...
];
