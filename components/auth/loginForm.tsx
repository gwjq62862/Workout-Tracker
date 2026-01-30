"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import Link from "next/link"
import { AuthCard } from "@/components/auth/authCard"
import { AuthState } from "@/lib/type/authType"
import { useActionState } from "react"
import { login } from "@/lib/action/auth"



export function LoginForm() {
 const [state, formAction, isPending] = useActionState<AuthState, FormData>(login, null);

  return (
    <AuthCard>

      <form action={formAction}  className="flex flex-col justify-center gap-6 p-6 md:p-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back again
          </h1>
          <p className="text-sm text-muted-foreground">
            Login Your Workout Tracker Account
          </p>
        </div>
         {state?.error && (
          <p className="text-sm text-red-500 text-center">
            {state.error}
          </p>
        )}
        <FieldGroup className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
              defaultValue={state?.values?.email ?? ""}
            />
          </Field>
            {state?.fieldErrors?.email && (
            <p className="text-sm text-red-500">
              {state.fieldErrors.email[0]}
            </p>
          )}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required name="password" />
          </Field>
   {state?.fieldErrors?.password && (
            <p className="text-sm text-red-500">
              {state.fieldErrors.password[0]}
            </p>
          )}
          <Button type="submit" className={`w-full ${isPending ?? "opacity-60"}`} disabled={isPending}>
            Login
          </Button>
        </FieldGroup>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signUp" className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </form>

      <div className="hidden md:block p-10 bg-muted">
        <div className="space-y-3 max-w-sm">
          <h2 className="text-2xl font-bold tracking-tight">Why LIFTMETRIC?</h2>
          <p className="text-muted-foreground">
            Track every workout, review your history, and stay consistent.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Log sets, reps, and weights quickly</li>
            <li>See progress with clear session details</li>
            <li>Edit previous workouts anytime</li>
          </ul>
        </div>
      </div>

    </AuthCard>
  )
}
