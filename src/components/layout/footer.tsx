import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/ui/social-icons";
import { navLinks } from "@/lib/data/site";
import { getContentSection } from "@/lib/db/content";

export async function Footer() {
  const year = new Date().getFullYear();
  const [company, services] = await Promise.all([
    getContentSection("company"),
    getContentSection("services"),
  ]);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />
      <Container className="relative py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-dim">
              {company.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href={company.social.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialIcon>
              <SocialIcon href={company.social.linkedin} label="LinkedIn">
                <LinkedInIcon className="size-4" />
              </SocialIcon>
              <SocialIcon href={company.social.twitter} label="X (Twitter)">
                <XIcon className="size-4" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-mist">Navigate</h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mist-dim transition-colors hover:text-mist">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-mist">Services</h4>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link href="/services" className="text-sm text-mist-dim transition-colors hover:text-mist">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-mist">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-mist-dim">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-bright" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-bright" />
                <a href={`tel:${company.phone}`} className="transition-colors hover:text-mist">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand-bright" />
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-mist">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-mist-faint sm:flex-row">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <p>Bangalore, India</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-white/10 text-mist-dim transition-colors hover:border-white/25 hover:text-mist"
    >
      {children}
    </a>
  );
}
