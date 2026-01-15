"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(product.minOrder || (product.unit === 'kg' ? 1 : 1));

  const handleIncrement = () => {
    setQty((prev) => {
      const step = product.step || 1;
      // precision fix
      return parseFloat((prev + step).toFixed(2));
    });
  };

  const handleDecrement = () => {
    setQty((prev) => {
      const step = product.step || 1;
      const min = product.minOrder || step;
      if (prev - step < min) return prev;
      return parseFloat((prev - step).toFixed(2));
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
        setQty(val);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-primary-text">{product.name}</h3>
          <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-bold text-accent-foreground text-primary">
            {product.price} EGP / {product.unit}
          </span>
        </div>
        
        <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-sm text-gray-500">الكمية ({product.unit}):</label>
                <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-1">
                    <button 
                        onClick={handleDecrement}
                        className="p-1 px-2 text-lg text-primary hover:bg-white rounded"
                    >-</button>
                    <input 
                        type="number"
                        min={product.minOrder || product.step || 1}
                        step={product.step || 1}
                        value={qty}
                        onChange={handleChange}
                        className="w-16 bg-transparent text-center font-bold focus:outline-none"
                    />
                    <button 
                        onClick={handleIncrement}
                        className="p-1 px-2 text-lg text-primary hover:bg-white rounded"
                    >+</button>
                </div>
            </div>

            <button
                onClick={() => addToCart(product, qty)}
                className="w-full rounded-lg bg-primary py-2 font-bold text-secondary transition hover:bg-primary/90 active:scale-95"
            >
                أضف إلى السلة
            </button>
        </div>
      </div>
    </div>
  );
}
