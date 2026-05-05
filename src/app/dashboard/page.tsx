import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard | CCAP Zomba",
  description:
    "CCAP Zomba administrative dashboard for members, districts, ministries, Mlaga, receipts and church activity.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return <AdminDashboard />;
}
