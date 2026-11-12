import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { mockApplications } from "../data/mockApplications";
import { ApplicationInput } from "../schemas/applicationSchema";
import {
    loadApplications,
    saveApplications,
} from "../storage/applicationsStorage";
import { Application } from "../types/application";
  
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
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    // Runs once when the app starts: restore saved data, or seed the mock data.
    useEffect(() => {
      async function restore() {
        try {
          const saved = await loadApplications();
          if (saved === null) {
            // First launch: nothing stored yet, so use the mock data.
            await saveApplications(mockApplications);
            setApplications(mockApplications);
          } else {
            // Could be [] if the user deleted everything: that is respected.
            setApplications(saved);
          }
        } catch {
          setError("Could not load your applications.");
        } finally {
          setIsLoading(false);
        }
      }
      restore();
    }, []);
  
    // Saves first, and only updates state if saving worked,
    // so what you see on screen always matches what is stored.
    async function persist(next: Application[]): Promise<boolean> {
      try {
        await saveApplications(next);
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
  
  // Custom hook: screens call useApplications() to get the data and functions.
  export function useApplications() {
    const context = useContext(ApplicationsContext);
    if (context === null) {
      throw new Error("useApplications must be used inside ApplicationsProvider");
    }
    return context;
  }