import Image from "next/image";
import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import atomlogo from "@/assets/images/atomlogo.png"
import { SectionHeader } from "@/components/Sectionheader";
import grainImage from "@/assets/images/grain.jpg";
import { Card } from "@/components/Card";
import { Fragment } from 'react';
import cargill from "@/assets/images/cargill.png";
import memojicomputer from "@/assets/images/memoji-computer.png";

const testimonials = [
  {
    name: "Machine Learning Intern",
    position: "Atom Chat",
    text: "As a Machine Learning Intern at AtomChat (July – October 2024), I helped automate customer service for automotive dealerships by developing a custom AI agent using OpenAI API, LangChain, MySQL, and Google Calendar API for seamless appointment management. I integrated the agent with WhatsApp, Instagram, Messenger, and Facebook, and built an AI-powered web scraper using Scrapy to clean and organize vehicle data into catalog-ready formats with images, which also served as training data for the AI. I leveraged LangSmith for workflow management and Pinecone for vector search.",
    avatar: atomlogo,
  },
  {
    name: "Digital Transformation Intern",
    position: "Cargill",
    text: "As a Digital Transformation Intern at Cargill (June – August 2023), I engineered a workflow automation system using PowerApps, resulting in a 25% reduction in operational time and significantly improving team productivity. I also gained proficiency in PowerBI, leveraging it for real-time data analysis and impactful reporting that supported key business decisions. Collaborating with international managers across multiple regions, I developed a strong understanding of global business operations and cross-cultural strategy execution.",
    avatar: cargill,
  },
  {
    name: "Freelancer",
    position: "Freelance Experience",
    text: "As a Freelance Web Developer (2023 – Present), I’ve developed 5+ modern, responsive web applications using React, Vue.js, React Native, TailwindCSS, Node.js, and TypeScript, delivering dynamic, client-focused solutions. I integrated features like authentication, payment systems, and automation through RESTful APIs, and enhanced UX with smooth animations and optimized SEO—driving up to a 30% boost in user engagement. This role has strengthened my full-stack development skills, as well as my ability to deliver polished, scalable products independently.",
    avatar: memojicomputer,
  },
];

export const TestimonialsSection = () => {
  return (
  <div className="py-16 lg:py-24">
    <div className="container">
      <SectionHeader 
        title={"Experience"} 
        eyebrow={"Past Employers"} 
        description={"See where my experiences have taken me."} />


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
