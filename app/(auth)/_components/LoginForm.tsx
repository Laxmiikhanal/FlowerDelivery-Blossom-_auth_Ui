"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = async (values: LoginData) => {
    setError(null);

    // Same style validation as your friend's logic (extra safety)
    if (!values.email || !values.password) {
      setError("Please enter email and password");
      return;
    }

    startTransition(async () => {
      const result = await handleLogin({
        email: values.email,
        password: values.password,
      });

      if (!result?.success) {
        setError(result?.message || "Login failed");
        return;
      }

      // Keep your route (change if your app uses /dashboard)
      router.push("/home");
      router.refresh();
    });

    console.log("login", values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 text-left">
      {/* Error message (logic only, UI style preserved) */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Email */}
      <div>
        <label className="text-base font-semibold text-black">Email</label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 w-full h-12 rounded-lg bg-[#FFE1BD] px-4 text-base text-black placeholder-black/60 outline-none focus:ring-2 focus:ring-black/20"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-base font-semibold text-black">Password</label>
        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          placeholder="******"
          className="mt-2 w-full h-12 rounded-lg bg-[#FFE1BD] px-4 text-base text-black placeholder-black/60 outline-none focus:ring-2 focus:ring-black/20"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full h-12 mt-4 rounded-full bg-[#E39A3B] text-base font-semibold text-black hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Logging in..." : "Log in"}
      </button>

      {/* Signup Link */}
      <p className="text-center text-base mt-4 text-black">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-orange-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
