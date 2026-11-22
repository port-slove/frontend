# AGENTS.md

AI 코딩 에이전트(Claude Code, Codex, Cursor 등)를 위한 작업 가이드입니다.

<!-- TODO: 프로젝트 설명 (도메인, 사용자 역할, 주요 기능) -->

## 기술 스택

- Next.js 16 (App Router, Turbopack, `cacheComponents: true`) · React 19
- TypeScript (strict)
- Tailwind CSS v4 (`src/app/globals.css`의 `@theme`로 토큰 정의, `tailwind.config` 없음)
- axios · TanStack Query v5
- ESLint 9 (flat config) · Prettier · husky · lint-staged · commitlint
- 패키지 매니저: **pnpm만 사용** (npm, yarn 금지)

> Next.js 16은 학습 데이터와 API가 다를 수 있습니다. 확실하지 않으면 추측하지 말고
> `node_modules/next/dist/docs/`의 설치 버전 문서를 먼저 확인하세요.

## 명령어

| 명령                                | 용도                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `pnpm dev`                          | 개발 서버                                                                                |
| `pnpm build`                        | 프로덕션 빌드                                                                            |
| `pnpm lint` / `pnpm lint:fix`       | ESLint                                                                                   |
| `pnpm typecheck`                    | `next typegen` 후 `tsc --noEmit` (`tsc` 단독 실행 금지: `LayoutProps` 등 생성 타입 누락) |
| `pnpm format` / `pnpm format:check` | Prettier                                                                                 |

작업을 끝냈다고 보고하기 전에 **`pnpm lint`와 `pnpm typecheck`를 통과**시키세요.
라우트, 설정, 의존성을 바꿨다면 `pnpm build`까지 확인하세요.

## 디렉터리 구조

```
src/
  app/                       # 라우팅 전용. 페이지/레이아웃은 얇게 유지
    (auth)/login/
    (admin)/admin/           # 항만관리자
    (captain)/captain/       # 선장
    providers.tsx            # 클라이언트 Provider 모음
  shared/                    # 도메인과 무관한 공용 코드
    api/client.ts            # axios 인스턴스(apiClient), ApiError
    api/query-client.ts      # getQueryClient()
    config/env.ts            # 환경변수 접근은 여기서만
    lib/cn.ts                # className 병합 (clsx + tailwind-merge)
    ui/                      # 디자인 시스템 기본 컴포넌트 (Button, Input, Card, Chip, Badge)
```

- 역할 전용 화면은 해당 route group 안에만 둡니다. 두 역할이 함께 쓰는 코드는 `shared/`로 올립니다.
- 새 최상위 폴더(`entities/`, `features/` 등)가 필요하면 만들기 전에 사용자와 합의하세요.
- import는 `@/` 별칭을 사용합니다. `../../` 같은 깊은 상대 경로는 쓰지 않습니다.

## 코딩 규칙

### Next.js

- 기본은 Server Component입니다. 상태, 이벤트, 브라우저 API, TanStack Query 훅이 필요할 때만 `"use client"`를 붙이고, 클라이언트 경계는 가능한 한 말단에 둡니다.
- `cacheComponents`가 켜져 있습니다. `cookies()`, `headers()`, 요청별 fetch 같은 동적 데이터를 읽는 컴포넌트는 `<Suspense>`로 감싸야 빌드가 통과합니다.
- `params`, `searchParams`는 Promise입니다. `await`해서 사용하세요.
- 페이지/레이아웃 props 타입은 전역 `PageProps<"/경로">`, `LayoutProps<"/경로">`를 사용합니다.
- 요청 가로채기(인증 리다이렉트 등)는 `middleware.ts`가 아니라 `src/proxy.ts`에 작성합니다.
- `export const runtime = "edge"`는 사용하지 않습니다.

### API · 데이터 패칭

- HTTP 요청은 반드시 `@/shared/api/client`의 `apiClient`를 통합니다. `fetch`나 새 axios 인스턴스를 직접 만들지 않습니다.
- 에러는 `ApiError`(`status`, `code`, `message`)로 정규화되어 있습니다. 화면에서는 `error instanceof ApiError`로 분기합니다.
- 서버 상태는 TanStack Query로, UI 상태는 React state로 관리합니다. 서버 데이터를 `useState`에 복사하지 않습니다.
- 쿼리 키와 쿼리 함수는 `queryOptions()`로 함께 정의해 재사용합니다.

  ```ts
  export const arrivalQueries = {
    all: () => ["arrivals"] as const,
    list: (params: ArrivalListParams) =>
      queryOptions({
        queryKey: [...arrivalQueries.all(), "list", params],
        queryFn: () => apiClient.get<Arrival[]>("/arrivals", { params }).then((r) => r.data),
      }),
  };
  ```

