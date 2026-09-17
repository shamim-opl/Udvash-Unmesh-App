import { BranchesIcon, HomeIcon } from "@/components/nav-icons";

export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/branches", label: "Branches", icon: BranchesIcon },
] as const;
