"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowDown, HiDocumentText } from "react-icons/hi2";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16"
    >
      <div className="container">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-border bg-surface-card mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-stone-400">
              Open to Tampa hybrid/onsite and US remote
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-stone-100 tracking-tight mb-4"
          >
            Juan Gurdian
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-accent font-medium mb-6"
          >
            AI Engineer @ yorCMO · Co-Founder & CTO, Gynka
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-stone-400 leading-relaxed mb-8 max-w-2xl"
          >
            I build and own production LLM and agent systems for real clients, not demos.
            Architecture, backend, frontend, integrations, and the product conversations all sit with me.
          </motion.p>

          {/* Key proof points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500 mb-10"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent" />
              Production agents at scale
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent" />
              RAG systems
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent" />
              MCP integrations
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent" />
              24 client orgs served
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-stone-950 font-semibold text-sm hover:bg-accent-light transition-colors focus-ring"
            >
              View My Work
              <HiArrowDown className="w-4 h-4" />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-surface-border text-stone-300 font-semibold text-sm hover:border-accent/30 hover:text-accent transition-colors focus-ring"
            >
              <HiDocumentText className="w-4 h-4" />
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/juan-gurdian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-surface-border text-stone-400 hover:border-accent/30 hover:text-accent transition-colors focus-ring"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/juangurdian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-surface-border text-stone-400 hover:border-accent/30 hover:text-accent transition-colors focus-ring"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-stone-600 tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent"
        />
      </motion.div>
    </section>
  );
};
