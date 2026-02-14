"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, type AdminUser } from "../../_lib/adminApi";

export default function ViewUserPage() {
  const params = useParams();
  const id = String(params?.id || "");

  const [user, setUser] = useState<AdminUser | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const u = await getUserById(id);
        setUser(u);
      } catch (e: any) {
        setErr(e?.message || "Failed to load user");
      }
    })();
  }, [id]);

  if (err) return <div className="p-10 text-red-600 font-semibold">{err}</div>;
  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <Link href="/admin/users" className="text-pink-600 font-semibold">← Back</Link>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow border border-pink-100 space-y-3">
          <p><b>ID:</b> {user._id}</p>
          <p><b>Name:</b> {(user.firstName || "")} {(user.lastName || "")}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role || "user"}</p>

          <Link
            href={`/admin/users/${user._id}/edit`}
            className="inline-block mt-4 rounded-2xl bg-pink-600 px-5 py-3 text-white font-semibold"
          >
            Edit User
          </Link>
        </div>
      </div>
    </div>
  );
}
