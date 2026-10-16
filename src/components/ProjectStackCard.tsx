"use client";
import {
  MotionValue,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { PointerEvent, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import CheckCircle from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { FeaturedProject } from "@/data/projects";
import { STACK_CARD_ATTRIBUTE } from "@/hooks/useStackLayout";
import { STACK_BASE_TOP } from "@/lib/stack-layout";

// Buried cards darken per card stacked on top of them.
const DIM_PER_LEVEL = 0.18;
const MAX_DIM = 0.6;
// Front-card pointer effects.
const POINTER_TILT_DEG = 5;
const TILT_SPRING = { stiffness: 200, damping: 20, mass: 0.5 };
const HOVER_LIFT_PX = -10;
// Used until the stack has been measured.
const FALLBACK_STEP = 32;
// Room around the card for the hover glow when it isn't being trimmed.
const GLOW_ROOM_PX = 100;

export const formatIndex = (n: number) => String(n).padStart(2, "0");

type ProjectStackCardProps = {
  project: FeaturedProject;
  index: number;
  total: number;
  /** Number of cards (fractional) currently stacked on top of this one. */
  depth: MotionValue<number>;
  scale: MotionValue<number>;
  /** Pixels to trim off the bottom so it never shows below a shorter card in front. */
  bottomClip: MotionValue<number>;
  /** False on screens too short to stack: the card is then a plain list item. */
  stacked: boolean;
  stickyTop?: number;
  isFront: boolean;
  /** Covered by the front card (as opposed to still coming up below it). */
  isBuried: boolean;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
};

const usePointerSpotlight = (enabled: boolean) => {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const opacity = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [POINTER_TILT_DEG, -POINTER_TILT_DEG]), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-POINTER_TILT_DEG, POINTER_TILT_DEG]), TILT_SPRING);
  const x = useTransform(pointerX, (v) => `${v * 100}%`);
  const y = useTransform(pointerY, (v) => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(520px circle at ${x} ${y}, rgba(110, 231, 183, 0.14), transparent 65%)`;

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    animate(opacity, 0, { duration: 0.4 });
  };

  useEffect(() => {
    if (!enabled) reset();
    // reset only touches stable motion values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const isMouse = (event: PointerEvent) => enabled && event.pointerType === "mouse";

  const handlers = {
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
      if (isMouse(event)) animate(opacity, 1, { duration: 0.3 });
    },
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
      if (!isMouse(event)) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width);
      pointerY.set((event.clientY - rect.top) / rect.height);
    },
    onPointerLeave: reset,
  };

  return { rotateX, rotateY, background, opacity, handlers };
};

export const ProjectStackCard = ({
  project,
  index,
  total,
  depth,
  scale,
  bottomClip,
  stacked,
  stickyTop,
  isFront,
  isBuried,
  reducedMotion,
  onSelect,
}: ProjectStackCardProps) => {
  const dim = useTransform(depth, (d) => Math.min(d * DIM_PER_LEVEL, MAX_DIM));
  const clipBottom = useTransform(bottomClip, (px) => (px > 0.5 ? px : -GLOW_ROOM_PX));
  const clipPath = useMotionTemplate`inset(-${GLOW_ROOM_PX}px -${GLOW_ROOM_PX}px ${clipBottom}px -${GLOW_ROOM_PX}px)`;
  const spotlight = usePointerSpotlight(isFront && !reducedMotion);
  const canFocus = isBuried;

  return (
    <motion.article
      {...{ [STACK_CARD_ATTRIBUTE]: "" }}
      className={twMerge("group", stacked ? "sticky" : "relative", canFocus && "cursor-pointer")}
      style={{
        top: stacked ? stickyTop ?? STACK_BASE_TOP + index * FALLBACK_STEP : undefined,
        scale,
        clipPath,
        transformOrigin: "50% 0%",
      }}
      animate={{ y: 0 }}
      // Always defined: removing whileHover mid-hover leaves framer's hover state stuck on.
      whileHover={{ y: canFocus && !reducedMotion ? HOVER_LIFT_PX : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={canFocus ? () => onSelect(index) : undefined}
      // Tabbing into a card that isn't in front brings it forward, so focused links are never hidden.
      onFocusCapture={isFront ? undefined : () => onSelect(index)}
    >
      <motion.div
        className="relative z-0 overflow-hidden rounded-3xl bg-gray-800 px-5 pb-5 shadow-[0_-16px_40px_-24px_rgba(0,0,0,0.9)] transition-shadow duration-300 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-3xl after:outline after:outline-2 after:-outline-offset-2 after:outline-white/20 after:transition-colors after:duration-300 group-hover:shadow-[0_0_60px_-15px_rgba(110,231,183,0.35)] group-hover:after:outline-emerald-300/40 md:px-10 md:pb-8"
        style={{ rotateX: spotlight.rotateX, rotateY: spotlight.rotateY, transformPerspective: 1200 }}
        {...spotlight.handlers}
      >
        <div className="absolute inset-0 -z-10 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: spotlight.background, opacity: spotlight.opacity }}
        />

        {/* Phone header height ties to MIN_STEP in stack-layout.ts: its text must end within a 26px strip. */}
        <header className="flex h-10 items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest md:h-12">
          {/* Everything stays on one line: the header doubles as the strip a buried card shows. */}
          <span className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 whitespace-nowrap bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
              {project.shortName}
            </span>
            <span className="truncate font-normal text-white/40">
              {project.company} &bull; {project.year}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3 whitespace-nowrap font-mono font-normal text-white/30">
            {/* Keyboard tab stop for every stacked card; stays mounted once the card is in front so focus isn't lost. */}
            {stacked && (
              <button
                type="button"
                aria-label={isFront ? `${project.shortName}, in front` : `Bring ${project.shortName} to the front`}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(index);
                }}
                className={twMerge(
                  "sr-only whitespace-nowrap rounded-md px-1 uppercase tracking-widest text-emerald-300/80 outline-none focus-visible:not-sr-only focus-visible:ring-2 focus-visible:ring-emerald-300/60",
                  canFocus && "opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 md:not-sr-only",
                )}
              >
                {isFront ? "In front" : "Bring to front"}
              </button>
            )}
            {formatIndex(index + 1)} / {formatIndex(total)}
          </span>
        </header>

        {/* Phones get tighter type and spacing so the tallest card still fits on short screens. */}
        <h3 className="font-serif text-xl md:text-3xl lg:text-4xl">{project.title}</h3>
        <hr className="mt-3 border-t-2 border-white/5 md:mt-5" />
        <ul className="mt-3 flex flex-col gap-2 md:mt-5 md:gap-3">
          {project.results.map((result) => (
            <li key={result} className="flex gap-2 text-[13px] leading-[1.45] text-white/60 md:text-[15px] md:leading-5">
              <CheckCircle className="mt-px size-4 flex-shrink-0 md:mt-0 md:size-6" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 md:mt-6 md:h-11 md:w-auto"
          >
            <span>View Project</span>
            <ArrowUpRightIcon className="size-4" />
          </a>
        ) : (
          <div className="mt-5 text-sm italic text-white/40 md:mt-6">{project.tag ?? "Private project"}</div>
        )}

        {/* Dims buried cards; hover lifts the dim so the card brightens as it peeks up. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gray-950 group-hover:!opacity-0"
          style={{ opacity: dim }}
        />
      </motion.div>
    </motion.article>
  );
};