- 변경 후에는 `queryClient.invalidateQueries({ queryKey: ... })`로 관련 쿼리를 무효화합니다.
- API 응답/요청 타입은 백엔드 스펙에 맞춰 직접 정의합니다. 모르는 필드를 추측해서 만들지 말고 사용자에게 확인하세요.

### TypeScript

- `any` 금지(ESLint 에러). 불확실하면 `unknown` 후 좁히기.
- 타입만 가져올 때는 `import type` / `{ type X }`를 사용합니다.
- 사용하지 않는 변수/인자는 `_` 접두사를 붙입니다.

### 스타일 · 디자인 시스템

출처: Figma `포포-UI-UX` › `포포 디자인 시스템` (node `204:40`). 토큰 정의는 `src/app/globals.css`의 `@theme` 한 곳에만 있습니다.

- **Tailwind 기본 팔레트·글자 크기·라운드·그림자는 제거했습니다.** `text-sm`, `font-bold`, `bg-blue-500`(기본 팔레트 값), `rounded-2xl`(기본 값) 같은 기본 클래스를 쓰지 말고 아래 토큰만 사용합니다.
- 색상은 **의미(semantic) 토큰을 먼저** 쓰고, 맞는 게 없을 때만 원시 팔레트(`blue-600`, `gray-200` 등)를 씁니다.

  | 용도   | 클래스                                                                                 |
  | ------ | -------------------------------------------------------------------------------------- |
  | 브랜드 | `bg-brand` `bg-brand-sub` `bg-brand-pressed` `bg-brand-subtle` `text-brand`            |
  | 배경   | `bg-page` `bg-surface` `bg-surface-muted` `bg-inverse` `bg-disabled`                   |
  | 텍스트 | `text-primary` `text-secondary` `text-tertiary` `text-on-brand` `text-disabled`        |
  | 테두리 | `border-default` (`border-brand`, `border-error` 등 색 토큰도 가능)                    |
  | 상태   | `success` `error` `warning` + 배경용 `*-subtle` (예: `bg-success-subtle text-success`) |

- 타이포그래피는 크기·행간·자간·굵기가 한 클래스에 묶여 있으므로 `font-*`를 따로 붙이지 않습니다.
  `text-display-lg` `text-display-md` `text-h1`~`text-h4` `text-body-lg/md/sm` `text-caption-md/sm` `text-label-lg/md/sm`
- 간격은 4pt 그리드 = Tailwind 기본 spacing (`p-1`=4px … `p-20`=80px). `p-[13px]` 같은 임의 값은 쓰지 않습니다.
- 라운드 `rounded-{none,xs,sm,md,lg,xl,2xl,3xl,full}`, 그림자 `shadow-{xs,sm,md,lg,xl}`(블루 틴트), 글래스 `backdrop-blur-glass`.
- UI를 만들 때는 먼저 `@/shared/ui`의 컴포넌트를 재사용합니다. 클래스를 덧붙일 때는 `cn()`을 사용합니다(토큰 충돌을 올바르게 병합).
- 토큰을 추가하면 `src/shared/lib/cn.ts`의 tailwind-merge 설정과 `/design-system` 미리보기 페이지(개발 환경 전용)도 함께 갱신합니다.
- 다크 모드는 아직 정의되지 않았습니다(Figma 변수가 Light 한 가지).

### 환경변수

- 클라이언트에서 쓰는 값은 `NEXT_PUBLIC_` 접두사가 필요합니다.
- 새 변수를 추가하면 `.env.example`과 `src/shared/config/env.ts`를 함께 갱신합니다.
- `.env`, `.env.local`은 읽거나 출력하지 않습니다.

## Git

- 커밋 메시지는 Conventional Commits 형식(commitlint로 검사): `타입(범위): 제목`
  - 타입: `feat` `fix` `refactor` `style` `docs` `test` `chore` `perf` `build` `ci` `revert`
  - 예: `feat(admin): 입항 신청 목록 조회`, `fix(captain): 입항 일시 포맷 오류 수정`
  - 제목은 한국어로, 마침표 없이 작성합니다.
- 훅 구성: pre-commit(lint-staged) → commit-msg(commitlint) → pre-push(lint + typecheck)
- **`--no-verify`, `-n`, `HUSKY=0`으로 훅을 우회하지 않습니다.** 검사가 실패하면 원인을 고칩니다.
- 커밋, 푸시, 브랜치 생성은 사용자가 요청했을 때만 합니다. force push 금지.

## 하지 말 것

- 요청받지 않은 의존성 추가 (필요하면 이유와 함께 먼저 제안)
- ESLint 규칙을 `eslint-disable`로 끄기 (불가피하면 사유 주석 필수)
- 생성 파일 수정: `next-env.d.ts`, `.next/`, `pnpm-lock.yaml` 직접 편집
- 백엔드 API가 없다는 이유로 목(mock) 데이터를 실제 코드 경로에 하드코딩하기

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
