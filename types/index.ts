export type Category = 
  | 'coffee_roastery' 
  | 'nuts' 
  | 'cheese' 
  | 'halva_jam' 
  | 'olives_pickles' 
  | 'appetizers_salads' 
  | 'luncheon_cold_cuts' 
  | 'ready_to_cook' 
  | 'sweets' 
  | 'kibbeh_sambousek' 
  | 'dried_fruits' 
  | 'bakery' 
  | 'oil_ghee' 
  | 'zaatar_legumes' 
  | 'snacks' 
  | 'spices_seasonings' 
  | 'hospitality' 
  | 'honey' 
  | 'ice_cream_cake' 
  | 'dates' 
  | 'yamish' 
  | 'pancake_waffle_crepe' 
  | 'home_made' 
  | 'arabic_ice_cream' 
  | 'cakes' 
  | 'sandwiches';


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
