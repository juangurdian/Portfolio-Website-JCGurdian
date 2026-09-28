"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  type: "production" | "startup";
  problem: string;
  solution: string;
  outcome: string;
  tech: string[];
  link?: string;
  github?: string;
}

const workItems: WorkItem[] = [
  {
    id: "linky",
    title: "Linky",
    subtitle: "Autonomous LinkedIn Outreach Platform",
    company: "yorCMO",
    type: "production",
    problem: "Fractional CMOs needed scalable, personalized LinkedIn outreach that sounds human, not templated.",
    solution: "Built an autonomous agent platform that sources ~6,000 companies and ~12,000 prospects per client org from a defined ICP, researches each prospect, and drafts outreach in the user's voice. Human approval before send. Directed one engineer.",
    outcome: "~90% of drafts approved without edits. Production system serving multiple client orgs daily.",
    tech: ["Python", "LLM Agents", "LinkedIn API", "Enrichment Pipelines", "PostgreSQL"],
  },
  {
    id: "core-growth",
    title: "CORE Growth Platform",
    subtitle: "Multi-Agent Platform for Marketing Operations",
    company: "yorCMO",
    type: "production",
    problem: "Marketing teams juggle 25+ tools. Manual workflows slow campaigns and create data silos.",
    solution: "Built 4 of 11 production LLM agents serving the platform. Designed shared orchestration layer and backend structure. Integrations include LinkedIn/Unipile, WordPress, HubSpot, Google Analytics and Ads, Mailchimp, Klaviyo, Apify, Notion, Shopify, Microsoft Graph.",
    outcome: "24 client orgs served. 25+ production integrations. Shared backend maintained across the platform.",
    tech: ["Python", "TypeScript", "LLM Agents", "FastAPI", "Supabase", "Multiple APIs"],
  },
  {
    id: "mcp-server",
    title: "MCP Server",
    subtitle: "Claude Tool Integration Layer",
    company: "yorCMO",
    type: "production",
    problem: "Platform agents needed to be accessible as tools inside Claude for seamless AI-assisted workflows.",
    solution: "Built and maintain the MCP server exposing platform agents as tools inside Claude, plus the shared orchestration and tool-calling layer.",
    outcome: "Production MCP integration enabling AI-native workflows across the platform.",
    tech: ["TypeScript", "MCP Protocol", "Claude API", "Node.js"],
  },
  {
    id: "panelcast",
    title: "PanelCast",
    subtitle: "Meeting-to-Content Pipeline",
    company: "yorCMO",
    type: "production",
    problem: "Transforming recorded meetings into polished, on-brand content required hours of manual work.",
    solution: "Built a pipeline that takes recorded meetings and produces on-brand blog posts, per-attendee LinkedIn posts, and short-form video using brand/voice profiles.",
    outcome: "Production system used by marketing teams to transform meetings into multi-channel content.",
    tech: ["Python", "FastAPI", "OpenAI", "Next.js", "Content Generation"],
  },
  {
    id: "practice-growth",
    title: "Practice Growth System",
    subtitle: "Five-Agent Meeting Intelligence",
    company: "yorCMO",
    type: "production",
    problem: "Professional firms needed to extract actionable insights from client meeting transcripts at scale.",
    solution: "Internal lead on a five-agent build from client meeting transcripts (Fathom, Microsoft Graph, approval queue). Built for portability across orgs.",
    outcome: "Pilot delivered on schedule. Second org onboarded with no firm-specific code changes.",
    tech: ["Python", "LLM Agents", "Fathom API", "Microsoft Graph", "Queue System"],
  },
  {
    id: "gynka",
    title: "Gynka",
    subtitle: "AI Fitness Coaching App",
    company: "Gynka (Co-Founder & CTO)",
    type: "startup",
    problem: "Generic fitness apps ignore individual biomarkers and recovery data, leading to suboptimal training.",
    solution: "Sole technical owner. Architected multi-agent AI coach engine on AWS. Built full iOS and Android app in React Native. Coach ingests biomarker data from wearables and adapts each workout toward the user's goal.",
    outcome: "Closed beta via TestFlight. Full product ownership: schemas, APIs, infra, release process.",
    tech: ["React Native", "FastAPI", "AWS", "Pydantic AI", "Supabase", "Redis", "RevenueCat"],
    link: "https://gynka.app",
  },
];

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6 md:p-8 card-hover"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${
              item.type === "production" 
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-accent/10 text-accent border border-accent/20"
            }`}>
              {item.type === "production" ? "Production" : "Startup"}
            </span>
            <span className="text-sm text-stone-500">{item.company}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-stone-100">
            {item.title}
          </h3>
          <p className="text-sm text-stone-400 mt-0.5">{item.subtitle}</p>
        </div>
        
        {/* Links */}
        <div className="flex gap-2">
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-surface-border text-stone-400 hover:border-accent/30 hover:text-accent transition-colors"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              Visit
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-surface-border text-stone-400 hover:border-accent/30 hover:text-accent transition-colors"
            >
              <FaGithub className="w-3 h-3" />
              Code
            </a>
          )}
        </div>
      </div>

      {/* Content grid */}
      <div className="space-y-4 mt-6">
        <div>
          <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-1.5">Problem</h4>
          <p className="text-sm text-stone-300 leading-relaxed">{item.problem}</p>
        </div>
        <div>
          <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-1.5">What I Built</h4>
          <p className="text-sm text-stone-300 leading-relaxed">{item.solution}</p>
        </div>
        <div>
          <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-1.5">Outcome</h4>
          <p className="text-sm text-accent leading-relaxed">{item.outcome}</p>
        </div>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-surface-border">
        {item.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-xs font-mono bg-surface-elevated border border-surface-border rounded text-stone-400"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export const WorkSection = () => {
  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="section-header">Production Work</span>
          <h2 className="section-title">Systems I Own</h2>
          <p className="text-stone-400 mt-4 max-w-2xl">
            End-to-end ownership: architecture, implementation, evals, and reliability. 
            These are production systems serving real clients, not demos.
          </p>
        </motion.div>

        {/* Work grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workItems.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Infrastructure note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 card"
        >
          <h3 className="text-sm font-mono text-stone-400 uppercase tracking-wider mb-3">
            Platform Ownership
          </h3>
          <p className="text-sm text-stone-400 leading-relaxed">
            Beyond individual projects, I own guardrails (PII redaction, role-aware prompts), 
            evals (prompt regression, A/B testing), RBAC/audit logs, and backend services across 
            Modal, Vercel, Supabase, and AWS with Docker, GitHub Actions, observability, 
            and per-agent cost/latency controls.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
