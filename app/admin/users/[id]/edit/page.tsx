'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/users/${userId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await res.json();
      if (data.success) {
        alert('User updated successfully');
        router.push('/admin/users');
      } else {
        alert(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-black">Loading user...</p>;

  if (!user) return <p className="text-red-600">User not found</p>;

  return (
    <div className="card p-8 max-w-xl mx-auto bg-gray-50 rounded-2xl shadow-md">
      <button onClick={() => router.push('/admin/users')} className="text-gray-700 hover:text-gray-900 mb-3">
        Back to Users
      </button>
      <h1 className="text-3xl font-extrabold text-black mb-4">Edit User</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input border-gray-300 focus:border-black focus:ring-gray-200 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input border-gray-300 focus:border-black focus:ring-gray-200 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input border-gray-300 focus:border-black focus:ring-gray-200 w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
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