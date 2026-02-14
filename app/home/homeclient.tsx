"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { updateProfile } from "@/lib/actions/profile-action";
import { getCurrentUser } from "@/lib/actions/user-action";
import { logout as logoutAction } from "@/lib/actions/logout-action";

import ProductCard from "@/app/_components/ProductCard";
import { specialOffers, freshFlowers, premiumBouquets } from "@/lib/products";
import { useCart } from "@/context/CartContext";

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

type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const found = cookies.find((c) => c.startsWith(`${name}=`));
  if (!found) return null;
  return found.split("=").slice(1).join("=");
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${
    60 * 60 * 24
  }`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export default function HomeClient() {
  const router = useRouter();
  const { totalItems } = useCart();

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

  // ✅ Load user
  useEffect(() => {
    const loadUser = async () => {
      // 1) Try server action (if it uses cookies)
      try {
        const serverUser = await getCurrentUser();
        if (serverUser?._id) {
          const normalized: UserData = {
            _id: serverUser._id,
            firstName: serverUser.firstName || "",
            lastName: serverUser.lastName || "",
            email: serverUser.email || "",
            role: serverUser.role || "user",
          };

          setUserData(normalized);
          setProfileData({
            firstName: normalized.firstName,
            lastName: normalized.lastName,
            email: normalized.email,
            password: "",
          });

          setCookie("userData", JSON.stringify(normalized));
          return;
        }
      } catch (e) {
        // ignore and fallback
      }

      // 2) Try cookie userData
      try {
        const raw = getCookie("userData");
        if (raw) {
          const decoded = decodeURIComponent(raw);
          const parsed = JSON.parse(decoded) as UserData;

          if (parsed?._id) {
            setUserData(parsed);
            setProfileData({
              firstName: parsed.firstName || "",
              lastName: parsed.lastName || "",
              email: parsed.email || "",
              password: "",
            });
            return;
          }
        }
      } catch (e) {
        // ignore and fallback
      }

      // 3) Try localStorage
      try {
        const id = localStorage.getItem("userId");
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");

        if (!token || !id) {
          router.push("/login");
          return;
        }

        const minimal: UserData = {
          _id: id,
          firstName: "",
          lastName: "",
          email: "",
          role: role || "user",
        };

        setUserData(minimal);
        setProfileData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        setCookie("userData", JSON.stringify(minimal));
        return;
      } catch (e) {
        router.push("/login");
      }
    };

    loadUser();
  }, [router]);

  // ✅ Profile update submit
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData?._id) return;

    setUpdating(true);
    setUpdateMessage("");

    const updateData: any = {};
    if (profileData.firstName !== userData.firstName)
      updateData.firstName = profileData.firstName;
    if (profileData.lastName !== userData.lastName)
      updateData.lastName = profileData.lastName;
    if (profileData.email !== userData.email) updateData.email = profileData.email;
    if (profileData.password) updateData.password = profileData.password;

    if (Object.keys(updateData).length === 0) {
      setUpdateMessage("No changes to update");
      setUpdating(false);
      return;
    }

    const result = await updateProfile(updateData);

    if (result?.success) {
      setUpdateMessage("Profile updated successfully!");

      if (result.data?._id) {
        const updated: UserData = {
          _id: result.data._id,
          firstName: result.data.firstName || "",
          lastName: result.data.lastName || "",
          email: result.data.email || "",
          role: result.data.role || userData.role || "user",
        };
        setUserData(updated);
        setCookie("userData", JSON.stringify(updated));
      } else {
        const updatedLocal: UserData = {
          ...userData,
          firstName: updateData.firstName ?? userData.firstName,
          lastName: updateData.lastName ?? userData.lastName,
          email: updateData.email ?? userData.email,
        };
        setUserData(updatedLocal);
        setCookie("userData", JSON.stringify(updatedLocal));
      }

      setProfileData((prev) => ({ ...prev, password: "" }));

      setTimeout(() => {
        setShowProfileModal(false);
        setUpdateMessage("");
      }, 1200);
    } else {
      setUpdateMessage(result?.message || "Failed to update profile");
    }

    setUpdating(false);
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (e) {}

    clearCookie("token");
    clearCookie("role");
    clearCookie("userId");
    clearCookie("userData");
    clearCookie("user_data");
    clearCookie("auth_token");

    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}

    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* HEADER */}
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

            {/* Nav - Desktop */}
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

              {/* Cart with badge */}
              <Link
                className="text-gray-700 hover:text-pink-500 font-medium transition relative"
                href="/cart"
              >
                Cart
                {totalItems > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-2 rounded-full bg-pink-500 text-white text-xs font-bold">
                    {totalItems}
                  </span>
                )}
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

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-pink-200 hover:ring-pink-400 transition-all hover:scale-105"
                  type="button"
                  aria-label="Open profile menu"
                >
                  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <ProfileIcon className="w-6 h-6" />
                  </div>
                </button>

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

              {/* Mobile button */}
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

      {/* Profile Modal */}
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
                    updateMessage.toLowerCase().includes("success")
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
            <h2 className="text-2xl font-bold text-gray-900">Special Offers 🎁</h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialOffers.map((p) => (
              <ProductCard key={p.id} product={p} variant="wide" />
            ))}
          </div>
        </section>

        {/* FLOWERS */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Fresh Flowers 🌸</h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {freshFlowers.map((p) => (
              <ProductCard key={p.id} product={p} variant="square" />
            ))}
          </div>
        </section>

        {/* BOUQUETS */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Premium Bouquets 💐</h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {premiumBouquets.map((p) => (
              <ProductCard key={p.id} product={p} variant="square" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
