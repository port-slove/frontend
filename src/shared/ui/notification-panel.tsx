"use client";

import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";
import { NotificationItem, type NotificationItemProps } from "./notification-item";

export interface NotificationGroup {
  label: string;
  items: (NotificationItemProps & { id: string })[];
}

export interface NotificationPanelProps extends ComponentProps<"div"> {
  unreadCount: number;
  tabs: string[];
  activeTab: string;
  onTabChange?: (tab: string) => void;
  onMarkAllRead?: () => void;
  groups: NotificationGroup[];
  onSettingsClick?: () => void;
  onViewAllClick?: () => void;
}

export function NotificationPanel({
  unreadCount,
  tabs,
  activeTab,
  onTabChange,
  onMarkAllRead,
  groups,
  onSettingsClick,
  onViewAllClick,
  className,
  ...props
}: NotificationPanelProps) {
  return (
    <div
      className={cn(
        "flex w-100 flex-col items-start rounded-lg border border-default bg-surface shadow-md",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between px-4 pt-3.5 pb-2.5">
        <div className="flex items-center gap-1.5">
          <p className="text-h4 whitespace-nowrap text-primary">알림</p>
          <p className="text-label-sm whitespace-nowrap text-brand">새 알림 {unreadCount}</p>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="text-label-sm whitespace-nowrap text-secondary"
        >
          모두 읽음
        </button>
      </div>
      <div className="flex w-full gap-4 border-b border-default px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange?.(tab)}
            className={cn(
              "border-b-2 pt-1.5 pb-2.5 text-label-md whitespace-nowrap",
              tab === activeTab
                ? "border-gray-900 text-primary"
                : "border-transparent text-tertiary",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex w-full flex-col items-start">
        {groups.map((group) => (
          <div key={group.label} className="flex w-full flex-col items-start">
            <p className="w-full px-4 pt-3 pb-1 text-caption-md whitespace-nowrap text-tertiary">
              {group.label}
            </p>
            {group.items.map(({ id, ...item }) => (
              <NotificationItem key={id} {...item} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-between border-t border-default px-4 py-3">
        <button
          type="button"
          onClick={onSettingsClick}
          className="text-label-sm whitespace-nowrap text-secondary"
        >
          알림 설정
        </button>
        <button
          type="button"
          onClick={onViewAllClick}
          className="text-label-sm whitespace-nowrap text-brand"
        >
          전체 알림 보기
        </button>
      </div>
    </div>
  );
}
