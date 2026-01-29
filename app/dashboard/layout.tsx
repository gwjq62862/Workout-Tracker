import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/lib/provider/auth-provider";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();


  if (!user) {
    redirect("/login");
  }

  return (
  
    <AuthProvider initialUser={user}>
      <div className="flex min-h-screen">
        <aside className="w-64 border-r bg-background px-6 py-8">
          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" className="font-medium">Overview</Link>
            <Link href="/dashboard/workouts" className="font-medium">Workouts</Link>
            <Link href="/dashboard/workouts/new" className="font-medium text-primary">+ New Workout</Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </AuthProvider>
  );
}
