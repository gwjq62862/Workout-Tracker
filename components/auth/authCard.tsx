import { Card, CardContent } from "@/components/ui/card"

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="grid min-h-130 p-0 md:grid-cols-2">
        {children}
      </CardContent>
    </Card>
  )
}
