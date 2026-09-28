import Image from "next/image";
import { ReactNode } from "react";
import CheckCircle from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import grainImage from '@/assets/images/grain.jpg'

const portfolioProjects = [
  {
    company: "yorCMO",
    year: "2025",
    title: "Linky: Autonomous LinkedIn Outreach Platform",
    results: [
      { title: "Platform lead for autonomous LinkedIn outreach on LLM agents. Per client it sources about 6,000 companies and 12,000 prospects, researches each prospect, and drafts outreach in the user's voice." },
      { title: "About 90% of drafts are approved without edits, with human approval before send. Directed one engineer on the project." },
      { title: "Built on LangGraph, Unipile API, Supabase, and Modal with full observability and per-agent cost controls." },
    ],
    link: "",
    image: null,
  },
  {
    company: "yorCMO",
    year: "2025",
    title: "CORE Growth Platform + MCP Server",
    results: [
      { title: "Built 4 of 11 production LLM agents serving 24 client organizations across 25+ integrations (LinkedIn/Unipile, WordPress, HubSpot, Google Analytics and Ads, Mailchimp, Klaviyo, Apify, Notion, Shopify, Microsoft Graph)." },
      { title: "Built and maintain an MCP server that exposes platform agents as tools inside Claude, plus the shared orchestration and tool-calling layer." },
      { title: "Own guardrails (PII redaction, role-aware prompts), evals (prompt regression, A/B), RBAC and audit logs, and backend services on Modal, Vercel, Supabase, and AWS with Docker, GitHub Actions, observability." },
    ],
    link: "",
    image: null,
  },
  {
    company: "yorCMO",
    year: "2025",
    title: "PanelCast: Meeting-to-Content Pipeline",
    results: [
      { title: "Turns a recorded meeting into an on-brand blog post, per-attendee LinkedIn posts, and short-form video clips." },
      { title: "AI pipeline with transcription, speaker diarization, and automated content generation using Next.js, TypeScript, Python, FastAPI, and OpenAI." },
      { title: "Live production tool used by yorCMO marketing teams, deployed on Vercel with full CI/CD pipeline." },
    ],
    link: "",
    image: null,
  },
  {
    company: "Gynka",
    year: "2025",
    title: "Gynka: AI Fitness Coaching App",
    results: [
      { title: "Sole technical owner of an AI fitness coaching app in closed beta. Architected and built the multi-agent AI coach engine on AWS (FastAPI, Pydantic AI, Supabase, ARQ/Redis, RevenueCat)." },
      { title: "Built the full iOS and Android app in React Native, distributed via TestFlight to advisors and early users." },
      { title: "The coach ingests biomarker data from connected wearables and adapts each workout toward the user's goal. Own product decisions end to end." },
    ],
    link: "https://gynka.app",
    image: null,
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Wingman: MCP Bridge for AI Coding Assistants",
    results: [
      { title: "TypeScript MCP bridge that lets an assistant monitor and drive Claude Code / Codex sessions." },
      { title: "Enables AI assistants to observe and interact with coding sessions programmatically." },
      { title: "Open source project available on GitHub with full documentation." },
    ],
    link: "https://github.com/juangurdian/wingman",
    image: null,
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Vault-AI: Local-First AI Platform",
    results: [
      { title: "Local-first AI platform with an LLM smart router that picks among local models by task type in under 500ms." },
      { title: "ChromaDB RAG, FastAPI + Next.js frontend, Ollama for local inference, SearXNG for search, ComfyUI integration." },
      { title: "One-command Docker Compose deployment for fully self-hosted AI capabilities." },
    ],
    link: "https://github.com/juangurdian/Vault-AI",
    image: null,
  },
  {
    company: "Open Source",
    year: "2025",
    title: "Bug Butler: Slack Bot for GitHub Issues",
    results: [
      { title: "Slack bot that turns bug reports into structured GitHub Issues automatically." },
      { title: "Built with Python, FastAPI, and LiteLLM for intelligent parsing and formatting of bug reports." },
      { title: "CI integration for automated issue creation and team workflow optimization." },
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
      <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">Real tools serving real clients and users.</p>
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
              <div className="mt-8 mb-8 text-sm text-white/40 italic">Private project</div>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>;
};
