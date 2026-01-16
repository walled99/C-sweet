import { CartItem } from "@/types";
import { formatQuantity, formatPrice, currencyLabel } from "./localization";

const PHONE_NUMBER = "201127666232"; // 01127666232 with country code +20

export function generateWhatsAppLink(cart: CartItem[], total: number): string {
  const header = "مرحبا، طلب جديد من الموقع:\n";
  
  const itemsList = cart.map((item) => {
    const qtyDisplay = formatQuantity(item.qty, item.unit);
    const lineTotal = item.price * item.qty;
    return `- ${item.name} (${qtyDisplay}) - ${lineTotal} ${currencyLabel}`;
  }).join("\n");

  const footer = `\n\nالمجموع: ${total} ${currencyLabel}`;
  
  const message = `${header}${itemsList}${footer}`;
  
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

