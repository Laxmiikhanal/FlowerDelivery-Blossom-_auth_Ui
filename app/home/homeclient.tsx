// // // // "use client";

// // // // import React, { useState, useEffect } from "react";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import { useRouter } from "next/navigation";
// // // // import { useCart } from "@/context/CartContext";
// // // // import { getCurrentUser } from "@/lib/actions/user-action";
// // // // import { logout as logoutAction } from "@/lib/actions/logout-action";

// // // // // ------------------ TYPES ------------------
// // // // interface UserData {
// // // //   _id: string;
// // // //   firstName: string;
// // // //   lastName: string;
// // // //   email: string;
// // // //   role: string;
// // // // }

// // // // interface ProductItem {
// // // //   id: string;
// // // //   src: string;
// // // //   alt: string;
// // // //   name: string;
// // // //   price: number;
// // // // }

// // // // // ------------------ CARD IMAGE ------------------
// // // // function CardImage({
// // // //   src,
// // // //   alt,
// // // //   variant = "square",
// // // // }: {
// // // //   src: string;
// // // //   alt: string;
// // // //   variant?: "square" | "wide";
// // // // }) {
// // // //   return (
// // // //     <div
// // // //       className={`relative w-full overflow-hidden rounded-2xl bg-gray-200 ${
// // // //         variant === "wide" ? "aspect-[4/3]" : "aspect-square"
// // // //       }`}
// // // //     >
// // // //       <Image src={src} alt={alt} fill className="object-cover" />
// // // //     </div>
// // // //   );
// // // // }

// // // // // ------------------ MAIN COMPONENT ------------------
// // // // export default function HomeClient() {
// // // //   const router = useRouter();
// // // //   const { addToCart, items: cartItems, totalItems } = useCart();
// // // //   const [userData, setUserData] = useState<UserData | null>(null);
// // // //   const [showMenu, setShowMenu] = useState(false);
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [toastMessage, setToastMessage] = useState("");

// // // //   // ------------------ USER DATA ------------------
// // // //   useEffect(() => {
// // // //     const loadUserData = async () => {
// // // //       try {
// // // //         const data = await getCurrentUser();
// // // //         if (data) setUserData(data);
// // // //       } catch (err) {
// // // //         console.error(err);
// // // //       }
// // // //     };
// // // //     loadUserData();
// // // //   }, []);

// // // //   // ------------------ PRODUCTS ------------------
// // // //   const products: ProductItem[] = [
// // // //     { id: "1", src: "/flowers.jpg", alt: "Offer flowers", name: "Floral Surprise", price: 2500 },
// // // //     { id: "2", src: "/sunflowerrrr.jpg", alt: "Sunflower bouquet", name: "Sunny Sunflowers", price: 3200 },
// // // //     { id: "3", src: "/birthday.jpg", alt: "Birthday flowers", name: "Birthday Delight", price: 4000 },
// // // //     { id: "4", src: "/whiterose.jpg", alt: "White rose", name: "White Rose", price: 1500 },
// // // //     { id: "5", src: "/redrose.jpg", alt: "Red rose", name: "Red Rose Classic", price: 1800 },
// // // //     { id: "6", src: "/pinkrosebouquet.jpg", alt: "Pink rose", name: "Pink Rose Bouquet", price: 2200 },
// // // //     { id: "7", src: "/imageflower.jpg", alt: "Luxury rose bouquet", name: "Rose Bouquet", price: 5500 },
// // // //     { id: "8", src: "/pinkrosee.jpg", alt: "Pink rose", name: "Pink Rose", price: 125 },
// // // //     { id: "9", src: "/image6.png", alt: "Tulip bouquet", name: "Fresh Tulip Bouquet", price: 3800 },
// // // //     { id: "10", src: "/yellowtulip.jpg", alt: "Yellow tulip", name: "Yellow Tulip", price: 285 },
// // // //     { id: "11", src: "/whitetulip.jpg", alt: "White tulip", name: "White Tulip", price: 290 },
// // // //     { id: "12", src: "/bouquet.jpg", alt: "Mix bouquet", name: "Pink Elegance", price: 3500 },
// // // //     { id: "13", src: "/colorfulflower.jpg", alt: "Colorful bouquet", name: "Rainbow Bliss", price: 2800 },
// // // //   ];

// // // //   // ------------------ SEARCH FILTER ------------------
// // // //   const filteredProducts = products.filter((p) =>
// // // //     p.name.toLowerCase().includes(searchQuery.toLowerCase())
// // // //   );

// // // //   // ------------------ ADD TO CART ------------------
// // // //   const handleAddToCart = (item: ProductItem) => {
// // // //     addToCart({
// // // //       id: item.id,
// // // //       name: item.name,
// // // //       price: item.price,
// // // //       image: item.src,
// // // //     });
// // // //     setToastMessage(`${item.name} added to cart!`);
// // // //     setTimeout(() => setToastMessage(""), 2000);
// // // //   };

// // // //   // ------------------ LOGOUT ------------------
// // // //   const handleLogout = async () => {
// // // //     await logoutAction();
// // // //     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// // // //     router.push("/login");
// // // //   };

// // // //   return (
// // // //     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">

// // // //       {/* ================= HEADER ================= */}
// // // //       <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-40">
// // // //         <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

// // // //           {/* LOGO */}
// // // //           <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/home")}>
// // // //             <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
// // // //               <Image src="/blossomlogo.png" alt="Blossom" fill className="object-contain p-2" />
// // // //             </div>
// // // //             <div>
// // // //              <h1 className="text-2xl font-bold text-pink-600">
// // // //   BLOSSOM
// // // // </h1>
// // // //               <p className="text-xs text-gray-500">Flower Paradise</p>
// // // //             </div>
// // // //           </div>

// // // //           {/* NAV */}
// // // //           <nav className="hidden md:flex gap-8 font-medium">
// // // //             <Link href="/home" className="text-pink-500 border-b-2 border-pink-500 pb-1">Home</Link>
// // // //             <Link href="/products" className="hover:text-pink-500 transition">Shop</Link>
// // // //             <Link href="/cart" className="hover:text-pink-500 transition relative">
// // // //               Cart
// // // //               {totalItems > 0 && (
// // // //                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
// // // //                   {totalItems}
// // // //                 </span>
// // // //               )}
// // // //             </Link>
// // // //             <Link href="/orders" className="hover:text-pink-500 transition">Orders</Link>
// // // //           </nav>

// // // //           {/* PROFILE */}
// // // //           <div className="relative">
// // // //             <button
// // // //               onClick={() => setShowMenu(!showMenu)}
// // // //               className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold"
// // // //             >
// // // //               {userData?.firstName?.[0] || "U"}
// // // //             </button>

// // // //             {showMenu && (
// // // //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2">
// // // //                 <Link href="/profile" className="block px-4 py-2 hover:bg-pink-50">Edit Profile</Link>
// // // //                 <Link href="/orders" className="block px-4 py-2 hover:bg-pink-50">My Orders</Link>
// // // //                 <button
// // // //                   onClick={handleLogout}
// // // //                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
// // // //                 >
// // // //                   Logout
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //         </div>
// // // //       </header>

// // // //       {/* ================= SEARCH ================= */}
// // // //       <main className="mx-auto max-w-7xl px-6 pb-12 mt-8">
// // // //         <div className="flex overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100">
// // // //           <input
// // // //             placeholder="Search flowers (Rose, Tulip...)"
// // // //             className="w-full px-6 py-4 outline-none bg-white"
// // // //             value={searchQuery}
// // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // //           />
// // // //    {/* Search Button */}
// // // // <button className="bg-pink-500 px-10 font-semibold text-white py-2 rounded-xl hover:bg-pink-600 transition">
// // // //   Search
// // // // </button>
// // // //         </div>

