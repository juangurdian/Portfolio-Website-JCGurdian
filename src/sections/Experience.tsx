"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  companyDescription?: string;
  companyUrl?: string;
  dateRange: string;
  highlights: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    role: "AI Engineer",
    company: "yorCMO",
    companyDescription: "AI-native fractional CMO firm, Anthropic partner",
    companyUrl: "https://yorcmo.ai",
    dateRange: "Sep 2025 - Present",
    current: true,
    highlights: [
      "Platform lead on Linky: autonomous LinkedIn outreach serving ~6,000 companies and ~12,000 prospects per client org, ~90% draft approval rate without edits",
      "Built 4 of 11 production LLM agents on CORE Growth Platform serving 24 client orgs across 25+ integrations",
      "Built and maintain the MCP server exposing platform agents as tools inside Claude",
      "PanelCast: meeting-to-content pipeline with brand/voice profiles",
      "Practice Growth System: five-agent build from meeting transcripts, second org onboarded with no firm-specific code",
      "Own guardrails (PII redaction, role-aware prompts), evals, RBAC, backend services (Modal, Vercel, Supabase, AWS)",
    ],
  },
  {
    role: "Co-Founder & CTO",
    company: "Gynka",
    companyUrl: "https://gynka.app",
    dateRange: "Ongoing",
    current: true,
    highlights: [
      "Sole technical owner of AI fitness coaching product in closed beta",
      "Architected multi-agent AI coach engine on AWS (FastAPI, Pydantic AI, Supabase, ARQ/Redis, RevenueCat)",
      "Built full iOS and Android app in React Native, distributed via TestFlight",
      "Coach ingests biomarker data from wearables and adapts workouts to user goals",
      "Own schemas, APIs, infrastructure, and release process",
    ],
  },
  {
    role: "ML Intern",
    company: "AtomChat",
    companyUrl: "https://atomchat.com",
    dateRange: "Jul - Oct 2024",
    highlights: [
      "Built ML models for chat analytics and user behavior prediction",
      "Implemented NLP features for sentiment analysis in real-time messaging",
    ],
  },
  {
    role: "Digital Transformation Intern",
    company: "Cargill",
    companyUrl: "https://cargill.com",
    dateRange: "Jun - Aug 2023",
    highlights: [
      "Led digital transformation initiatives for supply chain operations",
      "Built data dashboards and automation tools improving operational efficiency",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="section-header">Career</span>
          <h2 className="section-title">Experience</h2>
          <p className="text-stone-400 mt-4 max-w-lg">
            B.S. Computer Information Technology, TCU (May 2025). Claude Code Certified.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-surface-border to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.dateRange}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline node */}
                <div className="absolute left-2.5 md:left-4.5 top-1.5">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      exp.current
                        ? "bg-accent border-accent"
                        : "bg-surface-bg border-stone-600"
                    }`}
                  />
                  {exp.current && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-30" />
                  )}
                </div>

                {/* Content */}
                <div className="card p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-serif font-semibold text-stone-100">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:text-accent-light transition-colors"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-sm text-accent">{exp.company}</span>
                        )}
                        {exp.companyDescription && (
                          <span className="text-xs text-stone-500">
                            {exp.companyDescription}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {exp.current && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20 rounded">
                          Current
                        </span>
                      )}
                      <span className="font-mono text-xs text-stone-500">
                        {exp.dateRange}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j} className="flex gap-2 text-sm text-stone-400">
                        <span className="text-accent mt-1 shrink-0">›</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-4 border border-surface-border rounded-lg bg-surface-card/50"
        >
          <p className="text-sm text-stone-500 text-center">
            I use Claude Code and Codex to move faster on implementation and review. 
            I still own design, correctness, evals, and what reaches production.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
