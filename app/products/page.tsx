import ProductCard from "@/app/_components/ProductCard";
import { allProducts } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} variant="wide" />
        ))}
      </div>
    </div>
  );
}
