"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listUsers, AdminUser } from "../_lib/adminApi";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await listUsers(1, 50);
        setUsers(res.users);
      } catch (e: any) {
        setErr(e?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const customers = total - admins;

    let ordersCount = 0;
    try {
      const raw = localStorage.getItem("blossom_orders");
      const arr = raw ? JSON.parse(raw) : [];
      ordersCount = Array.isArray(arr) ? arr.length : 0;
    } catch {}

    return { total, admins, customers, ordersCount };
  }, [users]);

  if (loading) return <p className="text-gray-600">Loading dashboard…</p>;
  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Admin overview.</p>
        </div>

        <Link
          href="/admin/users/create"
          className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-3 text-white font-semibold shadow hover:opacity-95 transition"
        >
          + Create User
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Users" value={stats.total} />
        <Card title="Admins" value={stats.admins} />
        <Card title="Customers" value={stats.customers} />
        <Card title="Orders (demo)" value={stats.ordersCount} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-extrabold text-pink-600">{value}</p>
    </div>
  );
}
