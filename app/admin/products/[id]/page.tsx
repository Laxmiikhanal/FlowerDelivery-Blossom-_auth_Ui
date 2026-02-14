"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAdminProductById, updateAdminProduct } from "../../_lib/productApi";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetchAdminProductById(id);
    const p = res.data;
    setName(p.name || "");
    setPrice(Number(p.price || 0));
    setCategory(p.category || "");
    setDescription(p.description || "");
    setImageUrl(p.imageUrl || "");
    setIsActive(p.isActive !== false);
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    await updateAdminProduct(id, {
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      isActive,
    });
    setSaving(false);
    router.push("/admin/products");
  }

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <div className="bg-white rounded-2xl shadow p-4 space-y-3">
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="border rounded-lg px-3 py-2 w-full" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea className="border rounded-lg px-3 py-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active
        </label>

        <button
          className="px-4 py-2 rounded-lg bg-pink-600 text-white disabled:opacity-60"
          disabled={saving || !name.trim()}
          onClick={save}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
