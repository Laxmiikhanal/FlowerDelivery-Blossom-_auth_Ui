'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
}

export default function CreateProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/categories`);
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('category', formData.category);

      if (images) Array.from(images).forEach((image) => formDataToSend.append('images', image));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/products`,
        { method: 'POST', credentials: 'include', body: formDataToSend }
      );

      const data = await res.json();
      if (data.success) {
        alert('Product created successfully');
        router.push('/admin/products');
      } else alert(data.message || 'Failed to create product');
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="card p-8 max-w-2xl w-full bg-white rounded-2xl shadow-lg">
        <button
          onClick={() => router.push('/admin/products')}
          className="text-pink-600 hover:text-pink-800 text-sm mb-4"
        >
          ← Back to Products
        </button>

        <h1 className="text-3xl font-extrabold text-black mb-2">Create New Product</h1>
        <p className="text-black/70 text-sm mb-6">Showcase a new floral masterpiece.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black resize-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black transition"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black transition"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-xl w-full font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="border border-pink-500 text-pink-500 py-3 px-6 rounded-xl w-full hover:bg-pink-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}