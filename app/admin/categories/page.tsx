'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminCategories, deleteAdminCategory } from '@/lib/actions/admin-categories-action';

interface Category {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export default function AdminCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAdminCategories();
      if (data.success && Array.isArray(data.data)) setCategories(data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const data = await deleteAdminCategory(id);
      if (data.success) fetchCategories();
      else alert(data.message || 'Failed to delete category');
    } catch {
      alert('Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 text-black max-w-6xl mx-auto space-y-8 p-6">
      {/* Header */}
      <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Category Management</h2>
          <p className="text-black/70 text-sm mt-1">Organize your products into collections.</p>
        </div>
        <button 
          onClick={() => router.push('/admin/categories/create')} 
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-xl font-semibold transition shadow"
        >
          Add New Category
        </button>
      </section>

      {/* Table */}
      <section className="bg-pink-50 rounded-2xl shadow-md border border-pink-200 overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-10 text-center text-black/50 text-sm">
            No categories yet. Click "Add New Category" to create your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-pink-200">
              <thead className="bg-pink-100">
                <tr>
                  {['Category','Description','Created','Actions'].map(th => (
                    <th key={th} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide">{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-200">
                {categories.map(cat => (
                  <tr key={cat._id} className="hover:bg-pink-50/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                          {cat.name[0]?.toUpperCase()}
                        </div>
                        <div className="text-sm font-semibold text-black">{cat.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-black/70">{cat.description || '-'}</td>
                    <td className="px-6 py-4 text-sm text-black/70">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-3">
                      <button 
                        onClick={() => deleteCategory(cat._id)} 
                        className="text-pink-500 hover:text-pink-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}