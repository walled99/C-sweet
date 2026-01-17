"use client";

import { Product } from "@/types";
import { formatQuantity, formatPrice } from "@/lib/localization";

interface QuantitySelectorProps {
  product: Product;
  value: number;
  onChange: (val: number) => void;
}

export default function QuantitySelector({ product, value, onChange }: QuantitySelectorProps) {

  const handleDecrement = () => {
    const newValue = Math.max(product.minOrder, parseFloat((value - product.step).toFixed(2)));
    onChange(newValue);
  };

  const handleIncrement = () => {
    onChange(parseFloat((value + product.step).toFixed(2)));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Precision Stepper */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-secondary p-1 shadow-sm">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= product.minOrder}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl text-primary hover:bg-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>
        
        <div className="text-center min-w-[80px]">
          <div className="font-bold text-primary-text">{formatQuantity(value, product.unit)}</div>
          <div className="text-[10px] text-accent font-medium leading-none">
            {formatPrice(value * product.price)}
          </div>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center text-xl hover:bg-primary/90 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
