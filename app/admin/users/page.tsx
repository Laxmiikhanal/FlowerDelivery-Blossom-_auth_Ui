"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5051";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("blossom_token")
  );
}

async function apiFetch<T>(path: string): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Failed to fetch");
  return data as T;
}

type AdminUser = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: "user" | "admin";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");
      setLoading(true);

      // backend likely returns: { success, data, meta, message }
      const res = await apiFetch<{ success: boolean; data: AdminUser[] }>(
        "/api/admin/users?page=1&limit=50"
      );

      setUsers(res.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-gray-500">Manage admin and customer users</p>
        </div>

        <Link
          href="/admin/users/create"
          className="px-4 py-2 rounded-lg bg-pink-600 text-white"
        >
          + Create User
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow border border-pink-100 p-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600 font-semibold">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-gray-500">No users found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="py-2">
                    {(u.firstName || "") + " " + (u.lastName || "") || "-"}
                  </td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role || "user"}</td>
                  <td className="py-2">
                    <Link className="underline" href={`/admin/users/${u._id}/edit`}>
                      Edit
                    </Link>
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
