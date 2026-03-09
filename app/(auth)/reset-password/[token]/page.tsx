import ResetPasswordForm from "../../_components/ResetPasswordForm";

export default function ResetPasswordTokenPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ResetPasswordForm token={params.token} />
    </div>
  );
}