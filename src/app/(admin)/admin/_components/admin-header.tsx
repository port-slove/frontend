"use client";

import { usePathname, useRouter } from "next/navigation";

import { BellIcon, Header, type HeaderTab, LogoIcon, SearchIcon, UserIcon } from "@/shared/ui";

// 아직 화면이 없는 탭(입항 최적화, 신뢰도 검사)은 경로가 생기면 추가합니다.
const TAB_HREF: Partial<Record<HeaderTab, string>> = {
  "운영 현황": "/admin",
  "선박 모니터링": "/admin/vessels",
  "선석 스케줄": "/admin/berths",
};

function getActiveTab(pathname: string): HeaderTab {
  if (pathname.startsWith("/admin/vessels")) return "선박 모니터링";
  if (pathname.startsWith("/admin/berths")) return "선석 스케줄";
  return "운영 현황";
}

export interface AdminHeaderProps {
  userName: string;
}

export function AdminHeader({ userName }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Header
      active={getActiveTab(pathname)}
      onNavigate={(tab) => {
        const href = TAB_HREF[tab as HeaderTab];
        if (href) router.push(href);
      }}
      logoIcon={<LogoIcon />}
      searchIcon={<SearchIcon />}
      notificationsIcon={<BellIcon />}
      avatarIcon={<UserIcon className="text-brand" />}
      userName={userName}
    />
  );
}