// // // //         {/* ================= PRODUCTS ================= */}
// // // //         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //           {filteredProducts.map((item) => {
// // // //             const cartQty = cartItems.find(x => x.id === item.id)?.qty || 0;
// // // //             return (
// // // //               <div key={item.id} className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
// // // //                 <CardImage src={item.src} alt={item.alt} variant="wide" />
// // // //                 <div className="flex justify-between items-center mt-2">
// // // //                   <span className="text-gray-800 font-medium">{item.name}</span>
// // // //                   <span className="text-pink-600 font-semibold">Rs {item.price}</span>
// // // //                 </div>
// // // //               <button
// // // //   onClick={() => handleAddToCart(item)}
// // // //   className="w-full bg-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-pink-600 transition flex justify-between items-center"
// // // // >
// // // //   <span>Add to Cart</span>
// // // //   {cartQty > 0 && <span className="bg-white text-pink-600 font-bold px-2 py-0.5 rounded-full">{cartQty}</span>}
// // // // </button>
// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </main>

// // // //       {/* ================= TOAST ================= */}
// // // //       {toastMessage && (
// // // //         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
// // // //           {toastMessage}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { useRouter } from "next/navigation";
// // // import { useCart } from "@/context/CartContext";
// // // import { getCurrentUser } from "@/lib/actions/user-action";
// // // import { logout as logoutAction } from "@/lib/actions/logout-action";
// // // import { updateProfile } from "@/lib/actions/profile-action";

// // // // ------------------ TYPES ------------------
// // // interface UserData {
// // //   _id: string;
// // //   firstName: string;
// // //   lastName: string;
// // //   email: string;
// // //   role: string;
// // // }

// // // interface ProductItem {
// // //   id: string;
// // //   src: string;
// // //   alt: string;
// // //   name: string;
// // //   price: number;
// // // }

// // // // ------------------ CARD IMAGE ------------------
// // // function CardImage({
// // //   src,
// // //   alt,
// // //   variant = "square",
// // // }: {
// // //   src: string;
// // //   alt: string;
// // //   variant?: "square" | "wide";
// // // }) {
// // //   return (
// // //     <div
// // //       className={`relative w-full overflow-hidden rounded-2xl bg-gray-200 ${
// // //         variant === "wide" ? "aspect-[4/3]" : "aspect-square"
// // //       }`}
// // //     >
// // //       <Image src={src} alt={alt} fill className="object-cover" />
// // //     </div>
// // //   );
// // // }

// // // // ------------------ PROFILE ICON ------------------
// // // function ProfileIcon({ className = "w-6 h-6" }: { className?: string }) {
// // //   return (
// // //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={className} aria-hidden="true">
// // //       <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 19a7 7 0 0114 0H5z" clipRule="evenodd" />
// // //     </svg>
// // //   );
// // // }

// // // // ------------------ MAIN COMPONENT ------------------
// // // export default function HomeClient() {
// // //   const router = useRouter();
// // //   const { addToCart, items: cartItems, totalItems } = useCart();

// // //   const [userData, setUserData] = useState<UserData | null>(null);
// // //   const [showMenu, setShowMenu] = useState(false);
// // //   const [showProfileModal, setShowProfileModal] = useState(false);
// // //   const [profileData, setProfileData] = useState({ firstName: "", lastName: "", email: "", password: "" });
// // //   const [updateMessage, setUpdateMessage] = useState("");
// // //   const [updating, setUpdating] = useState(false);

// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [toastMessage, setToastMessage] = useState("");

// // //   // ------------------ USER DATA ------------------
// // //   useEffect(() => {
// // //     const loadUserData = async () => {
// // //       try {
// // //         const data = await getCurrentUser();
// // //         if (data) setUserData(data);
// // //       } catch (err) {
// // //         console.error(err);
// // //       }
// // //     };
// // //     loadUserData();
// // //   }, []);

// // //   // ------------------ PRODUCTS ------------------
// // //   const products: ProductItem[] = [
// // //     { id: "1", src: "/flowers.jpg", alt: "Offer flowers", name: "Floral Surprise", price: 2500 },
// // //     { id: "2", src: "/sunflowerrrr.jpg", alt: "Sunflower bouquet", name: "Sunny Sunflowers", price: 3200 },
// // //     { id: "3", src: "/birthday.jpg", alt: "Birthday flowers", name: "Birthday Delight", price: 4000 },
// // //     { id: "4", src: "/whiterose.jpg", alt: "White rose", name: "White Rose", price: 1500 },
// // //     { id: "5", src: "/redrose.jpg", alt: "Red rose", name: "Red Rose Classic", price: 1800 },
// // //     { id: "6", src: "/pinkrosebouquet.jpg", alt: "Pink rose", name: "Pink Rose Bouquet", price: 2200 },
// // //     { id: "7", src: "/imageflower.jpg", alt: "Luxury rose bouquet", name: "Rose Bouquet", price: 5500 },
// // //     { id: "8", src: "/pinkrosee.jpg", alt: "Pink rose", name: "Pink Rose", price: 125 },
// // //     { id: "9", src: "/image6.png", alt: "Tulip bouquet", name: "Fresh Tulip Bouquet", price: 3800 },
// // //     { id: "10", src: "/yellowtulip.jpg", alt: "Yellow tulip", name: "Yellow Tulip", price: 285 },
// // //     { id: "11", src: "/whitetulip.jpg", alt: "White tulip", name: "White Tulip", price: 290 },
// // //     { id: "12", src: "/bouquet.jpg", alt: "Mix bouquet", name: "Pink Elegance", price: 3500 },
// // //     { id: "13", src: "/colorfulflower.jpg", alt: "Colorful bouquet", name: "Rainbow Bliss", price: 2800 },
// // //   ];

// // //   const filteredProducts = products.filter((p) =>
// // //     p.name.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   // ------------------ ADD TO CART ------------------
// // //   const handleAddToCart = (item: ProductItem) => {
// // //     addToCart({
// // //       id: item.id,
// // //       name: item.name,
// // //       price: item.price,
// // //       image: item.src,
// // //     });
// // //     setToastMessage(`${item.name} added to cart!`);
// // //     setTimeout(() => setToastMessage(""), 2000);
// // //   };

// // //   // ------------------ LOGOUT ------------------
// // //   const handleLogout = async () => {
// // //     await logoutAction();
// // //     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// // //     router.push("/login");
// // //   };

// // //   // ------------------ PROFILE UPDATE ------------------
// // //   const handleProfileUpdate = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!userData) return;

// // //     setUpdating(true);
// // //     setUpdateMessage("");

// // //     const updateData: any = {};
// // //     if (profileData.firstName !== userData.firstName) updateData.firstName = profileData.firstName;
// // //     if (profileData.lastName !== userData.lastName) updateData.lastName = profileData.lastName;
// // //     if (profileData.email !== userData.email) updateData.email = profileData.email;
// // //     if (profileData.password) updateData.password = profileData.password;

// // //     if (Object.keys(updateData).length === 0) {
// // //       setUpdateMessage("No changes to update");
// // //       setUpdating(false);
// // //       return;
// // //     }

// // //     const result = await updateProfile(updateData);

// // //     if (result?.success) {
// // //       const updatedUser: UserData = {
// // //         _id: result.data?._id || userData._id,
// // //         firstName: result.data?.firstName || profileData.firstName || userData.firstName,
// // //         lastName: result.data?.lastName || profileData.lastName || userData.lastName,
// // //         email: result.data?.email || profileData.email || userData.email,
// // //         role: result.data?.role || userData.role,
// // //       };
// // //       setUserData(updatedUser);
// // //       setProfileData((prev) => ({ ...prev, password: "" }));
// // //       setUpdateMessage("Profile updated successfully!");
// // //       setTimeout(() => {
// // //         setShowProfileModal(false);
// // //         setUpdateMessage("");
// // //       }, 1200);
// // //     } else {
// // //       setUpdateMessage(result?.message || "Failed to update profile");
// // //     }
// // //     setUpdating(false);
// // //   };

