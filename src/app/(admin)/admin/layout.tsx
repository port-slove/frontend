export default function Layout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-default bg-surface px-6 py-4 text-h4">항만관리자</header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
