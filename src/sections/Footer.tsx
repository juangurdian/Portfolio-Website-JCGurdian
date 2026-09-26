"use client";

import { FaLinkedin, FaGithub } from "react-icons/fa";

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
];

export const Footer = () => {
  return (
    <footer className="border-t border-surface-border">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Name and location */}
          <div>
            <p className="font-serif text-lg font-semibold text-stone-100">
              Juan Gurdian
            </p>
            <p className="text-sm text-stone-500 mt-1">
              AI Engineer · Tampa, FL
            </p>
          </div>

          {/* Center: Quick links */}
          <div className="flex items-center gap-6">
            <a
              href="#work"
              className="text-sm text-stone-500 hover:text-accent transition-colors"
            >
              Work
            </a>
            <a
              href="#experience"
              className="text-sm text-stone-500 hover:text-accent transition-colors"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-sm text-stone-500 hover:text-accent transition-colors"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              className="text-sm text-stone-500 hover:text-accent transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Right: Social links */}
          <div className="flex gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-stone-500 hover:text-accent hover:border-accent/30 transition-all"
                aria-label={link.label}
              >
                <link.icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-surface-border">
          <p className="text-xs text-stone-600 text-center">
            © {new Date().getFullYear()} Juan Gurdian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
