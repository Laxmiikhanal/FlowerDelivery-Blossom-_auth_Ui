"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "../../_lib/adminApi";

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      await createUser({ firstName, lastName, email, password, role });
      router.push("/admin/users");
      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="mx-auto max-w-xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Create User</h1>

        {err && (
          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 rounded-3xl bg-white p-6 shadow border border-pink-100 space-y-4">
          <input
            className="w-full rounded-2xl border px-4 py-3"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="w-full rounded-2xl border px-4 py-3"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="w-full rounded-2xl border px-4 py-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-2xl border px-4 py-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full rounded-2xl border px-4 py-3"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div className="flex gap-3">
            <button
              disabled={loading}
              className="w-full rounded-2xl bg-pink-600 py-3 text-white font-semibold disabled:opacity-60"
              type="submit"
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <button
              type="button"
              className="w-full rounded-2xl border py-3 font-semibold"
              onClick={() => router.push("/admin/users")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
