import { AdminHeader } from "./_components/admin-header";

export default function Layout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col bg-page">
      <div className="p-5 pb-0">
        <AdminHeader />
      </div>
      <main className="flex-1 p-5">{children}</main>
    </div>
  );
}
