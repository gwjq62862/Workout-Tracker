"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash, ArrowLeft, Save, Dumbbell, Weight as WeightIcon, Hash } from "lucide-react";
import { updateWorkoutAction } from "@/lib/action/workout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Exercise } from "@/app/dashboard/workouts/new/page";
import { toast } from "sonner";
import type { WorkoutState } from "@/lib/type/workoutType";


interface EditWorkoutProps {
    workout: {
        id: string;
        title: string;
        workout_date: string;
        exercises: Exercise[];
    };
}

export default function EditWorkoutForm({ workout }: EditWorkoutProps) {
    const router = useRouter();
    const [title, setTitle] = useState(workout.title);
    const [date, setDate] = useState(
        workout.workout_date?.split(" ")[0] ?? ""
    );

    const [exercises, setExercises] = useState<Exercise[]>(workout.exercises);

    const [state, formAction, isPending] = useActionState<WorkoutState, FormData>(updateWorkoutAction, null);


    const currentVolume = exercises.reduce((acc, ex) =>
        acc + (Number(ex.weight || 0) * Number(ex.sets || 0) * Number(ex.reps || 0)), 0
    );

    const addExercise = () => {
        setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
    };

    const removeExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const updateExercise = (index: number, field: keyof Exercise, value: string) => {
        const updated = [...exercises];
        updated[index] = { ...updated[index], [field]: value };
        setExercises(updated);
    };

    useEffect(() => {
        if (state?.success) {
            toast.success("Workout updated successfully!");
            router.push(`/dashboard/workouts/${workout.id}`);
            router.refresh();
        }
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state, router, workout.id]);

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link href={`/dashboard/workouts/${workout.id}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                        <ArrowLeft className="size-3" /> Cancel Editing
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Session</h1>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                    <WeightIcon className="size-4 text-primary" />
                    <span className="text-sm font-bold text-primary">{currentVolume.toLocaleString()} kg total</span>
                </div>
            </div>

            <form action={formAction} className="space-y-8">
                {/* Hidden Fields for the Server Action */}
                <input type="hidden" name="id" value={workout.id} />
                <input type="hidden" name="exercises" value={JSON.stringify(exercises)} />

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Dumbbell className="size-4 text-muted-foreground" /> Session Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Workout Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="font-semibold text-lg"
                                />
                                {state?.fieldErrors?.title && (
                                    <p className="text-sm text-red-500">
                                        {state.fieldErrors.title[0]}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                {state?.fieldErrors?.date && (
                                    <p className="text-sm text-red-500">
                                        {state.fieldErrors.date[0]}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/30 border-dashed flex items-center justify-center text-center p-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Live Volume</p>
                            <p className="text-4xl font-black italic">{currentVolume.toLocaleString()} <span className="text-sm not-italic">KG</span></p>
                            <p className="text-xs text-muted-foreground">Adjust weights below to see changes</p>
                        </div>
                    </Card>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold italic uppercase tracking-tight">Exercises</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addExercise} className="rounded-full">
                            <Plus className="mr-1 size-4" /> Add Exercise
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {exercises.map((exercise, index) => (
                            <Card key={index} className="overflow-hidden group hover:border-primary/40 transition-all">
                                <div className="flex items-center bg-muted/50 px-4 py-2 border-b justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary text-primary-foreground size-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                                            {index + 1}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Exercise Detail</span>
                                    </div>
                                    {exercises.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={() => removeExercise(index)}
                                        >
                                            <Trash className="size-4" />
                                        </Button>
                                    )}
                                </div>
                                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-5 space-y-1">
                                        <Label className="text-[10px] uppercase font-bold opacity-50">Name</Label>
                                        <Input
                                            placeholder="Bench Press"
                                            value={exercise.name}
                                            onChange={(e) => updateExercise(index, "name", e.target.value)}
                                            className="border-none bg-muted/20 focus-visible:ring-1"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <Label className="text-[10px] uppercase font-bold opacity-50">Sets</Label>
                                        <Input
                                            type="number"
                                            value={exercise.sets}
                                            onChange={(e) => updateExercise(index, "sets", e.target.value)}
                                            className="border-none bg-muted/20 focus-visible:ring-1"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <Label className="text-[10px] uppercase font-bold opacity-50">Reps</Label>
                                        <Input
                                            type="number"
                                            value={exercise.reps}
                                            onChange={(e) => updateExercise(index, "reps", e.target.value)}
                                            className="border-none bg-muted/20 focus-visible:ring-1"
                                        />
                                    </div>
                                    <div className="md:col-span-3 space-y-1">
                                        <Label className="text-[10px] uppercase font-bold opacity-50">Weight (kg)</Label>
                                        <Input
                                            type="number"
                                            value={exercise.weight}
                                            onChange={(e) => updateExercise(index, "weight", e.target.value)}
                                            className="border-none bg-primary/5 text-primary font-bold focus-visible:ring-primary"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {state?.fieldErrors?.exercises && (
                            <p className="text-sm text-red-500">
                                {state.fieldErrors.exercises[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div className="sticky bottom-6 flex gap-4">
                    <Button type="submit" className="flex-1 h-12 text-lg font-bold shadow-xl" disabled={isPending}>
                        {isPending ? "Saving Changes..." : <><Save className="mr-2 size-5" /> Update Workout</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
