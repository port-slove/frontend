import type { ComponentProps } from "react";

/*
 * 포포 디자인 시스템 아이콘
 * Figma: 포포-UI-UX 에서 내려받은 SVG 경로를 그대로 옮기고, 색만 currentColor 로 바꿨습니다.
 * 색은 부모의 text-* 클래스로 정합니다.
 */
export type IconProps = ComponentProps<"svg">;

export function LogoIcon(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden {...props}>
      <path
        d="M2.75 15.5833L4.58333 18.3333H17.4167L19.25 15.5833H2.75Z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.58333 15.5833V10.0833H17.4167V15.5833M8.25 10.0833V6.41667H13.75V10.0833"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
      <path
        d="M13.5 8.25C13.5 11.1495 11.1495 13.5 8.25 13.5C5.35051 13.5 3 11.1495 3 8.25C3 5.35051 5.35051 3 8.25 3C11.1495 3 13.5 5.35051 13.5 8.25Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 15.75L12.525 12.525"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4167 17.5C11.2672 17.7412 11.0586 17.9402 10.8107 18.0782C10.5628 18.2163 10.2837 18.2887 10 18.2887C9.71625 18.2887 9.43721 18.2163 9.18929 18.0782C8.94138 17.9402 8.73281 17.7412 8.58333 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M13.3333 6.66667C13.3333 8.50762 11.8409 10 10 10C8.15905 10 6.66667 8.50762 6.66667 6.66667C6.66667 4.82572 8.15905 3.33333 10 3.33333C11.8409 3.33333 13.3333 4.82572 13.3333 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33333 17.5C3.33333 15.7319 4.03571 14.0362 5.28595 12.786C6.5362 11.5357 8.23189 10.8333 10 10.8333C11.7681 10.8333 13.4638 11.5357 14.714 12.786C15.9643 14.0362 16.6667 15.7319 16.6667 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M3.33333 8H12.6667M8.66667 12L12.6667 8L8.66667 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExportIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M8 10.6667V2.66667M10.6667 5.33333L8 2.66667L5.33333 5.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66667 9.33333V12C2.66667 12.3536 2.80714 12.6928 3.05719 12.9428C3.30724 13.1929 3.64638 13.3333 4 13.3333H12C12.3536 13.3333 12.6928 13.1929 12.9428 12.9428C13.1929 12.6928 13.3333 12.3536 13.3333 12V9.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M2.66667 6V2.66667H6M13.3333 6V2.66667H10M2.66667 10V13.3333H6M13.3333 10V13.3333H10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CollapseIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M5 5L10 10L5 15M10.8333 5L15.8333 10L10.8333 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M6 2.66667L2 4V13.3333L6 12L10 13.3333L14 12V2.66667L10 4L6 2.66667Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 2.66667V12M10 4V13.3333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 5V11.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15H10.0083"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 2.5L18.3333 17.5H1.66667L10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.33333V12.5M10 15H10.0083"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
