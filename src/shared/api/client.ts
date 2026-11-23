import axios, { type AxiosError } from "axios";

export interface ApiErrorBody {
  code?: string;
  message?: string;
}

/** 화면에서 다루기 쉬운 형태로 정규화한 API 에러 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number | null,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// 배포 환경에 백엔드 포트가 노출되지 않아, 항상 같은 오리진의 /api를 호출하고
// next.config.ts의 rewrites가 실제 백엔드로 프록시합니다.
export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10_000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  // TODO: 인증 방식(쿠키 / Bearer 토큰)이 정해지면 여기서 Authorization 헤더를 붙입니다.
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status ?? null;
    const body = error.response?.data;

    // TODO: 401 응답 시 토큰 재발급 또는 로그인 페이지 이동 처리
    return Promise.reject(new ApiError(body?.message ?? error.message, status, body?.code));
  },
);
