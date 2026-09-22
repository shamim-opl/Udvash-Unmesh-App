"use client";

import Link from "next/link";

function Chevron({ color = "var(--color-text-primary)" }: { color?: string }) {
  return (
    <span className="material-symbols-rounded" style={{ fontSize: 20, color }}>
      arrow_back
    </span>
  );
}

export default function BackButton({
  href,
  onClick,
  variant = "light",
  className = "",
  mobileVisible = false,
}: {
  href?: string;
  onClick?: () => void;
  variant?: "light" | "overlay";
  className?: string;
  mobileVisible?: boolean;
}) {
  const style =
    variant === "overlay"
      ? { background: "rgba(255,255,255,0.15)" }
      : { background: "color-mix(in srgb, var(--color-brand-primary) 4%, transparent)" };
  const color = variant === "overlay" ? "white" : "var(--color-brand-primary)";
  const classes = `tap ${mobileVisible ? "flex" : "hidden lg:flex"} h-9 w-9 items-center justify-center rounded-full ${className}`;

  if (href) {
    return (
      <Link href={href} aria-label="ফিরে যান" className={classes} style={style}>
        <Chevron color={color} />
      </Link>
    );
  }

  return (
    <button type="button" aria-label="ফিরে যান" onClick={onClick} className={classes} style={style}>
      <Chevron color={color} />
    </button>
  );
}
