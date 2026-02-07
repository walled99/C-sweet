# AI_CONTEXT.md — C-Sweet Shop System Prompt

> [!IMPORTANT]
> **READ THIS ENTIRE FILE BEFORE WRITING ANY CODE.**
> This document is the architectural contract for all AI-generated code in this project.

---

## 1. Project Identity

| Key | Value |
|-----|-------|
| Name | C-Sweet Shop |
| Type | E-Commerce MVP |
| Framework | Next.js 15+ (App Router) |
| Backend | Supabase |
| Images | Supabase Storage |
| UI Direction | RTL (Arabic-First) |
| Checkout | WhatsApp Integration |

---

## 2. Directory Structure

```
e:/C-Sweet/
├── app/                    # Next.js App Router (Routes & Layouts ONLY)
│   ├── layout.tsx          # Root Layout (RTL, Font, Providers)
│   ├── page.tsx            # Home Page (Product Grid)
│   └── globals.css         # Tailwind Theme Config
├── components/             # UI Components
│   ├── Header.tsx          # Sticky header with cart icon (uses Framer Motion)
│   ├── CartSidebar.tsx     # Slide-over cart panel
│   ├── ProductCard.tsx     # Product display with qty selector
│   └── FlyToCart.tsx       # Fly-to-cart animation portal
├── context/
│   └── CartContext.tsx     # Cart state management + localStorage
├── lib/
│   ├── supabase.ts         # Supabase client initialization
│   ├── data.ts             # Data fetching (Products from Supabase)
│   ├── localization.ts     # Arabic unit/currency labels
│   └── whatsappUtils.ts    # WhatsApp message generator
├── types/
│   └── index.ts            # TypeScript interfaces (Product, CartItem)
└── public/images/          # Product images
    └── logo.png            # Header logo (120x48px)
```

---

## 3. Design System

### 3.1 Colors (Tailwind Theme)
Defined in `app/globals.css`:
```css
--color-primary: #561c24;      /* Dark Cherry — Headers, Buttons */
--color-secondary: #e8d8c4;    /* Cream — Backgrounds */
--color-accent: #c5a35d;       /* Gold — Highlights, Prices */
--color-primary-text: #3d141a; /* Deep Brown — Body Text */
```

### 3.2 RTL Rules
> [!CAUTION]
> **NEVER use `left`/`right` properties. ALWAYS use logical properties.**

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `ml-4` | `ms-4` |
| `mr-4` | `me-4` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `left-0` | `inset-inline-start-0` |
| `right-0` | `inset-inline-end-0` |

### 3.3 Font
- **Family**: Cairo (Arabic + Latin)
- **Variable**: `--font-cairo`
- **Applied via**: `font-sans` utility

---

## 4. Data Schema

### 4.1 Types (`types/index.ts`)
```typescript
type Category = 'sweet' | 'supermarket' | 'freezing' | 'cheese_milk';
type Unit = 'kg' | 'g' | 'piece' | 'pack';

interface Product {
  id: string;
  name: string;        // Arabic ONLY
  price: number;       // Price per unit
  category: Category;
  imageUrl: string;
  isAvailable: boolean;
  unit: Unit;
  minOrder: number;    // Required: e.g., 0.25 for kg, 1 for piece
  step: number;        // Required: e.g., 0.25 for kg
}

interface CartItem extends Product {
  qty: number;
}
```

### 4.2 Data Flow
- **Products**: Fetched via `getProducts()` in `lib/data.ts` using `@supabase/supabase-js`.
- **Images**: Loaded via Public URLs from Supabase Storage `product-images` bucket.
- **Orders**: (Planned) Stored in Supabase `orders` table before WhatsApp redirection.

---

## 5. Localization (`lib/localization.ts`)

> [!IMPORTANT]
> **ALL user-facing text must use Arabic labels. Internal keys remain English.**

### 5.1 Mapping
```typescript
const unitLabels = {
  kg: 'كجم',
  g: 'جرام',
  piece: 'قطعة',
  pack: 'عبوة',
};
const currencyLabel = 'ج.م';
```

### 5.2 Helper Functions
```typescript
formatPrice(price: number): string
// Returns: "120 ج.م"

formatPriceWithUnit(price: number, unit: string): string
// Returns: "120 ج.م / كجم"

formatQuantity(qty: number, unit: string): string
// Returns: "0.5 كجم" or "2 قطعة"
```

---

## 6. State Management (`context/CartContext.tsx`)

### 6.1 Provided Values
```typescript
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
```

### 6.2 Persistence
- Storage Key: `c-sweet-cart`
- Sync: On mount (load) and on every cart change (save).

---

## 7. Animation System (`components/FlyToCart.tsx`)

### 7.1 Fly-to-Cart Flow
1. User clicks "Add to Cart" button.
2. `triggerFlyToCart(buttonRef)` dispatches custom event with button position.
3. `FlyToCartPortal` listens, creates a flying `<motion.div>`.
4. Animation: Button position → Cart icon position (500ms).
5. On land: `triggerCartBounce()` scales cart icon (bounce effect).

### 7.2 Button Feedback
- On click: Text changes to `تمت الإضافة ✓` (green) for 1500ms.
- Then reverts to `أضف إلى السلة`.

### 7.3 Dependencies
- **Framer Motion**: `motion`, `AnimatePresence` from `framer-motion`.

---

## 8. WhatsApp Checkout (`lib/whatsappUtils.ts`)

### 8.1 Configuration
- **Recipient**: `201127666232` (Egypt +20)

### 8.2 Message Format
```text
مرحبا، طلب جديد من الموقع:
- جبنة بيضاء (0.5 كجم) - 60 ج.م
- مناقيش زعتر (2 قطعة) - 30 ج.م

المجموع: 90 ج.م
```

### 8.3 URL Generation
```typescript
generateWhatsAppLink(cart: CartItem[], total: number): string
// Returns: https://wa.me/201127666232?text=...
```

---

## 9. Component Responsibilities

| Component | Type | Purpose |
|-----------|------|---------|
| `Header` | Client | Logo + Cart icon (with bounce animation) |
| `CartSidebar` | Client | Cart items list + QuantitySelector |
| `ProductCard` | Client | Product display + QuantitySelector + fly animation |
| `QuantitySelector` | Client | Smart stepper for weight/unit increments |
| `FlyToCartPortal` | Client | Renders flying elements on add-to-cart |
| `app/page.tsx` | Server | Product grid (SEO optimized) |
| `app/layout.tsx` | Server | Root layout with providers |

---

## 10. Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint check
```

---

## 11. Future Considerations
- [ ] Replace `lib/data.ts` with API/CMS fetch.
- [ ] Add category filtering.
- [ ] Implement search functionality.
- [ ] Add order history (requires backend).

