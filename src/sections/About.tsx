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
import { TechIcon } from "@/components/TechIcon";
import mapImage from "@/assets/images/map.png"
import smileMemoji from '@/assets/images/memoji-smile.png'
import { CardHeader } from "@/components/CardHeader"
import { ToolboxItems } from "@/components/ToolboxItems";

const toolboxItems = [
  {
    title: 'Javascript',
    iconType: JavascriptIcon ,
  },
  {
    title: 'HTML5',
    iconType: Html5Icon ,
  },
  {
    title: 'CSS3',
    iconType: Css3Icon ,
  },
  {
    title: 'React',
    iconType: ReactIcon ,
  },
  {
    title: 'Chrome',
    iconType: ChromeIcon ,
  },
  {
    title: 'Github',
    iconType: GithubIcon ,
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
    title: 'Vibe Coding',
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
    title: 'Crypto Mining/Development',
    emoji: '📈',
    left: '45%',
    top: '70%',

  },

]

export const AboutSection = () => {
  return (
    <div className="py-20 lg:py-28">
      <div className="container">
      <SectionHeader eyebrow="About Me" 
        title="A Glimpse Into My World"
        description="Learn more about my journey, values, and the passion that drives me to create exceptional digital experiences." 
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              < CardHeader title="My Reads" description="Explore the books shaping my perspective."/>
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book Cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
            < CardHeader title="My Toolbox" 
                          description="Explore the technologies used to craft vexceptional digital experiences."
                          className="" />
              <ToolboxItems items={toolboxItems} className=""/>
            </Card>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-5 lg:grid-cols-3 gap-8">
          <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
          <CardHeader title="Beyond the Code" description="Explore my interests and hobbies beyond the tech world." className="px-6 pt-6" />
            <div className="relative flex-1">
              {hobbies.map(hobby => (
                <div key={hobby.title} className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute" style={{left: hobby.left, top: hobby.top}}> 
                  <span className="font-medium text-gray-950">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="h-[320px] p-0 relaitve md:col-span-2 lg:col-span-1">
            <Image src={mapImage} alt="map" className="h-full w-full object-cover object-left-top" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-900/30">
            <Image src={smileMemoji} alt="smiling memoji" className="size-20"/>
            </div>
          </Card>
          </div>
        </div>
    </div>
    </div>
  )
};