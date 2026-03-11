import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { AboutSection } from "@/sections/About";
import { ExperienceSection } from "@/sections/Experience";
import { MissionSection } from "@/sections/Mission";
import { TechStackSection } from "@/sections/TechStack";
import { OpenSourceSection } from "@/sections/OpenSource";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <section id="projects-wrapper">
        <ProjectsSection />
      </section>
      <AboutSection />
      <ExperienceSection />
      <MissionSection />
      <TechStackSection />
      <OpenSourceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
