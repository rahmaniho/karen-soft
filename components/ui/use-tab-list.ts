"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * RTL, automatically activated tabs with a single roving tab stop.
 * singlePanel is for tabs that replace one live iframe rather than rendering many panels.
 */
export function useTabList({ count, singlePanel = false, panelTabIndex = 0 }: { count: number; singlePanel?: boolean; panelTabIndex?: 0 | -1 }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (count < 1) return;
    const last = count - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === 0 ? last : index - 1;
    if (event.key === "ArrowLeft") next = index === last ? 0 : index + 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function tabProps(index: number) {
    return {
      ref: (element: HTMLButtonElement | null) => { tabRefs.current[index] = element; },
      type: "button" as const,
      role: "tab" as const,
      id: `${baseId}-tab-${index}`,
      "aria-selected": index === active,
      "aria-controls": singlePanel ? `${baseId}-panel` : `${baseId}-panel-${index}`,
      tabIndex: index === active ? 0 : -1,
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => onKeyDown(event, index),
      onClick: () => setActive(index),
    };
  }

  function panelProps(index = active) {
    return {
      id: singlePanel ? `${baseId}-panel` : `${baseId}-panel-${index}`,
      role: "tabpanel" as const,
      "aria-labelledby": `${baseId}-tab-${index}`,
      tabIndex: index === active ? panelTabIndex : undefined,
    };
  }

  return { active, baseId, tabProps, panelProps };
}
