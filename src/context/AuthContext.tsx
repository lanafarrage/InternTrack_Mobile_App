import { createContext, ReactNode, useContext, useState } from "react";
import { MOCK_USER } from "../constants/mockUser";
import { loadUsers, saveUsers } from "../storage/usersStorage";

type User = { name: string; email: string };

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  userName: string;
  login: (email: string, password: string) => Promise<boolean>;
 
  signup: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();


    if (
      normalizedEmail === MOCK_USER.email.toLowerCase() &&
      password === MOCK_USER.password
    ) {
      setUser({ name: MOCK_USER.name, email: MOCK_USER.email });
      return true;
    }

    
    try {
      const users = await loadUsers();
      const match = users.find(
        (u) => u.email === normalizedEmail && u.password === password
      );
      if (match) {
        setUser({ name: match.name, email: match.email });
        return true;
      }
    } catch {
      
    }
    return false;
  }

  async function signup(
    name: string,
    email: string,
    password: string
  ): Promise<string | null> {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const users = await loadUsers();
      const taken =
        normalizedEmail === MOCK_USER.email.toLowerCase() ||
        users.some((u) => u.email === normalizedEmail);
      if (taken) return "An account with this email already exists.";

      const newUser = { name: name.trim(), email: normalizedEmail, password };
      await saveUsers([...users, newUser]);
      setUser({ name: newUser.name, email: newUser.email });
      return null;
    } catch {
      return "Could not create your account. Please try again.";
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: user !== null,
        user,
        userName: user?.name ?? "",
        login,
        signup,
        logout,
      }}
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