// // //   return (
// // //     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">

// // //       {/* ================= HEADER ================= */}
// // //       <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-40">
// // //         <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

// // //           {/* LOGO */}
// // //           <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/home")}>
// // //             <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
// // //               <Image src="/blossomlogo.png" alt="Blossom" fill className="object-contain p-2" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-pink-600">BLOSSOM</h1>
// // //               <p className="text-xs text-gray-500">Flower Paradise</p>
// // //             </div>
// // //           </div>

// // //           {/* NAV */}
// // //           <nav className="hidden md:flex gap-8 font-medium">
// // //             <Link href="/home" className="text-pink-500 border-b-2 border-pink-500 pb-1">Home</Link>
// // //             <Link href="/products" className="hover:text-pink-500 transition">Shop</Link>
// // //             <Link href="/cart" className="hover:text-pink-500 transition relative">
// // //               Cart
// // //               {totalItems > 0 && (
// // //                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
// // //                   {totalItems}
// // //                 </span>
// // //               )}
// // //             </Link>
// // //             <Link href="/orders" className="hover:text-pink-500 transition">Orders</Link>
// // //           </nav>

// // //           {/* PROFILE */}
// // //           <div className="relative">
// // //             <button
// // //               onClick={() => setShowMenu(!showMenu)}
// // //               className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold"
// // //             >
// // //               {userData?.firstName?.[0] || "U"}
// // //             </button>

// // //             {showMenu && (
// // //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2">
// // //                 <button
// // //                   onClick={() => {
// // //                     setProfileData({
// // //                       firstName: userData?.firstName || "",
// // //                       lastName: userData?.lastName || "",
// // //                       email: userData?.email || "",
// // //                       password: "",
// // //                     });
// // //                     setShowProfileModal(true);
// // //                     setShowMenu(false);
// // //                   }}
// // //                   className="block w-full text-left px-4 py-2 hover:bg-pink-50"
// // //                 >
// // //                   Edit Profile
// // //                 </button>
// // //                 <Link href="/orders" className="block px-4 py-2 hover:bg-pink-50" onClick={() => setShowMenu(false)}>My Orders</Link>
// // //                 <button
// // //                   onClick={handleLogout}
// // //                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>

// // //         </div>
// // //       </header>

// // //       {/* ================= SEARCH ================= */}
// // //       <main className="mx-auto max-w-7xl px-6 pb-12 mt-8">
// // //         <div className="flex overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100">
// // //           <input
// // //             placeholder="Search flowers (Rose, Tulip...)"
// // //             className="w-full px-6 py-4 outline-none bg-white"
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //           />
// // //           <button className="bg-pink-500 px-10 font-semibold text-white py-2 rounded-xl hover:bg-pink-600 transition">
// // //             Search
// // //           </button>
// // //         </div>

// // //         {/* ================= PRODUCTS ================= */}
// // //         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredProducts.map((item) => {
// // //             const cartQty = cartItems.find(x => x.id === item.id)?.qty || 0;
// // //             return (
// // //               <div key={item.id} className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
// // //                 <CardImage src={item.src} alt={item.alt} variant="wide" />
// // //                 <div className="flex justify-between items-center mt-2">
// // //                   <span className="text-gray-800 font-medium">{item.name}</span>
// // //                   <span className="text-pink-600 font-semibold">Rs {item.price}</span>
// // //                 </div>
// // //                 <button
// // //                   onClick={() => handleAddToCart(item)}
// // //                   className="w-full bg-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-pink-600 transition flex justify-between items-center"
// // //                 >
// // //                   <span>Add to Cart</span>
// // //                   {cartQty > 0 && <span className="bg-white text-pink-600 font-bold px-2 py-0.5 rounded-full">{cartQty}</span>}
// // //                 </button>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       </main>

// // //       {/* ================= PROFILE MODAL ================= */}
// // //       {showProfileModal && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
// // //           <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
// // //             <div className="rounded-t-3xl bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex items-center justify-between">
// // //               <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
// // //               <button onClick={() => setShowProfileModal(false)} className="rounded-full p-2 text-white transition hover:bg-white/20">✕</button>
// // //             </div>

// // //             <form onSubmit={handleProfileUpdate} className="space-y-4 p-6">
// // //               <div className="flex justify-center mb-4">
// // //                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
// // //                   <ProfileIcon className="h-10 w-10" />
// // //                 </div>
// // //               </div>

// // //               {["firstName","lastName","email"].map((field) => (
// // //                 <div key={field}>
// // //                   <label className="mb-2 block text-sm font-semibold text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// // //                   <input
// // //                     type={field === "email" ? "email" : "text"}
// // //                     value={profileData[field as keyof typeof profileData]}
// // //                     onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
// // //                     className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-pink-500"
// // //                     required
// // //                   />
// // //                 </div>
// // //               ))}

// // //               <div>
// // //                 <label className="mb-2 block text-sm font-semibold text-gray-700">New Password (optional)</label>
// // //                 <input
// // //                   type="password"
// // //                   placeholder="Leave blank to keep current"
// // //                   value={profileData.password}
// // //                   onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
// // //                   className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-pink-500"
// // //                 />
// // //               </div>

// // //               {updateMessage && (
// // //                 <div className={`rounded-xl p-3 text-sm ${updateMessage.toLowerCase().includes("success") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
// // //                   {updateMessage}
// // //                 </div>
// // //               )}

// // //               <button type="submit" disabled={updating} className="w-full rounded-xl bg-pink-100 text-pink-700 py-2 px-4 font-medium hover:bg-pink-200 transition">
// // //                 {updating ? "Updating..." : "Save Changes"}
// // //               </button>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ================= TOAST ================= */}
// // //       {toastMessage && (
// // //         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
// // //           {toastMessage}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }




// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useCart } from "@/context/CartContext";
// // import { getCurrentUser } from "@/lib/actions/user-action";
// // import { logout as logoutAction } from "@/lib/actions/logout-action";
// // import { updateProfile } from "@/lib/actions/profile-action";

// // // ------------------ TYPES ------------------
// // interface UserData {
// //   _id: string;
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   role: string;
// // }

// // interface ProductItem {
// //   _id: string; // ✅ MongoDB product _id (IMPORTANT)
// //   src: string;
// //   alt: string;
// //   name: string;
// //   price: number;
// // }

// // // ------------------ CARD IMAGE ------------------
// // function CardImage({
// //   src,
// //   alt,
// //   variant = "square",
// // }: {
// //   src: string;
// //   alt: string;
// //   variant?: "square" | "wide";
// // }) {
// //   return (
// //     <div
// //       className={`relative w-full overflow-hidden rounded-2xl bg-gray-200 ${
// //         variant === "wide" ? "aspect-[4/3]" : "aspect-square"
// //       }`}
// //     >
// //       <Image src={src} alt={alt} fill className="object-cover" />
// //     </div>
// //   );
// // }

// // // ------------------ PROFILE ICON ------------------
// // function ProfileIcon({ className = "w-6 h-6" }: { className?: string }) {
// //   return (
// //     <svg
// //       xmlns="http://www.w3.org/2000/svg"
// //       viewBox="0 0 24 24"
// //       fill="white"
// //       className={className}
// //       aria-hidden="true"
// //     >
// //       <path
// //         fillRule="evenodd"
// //         d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 19a7 7 0 0114 0H5z"
// //         clipRule="evenodd"
// //       />
// //     </svg>
// //   );
// // }

