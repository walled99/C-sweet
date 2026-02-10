import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { getProducts } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const products = await getProducts();
  const { category } = await searchParams;

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="bg-secondary min-h-screen">
      <CategoryFilter currentCategory={category} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">قائمة المنتجات</h1>
          <p className="mt-2 text-primary-text/80">أفضل الحلويات والمنتجات الطازجة</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-primary">لا توجد منتجات حالياً</h2>
            <p className="text-primary-text/60 mt-2">جاري إضافة المزيد من المنتجات قريباً</p>
          </div>
        )}
      </div>
    </div>
  );
}


