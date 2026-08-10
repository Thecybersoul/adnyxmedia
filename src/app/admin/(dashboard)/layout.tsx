import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DbStatusBanner } from "@/components/admin/db-status-banner";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <DbStatusBanner />
        <main className="mx-auto max-w-4xl px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
