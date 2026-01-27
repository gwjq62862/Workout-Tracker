// providers/auth-provider.tsx
"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createClient } from "../supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null; // 3. Use the User type here
}
const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [user, setUser] = useState(initialUser);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
