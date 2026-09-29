import Image from "next/image";
import { ReactNode } from "react";
import CheckCircle from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import grainImage from '@/assets/images/grain.jpg'

const portfolioProjects = [
  {
    company: "yorCMO",
    year: "2025",
    title: "Autonomous LinkedIn Outreach Platform",
    results: [
      { title: "Problem: fractional CMOs needed personalized LinkedIn outreach at a volume no one could write by hand." },
      { title: "Built: LLM agents that source about 6,000 companies and 12,000 prospects per client, research each prospect, and draft messages in the user's voice, with human approval before anything sends. I led the build and directed one engineer." },
      { title: "Result: about 90% of drafts approved without edits. Stack: LangGraph, Unipile, Supabase, Modal, per-agent cost tracking." },
    ],
    link: "",
    image: null,
    tag: "Private client work",
  },
  {
    company: "yorCMO",
    year: "2025",
    title: "Multi-tenant Marketing Agent Platform + MCP Server",
    results: [
      { title: "Built 4 of 11 production LLM agents serving 24 client organizations through 25+ integrations (HubSpot, WordPress, Google Analytics and Ads, Mailchimp, Klaviyo, Shopify, Notion, Microsoft Graph, and more)." },
      { title: "Built and maintain the MCP server that exposes those agents as tools inside Claude, plus the shared orchestration and tool-calling layer." },
      { title: "Guardrails, prompt-regression and A/B evals, RBAC with audit logs, and per-agent cost and latency controls." },
    ],
    link: "",
    image: null,
    tag: "Private client work",
  },
  {
    company: "yorCMO",
    year: "2025",
    title: "PanelCast: Meeting-to-Content Pipeline",
    results: [
      { title: "Turns one recorded meeting into an on-brand blog post with images, a LinkedIn post for each attendee, and short-form video clips." },
      { title: "Builds a brand and voice profile for each person from their social posts and writing samples, so the output sounds like them." },
    ],
    link: "",
    image: null,
    tag: "Private",
  },
  {
    company: "Gynka",
    year: "2025",
    title: "Gynka: AI Fitness Coach",
    results: [
      { title: "A performance coach for self-coached athletes: it reads wearable biomarkers and rewrites the day's session toward the user's goal." },
      { title: "I'm the only engineer: multi-agent engine on AWS (FastAPI, Pydantic AI, Supabase, ARQ/Redis), React Native iOS and Android app, RevenueCat billing." },
      { title: "Status: closed beta on TestFlight." },
    ],
    link: "https://gynka.app",
    image: null,
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Wingman: MCP Bridge for Coding Agents",
    results: [
      { title: "TypeScript MCP server that lets a remote AI assistant monitor and drive local Claude Code and Codex sessions." },
      { title: "Bearer-token auth, tunnel setup docs, published to npm as wingman-mcp." },
    ],
    link: "https://github.com/juangurdian/wingman",
    image: null,
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Vault-AI: Local-First AI Platform",
    results: [
      { title: "Runs local models on your own hardware. An LLM router sorts each query into one of seven task types and picks a model in under 500 ms, with regex fallback, caching, and automatic upgrades when a prompt overflows the context window." },
      { title: "Next.js and FastAPI, Ollama, ChromaDB RAG, SearXNG search, ComfyUI images. One-command Docker Compose deploy." },
    ],
    link: "https://github.com/juangurdian/Vault-AI",
    image: null,
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Bug Butler: Slack to GitHub Issues",
    results: [
      { title: "Slack bot that turns a plain-language bug report into a structured GitHub Issue. It asks follow-up questions when details are missing and shows a preview before filing." },
      { title: "Python, FastAPI, Slack Bolt, LiteLLM (works with multiple model providers), Supabase, with CI." },
    ],
    link: "https://github.com/juangurdian/bug-butler",
    image: null,
  },
];

export const ProjectsSection = () => {
  return <section id="projects" className="pb-16 lg:py-24">
    <div className="container text-white">
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">Production Systems</p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">Featured Projects</h2>
      <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">Production systems I built and run, plus open-source work you can read.</p>
      <div className="mt-10 md:mt-20 flex flex-col gap-20">
        {portfolioProjects.map((project, projectIndex) => (
          <div key={project.title} className="bg-gray-800 rounded-3xl relative z-0
           overflow-hidden after:-z-10 after:content-[''] after:absolute 
           after:inset-0 after:outline-2 after:outline after:-outline-offset-2 
           after:rounded-3xl after:outline-white/20 px-8 pt-8 md:pt-12 md:px-10 after:pointer-events-none lg:pt-16 lg:px-20 sticky" style={{
            top: `calc(${projectIndex * 40}px + 50px)`,
           }}>
            <div className="absolute inset-0 -z-10 opacity-5" style={{
              backgroundImage: `url(${grainImage.src})`,
            }}>

            </div>
            <div className="lg:pb-16">
              <div className="bg-gradient-to-r from-emerald-300 to-sky-400 
              inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">

                <span>{project.company}</span>
                <span>&bull;</span>
                <span>{project.year}</span>
              </div>
            
            <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">{project.title}</h3>
            <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
            <ul className="flex flex-col gap-4 mt-4 md:mt-5">
            {project.results.map((result, index) => (
              <li key={index} className="flex gap-2 text-sm text-white/50 md:text-base">
                <CheckCircle className="size-5 md:size-6 flex-shrink-0" />
                <span>{result.title}</span>
              </li>
            ))}
            </ul>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-gray-950 h-12 
                              w-full rounded-xl font-semibold inline-flex items-center 
                              justify-center gap-2 mt-8 mb-8 md:w-auto px-6">
                    <span>View Project</span>
                    <ArrowUpRightIcon className="size-4"/>
                </button>
              </a>
            )}
            {!project.link && (
              <div className="mt-8 mb-8 text-sm text-white/40 italic">{(project as any).tag || "Private project"}</div>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>;
};
