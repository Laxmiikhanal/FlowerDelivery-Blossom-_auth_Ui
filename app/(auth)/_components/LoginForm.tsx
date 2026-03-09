// "use client";

// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { handleLogin } from "@/lib/actions/auth-action";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (loading) return;

//     setError("");
//     setLoading(true);

//     const result = await handleLogin({ email, password });

//     if (!result.success) {
//       setError(result.message || "Login failed");
//       setLoading(false);
//       return;
//     }

//     // Save token & user to localStorage
//     localStorage.setItem("token", (result as any).data?.token || "");
//     localStorage.setItem("user", JSON.stringify((result as any).data || {}));

//     // Redirect
//     const role = ((result as any).data?.role || "").toLowerCase() === "admin" ? "admin" : "user";
//     router.replace(role === "admin" ? "/admin/dashboard" : "/home");
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-5">
//       {error && (
//         <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div>
//         <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full rounded-xl border px-4 py-3"
//         />
//       </div>

//       <div>
//         <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full rounded-xl border px-4 py-3"
//         />
//       </div>

//       <div className="flex justify-end">
//         <Link href="/reset-password" className="text-sm text-pink-600 hover:underline">
//           Forgot Password?
//         </Link>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full rounded-xl bg-pink-600 py-3 font-semibold text-white"
//       >
//         {loading ? "Signing in..." : "Sign In"}
//       </button>
//     </form>
//   );
// }

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-action";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const result = await handleLogin({ email, password });

      if (!result.success) {
        setError(result.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ FIX: Extract token properly matching your backend response
      const token = (result as any).token || (result as any).data?.token || "";
      const user = (result as any).user || (result as any).data?.user || {};

      if (!token) {
        setError("Login successful, but no token received.");
        setLoading(false);
        return;
      }

      // Save token & user to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("✅ Token successfully saved to localStorage");
      }

      // Redirect based on role
      const role = (user?.role || "").toLowerCase() === "admin" ? "admin" : "user";
      router.replace(role === "admin" ? "/admin/dashboard" : "/home");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl border px-4 py-3"
        />
      </div>

      <div className="flex justify-end">
        <Link href="/reset-password" className="text-sm text-pink-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-pink-600 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}