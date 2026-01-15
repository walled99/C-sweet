import { CartItem } from "@/types";

const PHONE_NUMBER = "201127666232"; // 01127666232 with country code +20

export function generateWhatsAppLink(cart: CartItem[], total: number): string {
  const header = "مرحبا، طلب جديد من الموقع:\n";
  
  const itemsList = cart.map((item) => {
    const qtyDisplay = item.unit === 'kg' 
      ? `${item.qty} kg` 
      : `${item.qty} قطعة`; // or similar Arabic term
    return `- ${item.name} (${qtyDisplay}) - ${item.price * item.qty} EGP`;
  }).join("\n");

  const footer = `\n\nالمجموع: ${total} EGP`;
  
  const message = `${header}${itemsList}${footer}`;
  
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
