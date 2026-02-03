export default async function UserEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>
        Admin User Edit Page
      </h1>
      <p style={{ marginTop: 12, fontSize: 18 }}>
        Editing User ID: <b>{id}</b>
      </p>
    </div>
  );
}
