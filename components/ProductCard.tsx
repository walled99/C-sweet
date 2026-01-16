"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { useState, useRef } from "react";
import { formatPriceWithUnit, unitLabels } from "@/lib/localization";
import { triggerFlyToCart } from "./FlyToCart";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, triggerCartBounce } = useCart();
  const [qty, setQty] = useState(product.minOrder || (product.unit === 'kg' ? 1 : 1));
  const [isAdded, setIsAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleIncrement = () => {
    setQty((prev) => {
      const step = product.step || 1;
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

  const handleAddToCart = () => {
    addToCart(product, qty);
    setIsAdded(true);

    // Trigger fly-to-cart animation
    if (buttonRef.current) {
      triggerFlyToCart(buttonRef.current);
    }
    
    // Trigger cart bounce after fly animation lands
    setTimeout(() => {
      triggerCartBounce();
    }, 450);

    setTimeout(() => setIsAdded(false), 1500);
  };

  const unitLabel = unitLabels[product.unit] || product.unit;

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
          <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-bold text-primary">
            {formatPriceWithUnit(product.price, product.unit)}
          </span>
        </div>
        
        <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-sm text-gray-500">الكمية ({unitLabel}):</label>
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
                ref={buttonRef}
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full rounded-lg py-2 font-bold text-secondary transition active:scale-95 ${
                  isAdded ? 'bg-green-600' : 'bg-primary hover:bg-primary/90'
                }`}
            >
                {isAdded ? 'تمت الإضافة ✓' : 'أضف إلى السلة'}
            </button>
        </div>
      </div>
    </div>
  );
}


