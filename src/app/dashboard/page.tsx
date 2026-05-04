import type { Metadata } from "next";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | CCAP Zomba",
  description:
    "CCAP Zomba administrative dashboard for members, districts, ministries, Mlaga, receipts and church activity.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <AdminDashboard />;
}
