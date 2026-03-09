"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

function formatAmount(amount: string | null) {
  const n = Number(amount || 0);
  return `NPR ${n.toFixed(2)}`;
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const params = useSearchParams();

  const orderId = params.get("orderId") || "N/A";
  const provider = params.get("provider") || "cod";
  const amount = params.get("amount");
  const paymentStatus = params.get("status");

  const paymentLabel = useMemo(() => {
    if (provider === "esewa") return "eSewa";
    return "Cash on Delivery (COD)";
  }, [provider]);

  const statusLabel = useMemo(() => {
    if (paymentStatus === "initiated") return "Payment Initiated";
    return "Processing";
  }, [paymentStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <header className="sticky top-0 z-40 border-b border-pink-200 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Checkout Success</h1>
            <p className="text-sm text-slate-500">Order confirmation</p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/home")}
            className="rounded-2xl border border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-50 transition"
          >
            Go Home
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl border-2 border-pink-200 bg-white shadow-[0_12px_35px_rgba(236,72,153,0.08)]">
          <div className="border-b border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 px-7 py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-100 bg-white text-3xl shadow-sm">
                ✅
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Order placed successfully
                </h2>
                <p className="mt-1 text-slate-600">
                  Your order has been placed with {paymentLabel}. Please keep your
                  phone available for delivery confirmation.
                </p>
              </div>
            </div>
          </div>

          <div className="p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Order ID
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900">{orderId}</p>
              </div>

              <div className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Payment Method
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900">{paymentLabel}</p>
              </div>

              <div className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Amount
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900">
                  {formatAmount(amount)}
                </p>
              </div>

              <div className="rounded-2xl border border-pink-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </p>
                <span className="mt-3 inline-flex rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                  {statusLabel}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50/40 p-5">
              <h3 className="text-xl font-bold text-slate-900">What happens next?</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>• You can track this order in your Orders page.</li>
                <li>• Our team may contact you to confirm delivery details.</li>
                <li>• Payment will be collected at delivery if you selected COD.</li>
              </ul>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <Link
                href="/orders"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 font-semibold text-white shadow hover:opacity-95 transition"
              >
                View My Orders
              </Link>

              <Link
                href="/home"
                className="inline-flex items-center justify-center rounded-2xl border border-pink-200 bg-white px-6 py-3 font-semibold text-pink-600 hover:bg-pink-50 transition"
              >
                Continue Shopping
              </Link>

              <Link
                href="/cart"
                className="inline-flex items-center justify-center rounded-2xl border border-pink-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-pink-50 transition"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}