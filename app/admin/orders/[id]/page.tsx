"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AnyObj = Record<string, any>;

type OrderItem = {
  product?: AnyObj; // populated product
  productId?: string | AnyObj;
  name?: string;
  price?: number;
  qty?: number;
  quantity?: number;
  image?: string;
  imageUrl?: string;
};

type Order = {
  _id: string;
  user?: AnyObj; // populated user
  customer?: AnyObj;
  items?: OrderItem[];
  totalAmount?: number;
  totalPrice?: number;
  total?: number;
  status?: string;
  createdAt?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
  "http://127.0.0.1:5051";

function getToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("blossom_token")
  );
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function pickOrderTotal(o: Order) {
  const n =
    o.totalAmount ??
    o.totalPrice ??
    o.total ??
    0;
  return Number(n || 0);
}

function pickUserLabel(o: Order) {
  const u = o.user || o.customer;
  if (!u) return { name: "N/A", email: "" };

  const name =
    u.name ||
    [u.firstName, u.lastName].filter(Boolean).join(" ") ||
    "N/A";

  const email = u.email || "";
  return { name, email };
}

function resolveImageUrl(img?: string) {
  if (!img) return "/flowers.jpg";
  if (img.startsWith("http")) return img;
  if (img.startsWith("/")) return `${API_BASE}${img}`;
  return `${API_BASE}/${img}`;
}

function pickItemImage(item: OrderItem) {
  const p = item.product || (typeof item.productId === "object" ? item.productId : null);

  // support many possible backend keys
  const img =
    p?.images?.[0] ||
    p?.imageUrl ||
    p?.image ||
    item.imageUrl ||
    item.image;

  return resolveImageUrl(img);
}

export default function AdminOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/admin/orders`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        cache: "no-store",
      });

      const json = await res.json().catch(() => ({} as AnyObj));

      if (!res.ok) {
        const msg =
          json?.message ||
          (res.status === 401 || res.status === 403
            ? "Unauthorized: Please login as Admin."
            : `Failed to fetch orders (${res.status})`);
        throw new Error(msg);
      }

      const list = Array.isArray(json) ? json : json?.data || json?.orders || [];
      if (!Array.isArray(list)) throw new Error("Invalid orders response from server.");

      setOrders(list);
    } catch (e: any) {
      setOrders([]);
      setError(e?.message || "Failed to fetch orders.");
      console.error("Admin orders fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptOrder = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/orders/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ status: "processing" }),
      });

      const json = await res.json().catch(() => ({} as AnyObj));
      if (!res.ok) throw new Error(json?.message || `Failed to accept (${res.status})`);

      fetchOrders();
    } catch (e: any) {
      alert(e?.message || "Failed to accept order");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/orders/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });

      const json = await res.json().catch(() => ({} as AnyObj));
      if (!res.ok) throw new Error(json?.message || `Failed to delete (${res.status})`);

      fetchOrders();
    } catch (e: any) {
      alert(e?.message || "Failed to delete order");
    }
  };

  const rows = useMemo(() => orders || [], [orders]);

  if (loading) {
    return (
      <div className="p-10 text-center bg-white rounded-2xl shadow-md">
        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-800">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Orders</h2>
        <p className="text-gray-500 text-sm mt-1">
          If this page is empty, it’s usually because Admin auth is missing.
        </p>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </section>

      <section className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">
                  Products
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                rows.map((order) => {
                  const { name, email } = pickUserLabel(order);
                  const total = pickOrderTotal(order);

                  return (
                    <tr key={order._id} className="hover:bg-pink-50/30 transition">
                      <td className="px-6 py-4">
                        <div className="flex -space-x-3 overflow-hidden">
                          {(order.items || []).slice(0, 4).map((item, idx) => (
                            <img
                              key={idx}
                              src={pickItemImage(item)}
                              alt="product"
                              className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                            />
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <p className="font-semibold text-gray-900">{name}</p>
                        <p className="text-gray-500 text-xs">{email}</p>
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-pink-600">
                        Rs {total.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            (order.status || "").toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {order.status || "unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm space-x-2">
                        {(order.status || "").toLowerCase() === "pending" && (
                          <button
                            onClick={() => acceptOrder(order._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm"
                          >
                            Accept
                          </button>
                        )}

                        <button
                          onClick={() => router.push(`/admin/orders/${order._id}`)}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          View
                        </button>

                        <button
                          onClick={() => router.push(`/admin/orders/${order._id}/edit`)}
                          className="text-gray-700 hover:underline font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-500 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}