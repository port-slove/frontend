import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">항만 입항 관리 플랫폼</h1>
      <nav className="flex gap-4 text-sm">
        <Link className="underline" href="/login">
          로그인
        </Link>
        <Link className="underline" href="/admin">
          항만관리자
        </Link>
        <Link className="underline" href="/captain">
          선장
        </Link>
      </nav>
    </main>
  );
}
