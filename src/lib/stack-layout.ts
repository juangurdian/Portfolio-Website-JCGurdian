/**
 * Geometry for the scroll-stacked project cards.
 *
 * Cards are `position: sticky` siblings. Each one pins a little lower than the
 * one before it, so buried cards leave a visible strip. All positions here are
 * in CSS pixels: "natural" tops are document Y (where the card would sit
 * without sticky), sticky tops are viewport Y (where the card pins).
 */

/** Viewport Y of the first pinned card; clears the fixed nav. */
export const STACK_BASE_TOP = 96;
/** Space kept below a card that is too tall to pin at its step. */
export const STACK_BOTTOM_MARGIN = 16;

const STEP_RATIO = 0.04;
const MIN_STEP = 20;
const MAX_STEP = 40;
// Buried cards shrink this much per card stacked on top, up to MAX_SCALE_DEPTH cards.
const SCALE_PER_LEVEL = 0.035;
const MAX_SCALE_DEPTH = 4;

export type StackMetrics = {
  containerTop: number;
  heights: readonly number[];
  gap: number;
  viewportHeight: number;
};

export type StackLayout = {
  naturalTops: readonly number[];
  stickyTops: readonly number[];
  heights: readonly number[];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Vertical offset between pinned cards: the height of each buried card's visible strip. */
export const stackStep = (viewportHeight: number) =>
  clamp(Math.round(viewportHeight * STEP_RATIO), MIN_STEP, MAX_STEP);

export const computeStackLayout = ({ containerTop, heights, gap, viewportHeight }: StackMetrics): StackLayout => {
  const step = stackStep(viewportHeight);
  const naturalTops = heights.reduce<number[]>(
    (tops, _height, i) => [...tops, i === 0 ? containerTop : tops[i - 1] + heights[i - 1] + gap],
    [],
  );
  const stickyTops = heights.map((height, i) =>
    Math.min(STACK_BASE_TOP + i * step, viewportHeight - height - STACK_BOTTOM_MARGIN),
  );
  return { naturalTops, stickyTops, heights: [...heights] };
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
  layout.heights.reduce((depth, _height, j) => (j > i ? depth + coverage(layout, i, j, scrollY) : depth), 0);

/** The card in front: the last one that has covered at least half of the card before it. */
export const activeIndex = (layout: StackLayout, scrollY: number) =>
  layout.heights.reduce(
    (active, _height, j) => (j > 0 && coverage(layout, j - 1, j, scrollY) >= 0.5 ? j : active),
    0,
  );

/** Size of a card (scaled from its top edge) with `depth` cards stacked on top of it. */
export const cardScale = (depth: number) => 1 - Math.min(depth, MAX_SCALE_DEPTH) * SCALE_PER_LEVEL;

/**
 * Viewport Y of card `i`'s top. Sticky cards can't leave the stack container,
 * which ends at the last card's bottom: so the last card never pins, and pinned
 * cards are pushed up together once the end of the stack scrolls past them.
 */
export const cardTop = (layout: StackLayout, i: number, scrollY: number) => {
  const last = layout.heights.length - 1;
  const stackBottom = layout.naturalTops[last] + layout.heights[last] - scrollY;
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
