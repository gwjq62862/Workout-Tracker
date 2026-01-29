import { createClient } from "@/lib/supabase/server";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Dumbbell, Flame, TrendingUp, Calendar, Plus } from 'lucide-react'
import Link from 'next/link'
import { Exercise } from "./workouts/new/page";
import { dateFormatter, volumeFormatter } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();

 
  const [statsResponse, recentResponse] = await Promise.all([
    supabase
      .from("workouts")
      .select("exercises, workout_date"),
    supabase
      .from("workouts")
      .select("id, title, exercises, workout_date")
      .order("workout_date", { ascending: false })
      .limit(3)
  ]);

  const allWorkouts = statsResponse.data || [];
  const recentWorkouts = recentResponse.data || [];


  const totalWorkouts = allWorkouts.length;
  
  const totalVolume = allWorkouts.reduce((acc, workout) => {
    const workoutVolume = workout.exercises.reduce((exAcc: number, ex: Exercise) => {
      return exAcc + (Number(ex.weight || 0) * Number(ex.sets || 0) * Number(ex.reps || 0));
    }, 0);
    return acc + workoutVolume;
  }, 0);


  const lastWorkoutDate = recentWorkouts.length > 0 
    ? dateFormatter.format(new Date(recentWorkouts[0].workout_date)) 
    : "No sessions";

  const workoutsThisWeek = allWorkouts.filter(w => {
    const d = new Date(w.workout_date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return d >= sevenDaysAgo;
  }).length;

  return (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Track your fitness journey and metrics.</p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/dashboard/workouts/new">
            <Plus className="mr-2 size-4" /> New Workout
          </Link>
        </Button>
      </div>


      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volumeFormatter.format(totalVolume)} kg</div>
            <p className="text-xs text-muted-foreground">Cumulative weight lifted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Workouts</CardTitle>
            <Dumbbell className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <p className="text-xs text-muted-foreground">Total sessions logged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Session</CardTitle>
            <Calendar className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" suppressHydrationWarning>
              {lastWorkoutDate}
            </div>
            <p className="text-xs text-muted-foreground">Consistency is key!</p>
          </CardContent>
        </Card>
      </div>

   
      {totalWorkouts === 0 ? (
        <Card className="border-dashed bg-muted/30 py-16">
          <CardContent className="flex flex-col items-center text-center gap-6">
            <div className="bg-background p-6 rounded-full shadow-md border">
              <Activity className="size-10 text-primary" />
            </div>
            <div className="space-y-2 max-w-sm">
              <CardTitle className="text-xl">Your dashboard is ready</CardTitle>
              <CardDescription>
                Once you log your first workout, we'll start calculating your volume and showing your progress here.
              </CardDescription>
            </div>
            <Button asChild size="lg" className="px-8">
              <Link href="/dashboard/workouts/new">Log First Workout</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
     
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest training sessions</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {recentWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-semibold leading-none">{workout.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {workout.exercises.length} exercises • {dateFormatter.format(new Date(workout.workout_date))}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/workouts/${workout.id}`}>View</Link>
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-muted-foreground" asChild>
                <Link href="/dashboard/workouts">See all workouts</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center text-center p-8 bg-primary/5 border-primary/10">
            <div className="space-y-4">
              <div className="inline-flex p-4 rounded-full bg-background shadow-sm border">
                <Flame className={`size-10 ${workoutsThisWeek > 0 ? 'text-orange-500 animate-pulse' : 'text-muted-foreground opacity-30'}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Weekly Goal</h3>
                <p className="text-muted-foreground">
                  You have completed <span className="text-foreground font-bold">{workoutsThisWeek}</span> workouts in the last 7 days.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-sm font-medium text-primary uppercase tracking-wider">
                  {workoutsThisWeek >= 3 ? "Goal Reached!" : "Keep Pushing!"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
