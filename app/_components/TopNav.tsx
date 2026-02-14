"use client";

export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-pink-500 text-white flex items-center justify-center font-bold">
          B
        </div>
        <div>
          <p className="font-semibold">BLOSSOM</p>
          <p className="text-xs text-slate-500">Flower Paradise</p>
        </div>
      </div>

      <nav className="flex items-center gap-8 text-sm font-medium text-slate-700">
        <a href="/home" className="text-pink-500">Home</a>
        <a href="/shop">Shop</a>
        <a href="/cart">Cart</a>
        <a href="/orders">Orders</a>
      </nav>

      <div className="flex items-center gap-4">
        <span>🔔</span>
        <div className="h-9 w-9 rounded-full bg-purple-500 text-white flex items-center justify-center">
          R
        </div>
      </div>
    </header>
  );
}
