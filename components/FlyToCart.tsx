"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function FlyToCartPortal() {
  const { cartIconRef } = useCart();
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  // Listen for custom fly event
  useEffect(() => {
    const handleFly = (e: CustomEvent<{ startX: number; startY: number }>) => {
      if (!cartIconRef.current) return;
      
      const cartRect = cartIconRef.current.getBoundingClientRect();
      const id = Date.now().toString();
      
      setFlyingItems((prev) => [
        ...prev,
        {
          id,
          startX: e.detail.startX,
          startY: e.detail.startY,
          endX: cartRect.left + cartRect.width / 2,
          endY: cartRect.top + cartRect.height / 2,
        },
      ]);

      // Remove after animation
      setTimeout(() => {
        setFlyingItems((prev) => prev.filter((item) => item.id !== id));
      }, 600);
    };

    window.addEventListener("fly-to-cart" as any, handleFly);
    return () => window.removeEventListener("fly-to-cart" as any, handleFly);
  }, [cartIconRef]);

  return (
    <AnimatePresence>
      {flyingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            position: "fixed",
            left: item.startX,
            top: item.startY,
            opacity: 1,
            scale: 1,
            zIndex: 9999,
          }}
          animate={{
            left: item.endX,
            top: item.endY,
            opacity: 0.6,
            scale: 0.3,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pointer-events-none h-6 w-6 rounded-full bg-primary"
        />
      ))}
    </AnimatePresence>
  );
}

// Helper to dispatch fly event from ProductCard
export function triggerFlyToCart(buttonElement: HTMLButtonElement) {
  const rect = buttonElement.getBoundingClientRect();
  const event = new CustomEvent("fly-to-cart", {
    detail: {
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
    },
  });
  window.dispatchEvent(event);
}
