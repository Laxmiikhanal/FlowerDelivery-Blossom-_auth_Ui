// "use client";

// import { useState, useTransition } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { handleLogin } from "@/lib/actions/auth-action";

// export default function LoginForm() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const registered = params.get("registered");

//   const [pending, startTransition] = useTransition();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const onSubmit = () => {
//     setError(null);

//     const em = email.trim().toLowerCase();
//     const pw = password;

//     if (!em || !pw) {
//       setError("Please enter email and password.");
//       return;
//     }

//     startTransition(async () => {
//       const result = await handleLogin({ email: em, password: pw });

//       if (!result?.success) {
//         setError(result?.message || "Login failed");
//         return;
//       }

//       const token = result.data?.token;
//       const user = result.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", user._id);
//       localStorage.setItem("role", user.role || "user");

//       document.cookie = `token=${token}; path=/`;
//       document.cookie = `role=${user.role || "user"}; path=/`;
//       document.cookie = `userId=${user._id}; path=/`;

//       router.push("/home");
//       router.refresh();
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {registered && (
//         <p className="text-green-700 text-sm">
//           Registration successful. Please login.
//         </p>
//       )}

//       {error && <p className="text-red-600 text-sm">{error}</p>}

//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={onSubmit} disabled={pending}>
//         {pending ? "Logging in..." : "Login"}
//       </button>
//     </div>
//   );
// }


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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

      if (!token || !user?._id) {
        setError("Invalid login response");
        return;
      }

      // local storage (optional)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.role || "user");

      // cookies
      document.cookie = `token=${token}; path=/`;
      document.cookie = `role=${user.role || "user"}; path=/`;
      document.cookie = `userId=${user._id}; path=/`;

      router.push("/home");
      router.refresh();
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {registered && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Registration successful. Please login.
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Email */}
      <div className="rounded-2xl bg-white/60 px-5 py-4 ring-1 ring-white/60 focus-within:ring-2 focus-within:ring-pink-400">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Password */}
      <div className="rounded-2xl bg-white/60 px-5 py-4 ring-1 ring-white/60 focus-within:ring-2 focus-within:ring-pink-400">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-pink-500 py-4 font-semibold text-white shadow hover:bg-pink-600 transition disabled:opacity-60"
      >
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
