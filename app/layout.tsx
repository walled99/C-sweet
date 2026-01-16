import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import FlyToCartPortal from "@/components/FlyToCart";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "C-Sweet Shop",
  description: "Delicious sweets and groceries delivered via WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased font-sans bg-secondary text-primary-text`}>
        <CartProvider>
          <Header />
          <CartSidebar />
          <FlyToCartPortal />
          <main className="min-h-screen">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}


