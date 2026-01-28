'use server'


import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { AuthUser } from '../zodSchema/authSchema'
import { AuthState } from '../type/authType'

export async function login(prevState:AuthState,formData: FormData):Promise<AuthState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const result = AuthUser.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      values: {
        email: data.email
      }
    };
  }
  const { error } = await supabase.auth.signInWithPassword(result.data)

      if(error){
        return {
         error: error.message
        }
      }


  redirect('/')
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()


  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const result = AuthUser.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      values: {
        email: data.email
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