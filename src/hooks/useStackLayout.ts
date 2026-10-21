"use client";
import { RefObject, useEffect, useState } from "react";
import { StackLayout, computeStackLayout } from "@/lib/stack-layout";

/** Mark each stacked card with this attribute so the layout can find it. */
export const STACK_CARD_ATTRIBUTE = "data-stack-card";

/**
 * Mobile browsers resize the viewport by roughly this much when their toolbar
 * slides in or out mid-scroll; height-only resizes smaller than this are ignored
 * so pinned cards don't jump.
 */
const MOBILE_TOOLBAR_PX = 120;

/**
 * Measures the stacked cards inside `containerRef` and returns their layout,
 * re-measuring whenever the cards, the page above them, or the viewport change size.
 */
export const useStackLayout = (containerRef: RefObject<HTMLElement>): StackLayout | null => {
  const [layout, setLayout] = useState<StackLayout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(`:scope > [${STACK_CARD_ATTRIBUTE}]`));
    let viewport = { width: window.innerWidth, height: window.innerHeight };

    const measure = () => {
      const style = window.getComputedStyle(container);
      const containerDocTop = container.getBoundingClientRect().top + window.scrollY;
      setLayout(
        computeStackLayout({
          containerTop: containerDocTop + (parseFloat(style.paddingTop) || 0),
          containerBottom: containerDocTop + container.offsetHeight - (parseFloat(style.paddingBottom) || 0),
          heights: cards.map((card) => card.offsetHeight),
          gap: parseFloat(style.rowGap) || 0,
          viewportHeight: viewport.height,
        }),
      );
    };

    const handleResize = () => {
      const widthChanged = window.innerWidth !== viewport.width;
      const heightJump = Math.abs(window.innerHeight - viewport.height) > MOBILE_TOOLBAR_PX;
      if (!widthChanged && !heightJump) return;
      viewport = { width: window.innerWidth, height: window.innerHeight };
      measure();
    };

    measure();
    // Observing body catches content above the stack changing height (images, fonts).
    const observer = new ResizeObserver(measure);
    [document.body, container, ...cards].forEach((el) => observer.observe(el));
    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return layout;
};
