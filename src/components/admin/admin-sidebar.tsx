"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MapPin, Image as ImageIcon, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { logout } from "@/lib/auth/actions";
import { Logo } from "@/components/ui/logo";
import { contentSections } from "@/lib/admin/content-sections";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 bg-ink-soft px-4 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex items-center justify-center rounded-lg border border-white/10 p-2 text-mist"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r border-white/10 bg-ink-soft transition-transform duration-200 ease-out",
          "lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0",
          open && "translate-x-0"
        )}
      >
        <div className="hidden border-b border-white/10 px-5 py-5 lg:block">
          <Logo />
          <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-mist-faint">
            Admin
          </span>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          <div>
            <NavLink href="/admin" active={pathname === "/admin"}>
              <LayoutDashboard className="size-4" />
              Dashboard
            </NavLink>
          </div>

          <div>
            <p className="px-3 text-xs font-medium uppercase tracking-wide text-mist-faint">Content</p>
            <div className="mt-2 space-y-1">
              {contentSections.map((section) => (
                <NavLink
                  key={section.key}
                  href={`/admin/content/${section.key}`}
                  active={pathname === `/admin/content/${section.key}`}
                  indent
                >
                  {section.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 text-xs font-medium uppercase tracking-wide text-mist-faint">Inventory</p>
            <div className="mt-2 space-y-1">
              <NavLink href="/admin/locations" active={pathname.startsWith("/admin/locations")}>
                <MapPin className="size-4" />
                Locations
              </NavLink>
              <NavLink href="/admin/media" active={pathname.startsWith("/admin/media")}>
                <ImageIcon className="size-4" />
                Media Library
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist-dim transition-colors hover:bg-white/5 hover:text-mist"
          >
            <ExternalLink className="size-4" />
            View site
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-mist-dim transition-colors hover:bg-white/5 hover:text-mist"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

function NavLink({
  href,
  active,
  indent,
  children,
}: {
  href: string;
  active: boolean;
  indent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg py-2 text-sm transition-colors",
        indent ? "px-3" : "px-3",
        active ? "bg-brand/15 text-brand-bright" : "text-mist-dim hover:bg-white/5 hover:text-mist"
      )}
    >
      {children}
    </Link>
  );
}
