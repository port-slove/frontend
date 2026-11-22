import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * 디자인 시스템 커스텀 토큰을 tailwind-merge 에 알려줘서
 * `text-h1`(글자 크기)과 `text-primary`(색)가 서로 지워지지 않게 합니다.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-lg",
        "display-md",
        "h1",
        "h2",
        "h3",
        "h4",
        "body-lg",
        "body-md",
        "body-sm",
        "caption-md",
        "caption-sm",
        "label-lg",
        "label-md",
        "label-sm",
      ],
      radius: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      shadow: ["xs", "sm", "md", "lg", "xl"],
      blur: ["glass"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
