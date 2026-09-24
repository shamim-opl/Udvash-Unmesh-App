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
  const startX = useRef<number | null>(null);
  const axis = useRef<"x" | "y" | null>(null);
  const dragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY > 0 || refreshing) return;
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    axis.current = null;
    dragging.current = true;
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
    setPull(Math.min(delta * 0.5, MAX_PULL));
  };

  const handleTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    startY.current = null;

    if (pull >= PULL_THRESHOLD) {
      setRefreshing(true);
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
      {children}
    </div>
  );
}
