"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type User = {
  fullName: string;
  email: string;
};

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // demo user (replace with API later if you want)
  const [user, setUser] = useState<User>({
    fullName: "rojina adhikari",
    email: "rojina@gmail.com",
  });

  // close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const isActive = (href: string) =>
    pathname === href ? "text-pink-600" : "text-slate-700 hover:text-pink-600";

  const onLogout = () => {
    // clear saved auth
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // clear cookies (simple)
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    document.cookie = "userId=; path=/; max-age=0";

    router.push("/login");
    router.refresh();
  };

  const initial = user.fullName?.trim()?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-pink-50 border">
            <Image src="/blossomlogo.png" alt="Blossom" width={26} height={26} />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold text-pink-600">BLOSSOM</div>
            <div className="text-xs text-slate-500 -mt-1">Flower Paradise</div>
          </div>
        </div>

        {/* Middle nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link className={isActive("/home")} href="/home">
            Home
          </Link>
          <Link className={isActive("/shop")} href="/shop">
            Shop
          </Link>
          <Link className={isActive("/cart")} href="/cart">
            Cart
          </Link>
          <Link className={isActive("/orders")} href="/orders">
            Orders
          </Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5" ref={wrapRef}>
          {/* bell */}
          <button
            type="button"
            className="relative rounded-full p-2 hover:bg-slate-100 transition"
            aria-label="notifications"
          >
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            {/* bell icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13.73 21a2 2 0 01-3.46 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* avatar + dropdown */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white font-bold shadow hover:opacity-95"
            aria-label="profile menu"
          >
            {initial}
          </button>

          {open && (
            <div className="absolute right-6 top-16 w-72 rounded-2xl border bg-white shadow-xl">
              <div className="px-5 py-4">
                <div className="text-lg font-semibold text-slate-800">
                  {user.fullName}
                </div>
                <div className="text-sm text-slate-500">{user.email}</div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="p-2">
                <Link
                  href="/user/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-50"
                >
                  <span>👤</span>
                  <span className="font-medium">Edit Profile</span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-50"
                >
                  <span>📦</span>
                  <span className="font-medium">My Orders</span>
                </Link>

                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50"
                >
                  <span>🚪</span>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
