"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminProduct, fetchAdminProducts, deleteAdminProduct } from "../_lib/productApi";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetchAdminProducts({ page: 1, limit: 50, q: q.trim() || undefined });
    setProducts(res.data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    const ok = confirm("Delete this product?");
    if (!ok) return;
    await deleteAdminProduct(id);
    await load();
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">Create, edit, delete products</p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2 rounded-lg bg-pink-600 text-white"
        >
          + New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-4 flex gap-2">
        <input
          className="border rounded-lg px-3 py-2 w-full"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={load}
        >
          Search
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500">No products found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Category</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">${Number(p.price || 0).toFixed(2)}</td>
                  <td className="py-2">{p.category || "-"}</td>
                  <td className="py-2">{p.isActive === false ? "Inactive" : "Active"}</td>
                  <td className="py-2 flex gap-3">
                    <Link className="underline" href={`/admin/products/${p._id}`}>
                      Edit
                    </Link>
                    <button className="underline text-red-600" onClick={() => onDelete(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
