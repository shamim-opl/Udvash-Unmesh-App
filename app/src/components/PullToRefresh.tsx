"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PULL_THRESHOLD = 64;
const MAX_PULL = 88;
// Below this, treat the pull as 0. On some mobile browsers a stray touchmove
// (e.g. from the browser's own overscroll/refresh gesture) can leave `pull`
// stuck at a tiny non-zero value, showing a persistent sliver of the icon.
const PULL_DEAD_ZONE = 6;

export default function PullToRefresh({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const axis = useRef<"x" | "y" | null>(null);
  const dragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY > 0 || refreshing) return;
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    axis.current = null;
    dragging.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || startY.current === null || startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (axis.current === null && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current === "x") {
      dragging.current = false;
      setIsDragging(false);
      startY.current = null;
      setPull(0);
      return;
    }
    if (axis.current === null) return;
    const delta = dy;
    if (delta <= 0) {
      setPull(0);
      return;
    }
    const next = Math.min(delta * 0.5, MAX_PULL);
    setPull(next < PULL_DEAD_ZONE ? 0 : next);
  };

  const handleTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    startY.current = null;

    if (pull >= PULL_THRESHOLD) {
      setRefreshing(true);
      setPull(PULL_THRESHOLD);
      router.refresh();
      window.setTimeout(() => {
        setRefreshing(false);
        setPull(0);
      }, 600);
    } else {
      setPull(0);
    }
  };

  // Belt-and-suspenders against the stuck-sliver glitch: never show anything
  // for a pull this small, no matter how `pull` state got there.
  const visualPull = !refreshing && pull < PULL_DEAD_ZONE ? 0 : pull;

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="flex flex-1 flex-col">
      <div
        aria-hidden
        className="flex items-center justify-center overflow-hidden"
        style={{
          height: visualPull,
          transition: isDragging ? "none" : "height 200ms ease-out",
        }}
      >
        <span
          className={refreshing ? "animate-spin-slow material-symbols-rounded" : "material-symbols-rounded"}
          style={{
            fontSize: 20,
            color: "var(--color-brand-primary)",
            opacity: Math.min(visualPull / PULL_THRESHOLD, 1),
            transform: refreshing ? undefined : `rotate(${(visualPull / PULL_THRESHOLD) * 360}deg)`,
          }}
        >
          refresh
        </span>
      </div>
      {children}
    </div>
  );
}
