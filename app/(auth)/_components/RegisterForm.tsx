"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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

  const onSubmit = () => {
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

        // ✅ Best: navigate without refresh (refresh can keep pending feeling stuck)
        router.replace("/login?registered=1");
      } catch (e: any) {
        setError(e?.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="text"
        placeholder="Last Name"
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full rounded-xl bg-white/80 px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={pending}
        className="mt-2 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 py-4 font-semibold text-white shadow hover:opacity-95 transition disabled:opacity-60"
      >
        {pending ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
