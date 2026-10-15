"use client";
import { RefObject, useEffect, useState } from "react";
import { StackLayout, computeStackLayout } from "@/lib/stack-layout";

/** Mark each stacked card with this attribute so the layout can find it. */
export const STACK_CARD_ATTRIBUTE = "data-stack-card";

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

    const measure = () => {
      const style = window.getComputedStyle(container);
      setLayout(
        computeStackLayout({
          containerTop:
            container.getBoundingClientRect().top + window.scrollY + (parseFloat(style.paddingTop) || 0),
          heights: cards.map((card) => card.offsetHeight),
          gap: parseFloat(style.rowGap) || 0,
          viewportHeight: window.innerHeight,
        }),
      );
    };

    measure();
    // Observing body catches content above the stack changing height (images, fonts).
    const observer = new ResizeObserver(measure);
    [document.body, container, ...cards].forEach((el) => observer.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef]);

  return layout;
};
