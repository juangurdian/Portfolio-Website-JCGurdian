import type { Metadata } from "next";
import { Source_Serif_4, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jcgurdian.io"),
  title: "Juan Gurdian | AI Engineer",
  description:
    "AI Engineer at yorCMO, Co-Founder & CTO at Gynka. Building production LLM agents, RAG systems, and MCP integrations. Open to Tampa hybrid/onsite and US remote roles.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Juan Gurdian | AI Engineer",
    description:
      "Production AI systems for real clients. Linky, CORE Growth Platform, MCP server, and more. Tampa, FL.",
    url: "https://www.jcgurdian.io",
    siteName: "Juan Gurdian",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Gurdian | AI Engineer",
    description:
      "Production AI systems for real clients. Tampa hybrid/onsite and US remote.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Juan Gurdian",
    jobTitle: "AI Engineer",
    url: "https://www.jcgurdian.io",
    sameAs: [
      "https://github.com/juangurdian",
      "https://www.linkedin.com/in/juan-gurdian",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "yorCMO",
      },
      {
        "@type": "Organization",
        name: "Gynka",
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Texas Christian University",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={twMerge(
          sourceSerif.variable,
          dmSans.variable,
          ibmPlexMono.variable,
          "bg-stone-950 text-stone-100 antialiased font-sans overflow-x-hidden"
        )}
      >
        <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