// // // ------------------ MAIN COMPONENT ------------------
// // export default function HomeClient() {
// //   const router = useRouter();
// //   const { addToCart, items: cartItems, totalItems, clearCart } = useCart();

// //   const [userData, setUserData] = useState<UserData | null>(null);
// //   const [showMenu, setShowMenu] = useState(false);
// //   const [showProfileModal, setShowProfileModal] = useState(false);
// //   const [profileData, setProfileData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //   });
// //   const [updateMessage, setUpdateMessage] = useState("");
// //   const [updating, setUpdating] = useState(false);

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [toastMessage, setToastMessage] = useState("");

// //   // ------------------ USER DATA ------------------
// //   useEffect(() => {
// //     const loadUserData = async () => {
// //       try {
// //         const data = await getCurrentUser();
// //         if (data) setUserData(data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     loadUserData();
// //   }, []);

// //   // ------------------ PRODUCTS ------------------
// //   // ✅ IMPORTANT: replace these _id with REAL MongoDB Product _id values
// //   const products: ProductItem[] = [
// //     {
// //       _id: "65fa11111111111111111111",
// //       src: "/flowers.jpg",
// //       alt: "Offer flowers",
// //       name: "Floral Surprise",
// //       price: 2500,
// //     },
// //     {
// //       _id: "65fa22222222222222222222",
// //       src: "/sunflowerrrr.jpg",
// //       alt: "Sunflower bouquet",
// //       name: "Sunny Sunflowers",
// //       price: 3200,
// //     },
// //     {
// //       _id: "65fa33333333333333333333",
// //       src: "/birthday.jpg",
// //       alt: "Birthday flowers",
// //       name: "Birthday Delight",
// //       price: 4000,
// //     },
// //     {
// //       _id: "65fa44444444444444444444",
// //       src: "/whiterose.jpg",
// //       alt: "White rose",
// //       name: "White Rose",
// //       price: 1500,
// //     },
// //     {
// //       _id: "65fa55555555555555555555",
// //       src: "/redrose.jpg",
// //       alt: "Red rose",
// //       name: "Red Rose Classic",
// //       price: 1800,
// //     },
// //     {
// //       _id: "65fa66666666666666666666",
// //       src: "/pinkrosebouquet.jpg",
// //       alt: "Pink rose",
// //       name: "Pink Rose Bouquet",
// //       price: 2200,
// //     },
// //     {
// //       _id: "65fa77777777777777777777",
// //       src: "/imageflower.jpg",
// //       alt: "Luxury rose bouquet",
// //       name: "Rose Bouquet",
// //       price: 5500,
// //     },
// //     {
// //       _id: "65fa88888888888888888888",
// //       src: "/pinkrosee.jpg",
// //       alt: "Pink rose",
// //       name: "Pink Rose",
// //       price: 125,
// //     },
// //     {
// //       _id: "65fa99999999999999999999",
// //       src: "/image6.png",
// //       alt: "Tulip bouquet",
// //       name: "Fresh Tulip Bouquet",
// //       price: 3800,
// //     },
// //     {
// //       _id: "65fabbbbbbbbbbbbbbbbbbbb",
// //       src: "/yellowtulip.jpg",
// //       alt: "Yellow tulip",
// //       name: "Yellow Tulip",
// //       price: 285,
// //     },
// //     {
// //       _id: "65facccccccccccccccccccc",
// //       src: "/whitetulip.jpg",
// //       alt: "White tulip",
// //       name: "White Tulip",
// //       price: 290,
// //     },
// //     {
// //       _id: "65fadddddddddddddddddddd",
// //       src: "/bouquet.jpg",
// //       alt: "Mix bouquet",
// //       name: "Pink Elegance",
// //       price: 3500,
// //     },
// //     {
// //       _id: "65faeeeeeeeeeeeeeeeeeeee",
// //       src: "/colorfulflower.jpg",
// //       alt: "Colorful bouquet",
// //       name: "Rainbow Bliss",
// //       price: 2800,
// //     },
// //   ];

// //   const filteredProducts = products.filter((p) =>
// //     p.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   // ------------------ ADD TO CART ------------------
// //   const handleAddToCart = (item: ProductItem) => {
// //     addToCart({
// //       id: item._id,
// //       productId: item._id, // ✅ MUST be MongoDB _id
// //       name: item.name,
// //       price: item.price,
// //       image: item.src,
// //       qty: 1,
// //     });

// //     setToastMessage(`${item.name} added to cart!`);
// //     setTimeout(() => setToastMessage(""), 2000);
// //   };

// //   // ------------------ LOGOUT ------------------
// //   const handleLogout = async () => {
// //     await logoutAction();
// //     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// //     router.push("/login");
// //   };

// //   // ------------------ PROFILE UPDATE ------------------
// //   const handleProfileUpdate = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!userData) return;

// //     setUpdating(true);
// //     setUpdateMessage("");

// //     const updateData: any = {};
// //     if (profileData.firstName !== userData.firstName)
// //       updateData.firstName = profileData.firstName;
// //     if (profileData.lastName !== userData.lastName)
// //       updateData.lastName = profileData.lastName;
// //     if (profileData.email !== userData.email) updateData.email = profileData.email;

// //     if (Object.keys(updateData).length === 0) {
// //       setUpdateMessage("No changes to update");
// //       setUpdating(false);
// //       return;
// //     }

// //     const result = await updateProfile(updateData);

// //     if (result?.success) {
// //       const updatedUser: UserData = {
// //         _id: result.data?._id || userData._id,
// //         firstName: result.data?.firstName || profileData.firstName || userData.firstName,
// //         lastName: result.data?.lastName || profileData.lastName || userData.lastName,
// //         email: result.data?.email || profileData.email || userData.email,
// //         role: result.data?.role || userData.role,
// //       };
// //       setUserData(updatedUser);
// //       setUpdateMessage("Profile updated successfully!");
// //       setTimeout(() => {
// //         setShowProfileModal(false);
// //         setUpdateMessage("");
// //       }, 1200);
// //     } else {
// //       setUpdateMessage(result?.message || "Failed to update profile");
// //     }

// //     setUpdating(false);
// //   };

// //   // ------------------ PLACE ORDER ------------------
// //   const handlePlaceOrder = async () => {
// //     if (!cartItems.length) {
// //       setToastMessage("No items in cart!");
// //       setTimeout(() => setToastMessage(""), 2000);
// //       return;
// //     }

// //     try {
// //       const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
// //       const token = localStorage.getItem("token");

// //       if (!token) {
// //         setToastMessage("Login required");
// //         setTimeout(() => setToastMessage(""), 2000);
// //         return;
// //       }

// //       const res = await fetch(`${API_BASE}/api/orders`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           items: cartItems.map((item: any) => ({
// //             productId: item.productId,
// //             quantity: item.qty, // ✅ backend expects quantity
// //           })),
// //           paymentMethod: "cod",
// //         }),
// //       });

// //       const data = await res.json().catch(() => ({}));

// //       if (res.ok && data?.success) {
// //         setToastMessage("Order placed successfully!");
// //         clearCart();
// //       } else {
// //         setToastMessage(data?.message || "Failed to place order");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setToastMessage("Error placing order");
// //     }

// //     setTimeout(() => setToastMessage(""), 3000);
// //   };

// //   return (
// //     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
// //       {/* ================= HEADER ================= */}
// //       <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-40">
// //         <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
// //           {/* LOGO */}
// //           <div
// //             className="flex items-center gap-3 cursor-pointer"
// //             onClick={() => router.push("/home")}
// //           >
// //             <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
// //               <Image src="/blossomlogo.png" alt="Blossom" fill className="object-contain p-2" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold text-pink-600">BLOSSOM</h1>
// //               <p className="text-xs text-gray-500">Flower Paradise</p>
// //             </div>
// //           </div>

