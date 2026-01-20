"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/actions/auth-action";

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    setError(null);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await handleRegister({
        firstName,
        lastName,
        email,    
        username: email, // assuming username is the email
        password,
        confirmPassword,
      });
      
      if (!result.success) {
        setError(result.message || "Registration failed");
        return;
      }

      router.push("/login");
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <button
        onClick={onSubmit}
        disabled={pending}
        className="mt-2 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 py-4 font-semibold text-white shadow-[0_14px_30px_rgba(236,72,153,0.35)] hover:opacity-95 transition disabled:opacity-60"
      >
        {pending ? "Registering..." : "Register"}
      </button>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-pink-500">
          Login
        </Link>
      </p>
    </div>
  );
}
