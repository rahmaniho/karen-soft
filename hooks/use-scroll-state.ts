"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  scrolled: boolean;
  hidden: boolean;
}

/** Tracks scroll position and direction for the sticky header. */
export function useScrollState(threshold = 40): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, hidden: false });

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setState({
          scrolled: y > threshold,
          hidden: y > 260 && y > last,
        });
        last = y;
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
