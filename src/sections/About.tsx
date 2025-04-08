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
    emoji: '🤖'

  },
  {
    title: 'Motocross',
    emoji: '🏍'

  },
  {
    title: 'Fitness',
    emoji: '🏋🏼'

  },
  {
    title: 'Gaming',
    emoji: '🕹'

  },
  {
    title: 'Vibe Coding',
    emoji: '💻'

  },
  {
    title: 'Reading',
    emoji: '📚'

  },
  {
    title: 'Crypto Mining/Development',
    emoji: '📈'

  },

]

export const AboutSection = () => {
  return (
    <div className="py-20">
      <div className="container">
      <SectionHeader eyebrow="About Me" 
        title="A Glimpse Into My World"
        description="Learn more about my journey, values, and the passion that drives me to create exceptional digital experiences." 
        />
        <div className="mt-20">
          <Card className="h-[320px]">
            < CardHeader title="My Reads" description="Explore the books shaping my perspective."/>
            <div className="w-40 mx-auto mt-8 ">
              <Image src={bookImage} alt="Book Cover" />
            </div>
          </Card>
          <Card className="h-[320px] p-0">
          < CardHeader title="My Toolbox" 
                        description="Explore the technologies used to craft vexceptional digital experiences."
                        className="px-6 pt-6" />
            <ToolboxItems items={toolboxItems} className="mt-6"/>
            <ToolboxItems items={toolboxItems} className="mt-6" itemsWrapperClassName="translate-x-1/2"/>
          </Card>
          <Card>
          <CardHeader title="Beyond the Code" description="Explore my interests and hobbies beyond the tech world." className="" />
            <div>
              {hobbies.map(hobby => (
                <div key={hobby.title}>
                  <span>{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <Image src={mapImage} alt="map" />
            <Image src={smileMemoji} alt="smiling memoji" />
          </Card>
        </div>
    </div>
    </div>
  )
};