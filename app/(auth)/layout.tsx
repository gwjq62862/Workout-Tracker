
import type { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        redirect("/dashboard")
    }
    return (
        <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">

                {children}


            </div>
        </div>
    )
}
