"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/profile-action";
import { getCurrentUser } from "@/lib/actions/user-action";
import { logout as logoutAction } from "@/lib/actions/logout-action";

function CardImage({
  src,
  alt,
  variant = "square",
}: {
  src: string;
  alt: string;
  variant?: "square" | "wide";
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-gray-200 ${
        variant === "wide" ? "aspect-[4/3]" : "aspect-square"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={variant === "wide"}
      />
    </div>
  );
}

function ProfileIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 19a7 7 0 0114 0H5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function HomeClient() {
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const serverUserData = await getCurrentUser();

        if (serverUserData) {
          setUserData(serverUserData);
          setProfileData({
            firstName: serverUserData.firstName || "",
            lastName: serverUserData.lastName || "",
            email: serverUserData.email || "",
            password: "",
          });
        } else {
          const cookies = document.cookie.split(";");
          let userDataCookie = cookies.find((c) =>
            c.trim().startsWith("user_data=")
          );

          if (!userDataCookie) {
            userDataCookie = cookies.find((c) =>
              c.trim().startsWith("userData=")
            );
          }

          if (userDataCookie) {
            const data = JSON.parse(
              decodeURIComponent(userDataCookie.split("=")[1])
            );
            setUserData(data);
            setProfileData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              password: "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateMessage("");

    const updateData: any = {};
    if (profileData.firstName !== userData?.firstName)
      updateData.firstName = profileData.firstName;
    if (profileData.lastName !== userData?.lastName)
      updateData.lastName = profileData.lastName;
    if (profileData.email !== userData?.email)
      updateData.email = profileData.email;
    if (profileData.password) updateData.password = profileData.password;

    if (Object.keys(updateData).length === 0) {
      setUpdateMessage("No changes to update");
      setUpdating(false);
      return;
    }

    const result = await updateProfile(updateData);

    if (result.success) {
      setUpdateMessage("Profile updated successfully!");
      if (result.data) {
        setUserData(result.data);
      }
      setProfileData({ ...profileData, password: "" });
      setTimeout(() => {
        setShowProfileModal(false);
        setUpdateMessage("");
      }, 1500);
    } else {
      setUpdateMessage(result.message || "Failed to update profile");
    }

    setUpdating(false);
  };

  const handleLogout = async () => {
    await logoutAction();

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* BEAUTIFUL HEADER */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => router.push("/home")}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/blossomlogo.png"
                  alt="Blossom"
                  fill
                  className="object-contain p-2"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  BLOSSOM
                </span>
                <p className="text-xs text-gray-500">Flower Paradise</p>
              </div>
            </div>

            {/* Center Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                className="text-pink-500 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pink-500"
                href="/home"
              >
                Home
              </Link>
              <Link
                className="text-gray-700 hover:text-pink-500 font-medium transition"
                href="/products"
              >
                Shop
              </Link>
              <Link
                className="text-gray-700 hover:text-pink-500 font-medium transition"
                href="/cart"
              >
                Cart
              </Link>
              <Link
                className="text-gray-700 hover:text-pink-500 font-medium transition"
                href="/orders"
              >
                Orders
              </Link>
              {userData?.role === "admin" && (
                <Link
                  className="text-purple-600 hover:text-purple-700 font-semibold transition"
                  href="/admin/dashboard"
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                className="relative p-2 rounded-full hover:bg-pink-50 transition-colors group"
                aria-label="Notifications"
                type="button"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform inline-block">
                  🔔
                </span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-pink-200 hover:ring-pink-400 transition-all hover:scale-105"
                  type="button"
                  aria-label="Open profile menu"
                >
                  {/* ✅ PROFILE ICON (replaces letter) */}
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <ProfileIcon className="w-6 h-6" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">
                        {userData?.firstName} {userData?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{userData?.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (userData) {
                          setProfileData({
                            firstName: userData.firstName || "",
                            lastName: userData.lastName || "",
                            email: userData.email || "",
                            password: "",
                          });
                        }
                        setUpdateMessage("");
                        setShowProfileModal(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-pink-50 transition flex items-center gap-2"
                      type="button"
                    >
                      <span>👤</span> Edit Profile
                    </button>

                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                      onClick={() => setShowMenu(false)}
                    >
                      <span>📦</span> My Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                      type="button"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-pink-50"
                onClick={() => setShowMenu(!showMenu)}
                type="button"
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setUpdateMessage("");
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition"
                  type="button"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
              <div className="flex justify-center mb-4">
                {/* ✅ PROFILE ICON (replaces letter in modal) */}
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <ProfileIcon className="w-10 h-10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>

              {updateMessage && (
                <div
                  className={`p-3 rounded-xl text-sm ${
                    updateMessage.includes("success")
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {updateMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={updating}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 shadow-[0_10px_25px_rgba(236,72,153,0.3)]"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
      )}

      {/* BODY */}
      <main className="mx-auto max-w-7xl px-6 pb-12">
        {/* SEARCH */}
        <div className="mt-8">
          <div className="flex overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100 hover:ring-pink-300 transition">
            <input
              placeholder="Search flowers (e.g., Tulips, Roses, Sunflowers)"
              className="w-full px-6 py-4 outline-none text-gray-700"
            />
            <button className="bg-gradient-to-r from-pink-500 to-pink-600 px-10 font-semibold text-white hover:from-pink-600 hover:to-pink-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* OFFERS */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Special Offers 🎁
            </h2>
            <Link
              href="/offers"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardImage src="/flowers.jpg" alt="Offer flowers" variant="wide" />
            <CardImage
              src="/sunflowerrrr.jpg"
              alt="Offer sunflower bouquet"
              variant="wide"
            />
            <CardImage src="/birthday.jpg" alt="Birthday flowers" variant="wide" />
          </div>
        </section>

        {/* FLOWERS */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Fresh Flowers 🌸</h2>
            <Link
              href="/flowers"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <CardImage src="/whiterose.jpg" alt="White rose" />
            <CardImage src="/imageflower.jpg" alt="Bouquet wrap flower" />
            <CardImage src="/flowerholding.jpg" alt="Handheld bouquet" />
          </div>
        </section>

        {/* BOUQUETS */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Premium Bouquets 💐
            </h2>
            <Link
              href="/bouquets"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <CardImage src="/pinkbouquet.jpg" alt="Pink bouquet" />
            <CardImage src="/colorfulflower.jpg" alt="Colorful bouquet" />
            <CardImage src="/sunflower2.jpg" alt="Sunflower bouquet" />
          </div>
        </section>
      </main>
    </div>
  );
}
