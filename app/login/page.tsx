import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-pink-100 relative">

      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-16 py-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-semibold">BLOSSOM</span>
        </div>

        <div className="flex gap-8 text-sm">
          <Link href="/home">Home</Link>
          <Link href="#">Offers</Link>
          <Link href="/register">Register</Link>
          <Link href="#">Contact</Link>
        </div>
      </nav>

      {/* CENTER CARD */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[1000px] h-[520px] bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl grid grid-cols-2 overflow-hidden">

          {/* LEFT FORM */}
          <div className="p-14 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-6">
              Explore your favorite flowers
            </h1>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 rounded-xl bg-white/70 outline-none"
              />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-5 py-3 rounded-xl bg-white/70 outline-none"
              />
            </div>

            <button className="mt-6 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition">
              Login
            </button>

            <p className="text-sm mt-6">
              Don’t have an account?{" "}
              <Link href="/register" className="font-semibold">
                Register
              </Link>
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex items-center justify-center bg-pink-200">
            <Image         
         src="/Image6.png"
         alt="Flowers"
         width={320}
         height={420}
         className="rounded-2xl"
         />

        
          </div>

        </div>
      </div>
    </div>
  );
}
