"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://127.0.0.1:5051";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        setMsg("✅ Reset link sent. Check your Gmail (Inbox/Spam).");
      } else {
        setMsg(data?.message || "Failed to send reset link.");
      }
    } catch {
      setMsg("Server not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we will send you a reset link.
        </p>

        <form onSubmit={sendLink} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}

        <div className="mt-6 text-sm">
          <Link href="/login" className="text-pink-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}