import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background px-6 py-8">
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="font-medium">
            Overview
          </Link>
          <Link href="/dashboard/workouts" className="font-medium">
            Workouts
          </Link>
          <Link href="/dashboard/workouts/new" className="font-medium text-primary">
            + New Workout
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
