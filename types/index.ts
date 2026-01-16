export type Category = 'sweet' | 'supermarket' | 'freezing' | 'cheese_milk';

export type Unit = 'kg' | 'g' | 'piece' | 'pack';

export interface Product {
  id: string;
  name: string; // Arabic name
  price: number;
  category: Category;
  imageUrl: string;
  isAvailable: boolean;
  unit: Unit;
  minOrder: number; // Required: e.g., 0.25 for kg, 1 for piece
  step: number;     // Required: e.g., 0.25 for kg, 1 for piece
}

export interface CartItem extends Product {
  qty: number;
}
