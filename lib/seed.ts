import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Inlined types to avoid import resolution issues with ts-node
type Category = 
  | 'coffee_roastery' | 'nuts' | 'cheese' | 'halva_jam' | 'olives_pickles' 
  | 'appetizers_salads' | 'luncheon_cold_cuts' | 'ready_to_cook' | 'sweets' 
  | 'kibbeh_sambousek' | 'dried_fruits' | 'bakery' | 'oil_ghee' | 'zaatar_legumes' 
  | 'snacks' | 'spices_seasonings' | 'hospitality' | 'honey' | 'ice_cream_cake' 
  | 'dates' | 'yamish' | 'pancake_waffle_crepe' | 'home_made' | 'arabic_ice_cream' 
  | 'cakes' | 'sandwiches';

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
    name: "بن غامق كولومبي",
    price: 250,
    category: "coffee_roastery",
    imageUrl: "/images/Milk.jpg", // Using Milk.jpg as placeholder
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "فستق حلبي محمص",
    price: 800,
    category: "nuts",
    imageUrl: "/images/kunafa.jpg", // Using kunafa.jpg as placeholder
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "جبنة حلوم طازجة",
    price: 300,
    category: "cheese",
    imageUrl: "/images/white-cheese.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "حلاوة طحينية فاخرة",
    price: 150,
    category: "halva_jam",
    imageUrl: "/images/romy-cheese.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "مخلل خيار شام",
    price: 80,
    category: "olives_pickles",
    imageUrl: "/images/Molokhia.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "مسبحة حمص",
    price: 60,
    category: "appetizers_salads",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "مرتديلا حلبي",
    price: 220,
    category: "luncheon_cold_cuts",
    imageUrl: "/images/romy-cheese.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "شيش طاووق متبل",
    price: 350,
    category: "ready_to_cook",
    imageUrl: "/images/Molokhia.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "صحن بقلاوة مشكل",
    price: 450,
    category: "sweets",
    imageUrl: "/images/kunafa.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "كبة مقلية",
    price: 120,
    category: "kibbeh_sambousek",
    imageUrl: "/images/manakish.jpg",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    name: "تين مجفف سيرموك",
    price: 280,
    category: "dried_fruits",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "خبز صاج طازج",
    price: 50,
    category: "bakery",
    imageUrl: "/images/manakish.jpg",
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  },
  {
    name: "سمن بقري أصلي",
    price: 500,
    category: "oil_ghee",
    imageUrl: "/images/Milk.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "زعتر حلبي اكسترا",
    price: 180,
    category: "zaatar_legumes",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "قضامة بالسكر",
    price: 120,
    category: "snacks",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "بهارات مشكلة",
    price: 100,
    category: "spices_seasonings",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.1,
    step: 0.1
  },
  {
    name: "ملبس لوز",
    price: 400,
    category: "hospitality",
    imageUrl: "/images/croissant.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    name: "عسل نحل طبيعي",
    price: 600,
    category: "honey",
    imageUrl: "/images/Milk.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "تورتة آيس كريم مانجو",
    price: 750,
    category: "ice_cream_cake",
    imageUrl: "/images/kunafa.jpg",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    name: "تمر عجوة",
    price: 400,
    category: "dates",
    imageUrl: "/images/Rice.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "قمر الدين مشمش",
    price: 120,
    category: "yamish",
    imageUrl: "/images/Molokhia.jpg",
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  },
  {
    name: "وافل بلجيكي",
    price: 95,
    category: "pancake_waffle_crepe",
    imageUrl: "/images/croissant.jpg",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    name: "مكدوس باذنجان",
    price: 250,
    category: "home_made",
    imageUrl: "/images/white-cheese.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "بوظة عربي بالقشطة",
    price: 350,
    category: "arabic_ice_cream",
    imageUrl: "/images/Milk.jpg",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    name: "تورتة شوكولاتة كلاسيك",
    price: 600,
    category: "cakes",
    imageUrl: "/images/kunafa.jpg",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    name: "ساندوتش شاورما",
    price: 110,
    category: "sandwiches",
    imageUrl: "/images/manakish.jpg",
    isAvailable: true,
    unit: "piece",
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
