import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'


const DashboardPage = () => {
  return (
    <Card className="max-w-xl">
  <CardHeader>
    <CardTitle>Welcome to LIFTMETRIC</CardTitle>
    <CardDescription>
      You haven’t logged any workouts yet.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Button asChild>
      <Link href="/dashboard/workouts/new">
        Log your first workout
      </Link>
    </Button>
  </CardContent>
</Card>

  )
}

export default DashboardPage