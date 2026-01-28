import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Asterisk, LucideIcon } from "lucide-react";
import Link from "next/link";

type Features = {
  icon: LucideIcon;
  title: string;
  content: string;
}[];

const Feature = ({ featureData }: { featureData: Features }) => {
  return (
    <section>
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12">
          <div className="flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-semibold text-center tracking-tight">
                Everything you need to track your workouts
              </h2>
              <p className="text-muted-foreground text-center">
                Simple tools designed to help you stay consistent and see progress.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureData.map((value, index) => (
                <Card
                  key={index}
                  className="py-10 h-full border-t-4 border-t-transparent transition-all hover:border-t-primary hover:shadow-lg"
                >
                  <CardContent className="px-8 flex flex-col gap-6">
                    <value.icon
                      className="w-8 h-8 text-primary"
                      strokeWidth={1.2}
                    />
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-semibold">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Asterisk size={14} />
                <p className="text-sm">
                  Built for people who want progress, not complexity
                </p>
              </div>
              <Link href={'/dashboard'}>
              <Button >
                Start tracking today
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
