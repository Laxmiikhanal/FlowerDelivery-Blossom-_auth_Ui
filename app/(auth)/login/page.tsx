import Link from "next/link";
import AuthNavbar from "../_components/AuthNavbar";
import LoginForm from "../_components/LoginForm";
import AuthSidePanel from "../_components/AuthSidePanel";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-20 right-[-200px] h-[560px] w-[560px] rounded-full bg-pink-200/45 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-fuchsia-100/35 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <AuthNavbar active="login" />

        <section className="mt-6 rounded-[30px] border border-white/70 bg-white/55 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:mt-8">
          <div className="px-4 py-6 sm:px-8 sm:py-10 md:px-10">
            <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <div className="grid min-h-[420px] lg:grid-cols-2">
                <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                    Welcome back
                  </h1>

                  <div className="mt-4 h-1 w-14 rounded-full bg-pink-500" />

                  <p className="mt-4 text-sm text-slate-600 md:text-base">
                    Sign in to continue ordering fresh flowers.
                  </p>

                  <div className="mt-8">
                    <LoginForm />
                  </div>

                  <p className="mt-6 text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-pink-600 hover:text-pink-700 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>

                <AuthSidePanel mode="login" />
              </div>
            </div>
          </div>

          <div className="h-4 sm:h-6" />
        </section>
      </div>
    </div>
  );
}