import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "JC Gurdian — AI Engineer",
  description:
    "Juan Carlos Gurdian — AI Engineer building production SaaS, open-source tools, and bringing AI to Latin American businesses. Based in Nicaragua.",
  openGraph: {
    title: "JC Gurdian — AI Engineer",
    description:
      "AI Engineer building production SaaS, open-source tools, and bringing AI to Latin America.",
    url: "https://jcgurdian.com",
    siteName: "JC Gurdian",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JC Gurdian — AI Engineer",
    description:
      "AI Engineer building production SaaS, open-source tools, and bringing AI to Latin America.",
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
    name: "Juan Carlos Gurdian",
    jobTitle: "AI Engineer",
    url: "https://jcgurdian.com",
    sameAs: [
      "https://github.com/juangurdian",
      "https://linkedin.com/in/juan-gurdian",
      "https://www.instagram.com/jcgurdian03/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "yorCMO.ai",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Texas Christian University",
    },
    nationality: "Nicaraguan",
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
          inter.variable,
          jetbrainsMono.variable,
          "bg-neural-bg text-white antialiased font-sans overflow-x-hidden"
        )}
      >
        <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
