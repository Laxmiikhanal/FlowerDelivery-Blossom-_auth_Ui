"use client";

import { useState, useTransition } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5051";

export default function ForgetPasswordPage() {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    const em = email.trim().toLowerCase();
    if (!em) {
      setErr("Email is required");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: em }),
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          setErr(json?.message || "Failed to send reset email");
          return;
        }

        setMsg("If this email exists, a reset link has been sent.");
      } catch {
        setErr("Backend not reachable.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/50 backdrop-blur-2xl shadow-xl p-10">
        <h1 className="text-3xl font-extrabold text-slate-800">Forgot Password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your email and we will send you a reset link.
        </p>

        {msg && <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{msg}</p>}
        {err && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{err}</p>}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="rounded-2xl bg-white/60 px-5 py-4 ring-1 ring-white/60 focus-within:ring-2 focus-within:ring-pink-400">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-pink-500 py-4 font-semibold text-white shadow hover:bg-pink-600 transition disabled:opacity-60"
          >
            {pending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
