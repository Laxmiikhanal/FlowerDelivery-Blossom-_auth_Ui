"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-action";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const registered = params.get("registered");

  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = () => {
    setError(null);

    const em = email.trim().toLowerCase();
    const pw = password;

    if (!em || !pw) {
      setError("Please enter email and password.");
      return;
    }

    startTransition(async () => {
      const result = await handleLogin({ email: em, password: pw });

      if (!result?.success) {
        setError(result?.message || "Login failed");
        return;
      }

      const token = result.data?.token;
      const user = result.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.role || "user");

      document.cookie = `token=${token}; path=/`;
      document.cookie = `role=${user.role || "user"}; path=/`;
      document.cookie = `userId=${user._id}; path=/`;

      router.push("/home");
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {registered && (
        <p className="text-green-700 text-sm">
          Registration successful. Please login.
        </p>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={onSubmit} disabled={pending}>
        {pending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
