import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MOCK_USER } from "../constants/mockUser";
import { mockApplications } from "../data/mockApplications";
import { ApplicationInput } from "../schemas/applicationSchema";
import {
  loadApplications,
  saveApplications,
} from "../storage/applicationsStorage";
import { Application } from "../types/application";
import { useAuth } from "./AuthContext";

type ApplicationsContextType = {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  addApplication: (input: ApplicationInput) => Promise<boolean>;
  updateApplication: (id: string, input: ApplicationInput) => Promise<boolean>;
  deleteApplication: (id: string) => Promise<boolean>;
};

const ApplicationsContext = createContext<ApplicationsContextType | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const email = user?.email ?? null;

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Runs whenever the logged-in user changes: restore that user's saved data.
  useEffect(() => {
    if (email === null) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function restore(userEmail: string) {
      setIsLoading(true);
      setError(null);
      try {
        const saved = await loadApplications(userEmail);
        if (cancelled) return;

        if (saved === null) {
          // First login for this account: demo user gets mock data, others start empty.
          const initial =
            userEmail.toLowerCase() === MOCK_USER.email.toLowerCase()
              ? mockApplications
              : [];
          await saveApplications(userEmail, initial);
          if (!cancelled) setApplications(initial);
        } else {
          // Could be [] if the user deleted everything: that is respected.
          setApplications(saved);
        }
      } catch {
        if (!cancelled) setError("Could not load your applications.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    restore(email);
    return () => {
      cancelled = true;
    };
  }, [email]);

  // Saves first, and only updates state if saving worked,
  // so what you see on screen always matches what is stored.
  async function persist(next: Application[]): Promise<boolean> {
    if (email === null) return false;
    try {
      await saveApplications(email, next);
      setApplications(next);
      setError(null);
      return true;
    } catch {
      setError("Could not save your changes. Please try again.");
      return false;
    }
  }

  async function addApplication(input: ApplicationInput) {
    const newApplication: Application = {
      ...input,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    return persist([newApplication, ...applications]);
  }

  async function updateApplication(id: string, input: ApplicationInput) {
    const next = applications.map((app) =>
      app.id === id ? { ...app, ...input } : app
    );
    return persist(next);
  }

  async function deleteApplication(id: string) {
    return persist(applications.filter((app) => app.id !== id));
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        isLoading,
        error,
        clearError: () => setError(null),
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (context === null) {
    throw new Error("useApplications must be used inside ApplicationsProvider");
  }
  return context;
}