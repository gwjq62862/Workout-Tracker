
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">

                {children}


            </div>
        </div>
    )
}
