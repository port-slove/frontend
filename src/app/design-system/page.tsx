import { notFound } from "next/navigation";

import {
  ActionOption,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Chip,
  DateRange,
  FilterChip,
  IconCircle,
  InfoChip,
  Input,
  SelectField,
  Toggle,
} from "@/shared/ui";

// 아이콘 시스템 도입 전 미리보기 전용 placeholder (실제 컴포넌트는 아이콘을 prop으로 전달받음)
function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-5">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// 개발용 토큰/컴포넌트 미리보기 페이지. 프로덕션 빌드에서는 404.
const palettes = {
  blue: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  gray: [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  green: [50, 100, 300, 500, 700],
  red: [50, 100, 300, 500, 700],
  yellow: [50, 100, 300, 500, 700],
} as const;

const semantic = [
  ["brand/main", "bg-brand"],
  ["brand/sub", "bg-brand-sub"],
  ["brand/pressed", "bg-brand-pressed"],
  ["brand/subtle", "bg-brand-subtle"],
  ["bg/page", "bg-page"],
  ["bg/surface", "bg-surface"],
  ["bg/surface-muted", "bg-surface-muted"],
  ["bg/inverse", "bg-inverse"],
  ["state/success", "bg-success"],
  ["state/error", "bg-error"],
  ["state/warning", "bg-warning"],
] as const;

const typography = [
  ["Display/lg", "text-display-lg"],
  ["Display/md", "text-display-md"],
  ["Heading/h1", "text-h1"],
  ["Heading/h2", "text-h2"],
  ["Heading/h3", "text-h3"],
  ["Heading/h4", "text-h4"],
  ["Body/lg", "text-body-lg"],
  ["Body/md", "text-body-md"],
  ["Body/sm", "text-body-sm"],
  ["Caption/md", "text-caption-md"],
  ["Caption/sm", "text-caption-sm"],
  ["Label/lg", "text-label-lg"],
  ["Label/md", "text-label-md"],
  ["Label/sm", "text-label-sm"],
] as const;

const radii = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const;
const shadows = ["xs", "sm", "md", "lg", "xl"] as const;

// Tailwind 는 소스에서 완성된 클래스 문자열만 인식하므로 동적 조합 대신 목록으로 둡니다.
const swatchClass: Record<string, string> = {
  "blue-50": "bg-blue-50",
  "blue-100": "bg-blue-100",
  "blue-200": "bg-blue-200",
  "blue-300": "bg-blue-300",
  "blue-400": "bg-blue-400",
  "blue-500": "bg-blue-500",
  "blue-600": "bg-blue-600",
  "blue-700": "bg-blue-700",
  "blue-800": "bg-blue-800",
  "blue-900": "bg-blue-900",
  "gray-0": "bg-gray-0",
  "gray-50": "bg-gray-50",
  "gray-100": "bg-gray-100",
  "gray-200": "bg-gray-200",
  "gray-300": "bg-gray-300",
  "gray-400": "bg-gray-400",
  "gray-500": "bg-gray-500",
  "gray-600": "bg-gray-600",
  "gray-700": "bg-gray-700",
  "gray-800": "bg-gray-800",
  "gray-900": "bg-gray-900",
  "green-50": "bg-green-50",
  "green-100": "bg-green-100",
  "green-300": "bg-green-300",
  "green-500": "bg-green-500",
  "green-700": "bg-green-700",
  "red-50": "bg-red-50",
  "red-100": "bg-red-100",
  "red-300": "bg-red-300",
  "red-500": "bg-red-500",
  "red-700": "bg-red-700",
  "yellow-50": "bg-yellow-50",
  "yellow-100": "bg-yellow-100",
  "yellow-300": "bg-yellow-300",
  "yellow-500": "bg-yellow-500",
  "yellow-700": "bg-yellow-700",
};
const radiusClass: Record<(typeof radii)[number], string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};
const shadowClass: Record<(typeof shadows)[number], string> = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-md">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto flex w-full max-w-320 flex-col gap-16 px-4 py-20 sm:px-20">
      <Section title="Color">
        {Object.entries(palettes).map(([name, steps]) => (
          <div key={name} className="flex flex-wrap gap-3">
            {steps.map((step) => (
              <div key={step} className="flex w-24 flex-col gap-2">
                <div
                  className={`h-18 rounded-md border border-default ${swatchClass[`${name}-${step}`]}`}
                />
                <span className="text-caption-md text-secondary">{`${name}-${step}`}</span>
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-wrap gap-3">
          {semantic.map(([label, cls]) => (
            <div key={label} className="flex w-36 flex-col gap-2 p-3">
              <div className={`h-12 rounded-md border border-default ${cls}`} />
              <span className="text-caption-md text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <Card className="gap-4 p-8 shadow-sm">
          {typography.map(([label, cls]) => (
            <div key={label} className="flex items-center gap-8">
              <span className="w-30 shrink-0 text-caption-md text-tertiary">{label}</span>
              <span className={cls}>포포 Brand Design 123</span>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-5">
          {radii.map((r) => (
            <div key={r} className="flex flex-col gap-2">
              <div className={`size-28 bg-brand-sub ${radiusClass[r]}`} />
              <span className="text-caption-md text-secondary">{r}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadow">
        <div className="flex flex-wrap gap-8 p-6">
          {shadows.map((s) => (
            <div
              key={s}
              className={`h-30 w-40 rounded-xl bg-surface p-6 text-label-md ${shadowClass[s]}`}
            >
              {s}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Components (base)">
        <div className="flex flex-wrap items-center gap-6">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="dark">Dark</Button>
          <Button disabled>Disabled</Button>
          <Chip>Neutral</Chip>
          <Chip tone="brand">Brand</Chip>
          <Chip tone="success">Success</Chip>
          <Chip tone="warning">Warning</Chip>
          <Chip tone="error">Error</Chip>
          <Chip tone="dark">Dark</Chip>
          <InfoChip label="풍속" value="4.2 m/s" />
          <Input className="w-70" placeholder="Placeholder" />
          <FilterChip field="상태" value="하역 중" />
          <DateRange range="2026.11.07 – 2026.11.09" />
          <SelectField value="전체" count="6/6" className="w-50" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <IconCircle tone="brand" icon={<PlaceholderIcon />} />
          <IconCircle tone="neutral" icon={<PlaceholderIcon />} />
          <IconCircle tone="error" icon={<PlaceholderIcon />} />
          <IconCircle tone="warning" icon={<PlaceholderIcon />} />
          <IconCircle tone="success" icon={<PlaceholderIcon />} />
          <IconCircle tone="white" icon={<PlaceholderIcon />} />
          <IconCircle tone="dark" icon={<PlaceholderIcon />} />
          <Toggle checked />
          <Toggle checked={false} />
        </div>
        <div className="flex max-w-110 flex-col gap-3">
          <ActionOption
            icon={<PlaceholderIcon />}
            title="VTS 무선 확인 요청"
            description="선박에 위치 재확인을 요청합니다"
          />
          <ActionOption
            selected
            icon={<PlaceholderIcon />}
            title="VTS 무선 확인 요청"
            description="선박에 위치 재확인을 요청합니다"
          />
        </div>
        <Card className="w-90">
          <CardTitle>Card Layout</CardTitle>
          <CardDescription>rounded xl, soft blue shadow, 24 padding</CardDescription>
        </Card>
      </Section>
    </main>
  );
}
