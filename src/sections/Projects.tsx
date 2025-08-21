import Image from "next/image";
import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import { ReactNode } from "react";
import CheckCircle from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import grainImage from '@/assets/images/grain.jpg'
import ArrowDown from '@/assets/icons/arrow-down.svg'
import socialhour from "@/assets/images/socialhour.png"
import orion from "@/assets/images/orion.png"
import frogcrew from "@/assets/images/frogcrew.jpeg"
import motivateme from "@/assets/images/motivatemePoster.png"
import bole from "@/assets/images/boleto.png"
import jasper from "@/assets/images/jasper.png"

const portfolioProjects = [
  {
    company: "Bole.to",
    year: "2025-Present",
    title: "Bole.to - Social Ticketing & Events Operation Platform",
    results: [
      { title: "Co-founded with a friend; I serve as Co-CEO & CTO. Designing and building an all-in-one platform that combines ticketing and offline access control with a social layer to drive pre/post-show engagement." },
      { title: "Led the web + mobile architecture (Next.js 14, React Native (Expo), TypeScript), integrating Hi.Events for ticketing, QR check-in that works with no signal (local validation, multi-gate sync, duplicate detection), and a wallet for attendees." },
      { title: "Built the social stack (Supabase Realtime/Storage/Edge Functions): event feed with announcements & live polls and a D+1 camera that reveals photos the next day (moderation, scheduled jobs, push notifications). Set up Vercel/EAS CI/CD, Sentry + analytics, and payments (Stripe / dLocal / PayPal) for NIO/USD." },
    ],
    link: "https://www.mybole.to/",
    image: bole,
  },
  {
    company: "O.R.I.O.N",
    year: "2025",
    title: "O.R.I.O.N Customer Assistant - AI Platform for small businesses",
    results: [
      { title: "Developed a self-hosted AI assistant designed for small businesses (food trucks, shops, salons) to automate customer interactions such as FAQs, menu inquiries, and simple order taking." },
      { title: "Implemented a retrieval-augmented generation (RAG) system using FAISS and sentence-transformers for accurate, context-aware responses from uploaded FAQs, menus, and documents." },
      { title: "Built multi-channel support including a web chat widget, WhatsApp (Twilio/Cloud API), and Telegram, enabling businesses to connect with customers where they already are." },
    ],
    link: "https://github.com/juangurdian/CustomerService-AI-Automation",
    image: orion,
  },
  {
    company: "TCU",
    year: "2025",
    title: "FrogCrew — Sports Broadcasting Management Platform",
    results: [
      { title: "Developed a full-stack platform using Vue 3 and TailwindCSS for managing TCU's Sports Broadcasting crews, events, and scheduling, enabling seamless coordination of broadcast operations." },
      { title: "Built features for admins to assign shifts, track crew member availability, and automate communications, while providing crew members with an intuitive interface to view upcoming events and manage profiles." },
      { title: "Integrated with Spring Boot backend and PostgreSQL database with role-based security, designed with scalability in mind to accommodate growing broadcast operations." },
    ],
    link: "https://github.com/juangurdian/FrogCrew.v2",
    image: frogcrew,
  },{
    company: "TCU",
    year: "2025",
    title: "MotivateMe  – Health & Wellness Mobile App",
    results: [
      { title: "Collaborated with UNT Health Science Center to design and build a cross-platform mobile app using React Native, Spring Boot, and PostgreSQL." },
      { title: "Developed key features including SMART goal setting, daily journaling, biometrics tracking, chronic condition logging, motivational notifications, and a weekly calendar overview." },
      { title: "Focused on accessibility and usability to support underserved communities in forming healthy habits and improving long-term wellness outcomes." },
    ],
    link: "https://seniordesign.cs.tcu.edu/",
    image: motivateme,
  },
  {
    company: "Jasper AI",
    year: "2025",
    title: "Jasper AI — Conversation-First Personal Productivity Assistant",
    results: [
      { title: "Conversation-first web assistant that turns casual chat/voice into actions across Tasks/Calendar/Email/Finance; a custom GPT-4.1 Nano intent engine parses multi-intent requests and outputs strict JSON for deterministic function routing with an Other/Clarify fallback." },
      { title: "Modules: Tasks (NL add/edit/complete, priorities), Calendar (2-way Google sync, reschedule & conflict-fix), Email (Gmail summaries + tone-matched drafts), Finance (voice expense logging, reports); live: Gmail & Google Calendar · next: Outlook Mail/Calendar, Slack, Notion, Discord, Google Drive." },
      { title: "Platforms & trust: runs in any browser + PWA; native iOS/Android and macOS/Windows wrappers planned; OAuth2 least-privilege, encryption, data isolation, no training on personal data; instrumentation for intent accuracy, action success, and latency." },
    ],
    link: "",
    image: jasper,
  },
  {
    company: "Social Hour Studio",
    year: "2024",
    title: "Marketing Agency Website",
    results: [
      { title: "Collaborated closely with the client to design and develop a modern, responsive website that effectively showcases their marketing services and portfolio, ensuring their brand identity was perfectly represented." },
      { title: "Built a custom website using HTML, CSS, and JavaScript, implementing smooth animations and transitions to create an engaging user experience that aligns with the agency's creative vision." },
      { title: "Provided comprehensive web hosting and maintenance services, ensuring optimal performance, security updates, and continuous improvements based on client feedback and analytics." },
    ],
    link: "https://socialhourstudio.co",
    image: socialhour,
  },
  
];

export const ProjectsSection = () => {
  function result(value: { title: string; }, index: number, array: { title: string; }[]): ReactNode {
    throw new Error("Function not implemented.");
  }

  return <section id="projects" className="pb-16 lg:py-24">
    <div className="container text-white">
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">Real-world Results</p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">Featured Projects</h2>
      <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">Projects</p>
      <div className="mt-10 md:mt-20 flex flex-col gap-20">
        {portfolioProjects.map((project, projectIndex) => (
          <div key={project.title} className="bg-gray-800 rounded-3xl relative z-0
           overflow-hidden after:-z-10 after:content-[''] after:absolute 
           after:inset-0 after:outline-2 after:outline after:-outline-offset-2 
           after:rounded-3xl after:outline-white/20 px-8 pt-8 md:pt-12 md:px-10 after:pointer-events-none lg:pt-16 lg:px-20 sticky" style={{
            top: `calc(${projectIndex * 100}px + 50px)`,
           }}>
            <div className="absolute inset-0 -z-10 opacity-5" style={{
              backgroundImage: `url(${grainImage.src})`,
            }}>

            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
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
                <CheckCircle className="size-5 md:size-6" />
                <span>{result.title}</span>
              </li>
            ))}
            </ul>
            <a href={project.link}>
            <button className="bg-white text-gray-950 h-12 
                              w-full rounded-xl font-semibold inline-flex items-center 
                              justify-center gap-2 mt-8 md:w-auto px-6">
                <span>Visit Repository</span>
                <ArrowUpRightIcon classNAme="size-4"/>
              </button>
            </a>
            </div>
            <div className="relative">
            <Image src={project.image} alt={project.title} className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none" />
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  </section>;
};
