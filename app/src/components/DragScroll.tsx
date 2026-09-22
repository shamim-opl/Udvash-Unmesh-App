"use client";

import { useRef } from "react";

export default function DragScroll({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const state = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !ref.current) return;
    state.current = { down: true, moved: false, startX: e.clientX, startLeft: ref.current.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    const s = state.current;
    if (!s.down || !el) return;
    const dx = e.clientX - s.startX;
    if (!s.moved && Math.abs(dx) > 5) {
      s.moved = true;
      el.style.scrollBehavior = "auto";
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    }
    if (s.moved) el.scrollLeft = s.startLeft - dx;
  };

  const end = () => {
    const el = ref.current;
    if (!el) return;
    state.current.down = false;
    el.style.scrollBehavior = "";
    el.style.scrollSnapType = "";
    el.style.cursor = "";
  };

  return (
    <ul
      ref={ref}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerLeave={end}
      onPointerCancel={end}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        if (state.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          state.current.moved = false;
        }
      }}
    >
      {children}
    </ul>
  );
}
