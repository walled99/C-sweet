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
    category: "sweet", // Technically bakery but under sweet/pastry for now or adding new category later
    imageUrl: "/images/manakish.png",
    isAvailable: true,
    unit: "piece",
    step: 1
  }
];
