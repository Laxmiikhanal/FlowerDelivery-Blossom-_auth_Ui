'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAdminCategory } from '@/lib/actions/admin-categories-action';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const payload: { name: string; description?: string } = { name: name.trim() };
      if (description.trim()) payload.description = description.trim();

      const data = await createAdminCategory(payload);
      if (data.success) {
        alert('Category created successfully');
        router.push('/admin/categories');
      } else {
        alert(data.message || 'Failed to create category');
      }
    } catch (error) {
      console.error('Failed to create category:', error);
      alert('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="card p-8 max-w-xl w-full bg-white rounded-2xl shadow-lg">
        <button
          onClick={() => router.push('/admin/categories')}
          className="text-pink-600 hover:text-pink-700 text-sm mb-4"
        >
          ← Back to Categories
        </button>

        <h1 className="text-3xl font-extrabold font-display text-black mb-2">
          Create Category
        </h1>
        <p className="text-black/70 text-sm mb-6">
          Group similar products together to make browsing easier.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black transition"
              placeholder="e.g. Roses, Bouquets, Birthday Special"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring focus:ring-pink-200 text-black resize-none transition"
              placeholder="Short description of this category"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      </div>
    </div>
  );
}