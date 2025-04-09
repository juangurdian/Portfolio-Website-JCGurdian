import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"

const footerLinks =[
  {
    title: 'Linkedin',
    href: 'www.linkedin.com/in/juan-gurdian',
  },
  {
    title: 'Github',
    href: 'https://github.com/juangurdian',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/jcgurdian03/',
  },
  {
    title: 'X',
    href: '',
  }
]

export const Footer = () => {
  return (
  <footer className="relative -z-10 overflow-x-clip">
    <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/50 [mask-image:radial-gradient(50%_50%_at_bottom__center,black,transparent)] -z-10"></div>
    <div className="container">
      <div className=" border-t border-white/15 py-6 text-sm text-white flex flex-col items-center md:flex-row md:justify-between gap-8">
        <div className="text-white/40">&copy; 2025. All Rights Reserved.</div>
        <nav className=" flex flex-col items-center gap-8 md:flex-row">
          {footerLinks.map(link => (
            <a href="#" key={link.title} className="inline-flex items-center  gap-1.5">
              <span className="font-semibold ">{link.title}</span>
              <ArrowUpRightIcon className="size-4"/>
            </a>
          ))}
        </nav>
      </div>
    </div>
  </footer>
  );
};
