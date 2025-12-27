export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-10 max-w-5xl auth-card">

        {/* Left */}
        <div className="flex items-center justify-center text-white">
          <div>
            <h1 className="text-4xl font-bold">Hello</h1>
            <h2 className="text-3xl font-semibold">Welcome!</h2>
            <p className="mt-4 text-sm">
              Join Blossom and start discovering beautiful flowers with fast delivery.
            </p>
          </div>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <input className="input mt-3" placeholder="Email" />
          <input className="input mt-4" type="password" placeholder="Password" />
          <input className="input mt-4" type="password" placeholder="Confirm Password" />

          <button className="btn-primary mt-6 w-full">Register</button>

          <p className="text-sm mt-4 text-center">
            Already have an account?
          </p>
        </div>
      </div>
    </div>
  );
}
