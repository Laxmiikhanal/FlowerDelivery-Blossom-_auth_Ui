import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({ href = "/home" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-4">
      <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-pink-300 shadow-lg ring-1 ring-black/5">
        <div className="absolute inset-[3px] rounded-2xl bg-white/20" />
        <Image
          src="/blossomlogo.png"
          alt="Blossom"
          fill
          className="object-contain p-3"
          sizes="56px"
          priority
        />
      </div>

      <div className="leading-none">
        <p className="text-2xl font-extrabold tracking-widest text-pink-600">
          BLOSSOM
        </p>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Flower Paradise
        </p>
      </div>
    </Link>
  );
}
