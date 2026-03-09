// import Image from "next/image";
// import Link from "next/link";
// import AuthNavbar from "../_components/AuthNavbar";
// import RegisterForm from "../_components/RegisterForm";

// export default function RegisterPage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-pink-200/40 blur-3xl" />
//         <div className="absolute top-10 right-[-200px] h-[560px] w-[560px] rounded-full bg-purple-200/35 blur-3xl" />
//         <div className="absolute bottom-[-240px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-pink-100/60 blur-3xl" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.10)_1px,transparent_0)] [background-size:28px_28px] opacity-40" />
//       </div>

//       <div className="relative mx-auto max-w-7xl px-6 py-10">
//         <AuthNavbar active="register" />

//         <div className="mt-12 flex justify-center">
//           <div className="w-full max-w-4xl rounded-[28px] bg-gradient-to-br from-pink-200/70 via-white to-purple-200/60 p-[1px] shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
//             <div className="overflow-hidden rounded-[28px] bg-white/80 backdrop-blur-xl">
//               <div className="grid lg:grid-cols-2">
//                 <div className="p-10 md:p-12">
//                   <h1 className="text-4xl font-extrabold text-slate-900">
//                     Create your account
//                   </h1>
//                   <p className="mt-2 text-sm text-slate-600">
//                     Start ordering fresh flowers in minutes.
//                   </p>

//                   <div className="mt-8">
//                     <RegisterForm />
//                   </div>

//                   <p className="mt-6 text-sm text-slate-600">
//                     Already have an account?{" "}
//                     <Link href="/login" className="font-semibold text-pink-500">
//                       Login
//                     </Link>
//                   </p>
//                 </div>

//                 <div className="relative hidden lg:block">
//                   <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 to-purple-200/30" />
//                   <Image
//                     src="/scooterlady.png"
//                     alt="Blossom"
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                   <div className="absolute inset-0 bg-white/15" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import AuthNavbar from "../_components/AuthNavbar";
import RegisterForm from "../_components/RegisterForm";
import AuthSidePanel from "../_components/AuthSidePanel";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
      {/* Soft background blobs (same vibe as welcome/login) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-20 right-[-200px] h-[560px] w-[560px] rounded-full bg-pink-200/45 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-fuchsia-100/35 blur-3xl" />
      </div>

      {/* SAME outer width as WelcomePage/LoginPage */}
      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <AuthNavbar active="register" />

        {/* SAME outer shell size/style */}
        <section className="mt-6 rounded-[30px] border border-white/70 bg-white/55 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:mt-8">
          <div className="px-4 py-6 sm:px-8 sm:py-10 md:px-10">
            {/* SAME inner card style */}
            <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white p-0 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <div className="grid min-h-[520px] lg:grid-cols-2">
                {/* Left: Form */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  {/* ✅ Normal solid heading color */}
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                    Join BLOSSOM
                  </h1>

                  {/* ✅ Simple solid accent line */}
                  <div className="mt-4 h-1 w-16 rounded-full bg-pink-500" />

                  <p className="mt-4 text-sm text-slate-600 md:text-base">
                    Create your account and start sending beautiful flowers.
                  </p>

                  <div className="mt-8">
                    <RegisterForm />
                  </div>

                  <p className="mt-6 text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-pink-600 hover:text-pink-700 hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>

                {/* Right: Clean image side panel (same style as login) */}
                <AuthSidePanel mode="register" />
              </div>
            </div>
          </div>

          <div className="h-4 sm:h-6" />
        </section>
      </div>
    </div>
  );
}