import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ['latin'], variable: "--font-sans", weight: "400" });
const calistoga = Calistoga({ subsets: ['latin'], variable: "--font-serif", weight: "400" });

export const metadata: Metadata = {
  title: "JC Gurdian | AI Engineer | Production Agents, RAG, MCP",
  description: "AI Engineer shipping production LLM and agent systems end to end. Building tools fractional CMOs and professional firms use every day at yorCMO. Co-Founder and CTO of Gynka.",
  metadataBase: new URL("https://www.jcgurdian.io"),
  alternates: {
    canonical: "https://www.jcgurdian.io/",
  },
  openGraph: {
    title: "JC Gurdian | AI Engineer | Production Agents, RAG, MCP",
    description: "AI Engineer shipping production LLM and agent systems end to end. Building tools fractional CMOs and professional firms use every day at yorCMO. Co-Founder and CTO of Gynka.",
    url: "https://www.jcgurdian.io/",
    siteName: "JC Gurdian",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "JC Gurdian",
  url: "https://www.jcgurdian.io",
  jobTitle: "AI Engineer",
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
  sameAs: [
    "https://www.linkedin.com/in/juan-gurdian",
    "https://github.com/juangurdian",
    "https://github.com/juangurdian/wingman",
    "https://github.com/juangurdian/Vault-AI",
    "https://github.com/juangurdian/bug-butler",
    "https://github.com/juangurdian/Portfolio-Website-JCGurdian",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Texas Christian University",
  },
  knowsAbout: [
    "LLMs",
    "AI Agents",
    "RAG",
    "MCP",
    "Python",
    "TypeScript",
    "FastAPI",
    "React",
    "Next.js",
  ],
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
