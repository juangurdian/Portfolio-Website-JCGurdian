import { describe, expect, it } from "vitest";
import {
  STACK_BASE_TOP,
  STACK_BOTTOM_MARGIN,
  activeIndex,
  bottomClips,
  cardScale,
  cardTop,
  computeStackLayout,
  coverage,
  scrollTargetFor,
  stackDepth,
  stackStep,
} from "./stack-layout";

const VIEWPORT = 900;
const GAP = 100;
const CONTAINER_TOP = 1000;

const layoutFor = (heights: number[], viewportHeight = VIEWPORT) =>
  computeStackLayout({ containerTop: CONTAINER_TOP, heights, gap: GAP, viewportHeight });

describe("stackStep", () => {
  it("scales with the viewport and stays within bounds", () => {
    expect(stackStep(900)).toBe(36);
    expect(stackStep(200)).toBe(20);
    expect(stackStep(3000)).toBe(40);
  });
});

describe("computeStackLayout", () => {
  it("places cards one after another, separated by the gap", () => {
    const layout = layoutFor([400, 300, 500]);
    expect(layout.naturalTops).toEqual([1000, 1500, 1900]);
  });

  it("pins each card a step lower than the previous one", () => {
    const step = stackStep(VIEWPORT);
    const layout = layoutFor([400, 300, 500]);
    expect(layout.stickyTops).toEqual([STACK_BASE_TOP, STACK_BASE_TOP + step, STACK_BASE_TOP + 2 * step]);
  });

  it("pins a card higher when it would not fit below its step", () => {
    const layout = layoutFor([400, 850]);
    expect(layout.stickyTops[1]).toBe(VIEWPORT - 850 - STACK_BOTTOM_MARGIN);
  });

  it("returns new arrays instead of reusing the input", () => {
    const heights = [400, 300];
    const layout = layoutFor(heights);
    expect(layout.heights).toEqual(heights);
    expect(layout.heights).not.toBe(heights);
  });
});

describe("coverage", () => {
  const layout = layoutFor([400, 300, 500]);
  const cardBottomWhilePinned = layout.stickyTops[0] + layout.heights[0];
  const scrollWhereNextCardTopIsAt = (viewportY: number) => layout.naturalTops[1] - viewportY;

  it("is 0 before the next card reaches the pinned card's bottom", () => {
    expect(coverage(layout, 0, 1, scrollWhereNextCardTopIsAt(cardBottomWhilePinned + 50))).toBe(0);
  });

  it("is 0.5 when the next card has slid halfway up", () => {
    const halfway = (cardBottomWhilePinned + layout.stickyTops[1]) / 2;
    expect(coverage(layout, 0, 1, scrollWhereNextCardTopIsAt(halfway))).toBeCloseTo(0.5);
  });

  it("is 1 once the next card is pinned, and stays 1 after", () => {
    expect(coverage(layout, 0, 1, scrollWhereNextCardTopIsAt(layout.stickyTops[1]))).toBe(1);
    expect(coverage(layout, 0, 1, scrollWhereNextCardTopIsAt(layout.stickyTops[1] - 400))).toBe(1);
  });
});

describe("stackDepth", () => {
  const layout = layoutFor([400, 300, 500]);

  it("is 0 for every card before the stack starts", () => {
    expect([0, 1, 2].map((i) => stackDepth(layout, i, 0))).toEqual([0, 0, 0]);
  });

  it("counts every later card that has slid over, so the first card ends deepest", () => {
    const end = scrollTargetFor(layout, 2);
    expect(stackDepth(layout, 0, end)).toBeCloseTo(2);
    expect(stackDepth(layout, 1, end)).toBeCloseTo(1);
    expect(stackDepth(layout, 2, end)).toBe(0);
  });
});

