export default async function UserIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>
        Admin User Details Page
      </h1>
      <p style={{ marginTop: 12, fontSize: 18 }}>
        User ID: <b>{id}</b>
      </p>
    </div>
  );
}
