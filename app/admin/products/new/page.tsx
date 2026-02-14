"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAdminProduct } from "../../_lib/productApi";

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await createAdminProduct({
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    });
    setSaving(false);
    router.push("/admin/products");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">New Product</h1>

      <div className="bg-white rounded-2xl shadow p-4 space-y-3">
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea className="border rounded-lg px-3 py-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <button
          className="px-4 py-2 rounded-lg bg-pink-600 text-white disabled:opacity-60"
          disabled={saving || !name.trim()}
          onClick={save}
        >
          {saving ? "Saving..." : "Create Product"}
        </button>
      </div>
    </div>
  );
}
