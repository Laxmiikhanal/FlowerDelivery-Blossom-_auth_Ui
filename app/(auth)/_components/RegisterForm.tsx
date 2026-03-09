// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { handleRegister } from "@/lib/actions/auth-action";
// import { inputClass, labelClass, buttonClass, alertErrorClass } from "./authStyles";

// export default function RegisterForm() {
//   const router = useRouter();
//   const [pending, startTransition] = useTransition();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showPw, setShowPw] = useState(false);
//   const [showCpw, setShowCpw] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const fn = firstName.trim();
//     const ln = lastName.trim();
//     const em = email.trim().toLowerCase();
//     const pw = password;
//     const cpw = confirmPassword;

//     if (!fn || !ln || !em || !pw || !cpw) {
//       setError("All fields are required.");
//       return;
//     }

//     if (pw.length < 8) {
//       setError("Password must be at least 8 characters.");
//       return;
//     }

//     if (pw !== cpw) {
//       setError("Passwords do not match.");
//       return;
//     }

//     startTransition(async () => {
//       const result = await handleRegister({
//         firstName: fn,
//         lastName: ln,
//         email: em,
//         password: pw,
//         confirmPassword: cpw,
//       });

//       if (!result?.success) {
//         setError(result?.message || "Registration failed");
//         return;
//       }

//       router.replace("/login?registered=1");
//     });
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-5">
//       {error && <p className={alertErrorClass}>{error}</p>}

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//         <div className="space-y-2">
//           <label className={labelClass}>First name</label>
//           <input
//             type="text"
//             autoComplete="given-name"
//             placeholder="John"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className={inputClass}
//           />
//         </div>

//         <div className="space-y-2">
//           <label className={labelClass}>Last name</label>
//           <input
//             type="text"
//             autoComplete="family-name"
//             placeholder="Doe"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className={inputClass}
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <label className={labelClass}>Email address</label>
//         <input
//           type="email"
//           autoComplete="email"
//           placeholder="name@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={inputClass}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className={labelClass}>Password</label>
//         <div className="relative">
//           <input
//             type={showPw ? "text" : "password"}
//             autoComplete="new-password"
//             placeholder="At least 8 characters"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={inputClass + " pr-14"}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPw((v) => !v)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
//           >
//             {showPw ? "Hide" : "Show"}
//           </button>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <label className={labelClass}>Confirm password</label>
//         <div className="relative">
//           <input
//             type={showCpw ? "text" : "password"}
//             autoComplete="new-password"
//             placeholder="Re-enter password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className={inputClass + " pr-14"}
//           />
//           <button
//             type="button"
//             onClick={() => setShowCpw((v) => !v)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
//           >
//             {showCpw ? "Hide" : "Show"}
//           </button>
//         </div>
//       </div>

//       <button type="submit" disabled={pending} className={buttonClass}>
//         {pending ? "Registering..." : "Create account"}
//       </button>
//     </form>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/actions/auth-action";
import {
  inputClass,
  passwordInputClass,
  labelClass,
  buttonClass,
  alertErrorClass,
} from "./authStyles";

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
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
      setError("All fields are required.");
      return;
    }

    if (pw.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (pw !== cpw) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
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
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <p className={alertErrorClass}>{error}</p>}

      {/* First + Last Name (normal input style) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClass}>First name</label>
          <input
            type="text"
            autoComplete="given-name"
            placeholder=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Last name</label>
          <input
            type="text"
            autoComplete="family-name"
            placeholder=""
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email (normal input style) */}
      <div className="space-y-2">
        <label className={labelClass}>Email address</label>
        <input
          type="email"
          autoComplete="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Password (special style with Show button space) */}
      <div className="space-y-2">
        <label className={labelClass}>Password</label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            autoComplete=""
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordInputClass}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-pink-50 hover:text-pink-600"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Confirm Password (special style with Show button space) */}
      <div className="space-y-2">
        <label className={labelClass}>Confirm password</label>
        <div className="relative">
          <input
            type={showCpw ? "text" : "password"}
            autoComplete=""
            placeholder=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={passwordInputClass}
          />
          <button
            type="button"
            onClick={() => setShowCpw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-pink-50 hover:text-pink-600"
          >
            {showCpw ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Creating account...
          </span>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}