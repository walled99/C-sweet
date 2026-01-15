"use client";


import { useCart } from "@/context/CartContext";


export default function Header() {
  const { itemsCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-primary text-secondary shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold">
          C-Sweet <span className="text-accent">Shop</span>
        </div>

        {/* Cart Trigger */}
        <button
          onClick={openCart}
          className="relative flex items-center gap-2 rounded-full bg-primary-text/10 px-4 py-2 transition hover:bg-primary-text/20"
        >
          <span className="sr-only">Open Cart</span>
          {/* Simple Cart SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          
          <span className="font-semibold">{itemsCount}</span>
        </button>
      </div>
    </header>
  );
}
