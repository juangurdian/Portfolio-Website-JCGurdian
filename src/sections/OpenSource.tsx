"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface OSSProject {
  title: string;
  description: string;
  details: string;
  tech: string[];
  github: string;
}

const ossProjects: OSSProject[] = [
  {
    title: "Wingman",
    description: "TypeScript MCP bridge for AI coding assistants",
    details: "Lets Grok/Cursor drive local Codex and Claude Code sessions. Bridges different AI coding tools through the MCP protocol.",
    tech: ["TypeScript", "MCP", "Codex", "Claude Code"],
    github: "https://github.com/juangurdian/wingman",
  },
  {
    title: "Vault-AI",
    description: "Local-first AI with RAG",
    details: "Privacy-focused AI assistant with Retrieval-Augmented Generation. Runs locally without sending data to external servers.",
    tech: ["Python", "RAG", "Local LLMs", "Vector DB"],
    github: "https://github.com/juangurdian/Vault-AI",
  },
  {
    title: "Bug Butler",
    description: "Slack to GitHub Issues bot",
    details: "Slack + FastAPI + LiteLLM bot that turns Slack bug reports into structured GitHub Issues. Parses bug reports and creates well-formatted issues automatically.",
    tech: ["Python", "FastAPI", "LiteLLM", "Slack API", "GitHub API"],
    github: "https://github.com/juangurdian/bug-butler",
  },
];

export const OpenSourceSection = () => {
  return (
    <section id="opensource" className="py-20 lg:py-28">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="section-header">Community</span>
          <h2 className="section-title">Open Source</h2>
          <p className="text-stone-400 mt-4 max-w-lg">
            Tools I build in the open. Check each repo&apos;s README for full details.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ossProjects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 card-hover group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center">
                  <FaGithub className="text-stone-400 group-hover:text-accent transition-colors" />
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-accent transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-lg font-serif font-semibold text-stone-100 mb-1 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-sm text-accent mb-3">{project.description}</p>
              
              <p className="text-sm text-stone-400 leading-relaxed mb-4">
                {project.details}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-surface-border">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono bg-surface-elevated border border-surface-border rounded text-stone-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
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
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-accent transition-colors"
          >
            <FaGithub />
            View all repositories on GitHub
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
