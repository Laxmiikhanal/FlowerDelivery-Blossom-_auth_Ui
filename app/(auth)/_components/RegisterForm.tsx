"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleRegister } from "@/lib/actions/auth-action";

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim().toLowerCase();
    const pw = password;
    const cpw = confirmPassword;

    if (!fn || !ln || !em || !pw || !cpw) {
      setError("All fields are required");
      return;
    }
    if (pw !== cpw) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      try {
        const result = await handleRegister({
          firstName: fn,
          lastName: ln,
          email: em,
          password: pw,
          confirmPassword: cpw,
        });

        if (!result?.success) {
          setError(result?.message || "Registration failed");
          return;
        }

        router.replace("/login?registered=1");
      } catch (e: any) {
        setError(e?.message || "Something went wrong");
      }
    });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-100">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={inputClass}
        autoComplete="given-name"
      />

      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={inputClass}
        autoComplete="family-name"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        autoComplete="email"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        autoComplete="new-password"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={inputClass}
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 py-3 font-semibold text-white shadow hover:opacity-95 transition disabled:opacity-60"
      >
        {pending ? "Registering..." : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-pink-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
