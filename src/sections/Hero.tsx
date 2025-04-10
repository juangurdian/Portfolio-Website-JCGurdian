import memojiImage from '@/assets/images/memoji-computer.png'
import Image from 'next/image'
import ArrowDown from '@/assets/icons/arrow-down.svg'
import grainImage from '@/assets/images/grain.jpg'
import StarIcon from '@/assets/icons/star.svg'
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'

export const HeroSection = () => {
  return (
    <section id="home" className="py-32 md:py-48 lg:py-60 relative z-0">
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom, transparent,black_10%,black_70%, transparent)]">
      <div 
        className="absolute inset-0 -z-30 opacity-5"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>


      <div className="size-[620px] hero-ring"></div>
      <div className="size-[820px] hero-ring"></div>
      <div className="size-[1020px] hero-ring"></div>
      <div className="size-[1220px] hero-ring"></div>
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
        <Image src={memojiImage} className="size-[100px]" alt="Person peeking from behind laptop" />
        <div className="bg-gray-950 text-white border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
          <div className= "bg-green-500 size-2.5 rounded-full relative">
            <div className="bg-green-500  absolute inset-0 rounded-full animate-ping-large"></div>
          </div>
          <div className="text-sm font-medium">Available for new project</div>
        </div>
        </div>
        <div className=" max-w-lg mx-auto">
        <h1 className="font-serif text-white text-3xl md:text-5xl text-center mt-8 tracking-wide">Hello! Welcome to my portfolio</h1>
        <p className="mt-4 text-center text-white/60 md:text-lg"> Full Stack Developer</p>
        </div>
        <div className='flex flex-col md:flex-row justify-center items-center mt-8 gap-4'>
          <button className="inline-flex items-center text-white gap-2 border border-white/15 px-6 h-12 rounded-xl">
            <a href="#projects" className="font-semibold">Explore My Work</a>
            <ArrowDown className="size-4" />
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold">Let&apos;s Connect</span>
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
