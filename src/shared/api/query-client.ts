import { isServer, QueryClient } from "@tanstack/react-query";

import { ApiError } from "./client";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 직후 클라이언트에서 곧바로 다시 요청하지 않도록 staleTime을 둡니다.
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          // 4xx는 재시도해도 결과가 같으므로 재시도하지 않습니다.
          if (error instanceof ApiError && error.status && error.status < 500) return false;
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/** 서버에서는 요청마다 새 클라이언트를, 브라우저에서는 하나를 재사용합니다. */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
