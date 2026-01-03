import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import DashboardContent from "@/components/admin/DashboardContent";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin");
  }

  return <DashboardContent />;
}

