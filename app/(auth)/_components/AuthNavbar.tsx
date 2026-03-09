import Image from "next/image";
import Link from "next/link";

type ActivePage = "home" | "offers" | "login" | "register";

type Props = {
  active?: ActivePage;
};

function navItemClass(isActive: boolean) {
  return [
    "rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-pink-50 text-pink-600 shadow-sm"
      : "text-slate-700 hover:bg-pink-50/80 hover:text-pink-600",
  ].join(" ");
}

function authBtnClass(isActive: boolean) {
  return [
    "rounded-xl px-4 sm:px-5 py-2 text-sm font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300",
    isActive
      ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-[0_10px_25px_rgba(236,72,153,0.25)] hover:from-pink-600 hover:to-fuchsia-600"
      : "border border-pink-200 bg-white text-pink-600 hover:bg-pink-50 hover:border-pink-300",
  ].join(" ");
}

export default function AuthNavbar({ active }: Props) {
  return (
    <header className="relative rounded-2xl border border-pink-100/80 bg-white/85 shadow-[0_8px_24px_rgba(236,72,153,0.08)] backdrop-blur-xl">
      {/* top accent line */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 p-1.5 shadow-sm ring-1 ring-pink-100">
            <Image
              src="/blossomlogo.png"
              alt="Blossom logo"
              width={28}
              height={28}
              className="rounded-md object-cover"
            />
          </div>

          <div className="leading-tight">
            <p className="text-base sm:text-lg font-extrabold tracking-[0.14em] bg-gradient-to-r from-pink-600 to-fuchsia-500 bg-clip-text text-transparent">
              BLOSSOM
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Flower Paradise
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/home" className={navItemClass(active === "home")}>
            Home
          </Link>

          <Link href="/offers" className={navItemClass(active === "offers")}>
            Offers
          </Link>

          <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

          <Link href="/login" className={authBtnClass(active === "login")}>
            Login
          </Link>

          <Link href="/register" className={authBtnClass(active === "register")}>
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}