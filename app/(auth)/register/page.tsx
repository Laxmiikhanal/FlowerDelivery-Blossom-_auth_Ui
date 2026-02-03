"use client";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute top-10 right-[-180px] h-[560px] w-[560px] rounded-full bg-pink-200/60 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/blossomlogo.png"
            alt="Blossom Logo"
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold text-slate-800">Blossom</span>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="/home" className="hover:text-pink-500 transition">
            Home
          </Link>
          <Link href="#" className="hover:text-pink-500 transition">
            Offers
          </Link>
          <Link href="/login" className="hover:text-pink-500 transition">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-pink-500 px-5 py-2 text-white shadow hover:bg-pink-600 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* MAIN CARD */}
      <div className="relative z-10 flex min-h-[calc(100vh-110px)] items-center justify-center px-6">
        <div className="grid w-full max-w-[1000px] overflow-hidden rounded-3xl bg-white/40 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.18)] lg:grid-cols-2">
          
          {/* LEFT */}
          <div className="flex min-h-[620px] flex-col justify-center p-14">
            <h1 className="text-4xl font-extrabold text-slate-800">
              Create your account <span>🌸</span>
            </h1>

            <div className="mt-10">
              <RegisterForm />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center bg-pink-200/40 p-6">
            <div className="relative h-[620px] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/image4.jpg"
                alt="Flower bouquet"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
