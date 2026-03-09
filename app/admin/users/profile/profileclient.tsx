"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string; // can be url/path
};

function RowButton({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "flex items-center justify-between rounded-2xl bg-white/55 px-5 py-4 shadow-sm ring-1 ring-white/40 backdrop-blur hover:bg-white/70 transition";

  if (href) {
    return (
      <Link className={base} href={href}>
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="text-xl text-gray-700">›</span>
      </Link>
    );
  }

  return (
    <button type="button" className={base} onClick={onClick}>
      <span className="font-semibold text-gray-900">{label}</span>
      <span className="text-xl text-gray-700">›</span>
    </button>
  );
}

export default function ProfileClient() {
  const router = useRouter();

  // Demo fallback user (until API is connected)
  const [user, setUser] = useState<UserProfile>({
    firstName: "Puja",
    lastName: "Khanal",
    email: "pujakhanal111@gmail.com",
    image: "/profile.jpg",
  });

  // OPTIONAL: fetch user from your backend
  // Replace URL with your API and include token if your API needs it.
  useEffect(() => {
    const load = async () => {
      try {
        // Example:
        // const res = await fetch("http://localhost:5050/api/auth/me", {
        //   credentials: "include", // if cookie-based auth
        // });
        // const data = await res.json();
        // if (data?.success) setUser(data.user);

      } catch (e) {
        console.log("Profile load error", e);
      }
    };

    load();
  }, []);

  const handleLogout = async () => {
    try {
      // If you have logout endpoint, call it here:
      // await fetch("http://localhost:5050/api/auth/logout", {
      //   method: "POST",
      //   credentials: "include",
      // });

      router.push("/login");
    } catch (e) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-pink-200 to-pink-100">
      {/* TOP BAR */}
      <div className="mx-auto max-w-md px-4 pt-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full bg-white/60 p-2 shadow-sm ring-1 ring-white/40 hover:bg-white/80 transition"
            aria-label="Back"
          >
            <span className="text-xl">‹</span>
          </button>

          <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>

          {/* Small top-right avatar (like mobile) */}
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/70 shadow-sm">
            <Image
              src={user.image || "/profile.jpg"}
              alt="Profile"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="mt-8 rounded-3xl bg-white/35 p-6 shadow-sm ring-1 ring-white/40 backdrop-blur">
          <div className="flex flex-col items-center">
            {/* Big Avatar */}
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/70 shadow-md">
              <Image
                src={user.image || "/profile.jpg"}
                alt="User"
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            <p className="mt-4 text-lg font-extrabold text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-700">{user.email}</p>

            {/* ACTION LIST */}
            <div className="mt-6 w-full space-y-3">
              <RowButton label="Edit Profile" href="/user/profile/edit" />
              <RowButton label="History" href="/user/history" />
              <RowButton label="Addresses" href="/user/addresses" />
              <RowButton label="Log Out" onClick={handleLogout} />
            </div>
          </div>
        </div>

        {/* Optional bottom padding */}
        <div className="h-10" />
      </div>
    </div>
  );
}
