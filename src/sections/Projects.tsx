import { ProjectStack } from "@/components/ProjectStack";
import { featuredProjects } from "@/data/projects";

export const ProjectsSection = () => {
  return <section id="projects" className="pb-16 lg:py-24">
    <div className="container text-white">
      <div className="flex justify-center">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">Production Systems</p>
      </div>
      <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">Featured Projects</h2>
      <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4 max-w-md mx-auto">Production systems I built and run, plus open-source work you can read.</p>
      <ProjectStack projects={featuredProjects} />
    </div>
  </section>;
};
