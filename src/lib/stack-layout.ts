/**
 * Geometry for the scroll-stacked project cards.
 *
 * Cards are `position: sticky` siblings. Each one pins one step lower than the
 * one before it, so buried cards leave a visible strip. The step is shared by
 * every card and sized so even the tallest card fits on screen below its strip;
 * when no readable step fits (short screens), stacking turns off and the cards
 * are a plain list. All positions here are in CSS pixels: "natural" tops are
 * document Y (where the card would sit without sticky), sticky tops are
 * viewport Y (where the card pins).
 */

/** Viewport Y of the first pinned card; clears the fixed nav. */
export const STACK_BASE_TOP = 96;
/** Space kept between a pinned card's bottom and the bottom of the screen. */
export const STACK_BOTTOM_MARGIN = 16;

const STEP_RATIO = 0.04;
/** Smallest strip that still shows a buried card's header; below this the stack turns off. */
const MIN_STEP = 24;
const MAX_STEP = 40;
/** In a plain list, the card whose top has scrolled past this fraction of the screen is in front. */
const LIST_FRONT_LINE = 0.4;
// Buried cards shrink this much per card stacked on top, up to MAX_SCALE_DEPTH cards.
const SCALE_PER_LEVEL = 0.035;
const MAX_SCALE_DEPTH = 4;

export type StackMetrics = {
  containerTop: number;
  heights: readonly number[];
  gap: number;
  viewportHeight: number;
  /** Document Y where the stack container ends; defaults to the last card's bottom. */
  containerBottom?: number;
};

export type StackLayout = {
  /** False when the screen is too short to stack these cards; they're then a plain list. */
  stacked: boolean;
  naturalTops: readonly number[];
  stickyTops: readonly number[];
  heights: readonly number[];
  viewportHeight: number;
  /** Document Y where the stack container ends; sticky cards can't be pushed past it. */
  stackEnd: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Vertical offset between pinned cards: the height of each buried card's visible strip. */
export const stackStep = (viewportHeight: number) =>
  clamp(Math.round(viewportHeight * STEP_RATIO), MIN_STEP, MAX_STEP);

/** Largest step at which every card after the first still fits on screen below its strip. */
const fittingStep = (heights: readonly number[], room: number) =>
  heights.reduce((step, height, i) => (i === 0 ? step : Math.min(step, (room - height) / i)), Infinity);

export const computeStackLayout = ({
  containerTop,
  heights,
  gap,
  viewportHeight,
  containerBottom,
}: StackMetrics): StackLayout => {
  const naturalTops = heights.reduce<number[]>(
    (tops, _height, i) => [...tops, i === 0 ? containerTop : tops[i - 1] + heights[i - 1] + gap],
    [],
  );
  const last = heights.length - 1;
  const stackEnd = containerBottom ?? (last >= 0 ? naturalTops[last] + heights[last] : containerTop);
  const room = viewportHeight - STACK_BASE_TOP - STACK_BOTTOM_MARGIN;
  const step = Math.floor(Math.min(stackStep(viewportHeight), fittingStep(heights, room)));
  const stacked = heights.length > 0 && heights[0] <= room && step >= MIN_STEP;
  const stickyTops = heights.map((_height, i) => STACK_BASE_TOP + (stacked ? i * step : 0));
  return { stacked, naturalTops, stickyTops, heights: [...heights], viewportHeight, stackEnd };
};

/** How far (0 to 1) card `j` has slid up over pinned card `i` at scroll position `scrollY`. */
export const coverage = (layout: StackLayout, i: number, j: number, scrollY: number) => {
  const pinnedBottom = layout.stickyTops[i] + layout.heights[i];
  const incomingTop = layout.naturalTops[j] - scrollY;
  const span = pinnedBottom - layout.stickyTops[j];
  if (span <= 0) return incomingTop <= layout.stickyTops[j] ? 1 : 0;
  return clamp((pinnedBottom - incomingTop) / span, 0, 1);
};

/** How many cards (fractional) are stacked on top of card `i`. */
export const stackDepth = (layout: StackLayout, i: number, scrollY: number) =>
  layout.stacked
    ? layout.heights.reduce((depth, _height, j) => (j > i ? depth + coverage(layout, i, j, scrollY) : depth), 0)
    : 0;

/**
 * The card in front: the last one that has covered at least half of the card
 * before it, or in a plain list the last one scrolled past the front line.
 */
export const activeIndex = (layout: StackLayout, scrollY: number) => {
  const isFront = (j: number) =>
    layout.stacked
      ? j > 0 && coverage(layout, j - 1, j, scrollY) >= 0.5
      : layout.naturalTops[j] - scrollY <= layout.viewportHeight * LIST_FRONT_LINE;
  return layout.heights.reduce((active, _height, j) => (isFront(j) ? j : active), 0);
};

/** Size of a card (scaled from its top edge) with `depth` cards stacked on top of it. */
export const cardScale = (depth: number) => 1 - Math.min(depth, MAX_SCALE_DEPTH) * SCALE_PER_LEVEL;

/**
 * Viewport Y of card `i`'s top. Sticky cards can't leave the stack container:
 * pinned cards are pushed up once its end scrolls past their bottoms. If the
 * container ends right at the last card, the last card never pins at all.
 */
export const cardTop = (layout: StackLayout, i: number, scrollY: number) => {
  if (!layout.stacked) return layout.naturalTops[i] - scrollY;
  const stackBottom = layout.stackEnd - scrollY;
  const pinned = Math.max(layout.stickyTops[i], layout.naturalTops[i] - scrollY);
  return Math.min(pinned, stackBottom - layout.heights[i]);
};

/**
 * Pixels to trim off the bottom of each card, in the card's own unscaled
 * pixels, so a taller buried card never shows below a shorter card in front.
 * `cornerRadius` trims a little more so the straight cut stays hidden behind
 * the front card's rounded bottom corners.
 */
export const bottomClips = (
  layout: StackLayout,
  scrollY: number,
  scales: readonly number[],
  cornerRadius = 0,
) => {
  const tops = layout.heights.map((_height, i) => cardTop(layout, i, scrollY));
  const bottoms = layout.heights.map((height, i) => tops[i] + height * scales[i]);
  // Walk front to back: a card may show no lower than the visible bottom of the card over it.
  const visibleBottoms = bottoms.reduceRight<number[]>((later, bottom, i) => {
    const overlapped = later.length > 0 && tops[i + 1] < bottom;
    return [overlapped ? Math.min(bottom, later[0] - cornerRadius) : bottom, ...later];
  }, []);
  return bottoms.map((bottom, i) => (bottom - visibleBottoms[i]) / scales[i]);
};

/** Scroll position where card `i` has just pinned, fully visible and uncovered. */
export const scrollTargetFor = (layout: StackLayout, i: number) =>
  (layout.naturalTops[i] ?? 0) - (layout.stickyTops[i] ?? 0);
