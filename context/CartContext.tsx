"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemsCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
  triggerCartBounce: () => void;
  isBouncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const cartIconRef = useRef<HTMLButtonElement | null>(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const triggerCartBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("c-sweet-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart", error);
        localStorage.removeItem("c-sweet-cart");
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("c-sweet-cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      // Validate step logic for weight items
      let validQty = qty;
      if (product.unit === 'kg' && product.step) {
         const step = product.step;
         const remainder = validQty % step;
         if (remainder > 0.001 && Math.abs(remainder - step) > 0.001) {
             validQty = Math.round(validQty / step) * step;
         }
      }
      
      // No auto-open; fly-to-cart animation handles feedback

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + validQty } : item
        );
      }
      return [...prev, { ...product, qty: validQty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const itemsCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemsCount,
        isCartOpen,
        openCart,
        closeCart,
        cartIconRef,
        triggerCartBounce,
        isBouncing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
