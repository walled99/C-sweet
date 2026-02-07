# C-Sweet Shop 🍭

A modern, Arabic-first E-Commerce MVP for selling sweets and groceries with seamless WhatsApp checkout integration.

## 🚀 Tech Stack

- **Frontend**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Storage)
- **Animations**: Framer Motion
- **Checkout**: WhatsApp Integration

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📂 Architecture

- `/app`: Routing and layouts.
- `/components`: Reusable UI components (ProductCard, Cart, etc.).
- `/lib`: Utility functions (Supabase client, localization, WhatsApp).
- `/context`: Global state (CartContext).

## 🔒 Backend Setup

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for database schema and storage configuration details.
