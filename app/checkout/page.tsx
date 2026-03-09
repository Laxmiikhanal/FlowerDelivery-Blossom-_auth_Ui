"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type PaymentProvider = "cod" | "esewa";

type CheckoutForm = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  area: string;
  postalCode: string;
  notes: string;
  paymentProvider: PaymentProvider;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

function getToken(): string | null {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("blossom_token")
  );
}

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${url}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data as T;
}

function saveUiOrderToLocalStorage(order: any) {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem("blossom_orders");
    const existing = raw ? JSON.parse(raw) : [];

    const next = [
      order,
      ...existing.filter((o: any) => String(o?.id) !== String(order.id)),
    ];

    localStorage.setItem("blossom_orders", JSON.stringify(next));
  } catch {
    localStorage.setItem("blossom_orders", JSON.stringify([order]));
  }
}

function formatRs(n: number) {
  return `NPR ${Number(n || 0).toFixed(2)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, setQty, removeFromCart, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    area: "",
    postalCode: "",
    notes: "",
    paymentProvider: "cod",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const cartItems = items.map((item: any) => ({
    productId: item.productId || item._id || item.id,
    _id: item._id,
    id: item.id,
    name: item.name || item.title || "Product",
    price: Number(item.price ?? 0),
    qty: Number(item.qty ?? item.quantity ?? 1),
    image: item.image || item.imageUrl,
  }));

  const deliveryFee = useMemo(() => (cartItems.length > 0 ? 80 : 0), [cartItems.length]);
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  const totalQty = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const cardClass = "rounded-3xl border border-pink-200 bg-white p-5 shadow-sm";
  const inputClass =
    "w-full rounded-2xl border border-pink-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-100";

  function updateField<K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateForm() {
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.phone.trim()) return "Phone number is required";
    if (!form.addressLine1.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.area.trim()) return "Area is required";
    if (cartItems.length === 0) return "Your cart is empty";
    return "";
  }

  async function handlePlaceOrder() {
    setErrorMsg("");

    const validation = validateForm();
    if (validation) {
      setErrorMsg(validation);
      return;
    }

    setSubmitting(true);

    try {
      const createOrderBody = {
        items: cartItems.map((item) => ({
          productId: item.productId || item._id || item.id,
          quantity: item.qty,
          qty: item.qty,
          price: item.price,
          name: item.name,
        })),
        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          area: form.area,
          postalCode: form.postalCode,
        },
        address: {
          fullName: form.fullName,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          area: form.area,
          postalCode: form.postalCode,
        },
        deliveryAddress: {
          fullName: form.fullName,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          area: form.area,
          postalCode: form.postalCode,
        },
        notes: form.notes,
        paymentMethod: form.paymentProvider,
        paymentProvider: form.paymentProvider,
        subTotal: subtotal,
        subtotal,
        deliveryFee,
        totalAmount: total,
        total,
      };

      const orderRes: any = await apiFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(createOrderBody),
      });

      const createdOrder =
        orderRes?.data || orderRes?.order || orderRes?.result || orderRes;

      const orderId =
        createdOrder?._id ||
        createdOrder?.id ||
        createdOrder?.orderId ||
        orderRes?.orderId;

      if (!orderId) {
        throw new Error("Order created, but order ID was not returned");
      }

      const uiOrder = {
        id: String(orderId),
        createdAt: new Date().toISOString(),
        status: "Processing",
        paymentMethod: form.paymentProvider,
        items: cartItems.map((item) => ({
          id: String(item.productId || item._id || item.id || ""),
          name: item.name,
          price: Number(item.price || 0),
          qty: Number(item.qty || 1),
          image: item.image || "",
        })),
        total,
      };

      saveUiOrderToLocalStorage(uiOrder);

      if (form.paymentProvider === "cod") {
        clearCart();
        alert("Order Placed Successfully!");
        router.push("/orders");
        return;
      }

      const paymentRes: any = await apiFetch("/api/payment/initiate", {
        method: "POST",
        body: JSON.stringify({
          orderId,
          provider: form.paymentProvider,
          amount: total,
          currency: "NPR",
        }),
      });

      const paymentData =
        paymentRes?.data || paymentRes?.result || paymentRes?.payment || paymentRes;

      const redirectUrl =
        paymentData?.redirectUrl ||
        paymentData?.paymentUrl ||
        paymentData?.url ||
        paymentData?.gatewayUrl;

      clearCart();

      if (redirectUrl && typeof redirectUrl === "string") {
        window.location.href = redirectUrl;
        return;
      }

      router.push(
        `/checkout/success?orderId=${encodeURIComponent(
          String(orderId)
        )}&provider=${encodeURIComponent(
          form.paymentProvider
        )}&amount=${encodeURIComponent(String(total))}&status=initiated`
      );
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  }

  const paymentMethods: {
    value: PaymentProvider;
    label: string;
    desc: string;
  }[] = [
    {
      value: "cod",
      label: "Cash on Delivery (COD)",
      desc: "Pay when the order is delivered",
    },
    {
      value: "esewa",
      label: "eSewa",
      desc: "Online payment via eSewa",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <header className="sticky top-0 z-40 border-b border-pink-200 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <p className="text-sm text-gray-500">
              Confirm delivery details and place your order
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-600 shadow-sm transition hover:bg-pink-50"
          >
            ← Back to Cart
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {errorMsg ? (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            {errorMsg}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className={cardClass}>
              <div className="-mx-5 mb-5 border-b border-pink-100 px-5 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Delivery Information</h2>
                  <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                    Step 1
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Full Name *">
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </Field>

                <Field label="Phone Number *">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClass}
                    placeholder="98XXXXXXXX"
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Address Line 1 *">
                    <input
                      type="text"
                      value={form.addressLine1}
                      onChange={(e) => updateField("addressLine1", e.target.value)}
                      className={inputClass}
                      placeholder="Street / Tole / House no."
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Address Line 2">
                    <input
                      type="text"
                      value={form.addressLine2}
                      onChange={(e) => updateField("addressLine2", e.target.value)}
                      className={inputClass}
                      placeholder="Landmark (optional)"
                    />
                  </Field>
                </div>

                <Field label="City *">
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={inputClass}
                    placeholder="Kathmandu"
                  />
                </Field>

                <Field label="Area *">
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    className={inputClass}
                    placeholder="Baneshwor"
                  />
                </Field>

                <Field label="Postal Code">
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    className={inputClass}
                    placeholder="44600"
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Order Notes">
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      className={inputClass}
                      placeholder="Message on card / delivery instruction (optional)"
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <div className="-mx-5 mb-5 border-b border-pink-100 px-5 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
                  <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                    Step 2
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => {
                  const active = form.paymentProvider === method.value;

                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => updateField("paymentProvider", method.value)}
                      className={`rounded-2xl border p-4 text-left transition shadow-sm ${
                        active
                          ? "border-pink-500 bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md ring-2 ring-pink-200"
                          : "border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{method.label}</div>
                          <div
                            className={`mt-1 text-xs ${
                              active ? "text-pink-100" : "text-gray-500"
                            }`}
                          >
                            {method.desc}
                          </div>
                        </div>

                        <div
                          className={`mt-0.5 h-4 w-4 rounded-full border-2 ${
                            active ? "border-white bg-white" : "border-pink-300 bg-white"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>

              {cartItems.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-pink-200 bg-pink-50/40 p-4 text-sm text-gray-600">
                  Your cart is empty.
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="max-h-72 space-y-3 overflow-auto pr-1">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.productId || item._id || item.id || item.name}-${index}`}
                        className="rounded-2xl border border-pink-100 bg-pink-50/20 p-3"
                      >
                        <div className="flex items-start gap-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-14 w-14 rounded-xl border border-pink-200 object-cover"
                            />
                          ) : (
                            <div className="h-14 w-14 rounded-xl border border-pink-200 bg-gray-100" />
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {formatRs(item.price)} each
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, Math.max(1, item.qty - 1))}
                                className="h-8 w-8 rounded-lg border border-pink-200 bg-white text-sm font-semibold text-slate-700 hover:bg-pink-50"
                              >
                                -
                              </button>

                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-pink-100 bg-pink-50 text-sm font-medium text-slate-700">
                                {item.qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                className="h-8 w-8 rounded-lg border border-pink-200 bg-white text-sm font-semibold text-slate-700 hover:bg-pink-50"
                              >
                                +
                              </button>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-xs font-medium text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 text-right text-sm font-semibold text-pink-600">
                          {formatRs(item.price * item.qty)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between text-slate-700">
                        <span>Items ({totalQty})</span>
                        <span className="font-medium">{formatRs(subtotal)}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <span>Delivery Fee</span>
                        <span className="font-medium">{formatRs(deliveryFee)}</span>
                      </div>

                      <div className="border-t border-pink-100 pt-3">
                        <div className="flex items-center justify-between text-lg font-bold text-slate-900">
                          <span>Total</span>
                          <span>{formatRs(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={submitting || cartItems.length === 0}
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Processing..." : "Place Order"}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    You&apos;ll confirm delivery details and payment securely.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}