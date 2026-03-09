"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://127.0.0.1:5051";

type OrderProduct = {
  product: {
    _id: string;
    name: string;
    imageUrl?: string; // your populate selects imageUrl
    price?: number;
  };
  quantity: number;
};

type Order = {
  _id: string;
  user: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  products: OrderProduct[]; // ✅ backend uses "products"
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
};

function getToken() {
  if (typeof window === "undefined") return "";
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    ""
  );
}

function resolveImage(img?: string) {
  if (!img) return "/flowers.jpg";
  if (img.startsWith("http")) return img;
  if (img.startsWith("/")) return `${API_BASE}${img}`; // "/uploads/..."
  return `${API_BASE}/${img}`;
}

export default function AdminOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const res = await fetch(`${API_BASE}/api/admin/orders`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }

      if (data?.success && Array.isArray(data?.data)) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (e: any) {
      console.error("Failed to fetch orders:", e);
      setError(e?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (id: string) => {
    try {
      const token = getToken();

      // ✅ Your backend route is PATCH (from your code)
      // ✅ Your schema only allows: pending/completed/cancelled
      const res = await fetch(`${API_BASE}/api/admin/orders/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: "completed" }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.message || "Failed to accept order");

      await fetchOrders();
    } catch (e: any) {
      alert(e?.message || "Failed to accept order");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = getToken();

      const res = await fetch(`${API_BASE}/api/admin/orders/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.message || "Failed to delete order");

      await fetchOrders();
    } catch (e: any) {
      alert(e?.message || "Failed to delete order");
    }
  };

  if (loading) {
    return (
      <div className="card p-10 text-center bg-gray-50 rounded-2xl shadow-md">
        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-black">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-black">Manage Orders</h2>
        <p className="text-gray-600 text-sm mt-1">
          If you see Unauthorized, login as an admin (token required).
        </p>
      </section>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-2xl p-4">
          {error}
        </div>
      )}

      <section className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase">
                  Products
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-pink-50/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex -space-x-3 overflow-hidden">
                      {order.products?.map((p, idx) => (
                        <img
                          key={idx}
                          src={resolveImage(p.product?.imageUrl)}
                          alt={p.product?.name || "product"}
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {order.products?.map((p, idx) => (
                        <span key={idx} className="mr-2">
                          {p.product?.name} × {p.quantity}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <p className="font-semibold text-black">
                      {(order.user?.firstName || "") +
                        " " +
                        (order.user?.lastName || "")}
                    </p>
                    <p className="text-gray-500 text-xs">{order.user?.email}</p>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm space-x-2">
                    {order.status === "pending" && (
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
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}