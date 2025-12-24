import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="w-full max-w-xl rounded-2xl border bg-white p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold">Blossom Auth UI</h1>
        <p className="mt-2 text-gray-600">
          Sprint 1 (Frontend only): Next.js routes + Zod validation.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
          >
            Go to Login
          </Link>
          <Link
            href="/register"
            className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
          >
            Go to Register
          </Link>
        </div>
      </div>
    </main>
  );
}
