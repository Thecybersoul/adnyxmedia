import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DbStatusBanner } from "@/components/admin/db-status-banner";

// Dashboard pages read live DB state (location/media counts, tables) and
// must never be frozen at build time — see src/app/(site)/layout.tsx for
// the same reasoning.
export const dynamic = "force-dynamic";

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
