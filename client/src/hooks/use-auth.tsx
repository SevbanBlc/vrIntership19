import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User, InsertUser } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, InsertUser>;
};

type LoginData = Pick<InsertUser, "email" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return null;
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          return null;
        }

        return userData;
      } catch (err) {
        console.error("Error fetching user data:", err);
        return null;
      }
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      // First sign in with Supabase Auth
      const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw new Error(authError.message);
      if (!session) throw new Error("No session returned");

      // Then get user profile from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError) throw new Error(userError.message);
      if (!userData) throw new Error("User profile not found");

      return userData;
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["user"], user);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      window.location.href = "/";
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            age: userData.age
          }
        }
      });

      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error("No user returned from signup");

      // Then create user profile
      const { data: newUser, error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
            age: userData.age
          }
        ])
        .select()
        .single();

      if (profileError) {
        // If profile creation fails, attempt to clean up auth user
        await supabase.auth.signOut();
        throw new Error("Failed to create user profile. Please try again.");
      }

      return newUser;
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["user"], user);
      toast({
        title: "Registration Successful",
        description: "Your account has been created!",
      });
      window.location.href = "/";
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      window.location.href = "/";
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
