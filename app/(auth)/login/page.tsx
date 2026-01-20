"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-action";

export default function LoginPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const onLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    startTransition(async () => {
      const res = await handleLogin({ email, password });

      if (!res.success) {
        setError(res.message || "Login failed");
        return;
      }

      // Keep your routes
      router.push("/home");
      router.refresh();
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute top-10 right-[-180px] h-[560px] w-[560px] rounded-full bg-pink-200/60 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Image src="/blossomlogo.png" alt="Blossom Logo" width={36} height={36} />
          <span className="text-lg font-semibold text-slate-800">Blossom</span>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="/home" className="hover:text-pink-500 transition">
            Home
          </Link>
          <Link href="#" className="hover:text-pink-500 transition">
            Offers
          </Link>
          <Link href="/login" className="text-pink-500">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-pink-500 px-5 py-2 text-white shadow hover:bg-pink-600 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* MAIN CARD */}
      <div className="relative z-10 flex min-h-screen items-start justify-center px-6">
        <div className="grid w-[1000px] overflow-hidden rounded-3xl bg-white/40 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.18)] lg:grid-cols-2">
          {/* LEFT FORM */}
          <div className="p-14">
            <h1 className="text-4xl font-extrabold text-slate-800">
              Welcome back <span>🌸</span>
            </h1>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-10 space-y-5">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <button
              onClick={onLogin}
              disabled={pending}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 py-4 font-semibold text-white shadow-[0_14px_30px_rgba(236,72,153,0.35)] hover:opacity-95 transition disabled:opacity-60"
            >
              {pending ? "Logging in..." : "Login"}
            </button>

            <p className="mt-6 text-sm text-slate-600">
              Don’t have an account?{" "}
              <Link href="/register" className="font-semibold text-pink-500">
                Register
              </Link>
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex items-center justify-center bg-pink-200/40 p-6">
            <div className="relative h-[420px] w-[420px] overflow-hidden rounded-3xl shadow-xl">
              <Image src="/scooterlady.png" alt="Flower bouquet" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
