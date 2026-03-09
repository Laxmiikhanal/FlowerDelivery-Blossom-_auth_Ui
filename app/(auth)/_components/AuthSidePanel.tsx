import Image from "next/image";

type Props = {
  mode?: "login" | "register";
};

export default function AuthSidePanel({ mode = "login" }: Props) {
  return (
    <div className="relative hidden lg:block overflow-hidden border-l border-pink-100/60">
      {/* Background image only */}
      <Image
        src="/sideimage.jpg"
        alt="Pink tulips"
        fill
        priority
        className="object-cover object-[center_48%]"
      />

      {/* Very subtle overlays (keeps it premium, not harsh) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/8 via-transparent to-fuchsia-100/8" />

      {/* Soft edge fade for nicer blending with the form side */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/18 to-transparent" />
    </div>
  );
}