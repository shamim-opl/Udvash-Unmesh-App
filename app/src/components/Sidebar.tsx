"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthProvider";
import { NAV_ITEMS } from "@/components/nav-items";
import { AvatarIcon } from "@/components/nav-icons";

export default function Sidebar() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const accountHref = isLoggedIn ? "/profile" : "/login";
  const accountActive = pathname === accountHref;

  return (
    <aside
      className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r px-4 py-6 lg:flex"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Link href="/" className="tap mb-8 flex items-center gap-2.5 px-2">
        <Image
          src={theme === "dark" ? "/logo-dark.png" : "/logo.png"}
          alt="উদ্ভাস-উন্মেষ Online Care"
          width={theme === "dark" ? 145 : 140}
          height={theme === "dark" ? 30 : 39}
          className="h-8 w-auto"
        />
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="tap flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm"
              style={{
                background: active ? "color-mix(in srgb, var(--color-brand-primary) 10%, transparent)" : "transparent",
                color: active ? "var(--color-brand-primary)" : "var(--color-text-primary)",
                fontWeight: active ? 700 : 500,
              }}
            >
              <Icon color={active ? "var(--color-brand-primary)" : "var(--color-text-secondary)"} />
              {item.label}
            </Link>
          );
        })}

        <Link
          href={accountHref}
          className="tap flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm"
          style={{
            background: accountActive ? "color-mix(in srgb, var(--color-brand-primary) 10%, transparent)" : "transparent",
            color: accountActive ? "var(--color-brand-primary)" : "var(--color-text-primary)",
            fontWeight: accountActive ? 700 : 500,
          }}
        >
          <AvatarIcon color={accountActive ? "var(--color-brand-primary)" : "var(--color-text-secondary)"} />
          {isLoggedIn ? "Profile" : "Login"}
        </Link>
      </nav>
    </aside>
  );
}
