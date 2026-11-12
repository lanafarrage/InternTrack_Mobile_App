import { createContext, ReactNode, useContext, useState } from "react";
import { MOCK_USER } from "../constants/mockUser";

type AuthContextType = {
  isLoggedIn: boolean;
  userName: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Compares the entered values against the predefined mock credentials.
  function login(email: string, password: string): boolean {
    const emailMatches =
      email.trim().toLowerCase() === MOCK_USER.email.toLowerCase();
    const passwordMatches = password === MOCK_USER.password;

    if (emailMatches && passwordMatches) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userName: MOCK_USER.name, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}