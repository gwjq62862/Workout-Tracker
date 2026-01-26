import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import Link from "next/link"
import { AuthCard } from "@/components/auth/authCard"

export function LoginForm() {
  return (
    <AuthCard>

      {/* LEFT — FORM */}
      <form className="flex flex-col justify-center gap-6 p-6 md:p-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back again
          </h1>
          <p className="text-sm text-muted-foreground">
            Login Your Workout Tracker Account
          </p>
        </div>

        <FieldGroup className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </FieldGroup>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signIn" className="underline underline-offset-4">
            Login
          </Link>
        </p>
      </form>

      {/* RIGHT — IMAGE */}
      <div className="hidden md:block">
        <img
          src="/login-photo.jpg"
          alt="Workout tracking"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

    </AuthCard>
  )
}
