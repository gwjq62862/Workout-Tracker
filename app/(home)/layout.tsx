import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/provider/auth-provider";
import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
}

export default async function HomeLayout({ children }: LayoutProps) {
      const supabase = await createClient(); 
    const { data: { user } } = await supabase.auth.getUser();
    
    console.log("User data on server:", user);
    return (
        <AuthProvider initialUser={user}>



            <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                    {/* We add padding-top here so the Hero isn't hidden under the fixed Navbar */}
                    <div className="pt-16">
                        {children}
                    </div>
                </main>
                {/* You can add a Footer here later */}
            </div>
        </AuthProvider>
    );
}
