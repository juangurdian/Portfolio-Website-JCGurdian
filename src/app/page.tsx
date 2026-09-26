import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { WorkSection } from "@/sections/Work";
import { ExperienceSection } from "@/sections/Experience";
import { TerminalSection } from "@/sections/Terminal";
import { OpenSourceSection } from "@/sections/OpenSource";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="bg-surface-bg">
      <Header />
      <HeroSection />
      <WorkSection />
      <ExperienceSection />
      <TerminalSection />
      <OpenSourceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
