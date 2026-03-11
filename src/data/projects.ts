import { StaticImageData } from "next/image";
import bole from "@/assets/images/boleto.png";
import orion from "@/assets/images/orion.png";
import frogcrew from "@/assets/images/frogcrew.jpeg";
import motivateme from "@/assets/images/motivatemePoster.png";
import jasper from "@/assets/images/jasper.png";
import socialhour from "@/assets/images/socialhour.png";

export type ProjectTier = "primary" | "secondary";

export interface Project {
  id: string;
  title: string;
  company: string;
  year: string;
  role: string;
  description: string;
  results: string[];
  tech: string[];
  link: string;
  github?: string;
  image: StaticImageData;
  tier: ProjectTier;
}

export const projects: Project[] = [
  // PRIMARY TIER — Full showcase cards
  {
    id: "panelcast",
    title: "PanelCast",
    company: "yorCMO.ai",
    year: "2025",
    role: "Solo Developer",
    description:
      "Production SaaS platform that transforms expert panel discussions into multi-format content. Built solo from concept to production — AI-powered transcription, speaker diarization, and automated content generation for marketing teams.",
    results: [
      "Built full production SaaS solo — from architecture to deployment",
      "AI pipeline: transcription, diarization, and multi-format content generation",
      "Serves real marketing teams at yorCMO.ai for panel-to-content workflows",
    ],
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "OpenAI", "Supabase", "Vercel"],
    link: "https://panelcast.yorcmo.ai",
    image: orion, // placeholder until PanelCast screenshot is added
    tier: "primary",
  },
  {
    id: "beast-ai",
    title: "Beast AI",
    company: "yorCMO.ai",
    year: "2025",
    role: "AI Developer",
    description:
      "Intelligent content generation platform for marketing teams. Uses fine-tuned LLMs to produce brand-consistent copy across channels — blog posts, social media, email campaigns, and ad copy at scale.",
    results: [
      "Multi-channel content generation with brand voice consistency",
      "Fine-tuned LLM pipeline for marketing-specific outputs",
      "Integrated into yorCMO's content operations workflow",
    ],
    tech: ["Python", "LangChain", "OpenAI", "FastAPI", "React", "PostgreSQL"],
    link: "",
    image: jasper, // placeholder
    tier: "primary",
  },
  {
    id: "bug-butler",
    title: "Bug Butler",
    company: "Open Source",
    year: "2025",
    role: "Creator",
    description:
      "Open-source VS Code extension that uses AI to automatically detect, explain, and fix bugs in your code. Context-aware debugging assistant that understands your codebase and suggests fixes with explanations.",
    results: [
      "Open-source AI debugging assistant for VS Code",
      "Context-aware bug detection with codebase understanding",
      "Automated fix suggestions with clear explanations",
    ],
    tech: ["TypeScript", "VS Code API", "OpenAI", "LangChain", "Node.js"],
    link: "https://github.com/juangurdian/bug-butler",
    github: "https://github.com/juangurdian/bug-butler",
    image: orion, // placeholder
    tier: "primary",
  },
  // SECONDARY TIER — Condensed cards
  {
    id: "boleto",
    title: "Bole.to",
    company: "Bole.to",
    year: "2025",
    role: "Co-CEO & CTO",
    description:
      "Social ticketing & events platform combining ticketing, offline access control, and social engagement. QR check-in works with no signal — local validation, multi-gate sync, duplicate detection.",
    results: [
      "Co-founded: ticketing + social layer for events",
      "Offline QR check-in with multi-gate sync",
      "Payments in NIO/USD via Stripe, dLocal, PayPal",
    ],
    tech: ["Next.js", "React Native", "Supabase", "TypeScript", "Expo"],
    link: "https://www.mybole.to/",
    image: bole,
    tier: "secondary",
  },
  {
    id: "jarvis",
    title: "Jasper AI",
    company: "Personal",
    year: "2025",
    role: "Creator",
    description:
      "Conversation-first productivity assistant that turns chat/voice into actions across Tasks, Calendar, Email, and Finance. Custom GPT-4.1 intent engine with strict JSON routing.",
    results: [
      "Multi-intent NL parsing with GPT-4.1 Nano",
      "2-way Google Calendar & Gmail sync",
      "Voice expense logging and financial reports",
    ],
    tech: ["React", "Node.js", "OpenAI", "Google APIs", "PWA"],
    link: "",
    image: jasper,
    tier: "secondary",
  },
  {
    id: "frogcrew",
    title: "FrogCrew",
    company: "TCU",
    year: "2025",
    role: "Full Stack Developer",
    description:
      "Sports broadcasting management platform for TCU. Crew scheduling, shift assignment, availability tracking with role-based security.",
    results: [
      "Full-stack crew management for TCU Sports Broadcasting",
      "Admin scheduling with availability automation",
      "Role-based security with Spring Boot backend",
    ],
    tech: ["Vue 3", "Spring Boot", "PostgreSQL", "TailwindCSS"],
    link: "https://github.com/juangurdian/FrogCrew.v2",
    github: "https://github.com/juangurdian/FrogCrew.v2",
    image: frogcrew,
    tier: "secondary",
  },
  {
    id: "pearlwolf",
    title: "Social Hour Studio",
    company: "Freelance",
    year: "2024",
    role: "Web Developer",
    description:
      "Marketing agency website built freelance. Modern responsive design with smooth animations, hosting and maintenance included.",
    results: [
      "Custom design matching agency brand identity",
      "Smooth animations and engaging UX",
      "Hosting, maintenance, and analytics setup",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://socialhourstudio.co",
    image: socialhour,
    tier: "secondary",
  },
];

export const primaryProjects = projects.filter((p) => p.tier === "primary");
export const secondaryProjects = projects.filter((p) => p.tier === "secondary");
