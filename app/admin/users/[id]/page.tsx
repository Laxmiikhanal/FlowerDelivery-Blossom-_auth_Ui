'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/users`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5051'}/api/admin/users/${id}`,
        { method: 'DELETE', credentials: 'include' }
      );
      const data = await res.json();
      if (data.success) fetchUsers();
      else alert(data.message || 'Failed to delete user');
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="card p-10 text-center bg-gray-50 rounded-2xl shadow-md">
        <div className="w-14 h-14 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-black">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="card p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gray-50 rounded-2xl shadow-md">
        <div>
          <h2 className="text-2xl font-bold text-black">Manage Users</h2>
          <p className="text-gray-600 text-sm mt-1">View and edit your platform users.</p>
        </div>
        <button
          onClick={() => router.push('/admin/users/create')}
          className="bg-gray-900 text-white py-2 px-4 rounded-xl hover:bg-black transition"
        >
          Add New User
        </button>
      </section>

      <section className="card overflow-hidden bg-gray-50 rounded-2xl shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-black font-semibold">{user.name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-black">{user.role}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
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