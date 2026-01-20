import { redirect } from "next/navigation";
import HomeClient from "./homeclient";
import { getAuthToken } from "@/lib/cookie";

export default async function HomePage() {
  const token = await getAuthToken();

  if (!token) {
    redirect("/login");
  }

  return <HomeClient />;
}
