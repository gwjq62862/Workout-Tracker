"use client";

import Link from "next/link";
import { Dumbbell, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/lib/provider/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


const navLinks = [
 
  { title: "Home", href: "/" },
  { title: "About", href: "/about" }, 
];


export default function Navbar() {
    const { user } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {


            router.refresh()
            router.push("/login");
        } else {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">

                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Dumbbell className="h-5 w-5" />
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        LIFT<span className="text-primary italic">METRIC</span>
                    </Link>
                </div>


                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <Button size="sm" asChild variant="default">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/signUp">Get Started</Link>
                            </Button>
                        </>
                    )}
                </div>

                <div className="flex md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-72 sm:w-80">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                    <Dumbbell className="h-5 w-5 text-primary" />
                                    <span>LIFTMETRIC</span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 py-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                                <hr className="my-2" />
                                {user ? (
                                    <Button className="w-full" asChild>
                                        <Link href="/dashboard">Open Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="/login">Sign In</Link>
                                        </Button>
                                        <Button className="w-full" asChild>
                                            <Link href="/signUp">Start Free Trial</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
