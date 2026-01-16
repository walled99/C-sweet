"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { useState, useRef } from "react";
import { formatPriceWithUnit } from "@/lib/localization";
import { triggerFlyToCart } from "./FlyToCart";
import QuantitySelector from "./QuantitySelector";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, triggerCartBounce } = useCart();
  const [qty, setQty] = useState(product.minOrder);
  const [isAdded, setIsAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
            <QuantitySelector 
              product={product} 
              value={qty} 
              onChange={setQty} 
            />

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



