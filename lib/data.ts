import { Product } from '@/types';

export const products: Product[] = [
  // --- Dairy & Cheese ---
  {
    id: "1",
    name: "جبنة بيضاء", // White Cheese
    price: 120,
    category: "cheese_milk",
    imageUrl: "/images/white-cheese.png",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.25,
    step: 0.25
  },
  {
    id: "3",
    name: "جبنة رومي", // Romy Cheese
    price: 240,
    category: "cheese_milk",
    imageUrl: "/images/romy-cheese.png",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.125, // Eighth (thumn)
    step: 0.125
  },
  {
    id: "8",
    name: "حليب كامل الدسم", // Full Cream Milk
    price: 45,
    category: "cheese_milk",
    imageUrl: "/images/logo.png", // Placeholder
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  },

  // --- Sweets & Bakery ---
  {
    id: "2",
    name: "مناقيش زعتر", // Manakish Zaatar
    price: 15,
    category: "sweet",
    imageUrl: "/images/manakish.png",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },
  {
    id: "4",
    name: "كنافة بالمكسرات", // Kunafa Nuts
    price: 160,
    category: "sweet",
    imageUrl: "/images/kunafa.png",
    isAvailable: true,
    unit: "kg",
    minOrder: 0.5,
    step: 0.5
  },
  {
    id: "5",
    name: "كرواسون زبدة", // Butter Croissant
    price: 35,
    category: "sweet",
    imageUrl: "/images/croissant.png",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  },

  // --- Supermarket & Freezing ---
  {
    id: "6",
    name: "أرز مصري (1 كجم)", // Egyptian Rice
    price: 35,
    category: "supermarket",
    imageUrl: "/images/logo.png", // Placeholder
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  },
  {
    id: "7",
    name: "ملوخية مجمدة", // Frozen Molokhia
    price: 15,
    category: "freezing",
    imageUrl: "/images/logo.png", // Placeholder
    isAvailable: true,
    unit: "pack",
    minOrder: 1,
    step: 1
  }
];
