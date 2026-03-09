"use client";

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

  const goToCheckout = () => {
    if (items.length === 0) return;
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-10 text-center shadow-[0_12px_35px_rgba(236,72,153,0.08)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-100 bg-pink-50 text-3xl">
              🛒
            </div>

            <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
            <p className="mt-2 text-gray-500">
              Add flowers to your cart and continue shopping.
            </p>

            <Link
              href="/home"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-semibold text-white shadow hover:opacity-95 transition"
            >
              Start shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <header className="sticky top-0 z-40 border-b border-pink-200 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Cart</h1>
            <p className="text-sm text-slate-500">
              {items.length} item{items.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCart}
              className="rounded-2xl border-2 border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-50 transition"
              type="button"
            >
              Clear cart
            </button>

            <Link
              href="/home"
              className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 transition"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {items.map((x: any) => {
              const title = x.title ?? x.name ?? "Item";
              const image = x.image ?? "redrosebouquet.jpg";
              const qty = Number(x.qty || 1);
              const price = Number(x.price || 0);

              return (
                <div
                  key={x.id}
                  className="rounded-3xl border-2 border-pink-200 bg-white p-6 shadow-[0_12px_35px_rgba(236,72,153,0.08)]"
                >
                  <div className="flex gap-5">
                    <div className="h-28 w-28 overflow-hidden rounded-2xl border border-pink-100 bg-gray-100">
                      <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-2xl font-bold text-slate-900">{title}</p>
                          <p className="mt-1 text-lg text-slate-500">
                            {formatRs(price)} each
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(x.id)}
                          className="text-base font-semibold text-red-600 hover:text-red-700"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex items-center rounded-2xl border-2 border-pink-200 bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => setQty(x.id, Math.max(1, qty - 1))}
                            className="px-5 py-3 text-xl font-bold text-slate-700 hover:bg-pink-50 rounded-l-2xl"
                          >
                            −
                          </button>

                          <div className="min-w-[64px] text-center text-xl font-semibold text-slate-900">
                            {qty}
                          </div>

                          <button
                            type="button"
                            onClick={() => setQty(x.id, qty + 1)}
                            className="px-5 py-3 text-xl font-bold text-slate-700 hover:bg-pink-50 rounded-r-2xl"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-3xl font-bold text-slate-900">
                          {formatRs(price * qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border-2 border-pink-200 bg-white p-7 shadow-[0_12px_35px_rgba(236,72,153,0.08)]">
              <h2 className="text-3xl font-bold text-slate-900">Order Summary</h2>

              <div className="mt-6 space-y-4 text-lg">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatRs(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span>Delivery</span>
                  <span className="font-semibold">{formatRs(deliveryFee)}</span>
                </div>

                <div className="h-px bg-pink-100" />

                <div className="flex items-center justify-between text-2xl font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatRs(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={goToCheckout}
                className="mt-7 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 py-4 text-xl font-semibold text-white shadow hover:opacity-95 transition"
                type="button"
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-sm text-slate-500">
                You’ll confirm delivery details and payment method on the checkout page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}