describe("activeIndex", () => {
  const layout = layoutFor([400, 300, 500]);

  it("is the first card before anything is covered", () => {
    expect(activeIndex(layout, 0)).toBe(0);
  });

  it("switches once the next card covers more than half of the previous one", () => {
    const pinned0 = layout.stickyTops[0] + layout.heights[0];
    const halfway = (pinned0 + layout.stickyTops[1]) / 2;
    expect(activeIndex(layout, layout.naturalTops[1] - halfway - 1)).toBe(0);
    expect(activeIndex(layout, layout.naturalTops[1] - halfway + 1)).toBe(1);
  });

  it("is the last card at the end of the stack", () => {
    expect(activeIndex(layout, scrollTargetFor(layout, 2) + 500)).toBe(2);
  });

  it("is 0 for an empty stack", () => {
    expect(activeIndex(layoutFor([]), 500)).toBe(0);
  });
});

describe("cardScale", () => {
  it("is full size when nothing covers the card and shrinks per covering card", () => {
    expect(cardScale(0)).toBe(1);
    expect(cardScale(2)).toBeLessThan(cardScale(1));
  });

  it("stops shrinking after a few levels", () => {
    expect(cardScale(10)).toBe(cardScale(4));
  });
});

describe("cardTop", () => {
  const layout = layoutFor([500, 300, 400]);

  it("follows the page before the card pins", () => {
    expect(cardTop(layout, 1, 0)).toBe(layout.naturalTops[1]);
  });

  it("holds the sticky top once pinned", () => {
    expect(cardTop(layout, 0, scrollTargetFor(layout, 1))).toBe(layout.stickyTops[0]);
  });

  it("never pins the last card, because the stack ends at its bottom", () => {
    const y = scrollTargetFor(layout, 2) + 200;
    expect(cardTop(layout, 2, y)).toBe(layout.naturalTops[2] - y);
  });

  it("pushes pinned cards up as the end of the stack scrolls past", () => {
    const y = scrollTargetFor(layout, 2) + 600;
    const stackBottom = layout.naturalTops[2] + layout.heights[2] - y;
    expect(cardTop(layout, 0, y)).toBe(stackBottom - layout.heights[0]);
  });
});

describe("bottomClips", () => {
  const layout = layoutFor([500, 300, 400]);
  const unscaled = [1, 1, 1];

  it("clips nothing before the stack starts", () => {
    expect(bottomClips(layout, 0, unscaled)).toEqual([0, 0, 0]);
  });

  it("trims a taller buried card to the bottom of the shorter card in front", () => {
    const clips = bottomClips(layout, scrollTargetFor(layout, 1), unscaled);
    const overhang = layout.stickyTops[0] + 500 - (layout.stickyTops[1] + 300);
    expect(clips[0]).toBeCloseTo(overhang);
    expect(clips[1]).toBe(0);
  });

  it("measures the clip in the card's own unscaled pixels", () => {
    const scales = [0.9, 1, 1];
    const clips = bottomClips(layout, scrollTargetFor(layout, 1), scales);
    const overhang = layout.stickyTops[0] + 500 * 0.9 - (layout.stickyTops[1] + 300);
    expect(clips[0]).toBeCloseTo(overhang / 0.9);
  });

  it("trims an extra corner radius so the cut edge hides behind the front card's rounded corners", () => {
    const y = scrollTargetFor(layout, 1);
    const overhang = layout.stickyTops[0] + 500 - (layout.stickyTops[1] + 300);
    expect(bottomClips(layout, y, unscaled, 24)[0]).toBeCloseTo(overhang + 24);
  });

  it("does not trim cards that nothing overlaps, even with a corner radius", () => {
    expect(bottomClips(layout, 0, unscaled, 24)).toEqual([0, 0, 0]);
  });

  it("leaves a buried card alone when the card in front is taller", () => {
    const tallerFront = layoutFor([300, 500, 400]);
    expect(bottomClips(tallerFront, scrollTargetFor(tallerFront, 1), unscaled)[0]).toBe(0);
  });
});

describe("scrollTargetFor", () => {
  const layout = layoutFor([400, 300, 500]);

  it("scrolls so the card has just pinned and nothing covers it", () => {
    [0, 1, 2].forEach((i) => {
      const y = scrollTargetFor(layout, i);
      expect(layout.naturalTops[i] - y).toBe(layout.stickyTops[i]);
      expect(stackDepth(layout, i, y)).toBe(0);
      expect(activeIndex(layout, y)).toBe(i);
    });
  });
});