// //           {/* NAV */}
// //           <nav className="hidden md:flex gap-8 font-medium">
// //             <Link href="/home" className="text-pink-500 border-b-2 border-pink-500 pb-1">
// //               Home
// //             </Link>
// //             <Link href="/products" className="hover:text-pink-500 transition">
// //               Shop
// //             </Link>
// //             <Link href="/cart" className="hover:text-pink-500 transition relative">
// //               Cart
// //               {totalItems > 0 && (
// //                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
// //                   {totalItems}
// //                 </span>
// //               )}
// //             </Link>
// //             <Link href="/orders" className="hover:text-pink-500 transition">
// //               Orders
// //             </Link>
// //           </nav>

// //           {/* PROFILE */}
// //           <div className="relative">
// //             <button
// //               onClick={() => setShowMenu(!showMenu)}
// //               className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold"
// //             >
// //               {userData?.firstName?.[0] || "U"}
// //             </button>

// //             {showMenu && (
// //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2">
// //                 <button
// //                   onClick={() => {
// //                     setProfileData({
// //                       firstName: userData?.firstName || "",
// //                       lastName: userData?.lastName || "",
// //                       email: userData?.email || "",
// //                     });
// //                     setShowProfileModal(true);
// //                     setShowMenu(false);
// //                   }}
// //                   className="block w-full text-left px-4 py-2 hover:bg-pink-50"
// //                 >
// //                   Edit Profile
// //                 </button>
// //                 <Link
// //                   href="/orders"
// //                   className="block px-4 py-2 hover:bg-pink-50"
// //                   onClick={() => setShowMenu(false)}
// //                 >
// //                   My Orders
// //                 </Link>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </header>

// //       {/* ================= SEARCH ================= */}
// //       <main className="mx-auto max-w-7xl px-6 pb-12 mt-8">
// //         <div className="flex overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100">
// //           <input
// //             placeholder="Search flowers (Rose, Tulip...)"
// //             className="w-full px-6 py-4 outline-none bg-white"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //           <button className="bg-pink-500 px-10 font-semibold text-white py-2 rounded-xl hover:bg-pink-600 transition">
// //             Search
// //           </button>
// //         </div>

// //         {/* ================= PRODUCTS ================= */}
// //         <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredProducts.map((item) => {
// //             const cartQty =
// //               (cartItems as any[]).find((x) => x.productId === item._id)?.qty || 0;

// //             return (
// //               <div
// //                 key={item._id}
// //                 className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition"
// //               >
// //                 <CardImage src={item.src} alt={item.alt} variant="wide" />
// //                 <div className="flex justify-between items-center mt-2">
// //                   <span className="text-gray-800 font-medium">{item.name}</span>
// //                   <span className="text-pink-600 font-semibold">Rs {item.price}</span>
// //                 </div>

// //                 <button
// //                   onClick={() => handleAddToCart(item)}
// //                   className="w-full bg-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-pink-600 transition flex justify-between items-center"
// //                 >
// //                   <span>Add to Cart</span>
// //                   {cartQty > 0 && (
// //                     <span className="bg-white text-pink-600 font-bold px-2 py-0.5 rounded-full">
// //                       {cartQty}
// //                     </span>
// //                   )}
// //                 </button>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* ================= PLACE ORDER ================= */}
// //         {totalItems > 0 && (
// //           <div className="mt-8 flex justify-center">
// //             <button
// //               onClick={handlePlaceOrder}
// //               className="rounded-xl bg-pink-500 text-white px-6 py-3 font-semibold hover:bg-pink-600 transition"
// //             >
// //               Place Order ({totalItems} items)
// //             </button>
// //           </div>
// //         )}
// //       </main>

// //       {/* ================= PROFILE MODAL ================= */}
// //       {showProfileModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
// //           <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
// //             <div className="rounded-t-3xl bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex items-center justify-between">
// //               <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
// //               <button
// //                 onClick={() => setShowProfileModal(false)}
// //                 className="rounded-full p-2 text-white transition hover:bg-white/20"
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <form onSubmit={handleProfileUpdate} className="space-y-4 p-6">
// //               <div className="flex justify-center mb-4">
// //                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
// //                   <ProfileIcon className="h-10 w-10" />
// //                 </div>
// //               </div>

// //               {["firstName", "lastName", "email"].map((field) => (
// //                 <div key={field}>
// //                   <label className="mb-2 block text-sm font-semibold text-gray-700">
// //                     {field.charAt(0).toUpperCase() + field.slice(1)}
// //                   </label>
// //                   <input
// //                     type={field === "email" ? "email" : "text"}
// //                     value={profileData[field as keyof typeof profileData]}
// //                     onChange={(e) =>
// //                       setProfileData({ ...profileData, [field]: e.target.value })
// //                     }
// //                     className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-pink-500"
// //                     required
// //                   />
// //                 </div>
// //               ))}

// //               {updateMessage && (
// //                 <div
// //                   className={`rounded-xl p-3 text-sm ${
// //                     updateMessage.toLowerCase().includes("success")
// //                       ? "bg-green-50 text-green-600"
// //                       : "bg-red-50 text-red-600"
// //                   }`}
// //                 >
// //                   {updateMessage}
// //                 </div>
// //               )}

// //               <button
// //                 type="submit"
// //                 disabled={updating}
// //                 className="w-full rounded-xl bg-pink-100 text-pink-700 py-2 px-4 font-medium hover:bg-pink-200 transition"
// //               >
// //                 {updating ? "Updating..." : "Save Changes"}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* ================= TOAST ================= */}
// //       {toastMessage && (
// //         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
// //           {toastMessage}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
   
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   description?: string;
//   imageUrl?: string; // from your seed
//   stock?: number;    // from your seed
//   isActive?: boolean;
// };

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

// function safeImage(img?: string) {
//   // Your seeded images are like "/flowers.jpg" and live in frontend /public
//   // So we should NOT prefix with API_BASE.
//   if (!img) return "/flowers.jpg";
//   if (img.startsWith("http")) return img;
//   return img; // "/flowers.jpg"
// }

// export default function HomePage() {
//   const router = useRouter();
//   const { addToCart, items: cartItems, totalItems } = useCart();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [toast, setToast] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
//         const json = await res.json().catch(() => ({}));

//         const list = Array.isArray(json) ? json : json?.data;

//         if (!Array.isArray(list)) {
//           throw new Error(json?.message || "Products response invalid");
//         }

//         // optional: only active products
//         const active = list.filter((p: Product) => p.isActive !== false);

