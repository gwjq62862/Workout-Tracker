import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, ClipboardList, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Create a workout",
    description:
      "Add exercises, sets, reps, and weight in seconds before or during your session.",
  },
  {
    icon: Dumbbell,
    title: "Log your training",
    description:
      "Track every set as you train. No clutter, no distractions — just lifting.",
  },
  {
    icon: TrendingUp,
    title: "See your progress",
    description:
      "Automatically calculate volume, reps, and workout history over time.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center max-w-xl mx-auto">
            <Badge variant="outline">How it works</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Start tracking in minutes
            </h2>
            <p className="text-muted-foreground">
              A simple workflow designed for real training sessions.
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-8 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <step.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-mono text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
