"use client";

import { useCart } from "@/context/CartContext";
import { generateWhatsAppLink } from "@/lib/whatsappUtils";
import { useEffect, useState } from "react";

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart } = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    setCheckoutUrl(generateWhatsAppLink(cart, cartTotal));
  }, [cart, cartTotal]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar Panel */}
      <div className="relative h-full w-full max-w-md bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-primary">سلة المشتريات</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-500">
              <p>السلة فارغة</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                   {/* We could show image here too if we want, but name is fine */}
                   <div className="flex-1">
                     <h3 className="font-semibold text-primary-text">{item.name}</h3>
                     <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                        <span>{item.price} EGP / {item.unit}</span>
                     </div>
                     
                     <div className="mt-2 flex items-center gap-3">
                        {item.unit === 'kg' ? (
                            <input 
                                type="number" 
                                step={item.step || 0.25}
                                min={item.step || 0.25}
                                value={item.qty}
                                onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value))}
                                className="w-20 rounded border p-1 text-center"
                            />
                        ) : (
                            <div className="flex items-center gap-2 rounded border">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                                    className="px-2 py-1 hover:bg-gray-100"
                                >-</button>
                                <span className="w-8 text-center">{item.qty}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                                    className="px-2 py-1 hover:bg-gray-100"
                                >+</button>
                            </div>
                        )}
                        <span className="text-xs text-gray-500">{item.unit}</span>
                     </div>
                   </div>
                   
                   <div className="flex flex-col items-end gap-2">
                     <span className="font-bold text-accent">{item.price * item.qty} EGP</span>
                     <button 
                       onClick={() => removeFromCart(item.id)}
                       className="text-red-500 hover:text-red-700"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                     </button>
                   </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t bg-gray-50 p-4">
            <div className="mb-4 flex justify-between text-lg font-bold text-primary">
              <span>المجموع:</span>
              <span>{cartTotal} EGP</span>
            </div>
            
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 font-bold text-white transition hover:bg-[#20bd5a]"
            >
              <span>إتمام الطلب عبر واتساب</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