//         setProducts(active);
//       } catch (e: any) {
//         setError(e?.message || "Failed to load products");
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return products.filter((p) => {
//       if (!q) return true;
//       return (p.name || "").toLowerCase().includes(q);
//     });
//   }, [products, search]);

//   const handleAdd = (p: Product) => {
//     const stock = Number(p.stock ?? 999999);
//     if (stock <= 0) {
//       setToast("Out of stock");
//       setTimeout(() => setToast(""), 1500);
//       return;
//     }

//     addToCart({
//       id: p._id,
//       productId: p._id, // ✅ MUST be real mongo _id
//       name: p.name,
//       price: Number(p.price || 0),
//       image: safeImage(p.imageUrl),
//       qty: 1,
//     });

//     setToast(`${p.name} added to cart`);
//     setTimeout(() => setToast(""), 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
//       {/* HEADER */}
//       <header className="sticky top-0 z-40 border-b border-pink-100 bg-white/90 backdrop-blur-md shadow-sm">
//         <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/home")}>
//             <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
//               <Image src="/blossomlogo.png" alt="Blossom" fill className="object-contain p-2" />
//             </div>
//             <div>
//               <h1 className="text-xl font-extrabold text-pink-600">BLOSSOM</h1>
//               <p className="text-xs text-gray-500">Flower Paradise</p>
//             </div>
//           </div>

//           <nav className="hidden md:flex gap-8 font-medium">
//             <Link href="/home" className="text-pink-600 border-b-2 border-pink-500 pb-1">Home</Link>
//             <Link href="/products" className="hover:text-pink-500 transition">Shop</Link>
//             <Link href="/cart" className="hover:text-pink-500 transition relative">
//               Cart
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//             <Link href="/orders" className="hover:text-pink-500 transition">Orders</Link>
//           </nav>
//         </div>
//       </header>

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-pink-500 to-pink-600 py-12 px-6 text-center">
//         <h2 className="text-4xl md:text-5xl font-extrabold text-white">Fresh Flowers Delivered</h2>
//         <p className="text-pink-100 mt-2">Browse all products from your database</p>

//         <div className="mx-auto mt-6 max-w-xl">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search flowers..."
//             className="w-full rounded-full border border-pink-200 bg-white px-5 py-3 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
//           />
//         </div>
//       </div>

//       <main className="mx-auto max-w-7xl px-6 py-10">
//         {loading && <div className="text-center text-gray-500">Loading products...</div>}

//         {!loading && error && (
//           <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700 text-center">
//             {error}
//             <div className="mt-2 text-xs text-red-600">
//               Check backend running on {API_BASE} and route: /api/products
//             </div>
//           </div>
//         )}

//         {!loading && !error && filteredProducts.length === 0 && (
//           <div className="text-center text-gray-600">No products found.</div>
//         )}

//         {!loading && !error && filteredProducts.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((p) => {
//               const stock = Number(p.stock ?? 999999);
//               const out = stock <= 0;

//               const cartQty =
//                 (cartItems as any[]).find((x) => x.productId === p._id)?.qty || 0;

//               return (
//                 <div
//                   key={p._id}
//                   className="bg-white rounded-3xl overflow-hidden border border-pink-50 shadow-sm hover:shadow-xl transition"
//                 >
//                   <div className="relative aspect-square bg-gray-100">
//                     <Image
//                       src={safeImage(p.imageUrl)}
//                       alt={p.name}
//                       fill
//                       className={`object-cover ${out ? "opacity-60 grayscale" : ""}`}
//                     />

//                     {out && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <span className="bg-black/70 text-white font-bold px-4 py-2 rounded-full">
//                           Out of Stock
//                         </span>
//                       </div>
//                     )}

//                     {cartQty > 0 && !out && (
//                       <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
//                         {cartQty} in cart
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-5 flex flex-col">
//                     <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{p.name}</h3>
//                     <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                       {p.description || "A beautiful arrangement for any occasion."}
//                     </p>

//                     <div className="mt-4 flex items-center justify-between">
//                       <span className="text-xl font-extrabold text-pink-600">
//                         Rs {Number(p.price || 0).toFixed(2)}
//                       </span>

//                       <button
//                         onClick={() => handleAdd(p)}
//                         disabled={out}
//                         className={`h-10 px-5 rounded-xl font-semibold transition ${
//                           out
//                             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                             : "bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white"
//                         }`}
//                       >
//                         {out ? "Unavailable" : "+ Add"}
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => router.push("/cart")}
//                       className="mt-3 text-sm font-medium text-pink-600 hover:underline"
//                     >
//                       Go to cart →
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       {/* TOAST */}
//       {toast && (
//         <div className="fixed bottom-6 right-6 z-50">
//           <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 text-white shadow-2xl">
//             {toast}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { getCurrentUser } from "@/lib/actions/user-action";
// import { logout as logoutAction } from "@/lib/actions/logout-action";
// import { updateProfile } from "@/lib/actions/profile-action";

// // ------------------ TYPES ------------------
// interface UserData {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
// }

// type ProductItem = {
//   _id: string; // ✅ real MongoDB _id
//   name: string;
//   price: number;
//   description?: string;
//   imageUrl?: string; // if backend uses imageUrl
//   images?: string[]; // if backend uses images[]
// };

// const API_BASE =
//   process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

// // ------------------ CARD IMAGE ------------------
// function CardImage({
//   src,
//   alt,
//   variant = "square",
// }: {
//   src: string;
//   alt: string;
//   variant?: "square" | "wide";
// }) {
//   return (
//     <div
//       className={`relative w-full overflow-hidden rounded-2xl bg-gray-200 ${
//         variant === "wide" ? "aspect-[4/3]" : "aspect-square"
//       }`}
//     >
//       <Image src={src} alt={alt} fill className="object-cover" />
//     </div>
//   );
// }

// // ------------------ PROFILE ICON ------------------
// function ProfileIcon({ className = "w-6 h-6" }: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="white"
//       className={className}
//       aria-hidden="true"
//     >
//       <path
//         fillRule="evenodd"
//         d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 19a7 7 0 0114 0H5z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function resolveImage(img?: string) {
//   if (!img) return "/redrosebouquet.jpg"; // default image in frontend /public
//   if (img.startsWith("http")) return img;
//   if (img.startsWith("/")) return `${API_BASE}${img}`; // "/uploads/..."
//   return `${API_BASE}/${img}`;
// }

// // ------------------ MAIN COMPONENT ------------------
// export default function HomeClient() {
//   const router = useRouter();
//   const { addToCart, items: cartItems, totalItems, clearCart } = useCart();

//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });
//   const [updateMessage, setUpdateMessage] = useState("");
//   const [updating, setUpdating] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [toastMessage, setToastMessage] = useState("");

//   // ------------------ PRODUCTS (from backend) ------------------
//   const [products, setProducts] = useState<ProductItem[]>([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const data = await getCurrentUser();
//         if (data) setUserData(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     loadUserData();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoadingProducts(true);
//         const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
//         const json = await res.json().catch(() => ({}));

//         const list = Array.isArray(json) ? json : json?.data;
//         if (!Array.isArray(list)) throw new Error(json?.message || "Invalid products response");

//         setProducts(list);
//       } catch (e) {
//         console.error("Failed to fetch products:", e);
//         setProducts([]);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((p) =>
//     (p.name || "").toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // ------------------ ADD TO CART ------------------
//   const handleAddToCart = (item: ProductItem) => {
//     const img = item.images?.[0] || item.imageUrl || "";

//     addToCart({
//       id: item._id,
//       productId: item._id, // ✅ MUST be real MongoDB _id
//       name: item.name,
//       price: Number(item.price || 0),
//       image: resolveImage(img),
//       qty: 1,
//     });

//     setToastMessage(`${item.name} added to cart!`);
//     setTimeout(() => setToastMessage(""), 2000);
//   };

//   // ------------------ LOGOUT ------------------
//   const handleLogout = async () => {
//     await logoutAction();
//     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     router.push("/login");
//   };

//   // ------------------ PROFILE UPDATE ------------------
//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userData) return;

//     setUpdating(true);
//     setUpdateMessage("");

//     const updateData: any = {};
//     if (profileData.firstName !== userData.firstName) updateData.firstName = profileData.firstName;
//     if (profileData.lastName !== userData.lastName) updateData.lastName = profileData.lastName;
//     if (profileData.email !== userData.email) updateData.email = profileData.email;

//     if (Object.keys(updateData).length === 0) {
//       setUpdateMessage("No changes to update");
//       setUpdating(false);
//       return;
//     }

//     const result = await updateProfile(updateData);

//     if (result?.success) {
//       const updatedUser: UserData = {
//         _id: result.data?._id || userData._id,
//         firstName: result.data?.firstName || profileData.firstName || userData.firstName,
//         lastName: result.data?.lastName || profileData.lastName || userData.lastName,
//         email: result.data?.email || profileData.email || userData.email,
//         role: result.data?.role || userData.role,
//       };
//       setUserData(updatedUser);
//       setUpdateMessage("Profile updated successfully!");
//       setTimeout(() => {
//         setShowProfileModal(false);
//         setUpdateMessage("");
//       }, 1200);
//     } else {
//       setUpdateMessage(result?.message || "Failed to update profile");
//     }

//     setUpdating(false);
//   };

//   // ------------------ PLACE ORDER (optional on home) ------------------
//   const handlePlaceOrder = async () => {
//     if (!cartItems.length) {
//       setToastMessage("No items in cart!");
//       setTimeout(() => setToastMessage(""), 2000);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
//       if (!token) {
//         setToastMessage("Login required");
//         setTimeout(() => setToastMessage(""), 2000);
//         return;
//       }

//       const res = await fetch(`${API_BASE}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           items: (cartItems as any[]).map((item) => ({
//             productId: item.productId,
//             quantity: item.qty,
//           })),
//           paymentMethod: "cod",
//         }),
//       });

//       const data = await res.json().catch(() => ({}));

//       if (res.ok && data?.success) {
//         setToastMessage("Order placed successfully!");
//         clearCart();
//       } else {
//         setToastMessage(data?.message || "Failed to place order");
//       }
//     } catch (err) {
//       console.error(err);
//       setToastMessage("Error placing order");
//     }

//     setTimeout(() => setToastMessage(""), 3000);
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
//       <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-40">
//         <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/home")}>
//             <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
//               <Image src="/blossomlogo.png" alt="Blossom" fill className="object-contain p-2" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-pink-600">BLOSSOM</h1>
//               <p className="text-xs text-gray-500">Flower Paradise</p>
//             </div>
//           </div>

//           <nav className="hidden md:flex gap-8 font-medium">
//             <Link href="/home" className="text-pink-500 border-b-2 border-pink-500 pb-1">
//               Home
//             </Link>
//             <Link href="/products" className="hover:text-pink-500 transition">
//               Shop
//             </Link>
//             <Link href="/cart" className="hover:text-pink-500 transition relative">
//               Cart
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//             <Link href="/orders" className="hover:text-pink-500 transition">
//               Orders
//             </Link>
//           </nav>

//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold"
//             >
//               {userData?.firstName?.[0] || "U"}
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2">
//                 <button
//                   onClick={() => {
//                     setProfileData({
//                       firstName: userData?.firstName || "",
//                       lastName: userData?.lastName || "",
//                       email: userData?.email || "",
//                     });
//                     setShowProfileModal(true);
//                     setShowMenu(false);
//                   }}
//                   className="block w-full text-left px-4 py-2 hover:bg-pink-50"
//                 >
//                   Edit Profile
//                 </button>

//                 <Link href="/orders" className="block px-4 py-2 hover:bg-pink-50" onClick={() => setShowMenu(false)}>
//                   My Orders
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-6 pb-12 mt-8">
//         <div className="flex overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100">
//           <input
//             placeholder="Search flowers (Rose, Tulip...)"
//             className="w-full px-6 py-4 outline-none bg-white"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="bg-pink-500 px-10 font-semibold text-white py-2 rounded-xl hover:bg-pink-600 transition">
//             Search
//           </button>
//         </div>

//         {loadingProducts ? (
//           <div className="mt-10 text-center text-gray-500">Loading products...</div>
//         ) : (
//           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((item) => {
//               const cartQty = (cartItems as any[]).find((x) => x.productId === item._id)?.qty || 0;
//               const img = resolveImage(item.images?.[0] || item.imageUrl || "");

//               return (
//                 <div key={item._id} className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
//                   <CardImage src={img} alt={item.name} variant="wide" />

//                   <div className="flex justify-between items-center mt-2">
//                     <span className="text-gray-800 font-medium">{item.name}</span>
//                     <span className="text-pink-600 font-semibold">Rs {Number(item.price || 0)}</span>
//                   </div>

//                   <button
//                     onClick={() => handleAddToCart(item)}
//                     className="w-full bg-pink-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-pink-600 transition flex justify-between items-center"
//                   >
//                     <span>Add to Cart</span>
//                     {cartQty > 0 && (
//                       <span className="bg-white text-pink-600 font-bold px-2 py-0.5 rounded-full">{cartQty}</span>
//                     )}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {totalItems > 0 && (
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={handlePlaceOrder}
//               className="rounded-xl bg-pink-500 text-white px-6 py-3 font-semibold hover:bg-pink-600 transition"
//             >
//               Place Order ({totalItems} items)
//             </button>
//           </div>
//         )}
//       </main>

//       {showProfileModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
//           <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
//             <div className="rounded-t-3xl bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
//               <button onClick={() => setShowProfileModal(false)} className="rounded-full p-2 text-white transition hover:bg-white/20">
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleProfileUpdate} className="space-y-4 p-6">
//               <div className="flex justify-center mb-4">
//                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
//                   <ProfileIcon className="h-10 w-10" />
//                 </div>
//               </div>

