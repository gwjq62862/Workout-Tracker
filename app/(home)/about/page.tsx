"use client";

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-16">

      
      <section className="text-center space-y-4">
        <Badge variant="outline" className="px-3 py-1 text-sm">About This Project</Badge>
        <h1 className="text-3xl md:text-4xl font-bold">LiftMetric</h1>
        <p className="text-muted-foreground text-lg">
          A simple app I built to track workouts, monitor progress, and stay consistent. Nothing fancy, just practical tools for lifters.
        </p>
      </section>

      <Separator />

      {/* Purpose / Project Info */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Purpose</h2>
        <p className="text-muted-foreground text-lg">
          This project is designed to help anyone keep track of their exercises and volume without complexity. It’s just a digital logbook for real users, not a corporate product.
        </p>
      </section>

      <Separator />

      {/* Features / What it does */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What it offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <CardTitle>Track Workouts</CardTitle>
              <CardDescription>
                Log sets, reps, and weights easily for every session.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardTitle>Monitor Progress</CardTitle>
              <CardDescription>
                See total volume and reps to understand your growth over time.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardTitle>Simple Interface</CardTitle>
              <CardDescription>
                No complicated features — just what you need to stay consistent.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA / Start Using */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Start Tracking Today</h2>
        <p className="text-muted-foreground">
          Jump in and log your first session now.
        </p>
        <Button size="lg" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </section>

    </main>
  );
}
