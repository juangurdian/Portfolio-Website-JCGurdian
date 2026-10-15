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
      window.scrollTo({ top: scrollTargetFor(layout, index), behavior: reducedMotion ? "auto" : "smooth" });
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
            stickyTop={layout?.stickyTops[i]}
            isFront={i === active}
            reducedMotion={reducedMotion}
            onSelect={focusCard}
          />
        ))}
      </div>
    </div>
  );
};
