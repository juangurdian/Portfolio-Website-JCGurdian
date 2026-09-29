import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { DISPLAY_NAME, FULL_NAME, ALTERNATE_NAMES, SITE_URL, EMAIL, SOCIAL_LINKS } from "@/data/site";

const inter = Inter({ subsets: ['latin'], variable: "--font-sans", weight: "400" });
const calistoga = Calistoga({ subsets: ['latin'], variable: "--font-serif", weight: "400" });

export const metadata: Metadata = {
  title: `${DISPLAY_NAME} | AI Engineer in Tampa, FL | LLM Agents, RAG, MCP`,
  description: "AI engineer in Tampa, FL. I build and run production LLM agents, RAG, and MCP tools at yorCMO and am cofounder and CTO of Gynka.",
  keywords: "Juan Gurdian, JC Gurdian, AI Engineer, Tampa AI Engineer, LLM agents, agentic AI, RAG, MCP server, Claude, FastAPI, Next.js, React Native, full-stack AI engineer",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: `${DISPLAY_NAME} | AI Engineer in Tampa, FL`,
    description: "Production LLM agents, RAG, and MCP tools for client teams at yorCMO. Cofounder and CTO of Gynka.",
    url: `${SITE_URL}/`,
    siteName: DISPLAY_NAME,
    type: "profile",
  },
  twitter: {
    card: "summary",
  },
  other: {
    "profile:first_name": "Juan",
    "profile:last_name": "Gurdian",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  alternateName: ALTERNATE_NAMES,
  url: `${SITE_URL}/`,
  email: `mailto:${EMAIL}`,
  jobTitle: "AI Engineer",
  description: "AI engineer building production LLM agent systems, RAG, and MCP tools.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
    addressCountry: "US",
  },
  worksFor: [
    {
      "@type": "Organization",
      name: "yorCMO",
      url: "https://yorcmo.ai",
    },
    {
      "@type": "Organization",
      name: "Gynka",
      url: "https://gynka.app",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Texas Christian University",
    url: "https://www.tcu.edu",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "B.S. Computer Information Technology",
      credentialCategory: "degree",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Certified Cloud Practitioner",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Claude Code certification",
      credentialCategory: "certification",
    },
  ],
  knowsAbout: [
    "LLM agents",
    "Agentic AI",
    "Retrieval-augmented generation",
    "Model Context Protocol",
    "LLM evaluation",
    "Python",
    "TypeScript",
    "FastAPI",
    "Next.js",
    "React Native",
    "AWS",
  ],
  knowsLanguage: ["English", "Spanish"],
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={twMerge(inter.variable, calistoga.variable, "overflow-x-hidden")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-gray-900 text-white antialiased font-sans overflow-x-hidden"
      >
        <div className="min-h-screen w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
