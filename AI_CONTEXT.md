# AI Context: C-Sweet Shop E-Commerce

> [!IMPORTANT]
> This document serves as the Source of Truth for all AI-generated code. Strict adherence to these patterns is required to maintain architectural integrity.

## 1. Project Identity & Stack
- **Framework**: Next.js 16 (App Router).
- **Language**: TypeScript (Strict Mode).
- **Styling**: Tailwind CSS.
- **Render Strategy**:
    - **Server Components**: Default for Pages, Layouts, and Data Fetching (SEO & Performance).
    - **Client Components**: Specific interactive elements (Cart, Inputs) using `"use client"`.

## 2. Design System & RTL Architecture
**Primary Constraint**: Application is Arabic-First (RTL).
- **Logical Properties**: ALWAYS use `start`/`end` instead of `left`/`right`.
    - Correct: `ms-4` (margin-start), `text-start`, `border-s`.
    - Incorrect: `ml-4`, `text-left`, `border-l`.

### Color Palette
- **Primary (Dark Cherry)**: `#561c24` (Headers, CTA Buttons).
- **Secondary (Cream)**: `#e8d8c4` (Backgrounds, Containers).
- **Accent (Gold)**: `#c5a35d` (Highlights, Price Tags).

## 3. Data Schema (The Contract)
> [!NOTE]
> All product data must strictly adhere to the following interface.

```typescript
type Category = 'sweet' | 'supermarket' | 'freezing' | 'cheese_milk';
type Unit = 'kg' | 'g' | 'piece' | 'pack';

interface Product {
  id: string;
  name: string; // Arabic Only
  price: number;
  category: Category;
  imageUrl: string;
  isAvailable: boolean;
  
  // Unit Logic
  unit: Unit;        // Determines availability of decimal inputs
  minOrder?: number; // e.g. 0.25 for kg
  step?: number;     // e.g. 0.25 for increments
}

interface CartItem extends Product {
  qty: number;
}
```

## 4. Business Logic (Checkout Flow)
**Integration**: WhatsApp Business API (URL Scheme).
**Recipient**: `01127666232` (+20 Egypt Code).

### Message Generation Protocol
Location: `lib/whatsappUtils.ts`
Format:
```text
مرحبا، طلب جديد من الموقع:
- Item Name (Qty Unit) - Total Price EGP
...
Total: X EGP
```
> [!WARNING]
> Ensure all text in the generated message is URL-encoded properly.

## 5. Development Patterns

### Directory Structure Rules
- `app/`: Routes and Layouts only.
- `components/`: Reusable UI components.
- `lib/`: Utilities and Static Data (`data.ts`, `whatsappUtils.ts`).
- `context/`: React Context Providers (`CartContext.tsx`).
- `types/`: Shared TypeScript definitions.

### State Management
- **Cart**: Managed via strict React Context (`CartProvider`).
- **Persistence**: `localStorage` sync required on mount/update.
- **Reactivity**: `Header` counts and `CartSidebar` must instantly reflect changes.
