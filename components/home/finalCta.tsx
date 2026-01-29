import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="py-16 lg:py-24" >
      <div className="mx-auto max-w-7xl px-4">
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-10 md:p-16 flex flex-col items-center text-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to train smarter?
            </h2>

            <p className="max-w-xl text-primary-foreground/80 text-lg">
              Stop guessing. Start tracking every workout and see real progress over time.
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base font-semibold"
              asChild
            >
              <Link href="/dashboard">
                Start tracking now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="text-sm text-primary-foreground/70">
              100% free · No ads · No credit card
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
