"use client";

import { usePathname, useRouter } from "next/navigation";

import { BellIcon, Header, type HeaderTab, LogoIcon, SearchIcon, UserIcon } from "@/shared/ui";

const TAB_ROUTES: Record<HeaderTab, string> = {
  "운영 현황": "/admin",
  "선박 모니터링": "/admin/vessels",
  "선석 스케줄": "/admin/berths",
  "입항 최적화": "/admin/optimization",
  "신뢰도 검사": "/admin/reliability",
};

function activeTabFromPathname(pathname: string): HeaderTab {
  const entry = Object.entries(TAB_ROUTES)
    .filter(([, path]) => path !== "/admin")
    .find(([, path]) => pathname.startsWith(path));

  return (entry?.[0] as HeaderTab | undefined) ?? "운영 현황";
}

export interface AdminHeaderProps {
  userName: string;
}

export function AdminHeader({ userName }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Header
      active={activeTabFromPathname(pathname)}
      onNavigate={(tab) => router.push(TAB_ROUTES[tab as HeaderTab])}
      logoIcon={<LogoIcon />}
      searchIcon={<SearchIcon />}
      notificationsIcon={<BellIcon />}
      avatarIcon={<UserIcon className="text-brand" />}
      userName={userName}
    />
  );
}
