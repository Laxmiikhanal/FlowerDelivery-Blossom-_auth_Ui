import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100">
      
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-20 right-[-200px] h-[560px] w-[560px] rounded-full bg-pink-200/60 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      {/* Main container */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
        <div className="w-full rounded-[36px] border border-white/40 bg-white/30 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

          {/* NAVBAR */}
          <div className="flex items-center justify-between px-10 py-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/blossomlogo.png"
                alt="Blossom logo"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="text-lg font-semibold text-slate-800">
                Blossom
              </span>
            </div>

            {/* Menu */}
            <div className="flex items-center gap-10 text-sm font-medium text-slate-700">
              <Link href="/home" className="hover:text-pink-500 transition">
                Home
              </Link>
              <Link href="#" className="hover:text-pink-500 transition">
                Offers
              </Link>
              <Link href="/login" className="text-pink-500">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-pink-500 px-6 py-2.5 text-white shadow hover:bg-pink-600 transition"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/40" />

          {/* HERO CARD */}
          <div className="px-10 py-10">
            <div className="rounded-[32px] bg-white/60 p-10 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
              <div className="grid items-center gap-10 lg:grid-cols-2">

                {/* LEFT CONTENT */}
                <div>
                  <h1 className="text-[44px] leading-tight font-extrabold text-slate-800">
                    Welcome to <br /> Flower Delivery
                  </h1>

                  <p className="mt-5 max-w-md text-base text-slate-700">
                    Fresh flowers delivered to your doorstep.
                    <br />
                    Login or register to get started.
                  </p>

                  <div className="mt-8 flex gap-5">
                    <Link
                      href="/login"
                      className="w-[170px] rounded-2xl bg-pink-500 px-6 py-3 text-center font-semibold text-white shadow hover:bg-pink-600 transition"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="w-[170px] rounded-2xl border border-pink-300 bg-white px-6 py-3 text-center font-semibold text-pink-600 shadow hover:bg-pink-50 transition"
                    >
                      Register
                    </Link>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative h-[330px] w-[520px]">
                    <Image
                      src="/bikeeee.jpg"
                      alt="Flower delivery bike"
                      fill
                      className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.18)]"
                      priority
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
