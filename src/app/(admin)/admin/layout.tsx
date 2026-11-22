import { AdminHeader } from "./_components/admin-header";
import { adminUserFixture } from "./_fixtures";

export default function Layout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <AdminHeader userName={adminUserFixture.name} />
      <main className="flex flex-1 flex-col gap-4">{children}</main>
    </div>
  );
}
