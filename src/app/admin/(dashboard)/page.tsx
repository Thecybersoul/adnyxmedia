import Link from "next/link";
import { MapPin, Image as ImageIcon, FileText, ArrowUpRight } from "lucide-react";
import { getLocations } from "@/lib/db/locations";
import { listMedia } from "@/lib/db/media";
import { isDbConfigured } from "@/lib/db/client";
import { contentSections } from "@/lib/admin/content-sections";

export default async function AdminDashboardPage() {
  const [locations, media] = await Promise.all([getLocations(), listMedia()]);

  const cards = [
    { label: "Locations", value: locations.length, href: "/admin/locations", icon: MapPin },
    { label: "Media assets", value: media.length, href: "/admin/media", icon: ImageIcon },
    { label: "Content sections", value: contentSections.length, href: "/admin/content/company", icon: FileText },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-mist">Dashboard</h1>
      <p className="mt-1 text-sm text-mist-dim">
        {isDbConfigured()
          ? "Manage every piece of content, inventory, and media on the ADNYX site."
          : "Connect a database to start editing — see the notice above."}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-white/10 bg-surface/60 p-6 transition-colors hover:border-white/20"
          >
            <card.icon className="size-5 text-brand-bright" />
            <p className="mt-4 font-display text-3xl font-semibold text-mist">{card.value}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-mist-dim">
              {card.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-medium text-mist">Edit content</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {contentSections.map((section) => (
            <Link
              key={section.key}
              href={`/admin/content/${section.key}`}
              className="rounded-xl border border-white/10 bg-surface/60 p-4 transition-colors hover:border-white/20"
            >
              <p className="text-sm font-medium text-mist">{section.label}</p>
              <p className="mt-1 text-xs text-mist-dim">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
