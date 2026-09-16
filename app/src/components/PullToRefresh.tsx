"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PULL_THRESHOLD = 64;
const MAX_PULL = 88;

export default function PullToRefresh({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const dragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY > 0 || refreshing) return;
    startY.current = e.touches[0].clientY;
    dragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || startY.current === null) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta <= 0) {
      setPull(0);
      return;
    }
    setPull(Math.min(delta * 0.5, MAX_PULL));
  };

  const handleTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
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

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="flex flex-1 flex-col">
      <div
        aria-hidden
        className="flex items-center justify-center overflow-hidden"
        style={{
          height: pull,
          transition: dragging.current ? "none" : "height 200ms ease-out",
        }}
      >
        <span
          className={refreshing ? "animate-spin-slow material-symbols-rounded" : "material-symbols-rounded"}
          style={{
            fontSize: 20,
            color: "var(--color-brand-primary)",
            opacity: Math.min(pull / PULL_THRESHOLD, 1),
            transform: refreshing ? undefined : `rotate(${(pull / PULL_THRESHOLD) * 360}deg)`,
          }}
        >
          refresh
        </span>
      </div>
      {children}
    </div>
  );
}
