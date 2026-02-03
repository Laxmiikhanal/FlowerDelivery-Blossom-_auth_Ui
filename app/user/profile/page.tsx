"use client";

import TopNav from "../../_components/TopNav";
import { useState } from "react";

export default function UserProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [msg, setMsg] = useState("");

  const onUpdate = async () => {
    setMsg("");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setMsg("You are not logged in.");
      return;
    }

    const fd = new FormData();
    if (firstName) fd.append("firstName", firstName);
    if (lastName) fd.append("lastName", lastName);

    const res = await fetch(`http://localhost:5050/api/auth/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    const data = await res.json();
    setMsg(res.ok ? "Profile updated ✅" : data?.message || "Update failed");
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNav />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Edit Profile</h1>

        <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-600">
                First Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Last Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <button
            onClick={onUpdate}
            className="mt-6 w-full rounded-2xl bg-pink-500 py-4 font-semibold text-white shadow hover:bg-pink-600 transition"
          >
            Update Profile
          </button>

          {msg && <p className="mt-4 text-sm text-slate-700">{msg}</p>}
        </div>
      </main>
    </div>
  );
}
