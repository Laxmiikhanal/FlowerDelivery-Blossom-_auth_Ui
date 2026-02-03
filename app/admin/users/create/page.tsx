"use client";

import { useState } from "react";

export default function CreateUserPage() {
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");

    const formData = new FormData(e.currentTarget);

    // IMPORTANT: teacher says use FormData even if no image
    // TODO: replace URL with your teacher-required endpoint:
    // POST /api/auth/user  (as in task)
    const res = await fetch("http://127.0.0.1:5051/api/auth/user", {
      method: "POST",
      body: formData,
      // DO NOT set Content-Type for FormData; browser will set it.
    });

    const data = await res.json().catch(() => null);

    if (res.ok) setMsg("✅ User created (check API response)");
    else setMsg(`❌ Failed: ${data?.message ?? res.statusText}`);
  }

  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Create User</h1>
      <p style={{ marginTop: 6, color: "#666" }}>
        Uses FormData (required because API uses Multer)
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <input name="firstName" placeholder="First Name" required style={{ padding: 12, border: "1px solid #ddd" }} />
        <input name="lastName" placeholder="Last Name" required style={{ padding: 12, border: "1px solid #ddd" }} />
        <input name="email" placeholder="Email" required style={{ padding: 12, border: "1px solid #ddd" }} />
        <input name="password" placeholder="Password" type="password" required style={{ padding: 12, border: "1px solid #ddd" }} />

        <select name="role" defaultValue="user" style={{ padding: 12, border: "1px solid #ddd" }}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <input name="image" type="file" accept="image/*" />

        <button type="submit" style={{ padding: 12, background: "black", color: "white" }}>
          Create
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
