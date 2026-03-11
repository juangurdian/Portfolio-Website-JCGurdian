"use client";

import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import Html5Icon from "@/assets/icons/html5.svg";
import Css3Icon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import pythonIcon from "@/assets/icons/python.svg";
import javaIcon from "@/assets/icons/java.svg";
import { TechIcon } from "@/components/TechIcon";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";
import bookImage from "@/assets/images/book-cover.png";
import jcimage from "@/assets/images/jcimage.jpg";

const toolboxItemsFirstRow = [
  { title: "Python", iconType: pythonIcon },
  { title: "Java", iconType: javaIcon },
  { title: "TypeScript", iconType: JavascriptIcon },
  { title: "React", iconType: ReactIcon },
  { title: "Next.js", iconType: ChromeIcon },
  { title: "LangChain", iconType: pythonIcon },
  { title: "FastAPI", iconType: pythonIcon },
  { title: "GitHub", iconType: GithubIcon },
];

const toolboxItemsSecondRow = [
  { title: "React", iconType: ReactIcon },
  { title: "Node.js", iconType: JavascriptIcon },
  { title: "PostgreSQL", iconType: ChromeIcon },
  { title: "Supabase", iconType: GithubIcon },
  { title: "HTML5", iconType: Html5Icon },
  { title: "CSS3", iconType: Css3Icon },
  { title: "Tailwind", iconType: Css3Icon },
  { title: "Docker", iconType: ChromeIcon },
];

const hobbies = [
  { title: "3D-Printing", emoji: "\u{1F916}", left: "5%", top: "5%" },
  { title: "Motocross", emoji: "\u{1F3CD}", left: "50%", top: "5%" },
  { title: "Fitness", emoji: "\u{1F3CB}", left: "10%", top: "35%" },
  { title: "Gaming", emoji: "\u{1F579}", left: "35%", top: "40%" },
  { title: "Coding", emoji: "\u{1F4BB}", left: "70%", top: "45%" },
  { title: "Reading", emoji: "\u{1F4DA}", left: "5%", top: "65%" },
  { title: "Web3 Development", emoji: "\u{1F4C8}", left: "45%", top: "70%" },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            Introduction
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            About Me
          </h2>
          <p className="text-white/40 mt-3 max-w-lg">
            Get to know the person behind the code.
          </p>
        </motion.div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3">
            <Card className="md:col-span-3 lg:col-span-2 p-6 relative overflow-hidden !bg-neural-card !after:outline-neural-card-border">
              <div className="pl-1 -mt-4">
                <CardHeader
                  title="About Me"
                  description="Learn more about my journey and passion for AI"
                  className="mb-0"
                />
              </div>
              <div>
                <p className="text-white/60 leading-relaxed">
                  I&apos;m Juan Carlos Gurdian, a Nicaraguan AI Engineer and TCU
                  graduate, now working as a Junior AI Developer at yorCMO.ai where I
                  built PanelCast — a full production SaaS — solo. I started with small
                  automations and now build full-stack AI systems, voice assistants, and
                  scalable platforms. My mission: bring safe, effective AI to Latin
                  American businesses, starting with my home country Nicaragua.
                </p>
              </div>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1 p-8 relative overflow-hidden flex items-center justify-center !bg-neural-card">
              <div className="relative">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neural-primary/20 to-neural-tertiary/20 rounded-lg transition-opacity duration-300 group-hover:opacity-0 -z-10" />
                    <Image
                      src={jcimage}
                      alt="Juan Carlos Gurdian"
                      className="w-48 h-64 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-neural-primary/10 transition-all duration-300 group-hover:ring-neural-primary/30" />
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1 !bg-neural-card">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspective."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book Cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2 !bg-neural-card">
              <CardHeader
                title="My Toolbox"
                description="Technologies I use to build AI-powered solutions."
                className=""
              />
              <div className="overflow-hidden">
                <ToolboxItems
                  items={toolboxItemsFirstRow}
                  className="mb-2"
                  itemsWrapperClassName="animate-move-left [animation-duration:30s] [animation-delay:0s]"
                />
                <ToolboxItems
                  items={toolboxItemsSecondRow}
                  className="-mt-7"
                  itemsWrapperClassName="animate-move-right [animation-duration:30s] [animation-delay:15s]"
                />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-6">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2 !bg-neural-card">
              <CardHeader
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the tech world."
                className="px-6 pt-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-neural-primary to-neural-tertiary rounded-full py-1.5 absolute"
                    style={{ left: hobby.left, top: hobby.top }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-neural-bg">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1 !bg-neural-card">
              <Image
                src={mapImage}
                alt="Nicaragua map"
                className="h-full w-full object-cover object-left-top"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-neural-bg/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neural-primary to-neural-tertiary -z-2 animate-ping [animation-duration:2s]" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neural-primary to-neural-tertiary -z-10" />
                <Image src={smileMemoji} alt="smiling memoji" className="size-20" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
