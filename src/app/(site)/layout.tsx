import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { getContentSection } from "@/lib/db/content";

// Content now comes from the database (with static fallback), so these
// pages must render per-request rather than be baked in at build time —
// otherwise admin edits would never show up without a redeploy.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const company = await getContentSection("company");

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <OrganizationJsonLd />
      <Navbar companyName={company.name} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
