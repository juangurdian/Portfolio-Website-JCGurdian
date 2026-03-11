"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { primaryProjects, secondaryProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";

// Starfield background that matches the hero section
function StarfieldBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: i % 7 === 0 ? 2 : 1,
        baseOpacity: ((i * 17) % 20) / 100 + 0.03,
        peakOpacity: ((i * 23) % 30) / 100 + 0.1,
        duration: 3 + ((i * 31) % 40) / 10,
        delay: ((i * 41) % 30) / 10,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.baseOpacity,
          }}
          animate={{
            opacity: [star.baseOpacity, star.peakOpacity, star.baseOpacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

// 3D Cylinder Carousel for featured projects
function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);
  const autoRotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardCount = primaryProjects.length;
  const anglePerCard = 360 / cardCount;

  // Advance to next card (used by auto-rotate and interactions)
  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cardCount);
  }, [cardCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cardCount) % cardCount);
  }, [cardCount]);

  // Auto-rotation — every 5s, pauses on hover/interaction
  useEffect(() => {
    if (isHovering) {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
      return;
    }

    autoRotateTimer.current = setInterval(goNext, 5000);
    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [isHovering, goNext]);

  // Reset auto-rotate after interaction
  const resetAutoRotate = useCallback(() => {
    if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    // Pause briefly then restart
    resumeTimer.current = setTimeout(() => {
      if (!isHovering) {
        autoRotateTimer.current = setInterval(goNext, 5000);
      }
    }, 3000);
  }, [isHovering, goNext]);

  // Wheel scroll — ONLY when hovering the carousel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return; // Let page scroll normally
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;
      lastWheelTime.current = now;

      if (e.deltaY > 20) {
        goNext();
      } else if (e.deltaY < -20) {
        goPrev();
      }
      resetAutoRotate();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isHovering, goNext, goPrev, resetAutoRotate]);

  // Drag handler
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x < -50) {
        goNext();
      } else if (info.offset.x > 50) {
        goPrev();
      }
      resetAutoRotate();
    },
    [goNext, goPrev, resetAutoRotate]
  );

  const handleArrowClick = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "next") goNext();
      else goPrev();
      resetAutoRotate();
    },
    [goNext, goPrev, resetAutoRotate]
  );

  const handleDotClick = useCallback(
    (i: number) => {
      setActiveIndex(i);
      resetAutoRotate();
    },
    [resetAutoRotate]
  );

  const rotation = -activeIndex * anglePerCard;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Navigation dots */}
      <div className="flex justify-center gap-3 mb-8">
        {primaryProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-neural-primary scale-125"
                : "bg-white/20 hover:bg-white/40"
            }`}
            style={
              i === activeIndex
                ? { boxShadow: "0 0 12px rgba(0,212,255,0.5)" }
                : undefined
            }
          />
        ))}
      </div>

      {/* 3D Cylinder Carousel */}
      <div style={{ perspective: "1200px" }}>
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="relative mx-auto cursor-grab active:cursor-grabbing"
          style={{ height: "560px", maxWidth: "900px" }}
        >
          <motion.div
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {primaryProjects.map((project, i) => {
              const cardAngle = i * anglePerCard;
              const isActive = i === activeIndex;

              return (
                <div
                  key={project.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(300px)`,
                  }}
                >
                  <CarouselCard
                    project={project}
                    isActive={isActive}
                    onClick={() => {
                      handleDotClick(i);
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Arrow buttons */}
      <div className="flex justify-center gap-4 mt-12 relative z-10">
        <button
          onClick={() => handleArrowClick("prev")}
          className="p-3 rounded-full border border-white/10 text-white/40 hover:border-neural-primary/30 hover:text-neural-primary transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => handleArrowClick("next")}
          className="p-3 rounded-full border border-white/10 text-white/40 hover:border-neural-primary/30 hover:text-neural-primary transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Individual carousel card
function CarouselCard({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`w-full max-w-[750px] rounded-2xl overflow-hidden border transition-all duration-500 ${
        isActive
          ? "border-neural-primary/30 shadow-lg shadow-neural-primary/10"
          : "border-white/5 cursor-pointer opacity-60"
      }`}
      style={{ backgroundColor: "#0a0f1a" }}
    >
      {/* Project image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
        {/* Year badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          <span className="font-mono text-xs text-white/60">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neural-primary" />
          <span className="font-mono text-xs text-neural-primary tracking-wider font-bold">
            {project.company}
          </span>
          <span className="text-white/15">/</span>
          <span className="font-mono text-xs text-white/35">
            {project.role}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {project.title}
        </h3>

        <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono bg-neural-primary/[0.07] border border-neural-primary/15 rounded text-neural-primary/70"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Results — revealed when active */}
        <AnimatePresence>
          {isActive && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5 mb-4 overflow-hidden"
            >
              {project.results.map((result, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/55">
                  <span className="text-neural-primary mt-0.5 shrink-0">
                    &#9656;
                  </span>
                  <span>{result}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Links */}
        <div className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neural-primary/10 border border-neural-primary/20 text-neural-primary text-sm font-semibold hover:bg-neural-primary/20 transition-all"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 text-sm font-semibold hover:border-neural-primary/20 hover:text-neural-primary/80 transition-all"
            >
              <FaGithub className="text-sm" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Expanding accordion card for secondary projects
function AccordionCard({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`border-b border-white/[0.06] transition-colors duration-300 ${
        isOpen ? "border-neural-primary/20" : ""
      }`}
    >
      {/* Collapsed bar — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-2 group text-left"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Index number */}
          <span className={`font-mono text-sm tabular-nums transition-colors duration-300 ${
            isOpen ? "text-neural-primary" : "text-white/15"
          }`}>
            0{index + 1}
          </span>

          {/* Title */}
          <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 truncate ${
            isOpen ? "text-neural-primary" : "text-white/70 group-hover:text-white"
          }`}>
            {project.title}
          </h3>

          {/* Company pill */}
          <span className="hidden md:inline-block font-mono text-[10px] text-white/25 tracking-wider uppercase shrink-0">
            {project.company}
          </span>

          {/* Year */}
          <span className="hidden md:inline-block font-mono text-[10px] text-white/15 shrink-0">
            {project.year}
          </span>

          {/* Tech preview — collapsed only */}
          {!isOpen && (
            <div className="hidden lg:flex gap-1.5 ml-auto mr-4">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[9px] font-mono bg-white/[0.03] border border-white/[0.05] rounded text-white/25"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expand/collapse icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`w-6 h-6 flex items-center justify-center rounded-full border transition-colors duration-300 shrink-0 ${
            isOpen
              ? "border-neural-primary/30 text-neural-primary"
              : "border-white/10 text-white/25 group-hover:border-white/20 group-hover:text-white/40"
          }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-6 pt-1">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left — image */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="md:w-2/5 relative overflow-hidden rounded-xl shrink-0"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-56 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/60 via-transparent to-transparent rounded-xl" />
                </motion.div>

                {/* Right — content */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neural-primary" />
                    <span className="font-mono text-xs text-neural-primary tracking-wider font-bold">
                      {project.company}
                    </span>
                    <span className="text-white/15">/</span>
                    <span className="font-mono text-xs text-white/35">
                      {project.role}
                    </span>
                    <span className="text-white/15">/</span>
                    <span className="font-mono text-xs text-white/35">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-white/45 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Results */}
                  <ul className="space-y-1.5 mb-4">
                    {project.results.map((result, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.06 }}
                        className="flex gap-2 text-sm text-white/50"
                      >
                        <span className="text-neural-primary mt-0.5 shrink-0">&#9656;</span>
                        <span>{result}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono bg-neural-primary/[0.06] border border-neural-primary/12 rounded text-neural-primary/60"
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neural-primary/10 border border-neural-primary/20 text-neural-primary text-sm font-semibold hover:bg-neural-primary/20 transition-all"
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 text-sm font-semibold hover:border-neural-primary/20 hover:text-neural-primary/80 transition-all"
                      >
                        <FaGithub className="text-sm" />
                        Code
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const ProjectsSection = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="projects"
      className="pt-8 pb-20 lg:pt-12 lg:pb-28 relative"
      style={{ backgroundColor: "#060606" }}
    >
      {/* Starfield background matching hero */}
      <StarfieldBackground />

      <div className="container relative z-[1]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full bg-neural-primary"
              style={{ boxShadow: "0 0 10px rgba(0,212,255,0.4)" }}
            />
            <span className="font-mono text-xs text-neural-primary tracking-widest uppercase font-bold">
              Featured Work
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neural-primary/20 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
            Projects
          </h2>
          <p className="text-white/35 mt-3 max-w-lg">
            Production apps, AI systems, and open-source tools — each a node in
            the network.
          </p>
        </motion.div>

        {/* Featured projects — 3D Carousel */}
        <div className="mb-20">
          <ProjectCarousel />
        </div>

        {/* Secondary projects — Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <h3 className="font-mono text-xs text-white/30 tracking-widest uppercase">
              More Projects
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </motion.div>

        <div className="border-t border-white/[0.06]">
          {secondaryProjects.map((project, i) => (
            <AccordionCard
              key={project.id}
              project={project}
              index={i}
              isOpen={openAccordion === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
