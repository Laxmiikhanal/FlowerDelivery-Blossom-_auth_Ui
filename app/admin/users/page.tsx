export default function AdminUsersPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Admin Users</h1>
      <p style={{ marginTop: 8, color: "#666" }}>
        Dummy table (task requirement)
      </p>

      <table
        style={{
          width: "100%",
          marginTop: 16,
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 12, border: "1px solid #ddd" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 12, border: "1px solid #ddd" }}>John Doe</td>
            <td style={{ padding: 12, border: "1px solid #ddd" }}>john@gmail.com</td>
            <td style={{ padding: 12, border: "1px solid #ddd" }}>admin</td>
          </tr>
          <tr>
            <td style={{ padding: 12, border: "1px solid #ddd" }}>Jane Smith</td>
            <td style={{ padding: 12, border: "1px solid #ddd" }}>jane@gmail.com</td>
            <td style={{ padding: 12, border: "1px solid #ddd" }}>user</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
