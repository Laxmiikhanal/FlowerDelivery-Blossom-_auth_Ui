"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

function formatRs(n: number) {
  return `Rs ${n.toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, setQty, removeFromCart, clearCart } = useCart();

  const deliveryFee = useMemo(() => (items.length > 0 ? 80 : 0), [items.length]);
  const grandTotal = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  const placeOrder = () => {
    if (items.length === 0) return;

    const order = {
      id: `ord_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Processing",
      items,
      total: grandTotal,
    };

    const raw = localStorage.getItem("blossom_orders");
    const orders = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem("blossom_orders", JSON.stringify(orders));

    clearCart();
    router.push("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-3xl bg-white shadow border border-pink-100 p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-2xl">
              🛒
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
            <p className="mt-2 text-gray-600">
              Add some flowers and come back to place your order.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-semibold text-white shadow hover:opacity-95 transition"
            >
              Start shopping →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Cart</h1>
            <p className="text-sm text-gray-500">
              {items.length} item{items.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCart}
              className="rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-600 hover:bg-pink-50 transition"
              type="button"
            >
              Clear cart
            </button>

            <Link
              href="/products"
              className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 transition"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((x: any) => {
              const title = x.title ?? x.name ?? "Item";
              const image = x.image ?? "/flowers.jpg";
              const qty = Number(x.qty || 1);
              const price = Number(x.price || 0);

              return (
                <div
                  key={x.id}
                  className="rounded-3xl border border-pink-100 bg-white shadow-sm p-5"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-gray-100">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{title}</p>
                          <p className="text-sm text-gray-500">
                            {formatRs(price)} each
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(x.id)}
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {/* Qty controls */}
                        <div className="inline-flex items-center rounded-2xl border border-gray-200 bg-white">
                          <button
                            type="button"
                            onClick={() => setQty(x.id, Math.max(1, qty - 1))}
                            className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-50 rounded-l-2xl"
                          >
                            −
                          </button>
                          <div className="min-w-[56px] text-center font-semibold text-gray-900">
                            {qty}
                          </div>
                          <button
                            type="button"
                            onClick={() => setQty(x.id, qty + 1)}
                            className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-50 rounded-r-2xl"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total */}
                        <p className="text-base font-bold text-gray-900">
                          {formatRs(price * qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-pink-100 bg-white shadow p-6">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatRs(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-700">
                  <span>Delivery</span>
                  <span className="font-semibold">{formatRs(deliveryFee)}</span>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-gray-900 font-bold">
                    {formatRs(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 py-4 font-semibold text-white shadow hover:opacity-95 transition"
                type="button"
              >
                Place Order
              </button>

              <p className="mt-3 text-xs text-gray-500 text-center">
                You can review/cancel from the Orders page (we’ll add Cancel next).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
