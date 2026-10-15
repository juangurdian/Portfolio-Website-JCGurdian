"use client";
import { twMerge } from "tailwind-merge";
import { FeaturedProject } from "@/data/projects";
import { formatIndex } from "./ProjectStackCard";

type ProjectStackRailProps = {
  projects: readonly FeaturedProject[];
  active: number;
  onSelect: (index: number) => void;
  className?: string;
};

/** Desktop-only index of the stack; follows the front card and jumps to any card. */
export const ProjectStackRail = ({ projects, active, onSelect, className }: ProjectStackRailProps) => (
  <div className={twMerge("hidden lg:block", className)}>
    <nav aria-label="Featured projects" className="sticky top-[40vh]">
      <ol className="space-y-4">
        {projects.map((project, i) => {
          const isActive = i === active;
          return (
            <li key={project.title}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? "step" : undefined}
                className="group flex items-center gap-3 text-left"
              >
                <span
                  className={twMerge(
                    "h-px w-5 bg-white/20 transition-all duration-300",
                    isActive && "w-10 bg-gradient-to-r from-emerald-300 to-sky-400",
                  )}
                />
                <span className="font-mono text-xs text-white/30">{formatIndex(i + 1)}</span>
                <span
                  className={twMerge(
                    "text-sm text-white/40 transition-colors group-hover:text-white/80",
                    isActive && "text-white",
                  )}
                >
                  {project.shortName}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  </div>
);
