import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">قائمة المنتجات</h1>
        <p className="mt-2 text-primary-text/80">أفضل الحلويات والمنتجات الطازجة</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

