import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Inlined types to avoid import resolution issues with ts-node
type Category = 'sweet' | 'supermarket' | 'freezing' | 'cheese_milk';
type Unit = 'kg' | 'g' | 'piece' | 'pack';

interface Product {
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  isAvailable: boolean;
  unit: Unit;
  minOrder: number;
  step: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const products: Product[] = [
  {
    name: "جبنة بيضاء",
    price: 120,
    category: "cheese_milk",
    imageUrl: "/images/white-cheese.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "جبنة رومي",
    price: 240,
    category: "cheese_milk",
    imageUrl: "/images/romy-cheese.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "حليب كامل الدسم",
    price: 45,
    category: "cheese_milk",
    imageUrl: "/images/Milk.jpg",
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  },
  {
    name: "مناقيش زعتر",
    price: 15,
    category: "sweet",
    imageUrl: "/images/manakish.jpg",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    name: "كنافة بالمكسرات",
    price: 160,
    category: "sweet",
    imageUrl: "/images/kunafa.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "كرواسون زبدة",
    price: 35,
    category: "sweet",
    imageUrl: "/images/croissant.jpg",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    name: "أرز مصري (1 كجم)",
    price: 35,
    category: "supermarket",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  },
  {
    name: "ملوخية مجمدة",
    price: 15,
    category: "freezing",
    imageUrl: "/images/Molokhia.jpg",
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  }
];

async function seed() {
  console.log('Seeding products...');
  const { data, error } = await supabase
    .from('products')
    .insert(products.map(p => ({
        name: p.name,
        price: p.price,
        category: p.category,
        image_url: p.imageUrl,
        is_available: p.isAvailable,
        unit: p.unit,
        min_order: p.minOrder,
        step: p.step
    })));

  if (error) {
    console.error('Error seeding products:', error);
  } else {
    console.log('Seeding complete!');
  }
}

seed();
