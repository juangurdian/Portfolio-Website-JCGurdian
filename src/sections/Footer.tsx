"use client";

import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan-gurdian",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/juangurdian",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/jcgurdian03/",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com",
  },
];

const ASCII_LOGO = `     _  ____ ____
    | |/ ___/ ___|
 _  | | |  | |  _
| |_| | |__| |_| |
 \\___/ \\____|\\____|`;

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Subtle glow */}
      <div className="absolute h-[200px] w-[800px] bottom-0 left-1/2 -translate-x-1/2 bg-neural-primary/5 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10" />

      <div className="container py-12">
        <div className="flex flex-col items-center gap-8">
          {/* ASCII Logo */}
          <pre className="font-mono text-neural-primary/40 text-[10px] leading-tight select-none">
            {ASCII_LOGO}
          </pre>

          {/* Social links */}
          <div className="flex gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-neural-primary hover:border-neural-primary/20 transition-all"
                aria-label={link.label}
              >
                <link.icon className="text-sm" />
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
            Nicaragua &rarr; The World
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} JC Gurdian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
