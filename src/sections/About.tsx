"use client";
import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import StarIcon from "@/assets/icons/star.svg";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavascriptIcon from '@/assets/icons/square-js.svg';
import Html5Icon from '@/assets/icons/html5.svg';
import Css3Icon from '@/assets/icons/css3.svg';
import ReactIcon from '@/assets/icons/react.svg';
import ChromeIcon from '@/assets/icons/chrome.svg';
import GithubIcon from '@/assets/icons/github.svg';
import pythonIcon from '@/assets/icons/python.svg';
import javaIcon from '@/assets/icons/java.svg';
import { TechIcon } from "@/components/TechIcon";
import mapImage from "@/assets/images/map.png"
import smileMemoji from '@/assets/images/memoji-smile.png'
import { CardHeader } from "@/components/CardHeader"
import { ToolboxItems } from "@/components/ToolboxItems";
import {motion} from 'framer-motion'
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import grainImage from '@/assets/images/grain.jpg';
import memojiImage from '@/assets/images/memoji-avatar-1.png';
import jcimage from '@/assets/images/jcimage.jpg'

const toolboxItemsFirstRow = [
  {
    title: 'Java',
    iconType: javaIcon,
  },
  {
    title: 'Python',
    iconType: pythonIcon,
  },
  {
    title: 'Javascript',
    iconType: JavascriptIcon,
  },
  {
    title: 'HTML5',
    iconType: Html5Icon,
  },
  {
    title: 'CSS3',
    iconType: Css3Icon,
  },
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'Chrome',
    iconType: ChromeIcon,
  },
  {
    title: 'Github',
    iconType: GithubIcon,
  }
]

const toolboxItemsSecondRow = [
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'Javascript',
    iconType: JavascriptIcon,
  },
  {
    title: 'Python',
    iconType: pythonIcon,
  },
  {
    title: 'Java',
    iconType: javaIcon,
  },
  {
    title: 'Github',
    iconType: GithubIcon,
  },
  {
    title: 'Chrome',
    iconType: ChromeIcon,
  },
  {
    title: 'HTML5',
    iconType: Html5Icon,
  },
  {
    title: 'CSS3',
    iconType: Css3Icon,
  }
]

const hobbies = [
  {
    title: '3D-Printing',
    emoji: '🤖',
    left: '5%',
    top: '5%',

  },
  {
    title: 'Motocross',
    emoji: '🏍',
    left: '50%',
    top: '5%',

  },
  {
    title: 'Fitness',
    emoji: '🏋🏼',
    left: '10%',
    top: '35%',

  },
  {
    title: 'Gaming',
    emoji: '🕹',
    left: '35%',
    top: '40%',

  },
  {
    title: 'Coding',
    emoji: '💻',
    left: '70%',
    top: '45%',  

  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '5%',
    top: '65%',

  },
  {
    title: 'Web3 Development',
    emoji: '📈',
    left: '45%',
    top: '70%',

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
          description="Get to know me better"
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
                  description="Learn more about my journey and passion for technology"
                  className="mb-0"
                />
              </div>
              <div>
                <p className="text-white/60 leading-relaxed">
                  I&apos;m Juan Carlos Gurdian, a Nicaraguan developer and senior at Texas Christian University, majoring in Computer Information Technology. I&apos;m passionate about building real-world AI tools and started my coding journey creating small automations—now I develop full-stack apps, voice assistants, and scalable AI systems.
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
                      alt="Juan Gurdian"
                      className="w-48 h-64 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20" />
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              < CardHeader title="My Reads" description="Explore the books shaping my perspective."/>
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book Cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader title="My Toolbox" 
                          description="Explore the technologies used to craft exceptional digital experiences."
                          className="" />
              <div className="overflow-hidden">
                <ToolboxItems items={toolboxItemsFirstRow} className="mb-2" itemsWrapperClassName="animate-move-left [animation-duration:30s] [animation-delay:0s]" />
                <ToolboxItems items={toolboxItemsSecondRow} className="-mt-7" itemsWrapperClassName="animate-move-right [animation-duration:30s] [animation-delay:15s]" />
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