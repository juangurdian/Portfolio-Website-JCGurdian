"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { primaryProjects, secondaryProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { useRef } from "react";

// Visual connection from the neural network above
function NetworkBridge() {
  return (
    <div className="flex justify-center mb-12 relative">
      {/* Vertical connection line from hero network */}
      <div className="h-24 w-px bg-gradient-to-b from-neural-primary/30 via-neural-primary/15 to-transparent relative">
        <motion.div
          className="absolute left-0 w-px h-8 bg-gradient-to-b from-neural-primary/60 to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Node at the junction */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="w-3 h-3 rounded-full bg-neural-primary/60" style={{ boxShadow: "0 0 15px rgba(0,212,255,0.4)" }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group hover:border-neural-primary/30 transition-all duration-500 overflow-hidden relative"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Connection dot on left edge */}
      <div className="absolute left-0 top-8 w-1.5 h-1.5 -translate-x-1/2 rounded-full bg-neural-primary/50" style={{ boxShadow: "0 0 8px rgba(0,212,255,0.3)" }} />

      <div className="p-6 md:p-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            {/* Meta line with node indicator */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-neural-primary" />
              <span className="font-mono text-xs text-neural-primary tracking-wider font-bold">
                {project.company}
              </span>
              <span className="text-white/15">/</span>
              <span className="font-mono text-xs text-white/35">{project.year}</span>
              <span className="text-white/15">/</span>
              <span className="font-mono text-xs text-white/35">{project.role}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-neural-primary transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Key Results with staggered reveal */}
            <ul className="space-y-2 mb-5">
              {project.results.map((result, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + i * 0.1 + 0.3 }}
                  className="flex gap-2 text-sm text-white/55"
                >
                  <span className="text-neural-primary mt-0.5 shrink-0">&#9656;</span>
                  <span>{result}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-neural-primary/[0.07] border border-neural-primary/15 rounded text-neural-primary/70 hover:bg-neural-primary/15 hover:text-neural-primary transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neural-primary/10 border border-neural-primary/20 text-neural-primary text-sm font-semibold hover:bg-neural-primary/20 hover:shadow-node-glow transition-all duration-300"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Visit
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 text-sm font-semibold hover:border-neural-primary/20 hover:text-neural-primary/80 transition-all duration-300"
                >
                  <FaGithub className="text-sm" />
                  Code
                </a>
              )}
            </div>
          </div>

          {/* Screenshot */}
          <div className="mt-6 lg:mt-0 relative overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neural-bg/70 via-transparent to-neural-bg/20 rounded-lg" />
            {/* Network-style corner decoration */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-1 h-1 rounded-full bg-neural-primary/60" />
              <div className="w-6 h-px bg-neural-primary/30" />
              <div className="w-1 h-1 rounded-full bg-neural-primary/40" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SecondaryCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-5 group hover:border-neural-primary/20 transition-all duration-300 relative overflow-hidden"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neural-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-1 rounded-full bg-neural-primary/60" />
          <span className="font-mono text-[10px] text-neural-primary tracking-wider font-bold">
            {project.company}
          </span>
          <span className="text-white/15">/</span>
          <span className="font-mono text-[10px] text-white/35">{project.year}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neural-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-white/35 text-sm leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.04] border border-white/[0.06] rounded text-white/40"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-white/25">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/35 hover:text-neural-primary transition-colors flex items-center gap-1"
            >
              <FaExternalLinkAlt className="text-[10px]" />
              Visit
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/35 hover:text-white/60 transition-colors flex items-center gap-1"
            >
              <FaGithub className="text-xs" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="container">
        {/* Bridge from the neural network hero */}
        <NetworkBridge />

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neural-primary" style={{ boxShadow: "0 0 10px rgba(0,212,255,0.4)" }} />
            <span className="font-mono text-xs text-neural-primary tracking-widest uppercase font-bold">
              Featured Work
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neural-primary/20 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
            Projects
          </h2>
          <p className="text-white/35 mt-3 max-w-lg">
            Production apps, AI systems, and open-source tools — each a node in the network.
          </p>
        </motion.div>

        {/* Primary projects — connected by vertical line */}
        <div className="relative">
          {/* Vertical connection between cards */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-neural-primary/15 via-neural-primary/10 to-transparent hidden lg:block" />

          <div className="space-y-8 mb-16">
            {primaryProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Secondary projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <h3 className="font-mono text-xs text-white/30 tracking-widest uppercase">
              More Projects
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secondaryProjects.map((project, i) => (
            <SecondaryCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
