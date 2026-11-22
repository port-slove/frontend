# 항만 입항 관리 플랫폼 — Frontend

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · axios · TanStack Query v5 · ESLint · Prettier

## 시작하기

```bash
pnpm install
cp .env.example .env.local   # NEXT_PUBLIC_API_BASE_URL 설정
pnpm dev
```

## 스크립트

| 명령                                | 설명                               |
| ----------------------------------- | ---------------------------------- |
| `pnpm dev`                          | 개발 서버                          |
| `pnpm build` / `pnpm start`         | 프로덕션 빌드 / 실행               |
| `pnpm lint` / `pnpm lint:fix`       | ESLint                             |
| `pnpm typecheck`                    | 라우트 타입 생성 후 `tsc --noEmit` |
| `pnpm format` / `pnpm format:check` | Prettier                           |

## 구조

```
src/
  app/
    (auth)/login/        # 로그인
    (admin)/admin/       # 항만관리자
    (captain)/captain/   # 선장
    providers.tsx        # QueryClientProvider + Devtools
  shared/
    api/client.ts        # axios 인스턴스, ApiError 정규화
    api/query-client.ts  # QueryClient 기본 옵션
    config/env.ts        # 환경변수
```
