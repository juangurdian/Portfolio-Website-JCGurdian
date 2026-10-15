export type FeaturedProject = {
  company: string;
  year: string;
  title: string;
  /** Short label for the side rail. */
  shortName: string;
  results: readonly string[];
  link?: string;
  /** Shown instead of a link for private work. */
  tag?: string;
};

export const featuredProjects: readonly FeaturedProject[] = [
  {
    company: "yorCMO",
    year: "2025",
    title: "Linky: Autonomous LinkedIn Outreach Platform",
    shortName: "Linky",
    results: [
      "Problem: fractional CMOs needed personalized LinkedIn outreach at a volume no one could write by hand.",
      "Built: LLM agents that source about 6,000 companies and 12,000 prospects per client, research each prospect, and draft messages in the user's voice, with human approval before anything sends. I led the build and directed one engineer.",
      "Result: about 90% of drafts approved without edits. Stack: LangGraph, Unipile, Supabase, Modal, per-agent cost tracking.",
    ],
    tag: "yorCMO",
  },
  {
    company: "yorCMO",
    year: "2025",
    title: "CORE Growth Platform + MCP Server",
    shortName: "CORE",
    results: [
      "Built 4 of 11 production LLM agents serving 24 client organizations through 25+ integrations (HubSpot, WordPress, Google Analytics and Ads, Mailchimp, Klaviyo, Shopify, Notion, Microsoft Graph, and more).",
      "Built and maintain the MCP server that exposes CORE's agents as tools inside Claude, plus the shared orchestration and tool-calling layer.",
      "Guardrails, prompt-regression and A/B evals, RBAC with audit logs, and per-agent cost and latency controls.",
    ],
    tag: "yorCMO",
  },
  {
    company: "yorCMO",
    year: "2025",
    title: "PanelCast: Meeting-to-Content Pipeline",
    shortName: "PanelCast",
    results: [
      "Turns one recorded meeting into an on-brand blog post with images, a LinkedIn post for each attendee, and short-form video clips.",
      "Builds a brand and voice profile for each person from their social posts and writing samples, so the output sounds like them.",
    ],
    tag: "yorCMO",
  },
  {
    company: "Gynka",
    year: "2025",
    title: "Gynka: AI Fitness Coach",
    shortName: "Gynka",
    results: [
      "A performance coach for self-coached athletes: it reads wearable biomarkers and rewrites the day's session toward the user's goal.",
      "I'm the only engineer: multi-agent engine on AWS (FastAPI, Pydantic AI, Supabase, ARQ/Redis), React Native iOS and Android app, RevenueCat billing.",
      "Status: closed beta on TestFlight.",
    ],
    link: "https://gynka.app",
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Wingman: MCP Bridge for Coding Agents",
    shortName: "Wingman",
    results: [
      "TypeScript MCP server that lets a remote AI assistant monitor and drive local Claude Code and Codex sessions.",
      "Bearer-token auth, tunnel setup docs, published to npm as wingman-mcp.",
    ],
    link: "https://github.com/juangurdian/wingman",
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Vault-AI: Local-First AI Platform",
    shortName: "Vault-AI",
    results: [
      "Runs local models on your own hardware. An LLM router sorts each query into one of seven task types and picks a model in under 500 ms, with regex fallback, caching, and automatic upgrades when a prompt overflows the context window.",
      "Next.js and FastAPI, Ollama, ChromaDB RAG, SearXNG search, ComfyUI images. One-command Docker Compose deploy.",
    ],
    link: "https://github.com/juangurdian/Vault-AI",
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Bug Butler: Slack to GitHub Issues",
    shortName: "Bug Butler",
    results: [
      "Slack bot that turns a plain-language bug report into a structured GitHub Issue. It asks follow-up questions when details are missing and shows a preview before filing.",
      "Python, FastAPI, Slack Bolt, LiteLLM (works with multiple model providers), Supabase, with CI.",
    ],
    link: "https://github.com/juangurdian/bug-butler",
  },
];
