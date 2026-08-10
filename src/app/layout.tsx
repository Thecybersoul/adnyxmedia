import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { company } from "@/lib/data/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adnyx.in"),
  title: {
    default: `${company.name} — Premium Digital Billboards in Bangalore`,
    template: `%s · ${company.name}`,
  },
  description: company.description,
  keywords: [
    "digital billboards Bangalore",
    "OOH advertising Bangalore",
    "DOOH media owner",
    "hoarding advertising Bangalore",
    "LED billboard advertising",
    "outdoor advertising agency Bangalore",
  ],
  openGraph: {
    title: `${company.name} — Premium Digital Billboards in Bangalore`,
    description: company.description,
    url: "https://www.adnyx.in",
    siteName: company.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Premium Digital Billboards in Bangalore`,
    description: company.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink">
        <OrganizationJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
