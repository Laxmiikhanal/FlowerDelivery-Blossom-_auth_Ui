// app/admin/admin-shell.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? "bg-pink-500/20 text-pink-600 shadow-[0_12px_30px_rgba(219,39,119,0.12)]"
          : "text-slate-600 hover:bg-pink-50"
      }`}
    >
      <span>{label}</span>
      <span className="text-xs text-slate-400">/</span>
    </Link>
  );
}

function GoToStoreButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/home")}
      className="w-full bg-green-500 text-white py-2 px-4 rounded-xl mt-3 text-center hover:bg-green-600 transition"
    >
      Go to Store
    </button>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-pink-50 relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col px-6 py-8 space-y-6">
          <div className="card p-5 bg-white shadow rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-black-400">Blossom</p>
                <h2 className="text-lg font-extrabold font-display text-black-600">Admin</h2>
              </div>
            </div>
          </div>

          <div className="card-soft p-4 space-y-2">
            {nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="card-soft p-4">
              <p className="text-xs text-pink-400">Quick action</p>
              <GoToStoreButton />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-4 lg:px-8 py-6">
          <header className="card p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white shadow rounded-2xl">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black-400">Admin Console</p>
              <h1 className="text-2xl md:text-3xl font-extrabold font-display text-black-600">
                Blossom Back Office
              </h1>
              <p className="text-sm text-black-500 mt-1">Curate, manage, and delight your customers.</p>
            </div>
          </header>

          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}