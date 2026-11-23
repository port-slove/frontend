"use client";

import { usePathname, useRouter } from "next/navigation";

import { Header, type HeaderTab } from "@/shared/ui";

const TAB_ROUTES: Record<HeaderTab, string> = {
  "운영 현황": "/admin",
  "선박 모니터링": "/admin/monitoring",
  "선석 스케줄": "/admin/schedule",
  "입항 최적화": "/admin/optimization",
  "신뢰도 검사": "/admin/reliability",
};

function activeTabFromPathname(pathname: string): HeaderTab {
  const entry = Object.entries(TAB_ROUTES)
    .filter(([, path]) => path !== "/admin")
    .find(([, path]) => pathname.startsWith(path));

  return (entry?.[0] as HeaderTab) ?? "운영 현황";
}

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Header
      active={activeTabFromPathname(pathname)}
      onNavigate={(tab) => router.push(TAB_ROUTES[tab as HeaderTab])}
      logoIcon={<PlaceholderIcon />}
      searchIcon={<PlaceholderIcon />}
      notificationsIcon={<PlaceholderIcon />}
      avatarIcon={<PlaceholderIcon />}
      userName="REVLIS"
    />
  );
}
