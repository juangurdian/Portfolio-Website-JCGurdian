"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "WORK", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "MISSION", href: "#mission" },
  { label: "STACK", href: "#stack" },
  { label: "OSS", href: "#opensource" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
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
    <div className="flex justify-center items-center fixed top-4 w-full z-50 px-4">
      <nav
        className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg" : "glass-nav"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-mono font-bold text-neural-primary text-sm tracking-wider mr-4 hover:opacity-80 transition-opacity"
        >
          JCG
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/60 p-2 hover:text-neural-primary transition-colors"
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
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-neural-primary bg-neural-primary/10"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-white/10">
          <a
            href="https://github.com/juangurdian"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/10 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="text-white/60 text-sm hover:text-neural-primary transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/juan-gurdian"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-white/10 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-white/60 text-sm hover:text-neural-primary transition-colors" />
          </a>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 glass-nav rounded-2xl p-4 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2.5 rounded-lg text-sm font-mono tracking-wider text-white/60 hover:text-neural-primary hover:bg-neural-primary/5 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};
