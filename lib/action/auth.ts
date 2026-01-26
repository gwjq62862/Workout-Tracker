'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { SignupUser } from '../zodSchema/auth'
import { AuthState } from '../type/authType'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(prevState:AuthState,formData: FormData) :Promise<AuthState> {
  const supabase = await createClient()


  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const result = SignupUser.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      values:{
        email:data.email
      }
    };
  }


  const { error } = await supabase.auth.signUp(result.data)

  if (error) {
    return {
      error: error.message,
    };
  }



  redirect('/')
}