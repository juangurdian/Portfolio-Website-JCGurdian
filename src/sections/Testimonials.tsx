import Image from "next/image";
import atomlogo from "@/assets/images/atomlogo.png"
import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import { Fragment } from 'react';
import cargill from "@/assets/images/cargill.png";
import memojicomputer from "@/assets/images/memoji-computer.png";

const experienceItems = [
  {
    name: "AI Engineer",
    position: "yorCMO | Sep 2025 to Present | Tampa, FL (remote)",
    bullets: [
      "Led the design and build of Linky, an autonomous LinkedIn outreach platform on LLM agents. For each client it sources about 6,000 companies and 12,000 prospects, researches each prospect, and drafts messages in the user's voice. About 90% of drafts are approved without edits, and a person approves every message before it sends. Directed one engineer.",
      "Built 4 of 11 production LLM agents on CORE, a multi-tenant marketing platform serving 24 client organizations through 25+ integrations, including HubSpot, WordPress, Google Analytics and Ads, Shopify, Klaviyo, and Microsoft Graph.",
      "Built and maintain the MCP server that exposes CORE's agents as tools inside Claude, plus the shared orchestration and tool-calling layer the agents run on.",
      "Own guardrails (PII redaction, role-aware prompts), evals (prompt regression, A/B tests), RBAC and audit logs, and per-agent cost and latency controls across Modal, Vercel, Supabase, and AWS.",
    ],
    avatar: memojicomputer,
  },
  {
    name: "Co-Founder and CTO",
    position: "Gynka | Jan 2025 to Present | Remote",
    bullets: [
      "Only engineer on an AI fitness coaching app in closed beta (gynka.app).",
      "Designed and built the multi-agent coach engine on AWS: FastAPI, Pydantic AI, Supabase, ARQ/Redis, RevenueCat.",
      "Built the iOS and Android app in React Native and ship it through TestFlight to advisors and early users.",
      "The coach reads biomarker data from connected wearables and adjusts each workout toward the user's goal.",
      "Own schemas, APIs, infrastructure, and the release process.",
    ],
    avatar: memojicomputer,
  },
  {
    name: "Machine Learning Intern",
    position: "AtomChat | Jul to Oct 2024 | Remote",
    bullets: [
      "Built and deployed a customer-facing LLM agent for automotive dealerships (OpenAI API, LangChain, Pinecone, MySQL, Google Calendar) on WhatsApp, Instagram, Messenger, and Facebook.",
      "Built Scrapy ingestion pipelines and tuned vector queries to keep retrieval real-time.",
    ],
    avatar: atomlogo,
  },
  {
    name: "Digital Transformation Intern",
    position: "Cargill | Jun to Aug 2023",
    bullets: [
      "Built Power Apps workflow automations and Power BI adoption and ROI dashboards with international managers, reducing operational workload by 25%.",
    ],
    avatar: cargill,
  },
];

export const TestimonialsSection = () => {
  return (
  <div className="py-16 lg:py-24" id="experience">
    <div className="container">
      <SectionHeader 
        title={"Experience"} 
        eyebrow={"Career"} 
        description={"Building production AI systems for real clients."} />

      <div className="mt-12 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:40s] hover:[animation-play-state:paused]">
          {[...new Array(2)].fill(0).map((_, index) => (
            <Fragment key={index}>
              <div className={index === 1 ? "contents" : ""} aria-hidden={index === 1 ? "true" : undefined}>
                {experienceItems.map(item => (
                  <Card key={`${item.name}-${index}`} className="max-w-xs md:max-w-md p-6 md:p-8 hover:rotate-3 transition duration-300">
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0">
                        <Image src={item.avatar} alt={item.name} className="max-h-full" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{item.name}</div>
                        <div className="text-white/40 text-sm">{item.position}</div>
                      </div>
                    </div>
                    <ul className="mt-4 md:mt-6 text-sm md:text-base space-y-2">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="text-white/80 flex gap-2">
                          <span className="text-emerald-300 mt-0.5 flex-shrink-0">&#9656;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};
