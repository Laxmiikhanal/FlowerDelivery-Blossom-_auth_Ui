'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: { _id: string; name: string };
  images: string[];
}

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/products`,
        { credentials: 'include' }
      );
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/products/${id}`,
        { method: 'DELETE', credentials: 'include' }
      );
      const data = await res.json();
      if (data.success) fetchProducts();
      else alert(data.message || 'Failed to delete product');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="card p-10 text-center bg-pink-50 rounded-2xl shadow-md">
        <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-black">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="card p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-pink-50 rounded-2xl shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-black">Manage Products</h2>
          <p className="text-gray-600 text-sm mt-1">Curate the catalog your customers love.</p>
        </div>
        <button
          onClick={() => router.push('/admin/products/create')}
          className="bg-pink-500 text-white py-2 px-4 rounded-xl hover:bg-pink-600 transition"
        >
          Add New Product
        </button>
      </section>

      <section className="card overflow-hidden bg-pink-50 rounded-2xl shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-pink-50/30 transition">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-black">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.description.substring(0, 70)}...</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.category?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">{product.stock}</td>
                  <td className="px-6 py-4 text-sm font-medium space-x-3">
                    <button
                      onClick={() => router.push(`/admin/products/${product._id}/edit`)}
                      className="text-pink-500 hover:text-pink-700 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-pink-600 hover:text-pink-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}