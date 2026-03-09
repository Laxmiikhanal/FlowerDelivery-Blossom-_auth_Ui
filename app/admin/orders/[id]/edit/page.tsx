'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Order {
  _id: string;
  status: string;
}

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/orders/${orderId}`,
        { credentials: 'include' }
      );
      const data = await res.json();
      if (data.success) setStatus(data.data.status);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/orders/${orderId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      if (data.success) {
        alert('Order updated successfully');
        router.push('/admin/orders');
      } else alert(data.message || 'Failed to update order');
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-black">Loading order...</p>;

  return (
    <div className="card p-8 max-w-xl mx-auto bg-gray-50 rounded-2xl shadow-md">
      <button onClick={() => router.push('/admin/orders')} className="text-gray-700 hover:text-gray-900 mb-3">
        Back to Orders
      </button>
      <h1 className="text-3xl font-extrabold text-black mb-4">Edit Order</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input border-gray-300 focus:border-black focus:ring-gray-200 w-full"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white py-2 px-4 rounded-xl w-full hover:bg-gray-900 transition"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}