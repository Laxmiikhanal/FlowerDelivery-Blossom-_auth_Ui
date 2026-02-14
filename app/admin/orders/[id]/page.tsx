"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  AdminOrder,
  OrderStatus,
  fetchAdminOrderById,
  updateAdminOrderStatus,
} from "../../_lib/orderApi";

export default function AdminOrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [status, setStatus] = useState<OrderStatus>("pending");
  const [note, setNote] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetchAdminOrderById(id);
    setOrder(res.data);
    setStatus(res.data.status);
  }

  async function save() {
    if (status === "cancelled" && !cancelReason.trim()) return;

    setSaving(true);
    const res = await updateAdminOrderStatus(id, {
      status,
      note: note.trim() || undefined,
      cancelReason: status === "cancelled" ? cancelReason.trim() : undefined,
    });
    setOrder(res.data);
    setSaving(false);
  }

  useEffect(() => {
    load();
  }, [id]);

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <h1 className="text-2xl font-bold">Order #{order._id.slice(-8)}</h1>
        <p className="text-sm text-gray-500">
          Created: {new Date(order.createdAt).toLocaleString()} | Total: $
          {Number(order.total || 0).toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 space-y-3">
        <div className="flex gap-2 items-center">
          <select
            className="border rounded-lg px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            className="px-4 py-2 rounded-lg bg-pink-600 text-white disabled:opacity-60"
            disabled={saving || (status === "cancelled" && !cancelReason.trim())}
            onClick={save}
          >
            {saving ? "Saving..." : "Update Status"}
          </button>
        </div>

        <input
          className="border rounded-lg px-3 py-2 w-full"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {status === "cancelled" && (
          <input
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Cancel reason (required)"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Items</h2>
        <ul className="text-sm space-y-2">
          {(order.items || []).map((it, idx) => (
            <li key={idx} className="flex justify-between border-b py-2">
              <span>
                {it.name} × {it.qty}
              </span>
              <span>${(Number(it.price) * Number(it.qty)).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Delivery</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <div>
            <b>Phone:</b> {order.phone || "-"}
          </div>
          <div>
            <b>Address:</b> {order.address || "-"}
          </div>
          <div>
            <b>Notes:</b> {order.notes || "-"}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Status History</h2>
        {(order.statusHistory || []).length === 0 ? (
          <div className="text-gray-500 text-sm">No history</div>
        ) : (
          <ul className="text-sm space-y-1">
            {order.statusHistory!.map((h, i) => (
              <li key={i}>
                {new Date(h.at).toLocaleString()} — <b>{h.status}</b>
                {h.note ? ` (${h.note})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
