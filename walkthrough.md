C-Sweet Shop MVP Walkthrough
I have successfully implemented the MVP for C-Sweet Shop. The application is a Next.js 14+ app with a focus on Arabic (RTL) experience, mobile responsiveness, and WhatsApp checkout integration.

Key Features
1. Product Catalog
RTL Layout: The entire site is configured with dir="rtl" and uses the Cairo font for an authentic Arabic feel.
Product Cards: Displays product images, prices, and available units.
Unit Logic:
By Weight (e.g., Cheese): Users can select quantities in steps (e.g., 0.25 kg increments).
By Piece (e.g., Manakish): Users select integer quantities.
White Cheese

2. Shopping Cart
State Management: Using 
CartContext
 to handle cart operations globally.
Persistence: Cart contents are saved to localStorage, so users don't lose their selection if they refresh.
Sidebar: A slide-over cart sidebar allows users to review their order without leaving the page.
Dynamic Header: Shows the current number of unique items in the cart.
3. WhatsApp Checkout
Automated Message: Generates a formatted message including:
Item names and precise quantities (e.g., "0.5 kg", "2 قطعة").
Individual line totals.
Grand total.
Direct Link: Opens WhatsApp directly with the pre-filled message sent to the store owner.
Project Structure
app/layout.tsx
: Root layout with RTL, Font, and Providers.
context/CartContext.tsx
: Core logic for cart management.
lib/data.ts
: Static product data (easily replaced with an API later).
lib/whatsappUtils.ts
: Logic to format the checkout message.
components/: UI components (
Header
, 
CartSidebar
, 
ProductCard
).
Verification
Build Status
The project constructs successfully with npm run build.

How to Run
Open a terminal.
Run npm run dev.
Open http://localhost:3000 in your browser.
Verification Scenarios
Add White Cheese:
Try incrementing. It should go 0.25 -> 0.50 -> 0.75.
Add to cart.
Add Manakish:
Increment (1, 2, 3...).
Add to cart.
Checkout:
Open the Cart Sidebar.
Click "إتمام الطلب عبر واتساب".
Verify the message format in WhatsApp.