"use client";
import Image from "next/image";


export default function HomeClient() {
  return ( 
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white px-10 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/blossomlogo.png" alt="Blossom" width={40} height={40} />
          <span className="font-semibold text-lg">BLOSSOM</span>
        </div>

        <nav className="flex gap-8 text-sm">
          <span className="text-pink-500 font-semibold">Home</span>
          <span>Cart</span>
          <span>Menu</span>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-pink-500 text-xl">🔔</span>
          <Image
            src="/profile.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </header>

      <div className="px-10 mt-6">
        <div className="flex bg-gray-200 rounded-lg overflow-hidden">
          <input
            placeholder="Tulips"
            className="flex-1 px-4 py-3 bg-transparent outline-none"
          />
          <button className="bg-pink-500 px-8 text-white font-semibold">
            Search
          </button>
        </div>
      </div>

      <section className="px-10 mt-8">
        <h2 className="font-semibold mb-3">Offers</h2>
        <div className="grid grid-cols-3 gap-4">
          <Image src="/flowers.jpg" alt="offer" width={200} height={180} className="rounded-lg" />
          <Image src="/sunflowerrrr.jpg" alt="offer" width={200} height={180} className="rounded-lg" />
          <Image src="/birthday.jpg" alt="offer" width={200} height={180} className="rounded-lg" />
        </div>
      </section>

      <section className="px-10 mt-8">
        <h2 className="font-semibold mb-3">Flowers</h2>
        <div className="flex gap-4">
          <Image src="/whiterose.jpg" alt="flower" width={120} height={120} className="rounded-lg" />
          <Image src="/flower2.png" alt="flower" width={120} height={120} className="rounded-lg" />
          <Image src="/flowerholding.jpg" alt="flower" width={120} height={120} className="rounded-lg" />
        </div>
      </section>

      <section className="px-10 mt-8 pb-10">
        <h2 className="font-semibold mb-3">Bouquets</h2>
        <div className="flex gap-4">
          <Image src="/pinkbouquet.jpg" alt="bouquet" width={120} height={120} className="rounded-lg" />
          <Image src="/colorfulflower.jpg" alt="bouquet" width={120} height={120} className="rounded-lg" />
          <Image src="/sunflower2.jpg" alt="bouquet" width={120} height={120} className="rounded-lg" />
        </div>
      </section>
    </div>
  );
}
