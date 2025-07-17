// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

// Define the User type
type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

// Define the context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  const value = {
    user: session?.user || null,
    loading: status === "loading",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