//               {["firstName", "lastName", "email"].map((field) => (
//                 <div key={field}>
//                   <label className="mb-2 block text-sm font-semibold text-gray-700">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     type={field === "email" ? "email" : "text"}
//                     value={profileData[field as keyof typeof profileData]}
//                     onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
//                     className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-pink-500"
//                     required
//                   />
//                 </div>
//               ))}

//               {updateMessage && (
//                 <div
//                   className={`rounded-xl p-3 text-sm ${
//                     updateMessage.toLowerCase().includes("success") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
//                   }`}
//                 >
//                   {updateMessage}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={updating}
//                 className="w-full rounded-xl bg-pink-100 text-pink-700 py-2 px-4 font-medium hover:bg-pink-200 transition"
//               >
//                 {updating ? "Updating..." : "Save Changes"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {toastMessage && (
//         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg">
//           {toastMessage}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getCurrentUser } from "@/lib/actions/user-action";
import { logout as logoutAction } from "@/lib/actions/logout-action";
import { updateProfile } from "@/lib/actions/profile-action";

// ------------------ TYPES ------------------
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

type ApiProduct = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  stock?: number;
  isActive?: boolean;
};

type HomeCard = {
  key: string;
  name: string;
  price: number;
  image: string; // local image in /public
  badge?: string;
  isReal?: boolean;
  realProductId?: string;
};

// ------------------ CONFIG ------------------
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5051";

// ------------------ UI HELPERS ------------------
function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3]">
      <Image src={src} alt={alt} fill className="object-cover" />
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

function formatRs(n: number) {
  return `Rs ${Number(n || 0).toLocaleString()}`;
}

