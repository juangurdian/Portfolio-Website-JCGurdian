import Image from "next/image";
import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import { ReactNode } from "react";
import CheckCircle from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import grainImage from '@/assets/images/grain.jpg'
import ArrowDown from '@/assets/icons/arrow-down.svg'

const portfolioProjects = [
  {
    company: "AtomChat",
    year: "2024",
    title: "AI Agent Automating Customer Support",
    results: [
      { title: "Developed a custom AI agent using OpenAI API, LangChain, MySQL, and Google Calendar API to automate appointment scheduling for automotive dealerships across WhatsApp, Instagram, Messenger, and Facebook." },
      { title: "Built an AI-powered web scraper with Scrapy to clean and format vehicle data—including images—into catalog-ready content, enhancing user experience and training the AI." },
      { title: "Utilized LangSmith for workflow orchestration and Pinecone for semantic search, improving the AI agent's performance and contextual relevance." },
    ],
    link: "",
    image: darkSaasLandingPage,
  },
  {
    company: "",
    year: "2024-Present",
    title: "O.S.C.A.R - Optimized System Control & AI Response",
    results: [
      { title: "Developed a multi-modal AI assistant capable of controlling desktop applications via voice, performing tasks like launching apps, task management, running code in VS Code, and managing daily workflows." },
      { title: "Integrated with Google Calendar, Spotify, News, Crypto, and Weather APIs, allowing real-time voice-based interaction and intelligent automation through natural language processing." },
      { title: "Designed a modular React dashboard with support for infinite scalable tools and widgets, seamlessly connected to OSCAR, enabling users to customize functionalities and extend capabilities with ease." },
    ],
    link: "https://github.com/juangurdian/Jarvis.v3-Dashboard.git",
    image: lightSaasLandingPage,
  },
  {
    company: "",
    year: "2024",
    title: "Jarvis AI Assitant - Local",
    results: [
      { title: "Built a locally running AI voice assistant using LLaMA models to enable secure, offline natural language conversations, serving as a private home assistant throughout my house." },
      { title: "Integrated with Spotify and system-level controls to open apps, play music, and manage my computer through voice commands, creating a seamless smart home experience." },
      { title: "Enabled real-time functionality including weather updates, current time, and multimedia search (images and videos), with a strong focus on privacy, responsiveness, and local execution." },
    ],
    link: "https://youtu.be/Z7I5uSRHMHg",
    image: aiStartupLandingPage,
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
            <ul className=" flex flex-col gap-4 mt-4 md:mt-5">
              {project.results.map((result) => (
                <li className=" flex gap-2 text-sm text-white/50 md:text-base">
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
