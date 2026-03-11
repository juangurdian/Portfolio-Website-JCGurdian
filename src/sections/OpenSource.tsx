"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface OSSProject {
  title: string;
  description: string;
  highlight: string;
  tech: string[];
  github: string;
  link?: string;
}

const ossProjects: OSSProject[] = [
  {
    title: "Bug Butler",
    description:
      "Open-source VS Code extension that uses AI to automatically detect, explain, and fix bugs in your code. Context-aware debugging assistant that understands your codebase.",
    highlight: "AI-powered debugging for VS Code",
    tech: ["TypeScript", "VS Code API", "OpenAI", "LangChain"],
    github: "https://github.com/juangurdian/bug-butler",
  },
  {
    title: "Everything Claude Code",
    description:
      "Comprehensive configuration and skill system for Claude Code — Anthropic's AI coding assistant. Agents, skills, hooks, and workflows that supercharge AI-assisted development.",
    highlight: "Anthropic Hackathon Winner",
    tech: ["TypeScript", "Claude Code", "MCP", "Agents"],
    github: "https://github.com/juangurdian/everything-claude-code",
  },
];

export const OpenSourceSection = () => {
  return (
    <section id="opensource" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            Community
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            Open Source
          </h2>
          <p className="text-white/40 mt-3 max-w-lg">
            Tools I build in the open for the developer community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ossProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 group hover:border-neural-primary/30 transition-all duration-300"
            >
              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-primary/10 border border-neural-primary/20 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-neural-primary" />
                <span className="text-[10px] font-mono text-neural-primary tracking-wider uppercase">
                  {project.highlight}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neural-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/8 rounded text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-sm font-semibold hover:border-neural-primary/30 hover:text-neural-primary transition-colors"
                >
                  <FaGithub className="text-sm" />
                  View on GitHub
                </a>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neural-primary/10 border border-neural-primary/20 text-neural-primary text-sm font-semibold hover:bg-neural-primary/20 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub profile link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/juangurdian"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-neural-primary transition-colors font-mono"
          >
            <FaGithub />
            View all repositories on GitHub
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
