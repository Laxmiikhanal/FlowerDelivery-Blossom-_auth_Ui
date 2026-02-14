"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

// ✅ change ONLY if your backend routes differ
const FORGOT_ENDPOINT = "/api/auth/forgot-password";
const RESET_ENDPOINT = "/api/auth/reset-password";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => params.get("token"), [params]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const em = email.trim().toLowerCase();
    if (!em) return setError("Email is required");

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}${FORGOT_ENDPOINT}`,
        { email: em },
        { withCredentials: true }
      );
      setSuccess("Reset link sent ✅ Check your email.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) return setError("Missing token. Open the reset link from email.");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}${RESET_ENDPOINT}`,
        { token, password },
        { withCredentials: true }
      );
      setSuccess("Password reset successful ✅ Redirecting to login...");
      setTimeout(() => router.replace("/login"), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-gray-700 outline-none focus:ring-2 focus:ring-pink-400";

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Reset Password</h1>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {success}
          </div>
        )}

        {/* ✅ NO TOKEN => show EMAIL form */}
        {!token ? (
          <form onSubmit={sendLink} className="mt-8 space-y-5">
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-pink-500 py-4 text-white font-bold hover:bg-pink-600 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Tip: you will receive a link containing a token.
            </p>
          </form>
        ) : (
          /* ✅ TOKEN => show new password form */
          <form onSubmit={resetPassword} className="mt-8 space-y-5">
            <input
              type="password"
              placeholder="New password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              className={inputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-pink-500 py-4 text-white font-bold hover:bg-pink-600 transition disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Tip: You opened the link from email (token detected).
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
