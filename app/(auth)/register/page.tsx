import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* top brand/nav */}
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow">
              <Image
                src="/blossomlogo.png"
                alt="Blossom"
                fill
                className="object-contain p-2"
                sizes="44px"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-pink-600">BLOSSOM</p>
              <p className="text-xs text-gray-500 -mt-1">Flower Paradise</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-gray-700">
            <Link href="/home" className="hover:text-pink-500 transition">
              Home
            </Link>
            <Link href="/offers" className="hover:text-pink-500 transition">
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

        {/* centered card */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-8 shadow-xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Create your account
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Start ordering fresh flowers in minutes.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
