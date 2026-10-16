"use client";
import { motionValue, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FeaturedProject } from "@/data/projects";
import { useStackLayout } from "@/hooks/useStackLayout";
import { activeIndex, bottomClips, cardScale, scrollTargetFor, stackDepth } from "@/lib/stack-layout";
import { ProjectStackCard } from "./ProjectStackCard";
import { ProjectStackRail } from "./ProjectStackRail";

/** Matches the cards' rounded-3xl corners. */
const CARD_RADIUS_PX = 24;

/** Featured projects as a scroll stack: each card pins and the next slides over it. */
export const ProjectStack = ({ projects }: { projects: readonly FeaturedProject[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layout = useStackLayout(containerRef);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const depths = useMemo(() => projects.map(() => motionValue(0)), [projects]);
  const scales = useMemo(() => projects.map(() => motionValue(1)), [projects]);
  const clips = useMemo(() => projects.map(() => motionValue(0)), [projects]);
  const [active, setActive] = useState(0);
  // Until measured, render as a stack; the server can't know the screen height.
  const stacked = layout?.stacked ?? true;

  const sync = useCallback(
    (y: number) => {
      if (!layout) return;
      const nextDepths = projects.map((_, i) => stackDepth(layout, i, y));
      const nextScales = nextDepths.map((depth) => (reducedMotion ? 1 : cardScale(depth)));
      const nextClips = bottomClips(layout, y, nextScales, CARD_RADIUS_PX);
      nextDepths.forEach((depth, i) => {
        depths[i].set(depth);
        scales[i].set(nextScales[i]);
        clips[i].set(nextClips[i]);
      });
      setActive(activeIndex(layout, y));
    },
    [layout, projects, reducedMotion, depths, scales, clips],
  );

  useMotionValueEvent(scrollY, "change", sync);
  useEffect(() => {
    sync(window.scrollY);
  }, [sync]);

  const focusCard = useCallback(
    (index: number) => {
      if (!layout) return;
      // "instant", not "auto": globals.css sets scroll-behavior: smooth, which "auto" would inherit.
      window.scrollTo({ top: scrollTargetFor(layout, index), behavior: reducedMotion ? "instant" : "smooth" });
    },
    [layout, reducedMotion],
  );

  return (
    <div className="relative mt-10 md:mt-16 lg:pl-44">
      <ProjectStackRail
        projects={projects}
        active={active}
        onSelect={focusCard}
        className="absolute inset-y-0 left-0 w-40"
      />
      <div ref={containerRef} className="flex flex-col gap-16 md:gap-24">
        {projects.map((project, i) => (
          <ProjectStackCard
            key={project.title}
            project={project}
            index={i}
            total={projects.length}
            depth={depths[i]}
            scale={scales[i]}
            bottomClip={clips[i]}
            stacked={stacked}
            stickyTop={layout?.stickyTops[i]}
            // In a plain list every card gets the front-card treatment and nothing is buried.
            isFront={!stacked || i === active}
            isBuried={stacked && i < active}
            reducedMotion={reducedMotion}
            onSelect={focusCard}
          />
        ))}
        {/*
          Room after the last card: lets it pin too and holds the finished deck on screen
          briefly, instead of the container's end shoving taller cards up as it arrives.
        */}
        {stacked && <div aria-hidden className="h-[15vh]" />}
      </div>
    </div>
  );
};
