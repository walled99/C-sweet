import { Product } from '@/types';

export const products: Product[] = [
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
    id: "2",
    name: "مناقيش زعتر", // Manakish Zaatar
    price: 15,
    category: "sweet",
    imageUrl: "/images/manakish.png",
    isAvailable: true,
    unit: "piece",
    minOrder: 1,
    step: 1
  }
];
