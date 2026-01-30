'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import Link from "next/link"
import { AuthCard } from "@/components/auth/authCard"

import { useActionState, useState } from "react"
import { AuthState } from "@/lib/type/authType"
import { signup } from "@/lib/action/auth"


export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(signup, null);
  return (
    <AuthCard>

      {/* LEFT — FORM */}
      <form action={formAction} className="flex flex-col justify-center gap-6 p-6 md:p-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Register Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Track every workout and improve consistently
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
              defaultValue={state?.values?.email ?? ""}
              name="email"
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
          { isPending ? "creating account...":"create account"}
          </Button>
        </FieldGroup>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </p>
      </form>

      

    </AuthCard>
  )
}
