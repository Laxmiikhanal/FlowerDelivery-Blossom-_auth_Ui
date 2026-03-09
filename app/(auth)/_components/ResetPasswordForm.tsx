"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://localhost:5051";

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (password.length < 6) {
      setIsError(true);
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        setIsError(true);
        setMessage(data?.message || "Reset failed");
        return;
      }

      setIsError(false);
      setMessage("Password changed successfully. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setIsError(true);
      setMessage("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Reset Password</h1>
      <p className="mb-6 text-sm text-gray-500">Enter your new password below.</p>

      <form onSubmit={handleReset} className="space-y-4">
        {message && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              isError
                ? "border border-red-200 bg-red-50 text-red-700"
                : "border border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            required
            className="w-full rounded-lg border px-4 py-3 pr-20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-pink-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            required
            className="w-full rounded-lg border px-4 py-3 pr-20"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-pink-600"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}