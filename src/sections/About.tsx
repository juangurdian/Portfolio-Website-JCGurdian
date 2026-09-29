"use client";
import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import StarIcon from "@/assets/icons/star.svg";
import Image from "next/image";
import mapImage from "@/assets/images/map.png"
import smileMemoji from '@/assets/images/memoji-smile.png'
import { CardHeader } from "@/components/CardHeader"
import {motion} from 'framer-motion'
import { useRef } from 'react';
import grainImage from '@/assets/images/grain.jpg';
import jcimage from '@/assets/images/jcimage.jpg'

const skillGroups = [
  {
    category: 'AI',
    skills: 'LLM agents, RAG, evals, guardrails, MCP, LangGraph, Pydantic AI, Anthropic and OpenAI APIs',
  },
  {
    category: 'Backend',
    skills: 'Python, FastAPI, TypeScript, Node.js, PostgreSQL, Supabase, Redis',
  },
  {
    category: 'Frontend',
    skills: 'React, Next.js, React Native',
  },
  {
    category: 'Cloud',
    skills: 'AWS, Modal, Vercel, Docker, GitHub Actions',
  },
];

const hobbies = [
  {
    title: 'Motocross',
    emoji: '🏍',
    left: '5%',
    top: '10%',
  },
  {
    title: 'Fitness',
    emoji: '🏋🏼',
    left: '50%',
    top: '10%',
  },
  {
    title: '3D Printing',
    emoji: '🤖',
    left: '10%',
    top: '50%',
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '55%',
    top: '55%',
  },
]

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          title="About Me"
          eyebrow="Introduction"
          description="Based in Tampa, FL. TCU B.S. Computer Information Technology, May 2025."
        />

        <div className="mt-12 lg:mt-24 space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="md:col-span-3 lg:col-span-2 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 -z-10" style={{
                backgroundImage: `url(${grainImage.src})`,
              }}></div>
              <div className="pl-1 -mt-4">
                <CardHeader 
                  title="About Me" 
                  description="AI Engineer based in Tampa, FL"
                  className="mb-0"
                />
              </div>
              <div className="space-y-4">
                <p className="text-white/60 leading-relaxed">
                  I&apos;m an AI engineer in Tampa, FL. I joined yorCMO in September 2025, a few months after finishing my B.S. in Computer Information Technology at TCU, and I&apos;ve spent the year building production LLM agent systems that fractional CMOs and professional firms use every day. I led the build of Linky, an autonomous LinkedIn outreach platform, built 4 of 11 production agents on CORE, a multi-tenant marketing platform serving 24 client organizations, and maintain the MCP server that exposes CORE&apos;s agents as tools inside Claude.
                </p>
                <p className="text-white/60 leading-relaxed">
                  I&apos;m also cofounder and CTO of Gynka and its only engineer: the React Native app, the multi-agent coaching backend, the database, and the AWS infrastructure.
                </p>
                <p className="text-white/60 leading-relaxed">
                  I use Claude Code and Codex to move faster. Architecture, evals, guardrails, and what reaches production are my responsibility.
                </p>
                <p className="text-white/60 leading-relaxed">
                  <span className="text-emerald-300">Languages:</span> English and Spanish
                </p>
              </div>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1 p-8 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-5 -z-10" style={{
                backgroundImage: `url(${grainImage.src})`,
              }}></div>
              <div className="relative">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 2,
                      transition: { duration: 0.3 }
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-sky-400/20 rounded-lg transition-opacity duration-300 group-hover:opacity-0 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-lg transition-opacity duration-300 group-hover:opacity-0 -z-10" />
                    <Image
                      src={jcimage}
                      alt="JC Gurdian"
                      className="w-48 h-64 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20" />
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1 p-6">
              <CardHeader title="Education & Certs" description="Credentials and training"/>
              <ul className="space-y-3 text-sm text-white/60 mt-4">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 mt-0.5">&#9656;</span>
                  <span>Texas Christian University, B.S. Computer Information Technology, May 2025</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 mt-0.5">&#9656;</span>
                  <span>Claude Code certification (Anthropic), earned through yorCMO&apos;s Anthropic partnership</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 mt-0.5">&#9656;</span>
                  <span>AWS Certified Cloud Practitioner</span>
                </li>
              </ul>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2 p-6">
              <CardHeader title="My Toolbox" 
                          description=""
                          className="" />
              <div className="space-y-4 mt-4">
                {skillGroups.map((group) => (
                  <div key={group.category} className="flex flex-wrap items-start gap-2">
                    <span className="text-emerald-300 font-semibold text-sm min-w-[70px]">{group.category}:</span>
                    <span className="text-white/60 text-sm">{group.skills}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-5 lg:grid-cols-3 gap-8">
          <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
          <CardHeader title="Beyond the Code" description="Explore my interests and hobbies beyond the tech world." className="px-6 pt-6" />
            <div className="relative flex-1 " ref= {constraintRef}>
              {hobbies.map(hobby => (
                <motion.div key={hobby.title} className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute" style={{left: hobby.left, top: hobby.top}} drag dragConstraints={constraintRef}> 
                  <span className="font-medium text-gray-950">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </motion.div>
              ))}
            </div>
          </Card>
          <Card className="h-[320px] p-0 relaitve md:col-span-2 lg:col-span-1">
            <Image src={mapImage} alt="map" className="h-full w-full object-cover object-left-top" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-900/30">
            <div className=" absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-2 animate-ping [animation-duration:2s]"></div>
            <div className=" absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
            <Image src={smileMemoji} alt="smiling memoji" className="size-20"/>
            </div>
          </Card>
          </div>
        </div>
    </div>
    </section>
  )
};