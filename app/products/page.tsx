"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

// ---------------- TYPES ----------------
interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: { _id: string; name: string } | string;
  images?: string[]; // if your backend returns "image" string instead, see notes below
  image?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

function resolveImageUrl(img?: string) {
  if (!img) return "/flowers.jpg";
  if (img.startsWith("http")) return img;
  if (img.startsWith("/")) return `${API_BASE}${img}`; // "/uploads/xxx.jpg"
  return `${API_BASE}/${img}`; // "uploads/xxx.jpg"
}

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart, items: cartItems, totalItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState("");

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/products`);
        const json = await res.json().catch(() => ({}));

        // backend may return { success, data } or array
        const list = Array.isArray(json) ? json : json?.data;

        if (!Array.isArray(list)) {
          throw new Error(json?.message || "Products response is not an array");
        }

        setProducts(list);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err?.message || "Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ---------------- CATEGORIES ----------------
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (typeof p.category === "object" && p.category?.name) cats.add(p.category.name);
      else if (typeof p.category === "string") cats.add(p.category);
    });
    return ["All", ...Array.from(cats)];
  }, [products]);

  // ---------------- FILTERED PRODUCTS ----------------
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch = !q || (p.name || "").toLowerCase().includes(q);

      const catName =
        typeof p.category === "object" ? p.category?.name : p.category;

      const matchesCategory =
        selectedCategory === "All" || catName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // ---------------- ADD TO CART (FIXED) ----------------
  const handleAddToCart = (product: Product) => {
    const stock = Number(product.stock ?? 999999);
    if (stock <= 0) return;

    // pick first image from images[] OR fallback to image string OR default
    const img =
      product.images?.[0] ||
      product.image ||
      "/flowers.jpg";

    addToCart({
      id: product._id,
      productId: product._id, // ✅ IMPORTANT (this fixes "product id error" at order time)
      name: product.name,
      price: product.price,
      image: resolveImageUrl(img),
      qty: 1,
    });

    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 pb-20">
      {/* ================= HEADER ================= */}
      <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
              <Image
                src="/blossomlogo.png"
                alt="Blossom"
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pink-600">BLOSSOM</h1>
              <p className="text-xs text-gray-500">Flower Paradise</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 font-medium">
            <Link href="/home" className="hover:text-pink-500 transition">
              Home
            </Link>
            <Link
              href="/products"
              className="text-pink-500 border-b-2 border-pink-500 pb-1"
            >
              Shop
            </Link>
            <Link href="/cart" className="hover:text-pink-500 transition relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/orders" className="hover:text-pink-500 transition">
              Orders
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 py-14 px-6 text-center shadow-inner">
        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
          Blossom Collection
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Discover Your Perfect Bouquet
        </h1>
        <p className="text-pink-100 max-w-2xl mx-auto text-lg">
          Curated flowers and gifts for every occasion, delivered fresh.
        </p>
      </div>

      <main className="mx-auto max-w-7xl px-6 mt-10">
        {/* ================= FILTERS & SEARCH ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-500 mr-2">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-pink-500 text-white shadow-md"
                    : "bg-white text-gray-600 border border-pink-100 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-pink-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 shadow-sm"
            />
            <svg
              className="w-5 h-5 text-pink-400 absolute right-4 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* ================= LOADING / ERROR ================= */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 shadow-sm">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="text-xl font-bold text-gray-800">No flowers found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 text-pink-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const stock = Number(product.stock ?? 999999);
            const isOutOfStock = stock <= 0;

            const cartQty =
              cartItems.find((x: any) => x.productId === product._id)?.qty || 0;

            const img =
              product.images?.[0] ||
              product.image ||
              "/flowers.jpg";

            const imageUrl = resolveImageUrl(img);

            return (
              <div
                key={product._id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-pink-50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                      isOutOfStock ? "opacity-60 grayscale" : ""
                    }`}
                    unoptimized={imageUrl.startsWith("http")}
                  />

                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/70 text-white font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {cartQty > 0 && !isOutOfStock && (
                    <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {cartQty} in cart
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {product.description || "A beautiful arrangement for any occasion."}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-extrabold text-pink-600">
                      Rs {Number(product.price || 0).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isOutOfStock}
                      className={`h-10 px-5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        isOutOfStock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white"
                      }`}
                    >
                      {isOutOfStock ? "Unavailable" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ================= TOAST ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}