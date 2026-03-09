"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleAdminCreateUser } from "@/lib/actions/admin-user-action";

export default function CreateUserPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [msg, setMsg] = useState<string>("");

  const onSubmit = () => {
    setMsg("");

    const fd = new FormData();
    fd.append("firstName", firstName);
    fd.append("lastName", lastName);
    fd.append("email", email);
    fd.append("password", password);
    if (image) fd.append("image", image);

    startTransition(async () => {
      const res = await handleAdminCreateUser(fd);
      setMsg(res?.message || (res?.success ? "Created" : "Failed"));
      if (res?.success) {
        setTimeout(() => router.push("/admin/users"), 800);
      }
    });
  };

  return (
    <div className="card p-8 max-w-xl mx-auto">
      <button
        onClick={() => router.push("/admin/users")}
        className="text-amber-700 hover:text-amber-800 text-sm mb-3"
      >
        Back to Users
      </button>
      <h1 className="text-3xl font-extrabold font-display text-slate-900 mb-2">Create User</h1>
      <p className="text-slate-500 text-sm mb-6">Add a new customer or team member.</p>

      <div className="space-y-4">
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input"
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} className="input" />

        <button onClick={onSubmit} disabled={pending} className="btn-primary w-full">
          {pending ? "Creating..." : "Create"}
        </button>

        {msg ? (
          <p className="text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
            {msg}
          </p>
        ) : null}
      </div>
    </div>
  );
}

