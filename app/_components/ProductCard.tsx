"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

function money(n: number) {
  return `Rs ${n.toLocaleString()}`;
}

export default function ProductCard({
  product,
  variant = "square",
}: {
  product: Product;
  variant?: "square" | "wide";
}) {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-lg ring-1 ring-pink-100 hover:ring-pink-300 transition">
      <div className={`relative w-full overflow-hidden bg-gray-200 ${variant === "wide" ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
          {money(product.price)}
        </div>
      </div>

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate">{product.name}</p>
          <p className="text-sm text-gray-500">{money(product.price)}</p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition"
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
}
