"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getRole(): string | null {
  if (typeof window === "undefined") return null;

  // 1) try localStorage role
  const role = localStorage.getItem("role");
  if (role) return role;

  // 2) try cookie userData (optional)
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const found = cookies.find((c) => c.startsWith("userData="));
  if (!found) return null;

  try {
    const raw = decodeURIComponent(found.split("=").slice(1).join("="));
    const parsed = JSON.parse(raw);
    return parsed?.role || null;
  } catch {
    return null;
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const role = getRole();
    if (role !== "admin") {
      router.replace("/home");
      setOk(false);
      return;
    }
    setOk(true);
  }, [router]);

  if (ok === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="rounded-3xl bg-white p-6 shadow border border-pink-100">
          <p className="font-semibold text-gray-800">Checking admin access…</p>
        </div>
      </div>
    );
  }

  if (ok === false) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl bg-white shadow border border-pink-100 p-5 h-fit sticky top-6">
            <div className="mb-5">
              <p className="text-sm text-gray-500">BLOSSOM</p>
              <h2 className="text-xl font-extrabold text-pink-600">Admin Panel</h2>
            </div>

            {/* ✅ FIXED NAV (Orders added, linkClass removed) */}
            <nav className="space-y-2">
              <Link
                className="block rounded-2xl px-4 py-3 hover:bg-pink-50 transition"
                href="/admin/dashboard"
              >
                📊 Dashboard
              </Link>

              <Link
                className="block rounded-2xl px-4 py-3 hover:bg-pink-50 transition"
                href="/admin/users"
              >
                👥 Users
              </Link>

              <Link
                className="block rounded-2xl px-4 py-3 hover:bg-pink-50 transition"
                href="/admin/orders"
              >
                🧾 Orders
              </Link>

              <Link
                className="block rounded-2xl px-4 py-3 hover:bg-pink-50 transition"
                href="/admin/profile"
              >
                👤 Profile
              </Link>

              <div className="h-px bg-pink-100 my-3" />

              <Link
                className="block rounded-2xl px-4 py-3 hover:bg-pink-50 transition"
                href="/home"
              >
                🌸 Back to Shop
              </Link>
            </nav>
          </aside>

          <section className="rounded-3xl bg-white shadow border border-pink-100 p-6">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}
