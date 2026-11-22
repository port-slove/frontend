"use client";

import type { ChangeEvent, ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export const HEADER_TABS = [
  "운영 현황",
  "선박 모니터링",
  "선석 스케줄",
  "입항 최적화",
  "신뢰도 검사",
] as const;

export type HeaderTab = (typeof HEADER_TABS)[number];

export interface HeaderProps extends Omit<ComponentProps<"header">, "onChange"> {
  active: HeaderTab;
  onNavigate?: (tab: HeaderTab) => void;
  logoIcon?: ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchIcon?: ReactNode;
  onNotificationsClick?: () => void;
  notificationsIcon?: ReactNode;
  avatarIcon?: ReactNode;
  userName: string;
}

export function Header({
  active,
  onNavigate,
  logoIcon,
  searchValue,
  onSearchChange,
  searchIcon,
  onNotificationsClick,
  notificationsIcon,
  avatarIcon,
  userName,
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(
        "grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-md border border-default bg-surface px-5 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand [&_svg]:size-5.5 [&_svg]:text-on-brand">
          {logoIcon}
        </span>
        <p className="text-h2 text-primary">POPO</p>
      </div>

      <nav className="flex items-center gap-1 rounded-md p-1.5">
        {HEADER_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onNavigate?.(tab)}
            className={cn(
              "rounded-md px-5 py-2.5 text-label-md whitespace-nowrap",
              tab === active ? "bg-brand text-on-brand" : "text-secondary",
            )}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-3">
        <label className="flex items-center gap-2 rounded-md bg-page px-4 py-2.5">
          <span className="flex size-4.5 shrink-0 items-center justify-center text-tertiary">
            {searchIcon}
          </span>
          <input
            type="search"
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange?.(e.target.value)}
            placeholder="선박명 검색"
            className="w-36 bg-transparent text-body-sm text-primary placeholder:text-tertiary focus:outline-none"
          />
        </label>
        <button
          type="button"
          aria-label="알림"
          onClick={onNotificationsClick}
          className="flex size-6 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5 [&_svg]:text-primary"
        >
          {notificationsIcon}
        </button>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-sub [&_svg]:size-5">
          {avatarIcon}
        </span>
        <p className="text-label-lg whitespace-nowrap text-primary">{userName}</p>
      </div>
    </header>
  );
}
