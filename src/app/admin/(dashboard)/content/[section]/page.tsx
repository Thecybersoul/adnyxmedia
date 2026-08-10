import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentSection } from "@/lib/db/content";
import { getSectionMeta } from "@/lib/admin/content-sections";
import { CompanyEditor } from "@/components/admin/editors/company-editor";
import { HeroEditor } from "@/components/admin/editors/hero-editor";
import { ListEditor } from "@/components/admin/editors/list-editor";
import { StringListEditor } from "@/components/admin/editors/string-list-editor";
import { ServicesEditor } from "@/components/admin/editors/services-editor";
import type { SiteContent } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const meta = getSectionMeta(section);
  return { title: meta?.label ?? "Content" };
}

export default async function ContentSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const meta = getSectionMeta(section);
  if (!meta) notFound();

  const key = meta.key as keyof SiteContent;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-mist">{meta.label}</h1>
      <p className="mt-1 text-sm text-mist-dim">{meta.description}</p>

      <div className="mt-6">
        {key === "company" && <CompanyEditor initial={await getContentSection("company")} />}
        {key === "hero" && <HeroEditor initial={await getContentSection("hero")} />}
        {key === "services" && <ServicesEditor initial={await getContentSection("services")} />}
        {key === "clients" && (
          <StringListEditor
            sectionKey="clients"
            initial={await getContentSection("clients")}
            placeholder="Client name"
          />
        )}
        {key === "stats" && (
          <ListEditor
            sectionKey="stats"
            initial={await getContentSection("stats")}
            fields={[
              { name: "value", label: "Number", type: "number" },
              { name: "suffix", label: "Suffix (e.g. +, M+, %)" },
              { name: "label", label: "Caption" },
            ]}
            emptyItem={{ value: 0, suffix: "+", label: "" }}
            titleField="label"
            newItemLabel="New stat"
          />
        )}
        {key === "process" && (
          <ListEditor
            sectionKey="process"
            initial={await getContentSection("process")}
            fields={[
              { name: "step", label: "Step number (e.g. 01)" },
              { name: "title", label: "Title" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            emptyItem={{ step: "0", title: "", description: "" }}
            titleField="title"
            newItemLabel="New step"
          />
        )}
        {key === "testimonials" && (
          <ListEditor
            sectionKey="testimonials"
            initial={await getContentSection("testimonials")}
            fields={[
              { name: "quote", label: "Quote", type: "textarea" },
              { name: "name", label: "Name" },
              { name: "role", label: "Role / company" },
            ]}
            emptyItem={{ quote: "", name: "", role: "" }}
            titleField="name"
            newItemLabel="New testimonial"
          />
        )}
        {key === "values" && (
          <ListEditor
            sectionKey="values"
            initial={await getContentSection("values")}
            fields={[
              { name: "title", label: "Title" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            emptyItem={{ title: "", description: "" }}
            titleField="title"
            newItemLabel="New value"
          />
        )}
        {key === "timeline" && (
          <ListEditor
            sectionKey="timeline"
            initial={await getContentSection("timeline")}
            fields={[
              { name: "year", label: "Year" },
              { name: "title", label: "Title" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            emptyItem={{ year: "", title: "", description: "" }}
            titleField="title"
            newItemLabel="New milestone"
          />
        )}
      </div>
    </div>
  );
}
