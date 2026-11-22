export default function Layout({ children }: LayoutProps<"/captain">) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b px-6 py-4 font-semibold">선장</header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
