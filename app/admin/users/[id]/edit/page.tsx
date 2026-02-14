"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../../_lib/adminApi";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params?.id || "");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  useEffect(() => {
    (async () => {
      setErr(null);
      try {
        const u = await getUserById(id);
        setFirstName(u.firstName || "");
        setLastName(u.lastName || "");
        setEmail(u.email || "");
        setRole((u.role as any) || "user");
      } catch (e: any) {
        setErr(e?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setSaving(true);
    try {
      await updateUser(id, { firstName, lastName, email, role });
      router.push(`/admin/users/${id}`);
      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="mx-auto max-w-xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>

        {err && (
          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={onSave} className="mt-6 rounded-3xl bg-white p-6 shadow border border-pink-100 space-y-4">
          <input className="w-full rounded-2xl border px-4 py-3" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input className="w-full rounded-2xl border px-4 py-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input className="w-full rounded-2xl border px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} />

          <select className="w-full rounded-2xl border px-4 py-3" value={role} onChange={(e) => setRole(e.target.value as any)}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <div className="flex gap-3">
            <button disabled={saving} className="w-full rounded-2xl bg-pink-600 py-3 text-white font-semibold disabled:opacity-60" type="submit">
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" className="w-full rounded-2xl border py-3 font-semibold" onClick={() => router.push(`/admin/users/${id}`)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
