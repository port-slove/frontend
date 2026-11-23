import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // 배포 환경에 8080 포트가 열려있지 않아, 브라우저는 같은 오리진(/api)으로만 요청하고
  // Next.js 서버가 백엔드로 프록시합니다. CORS 설정이 불필요해집니다.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiBaseUrl}/:path*` }];
  },
};

export default nextConfig;