// ------------------ MAIN ------------------
export default function HomeClient() {
  const router = useRouter();
  const { addToCart, items: cartItems, totalItems } = useCart();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [realProduct, setRealProduct] = useState<ApiProduct | null>(null);

  // ------------------ USER ------------------
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getCurrentUser();
        if (data) setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadUserData();
  }, []);

  // ------------------ FETCH 1 REAL PRODUCT ------------------
  useEffect(() => {
    const fetchOneRealProduct = async () => {
      try {
        setLoadingProducts(true);

        const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
        const json = await res.json().catch(() => ({}));
        const list: ApiProduct[] = Array.isArray(json) ? json : json?.data;

        if (!Array.isArray(list) || list.length === 0) {
          setRealProduct(null);
          return;
        }

        // Prefer red rose if available else first product
        const preferred =
          list.find((p) => (p.name || "").toLowerCase().includes("red rose")) || list[0];

        setRealProduct(preferred);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setRealProduct(null);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchOneRealProduct();
  }, []);

  // ------------------ UI CARDS (LOOK FULL) ------------------
  const uiCards: HomeCard[] = useMemo(
    () => [
      { key: "floral", name: "Floral Surprise", price: 2500, image: "/flowers.jpg", badge: "Offer" },
      { key: "sun", name: "Sunny Sunflowers", price: 3200, image: "/sunflowerrrr.jpg", badge: "Popular" },
      { key: "bday", name: "Birthday Delight", price: 4000, image: "/birthday.jpg", badge: "Gift" },
      { key: "white", name: "White Rose", price: 1500, image: "/whiterose.jpg" },
      { key: "red", name: "Red Rose", price: 29.99, image: "/flowers.jpg", badge: "offer" },
      { key: "pink-bq", name: "Pink Rose Bouquet", price: 2200, image: "/pinkrosebouquet.jpg" },
      { key: "lux", name: "Rose Bouquet (Luxury)", price: 5500, image: "/imageflower.jpg" },
      { key: "pink", name: "Pink Rose", price: 125, image: "/pinkrosee.jpg" },
      { key: "tulip", name: "Fresh Tulip Bouquet", price: 3800, image: "/image6.png" },
      { key: "yt", name: "Yellow Tulip", price: 285, image: "/yellowtulip.jpg" },
      { key: "wt", name: "White Tulip", price: 290, image: "/whitetulip.jpg" },
      { key: "mix", name: "Pink Elegance", price: 3500, image: "/bouquet.jpg" },
      { key: "rainbow", name: "Rainbow Bliss", price: 2800, image: "/colorfulflower.jpg" },
    ],
    []
  );

  // Make only ONE card actually use the real productId
  const cards: HomeCard[] = useMemo(() => {
    const realId = realProduct?._id;

    return uiCards.map((c) => {
      const isRed = c.name.toLowerCase().includes("red rose");
      if (isRed && realId) {
        return { ...c, isReal: true, realProductId: realId, badge: "REAL (Checkout)" };
      }
      return { ...c, isReal: false, realProductId: undefined, badge: c.badge };
    });
  }, [uiCards, realProduct]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((c) => (c.name || "").toLowerCase().includes(q));
  }, [cards, searchQuery]);

  // ------------------ ADD TO CART ------------------
  const handleAdd = (card: HomeCard) => {
    // Button always says "Add to Cart", but only red rose will really work
    if (!card.isReal || !card.realProductId) {
      setToastMessage("Only Red Rose is enabled for checkout in this demo.");
      setTimeout(() => setToastMessage(""), 2500);
      return;
    }

    addToCart({
      id: card.realProductId,
      productId: card.realProductId, // ✅ required by order API
      name: card.name,
      price: card.price,
      image: card.image,
      qty: 1,
    });

    setToastMessage(`${card.name} added to cart!`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  // ------------------ LOGOUT ------------------
  const handleLogout = async () => {
    await logoutAction();
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  // ------------------ PROFILE UPDATE ------------------
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    setUpdating(true);
    setUpdateMessage("");

    const updateData: any = {};
    if (profileData.firstName !== userData.firstName) updateData.firstName = profileData.firstName;
    if (profileData.lastName !== userData.lastName) updateData.lastName = profileData.lastName;
    if (profileData.email !== userData.email) updateData.email = profileData.email;

    if (Object.keys(updateData).length === 0) {
      setUpdateMessage("No changes to update");
      setUpdating(false);
      return;
    }

    const result = await updateProfile(updateData);
    if (result?.success) {
      setUserData({
        _id: result.data?._id || userData._id,
        firstName: result.data?.firstName || profileData.firstName || userData.firstName,
        lastName: result.data?.lastName || profileData.lastName || userData.lastName,
        email: result.data?.email || profileData.email || userData.email,
        role: result.data?.role || userData.role,
      });

      setUpdateMessage("Profile updated successfully!");
      setTimeout(() => {
        setShowProfileModal(false);
        setUpdateMessage("");
      }, 1200);
    } else {
      setUpdateMessage(result?.message || "Failed to update profile");
    }

    setUpdating(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
      {/* ================= HEADER ================= */}
      <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/home")}>
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500">
              <Image src="/blossomlogo.png" alt="Blossom" fill className="object-contain p-2" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-pink-600">BLOSSOM</h1>
              <p className="text-xs text-gray-500">Flower Paradise</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 font-medium">
            <Link href="/home" className="text-pink-500 border-b-2 border-pink-500 pb-1">
              Home
            </Link>
            <Link href="/products" className="hover:text-pink-500 transition">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-pink-500 transition relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/orders" className="hover:text-pink-500 transition">
              Orders
            </Link>
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold"
            >
              {userData?.firstName?.[0] || "U"}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2">
                <button
                  onClick={() => {
                    setProfileData({
                      firstName: userData?.firstName || "",
                      lastName: userData?.lastName || "",
                      email: userData?.email || "",
                    });
                    setShowProfileModal(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-50"
                >
                  Edit Profile
                </button>

                <Link href="/orders" className="block px-4 py-2 hover:bg-pink-50" onClick={() => setShowMenu(false)}>
                  My Orders
                </Link>

                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= SEARCH ================= */}
      <main className="mx-auto max-w-7xl px-6 pb-12 mt-8">
        <div className="flex overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-pink-100">
          <input
            placeholder="Search flowers (e.g., Tulips, Roses, Sunflowers)"
            className="w-full px-6 py-4 outline-none bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-pink-500 px-10 font-semibold text-white py-2 hover:bg-pink-600 transition">
            Search
          </button>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Fresh Flowers 🌸</h2>
          <Link href="/products" className="text-pink-600 font-semibold hover:underline">
            View all →
          </Link>
        </div>

        {loadingProducts ? (
          <div className="mt-10 text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const cartQty =
                item.realProductId
                  ? (cartItems as any[]).find((x) => x.productId === item.realProductId)?.qty || 0
                  : 0;

              return (
                <div key={item.key} className="flex flex-col bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
                  <CardImage src={item.image} alt={item.name} />

                  <div className="mt-3 flex items-center justify-between">
                    <div className="min-w-0">
                      {item.badge ? (
                        <span className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                          {item.badge}
                        </span>
                      ) : null}
                      <div className="mt-2 font-semibold text-gray-900 truncate">{item.name}</div>
                    </div>

                    <div className="text-pink-600 font-bold">{formatRs(item.price)}</div>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className="mt-4 w-full py-2 px-4 rounded-xl font-semibold transition flex justify-between items-center bg-pink-500 text-white hover:bg-pink-600"
                  >
                    <span>Add to Cart</span>
                    {cartQty > 0 && (
                      <span className="bg-white text-pink-600 font-bold px-2 py-0.5 rounded-full">{cartQty}</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ================= PROFILE MODAL ================= */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="rounded-t-3xl bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <button onClick={() => setShowProfileModal(false)} className="rounded-full p-2 text-white transition hover:bg-white/20">
                ✕
              </button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4 p-6">
              <div className="flex justify-center mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
                  <ProfileIcon className="h-10 w-10" />
                </div>
              </div>

              {["firstName", "lastName", "email"].map((field) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={profileData[field as keyof typeof profileData]}
                    onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>
              ))}

              {updateMessage && (
                <div
                  className={`rounded-xl p-3 text-sm ${
                    updateMessage.toLowerCase().includes("success") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  }`}
                >
                  {updateMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={updating}
                className="w-full rounded-xl bg-pink-100 text-pink-700 py-2 px-4 font-medium hover:bg-pink-200 transition"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}