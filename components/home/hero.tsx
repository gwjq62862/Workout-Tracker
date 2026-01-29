import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="py-12 lg:py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-4">
                           Comepletely Free 
                        </div>
                        <h1 className="font-heading my-4 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:leading-[1.1]">
                            Track Every Rep. <span className="text-primary">Crush Every Goal.</span>
                        </h1>
                        <p className="text-muted-foreground mb-8 text-balance text-lg lg:text-xl max-w-[500px]">
                            The ultimate digital logbook for serious lifters. Build strength, stay consistent, and see your progress in real-time.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                            <Button size="lg" className="px-8 h-12 text-md" asChild>
                                <Link href="/dashboard">
                                    Start Your Transformation <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="px-8 h-12 text-md" asChild>
                                <Link href="/about">
                                    <PlayCircle className="mr-2 h-4 w-4" /> Learn More
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative w-full aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border bg-muted">
                        <Image
                            src="/hero.webp"
                            alt="Workout Tracker Dashboard Preview"
                            fill
                            priority
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
