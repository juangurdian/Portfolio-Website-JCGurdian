import Image from "next/image";
import atomlogo from "@/assets/images/atomlogo.png"
import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import { Fragment } from 'react';
import cargill from "@/assets/images/cargill.png";
import memojicomputer from "@/assets/images/memoji-computer.png";

const testimonials = [
  {
    name: "AI Engineer",
    position: "yorCMO | Sep 2025 to Present",
    text: "AI-native fractional CMO firm. Platform lead for Linky, an autonomous LinkedIn outreach platform on LLM agents. Built 4 of 11 production agents serving 24 client orgs across 25+ integrations. Built and maintain an MCP server exposing platform agents as tools in Claude. Own guardrails, evals, RBAC, and backend services on Modal, Vercel, Supabase, and AWS.",
    avatar: memojicomputer,
  },
  {
    name: "Co-Founder & CTO",
    position: "Gynka | Jan 2025 to Present",
    text: "Sole technical owner of an AI fitness coaching app in closed beta. Architected and built the multi-agent AI coach engine on AWS (FastAPI, Pydantic AI, Supabase, ARQ/Redis, RevenueCat). Built the full iOS and Android app in React Native. Own product decisions end to end: schemas, APIs, infrastructure, release process.",
    avatar: memojicomputer,
  },
  {
    name: "Machine Learning Intern",
    position: "AtomChat | Jul to Oct 2024",
    text: "Built and deployed a customer-facing LLM agent for automotive dealerships (OpenAI API, LangChain, Pinecone, MySQL, Google Calendar) on WhatsApp, Instagram, Messenger, and Facebook. Built Scrapy ingestion pipelines and tuned vector queries to keep retrieval real-time.",
    avatar: atomlogo,
  },
  {
    name: "Digital Transformation Intern",
    position: "Cargill | Jun to Aug 2023",
    text: "Engineered workflow automation systems using PowerApps and PowerBI for real-time data analysis, supporting key business decisions across international teams.",
    avatar: cargill,
  },
];

export const TestimonialsSection = () => {
  return (
  <div className="py-16 lg:py-24">
    <div className="container">
      <SectionHeader 
        title={"Experience"} 
        eyebrow={"Career"} 
        description={"Building production AI systems for real clients."} />

      <div className="mt-12 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:40s] hover:[animation-play-state:paused]">
          {[...new Array(2)].fill(0).map((_, index) => (
            <Fragment key={index}>
          
        {testimonials.map(testimonial => (
          <Card key={testimonial.name} className="max-w-xs md:max-w-md p-6 md:p-8 hover:rotate-3 transition duration-300">
            <div className="flex gap-4 items-center">
              <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0">
            <Image src={testimonial.avatar} alt={testimonial.name} className="max-h-full" />
              </div>
              <div>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-white/40 text-sm">{testimonial.position}</div>
              </div>
            </div>
            <p className="text-white mt-4 md:mt-6 text-sm md:text-base">{testimonial.text}</p>
          </Card>
        ))}
        </Fragment>
      ))}
      </div>
    </div>
    </div>
  </div>
  );
};
