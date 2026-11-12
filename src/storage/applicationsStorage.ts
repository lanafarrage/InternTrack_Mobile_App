import AsyncStorage from "@react-native-async-storage/async-storage";
import { Application } from "../types/application";

const STORAGE_KEY = "interntrack:applications";

// Returns null if nothing has ever been saved (first launch).
// Returns [] if the user saved an empty list on purpose.
export async function loadApplications(): Promise<Application[] | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  return JSON.parse(raw) as Application[];
}

export async function saveApplications(
  applications: Application[]
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}