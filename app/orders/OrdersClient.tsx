"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

type OrderStatus = "Processing" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  cancelledAt?: string | null;
  items: CartItem[];
  total: number;
};

const ORDERS_KEY = "blossom_orders";
const CART_KEY = "blossom_cart";

function formatRs(n: number) {
  return `Rs ${Number(n || 0).toLocaleString("en-IN")}`;
}

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function computeTotal(items: CartItem[]) {
  return items.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0),
    0
  );
}

// old stored items might use title instead of name
function normalizeItem(raw: any): CartItem {
  return {
    id: String(raw?.id ?? ""),
    name: String(raw?.name ?? raw?.title ?? "Item"),
    price: Number(raw?.price ?? 0),
    qty: Number(raw?.qty ?? 1),
    image: raw?.image ? String(raw.image) : undefined,
  };
}

function normalizeOrder(raw: any): Order {
  const itemsRaw = Array.isArray(raw?.items) ? raw.items : [];
const items = itemsRaw.map(normalizeItem).filter((x: CartItem) => Boolean(x.id));

  const rawStatus = String(raw?.status ?? "Processing");
  const status: OrderStatus =
    rawStatus === "Delivered"
      ? "Delivered"
      : rawStatus === "Cancelled" || rawStatus === "Canceled"
      ? "Cancelled"
      : "Processing";

  const total = Number(raw?.total ?? computeTotal(items));

  return {
    id: String(raw?.id ?? `ord_${Date.now()}`),
    createdAt: String(raw?.createdAt ?? new Date().toISOString()),
    status,
    cancelledAt: raw?.cancelledAt ?? null,
    items,
    total,
  };
}

export default function OrdersClient() {
  const router = useRouter();

  // ✅ IMPORTANT: typed state (prevents never[] issues)
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = safeParse<any[]>(localStorage.getItem(ORDERS_KEY), []);
    const normalized = raw.map(normalizeOrder);

    // newest first
    normalized.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    setOrders(normalized);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(normalized));
    setLoading(false);
  }, []);

  const totalOrders = orders.length;

  // total spent ignores cancelled
  const grandTotal = useMemo(() => {
    return orders.reduce(
      (sum, o) => sum + (o.status === "Cancelled" ? 0 : o.total || 0),
      0
    );
  }, [orders]);

  const reorder = (order: Order) => {
    const existingRaw = safeParse<any[]>(localStorage.getItem(CART_KEY), []);
    const existingCart: CartItem[] = existingRaw.map(normalizeItem).filter((x) => x.id);

    const map = new Map<string, CartItem>();
    for (const it of existingCart) map.set(it.id, it);

    for (const it of order.items) {
      const found = map.get(it.id);
      if (found) {
        map.set(it.id, { ...found, qty: found.qty + it.qty });
      } else {
        map.set(it.id, { ...it });
      }
    }

    localStorage.setItem(CART_KEY, JSON.stringify(Array.from(map.values())));
    router.push("/cart");
  };

  // ✅ Cancel without using setOrders(prev => ...) to avoid your TS error
  const cancelOrder = (orderId: string) => {
    const ok = window.confirm("Cancel this order?");
    if (!ok) return;

    const next: Order[] = orders.map((o) =>
      o.id === orderId
        ? { ...o, status: "Cancelled", cancelledAt: new Date().toISOString() }
        : o
    );

    setOrders(next);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="h-10 w-48 rounded-xl bg-gray-200 animate-pulse" />
          <div className="mt-6 h-40 rounded-3xl bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow">
              <Image
                src="/blossomlogo.png"
                alt="Blossom"
                fill
                className="object-contain p-2"
                sizes="44px"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-pink-600">BLOSSOM</p>
              <p className="text-xs text-gray-500 -mt-1">My Orders</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
            <Link href="/home" className="hover:text-pink-600 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-pink-600 transition">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-pink-600 transition">
              Cart
            </Link>
            <Link href="/orders" className="text-pink-600 font-semibold">
              Orders
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Title */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <p className="text-sm text-gray-500">
              {totalOrders} order{totalOrders === 1 ? "" : "s"} • Total spent{" "}
              {formatRs(grandTotal)}
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-3 text-white font-semibold shadow hover:opacity-95 transition"
          >
            Continue shopping
          </Link>
        </div>

        {/* Empty */}
        {orders.length === 0 && (
          <div className="mt-10 rounded-3xl border border-pink-100 bg-white p-10 shadow text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-2xl">
              📦
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">No orders yet</h2>
            <p className="mt-1 text-gray-500">
              Once you place an order, you’ll see it here.
            </p>
          </div>
        )}

        {/* Orders */}
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-pink-100 bg-white shadow-lg overflow-hidden"
            >
              {/* Order header */}
              <div className="px-6 py-5 bg-gradient-to-r from-pink-50 to-purple-50 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Order{" "}
                    <span className="font-semibold text-gray-900">#{order.id}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  {order.status === "Cancelled" && order.cancelledAt && (
                    <p className="text-xs text-red-600 mt-1">
                      Cancelled at {new Date(order.cancelledAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-50 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  <p className="text-sm font-bold text-gray-900">
                    {formatRs(order.total)}
                  </p>

                  <button
                    onClick={() => reorder(order)}
                    className="rounded-2xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-pink-700 transition"
                    type="button"
                  >
                    Reorder
                  </button>

                  {/* Cancel only if Processing */}
                  {order.status === "Processing" ? (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="rounded-2xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                      type="button"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      disabled
                      className="rounded-2xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 cursor-not-allowed"
                      type="button"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {order.items.map((it) => (
                    <div
                      key={`${order.id}-${it.id}`}
                      className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                          src={it.image || "/flowers.jpg"}
                          alt={it.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{it.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatRs(it.price)} • Qty {it.qty}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-pink-600">
                          Subtotal: {formatRs(it.price * it.qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.status === "Cancelled" && (
                <div className="px-6 pb-6">
                  <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 font-semibold">
                    This order has been cancelled. You can still reorder the items.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
