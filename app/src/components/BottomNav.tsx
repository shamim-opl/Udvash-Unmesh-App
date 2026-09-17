"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { AvatarIcon, BranchesIcon, HomeIcon } from "@/components/nav-icons";

const ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/branches", label: "Branches", icon: BranchesIcon },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const accountHref = isLoggedIn ? "/profile" : "/login";
  const accountActive = pathname === accountHref;

  return (
    <nav
      className="sticky bottom-0 grid grid-cols-3 items-center gap-1 border-t bg-[var(--color-surface)] px-2 py-2 lg:hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className="tap flex flex-col items-center gap-1 py-1 text-[11px]">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-[5px]"
              style={{ background: active ? "var(--color-brand-primary)" : "transparent" }}
            >
              <Icon color={active ? "#EAD8FF" : "var(--color-brand-primary)"} />
            </span>
            <span className={active ? "font-semibold text-[var(--color-brand-primary)]" : "text-[var(--color-text-secondary)]"}>
              {item.label}
            </span>
          </Link>
        );
      })}

      <Link href={accountHref} className="tap flex flex-col items-center gap-1 py-1 text-[11px]">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[5px]"
          style={{ background: accountActive ? "var(--color-brand-primary)" : "transparent" }}
        >
          <AvatarIcon color={accountActive ? "#EAD8FF" : "var(--color-brand-primary)"} />
        </span>
        <span className={accountActive ? "font-semibold text-[var(--color-brand-primary)]" : "text-[var(--color-text-secondary)]"}>
          {isLoggedIn ? "Profile" : "Login"}
        </span>
      </Link>
    </nav>
  );
}
