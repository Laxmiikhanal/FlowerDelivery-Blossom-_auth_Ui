"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AdminOrder,
  OrderStatus,
  fetchAdminOrders,
} from "../_lib/orderApi";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetchAdminOrders({ page: 1, limit: 20, status });
    setOrders(res.data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [status]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500">View and manage orders</p>
        </div>

        <select
          className="border rounded-lg px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out for delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        {loading ? (
          <div>Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Order</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Items</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Created</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => {
                const email =
                  typeof o.userId === "string" ? "-" : o.userId?.email || "-";
                const itemCount = (o.items || []).reduce(
                  (sum, it) => sum + (it.qty || 0),
                  0
                );

                return (
                  <tr key={o._id} className="border-b">
                    <td className="py-2 font-mono">{o._id.slice(-8)}</td>
                    <td className="py-2">{email}</td>
                    <td className="py-2">{itemCount}</td>
                    <td className="py-2">${Number(o.total || 0).toFixed(2)}</td>
                    <td className="py-2">{o.status}</td>
                    <td className="py-2">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2">
                      <Link className="underline" href={`/admin/orders/${o._id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
