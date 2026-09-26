"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Open Source", href: "#opensource" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks
        .filter((l) => l.href.startsWith("#"))
        .map((l) => l.href.slice(1));

      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container py-4">
        <nav
          className={`flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-300 ${
            scrolled ? "nav-pill shadow-lg" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="font-serif font-semibold text-lg text-stone-100 hover:text-accent transition-colors"
          >
            JG
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href.startsWith("#") &&
                activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-accent bg-accent/10"
                      : "text-stone-400 hover:text-stone-100 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right side: social + menu */}
          <div className="flex items-center gap-3">
            {/* Social Icons - visible on desktop */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/juangurdian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full text-stone-400 hover:text-accent hover:bg-white/5 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="text-base" />
              </a>
              <a
                href="https://linkedin.com/in/juan-gurdian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full text-stone-400 hover:text-accent hover:bg-white/5 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-stone-400 p-2 hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-4 right-4 mt-2 nav-pill rounded-2xl p-4 md:hidden"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-4 py-3 rounded-lg text-sm font-medium text-stone-300 hover:text-accent hover:bg-accent/5 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-surface-border">
                    <a
                      href="https://github.com/juangurdian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-stone-400 hover:text-accent hover:bg-accent/5 transition-all"
                    >
                      <FaGithub />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/juan-gurdian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-stone-400 hover:text-accent hover:bg-accent/5 transition-all"
                    >
                      <FaLinkedin />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};
