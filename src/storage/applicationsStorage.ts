import AsyncStorage from "@react-native-async-storage/async-storage";
import { Application } from "../types/application";

const keyFor = (email: string) =>
  `interntrack:applications:${email.trim().toLowerCase()}`;

// Returns null if this user has never saved anything (first login).
// Returns [] if the user saved an empty list on purpose.
export async function loadApplications(
  email: string
): Promise<Application[] | null> {
  const raw = await AsyncStorage.getItem(keyFor(email));
  if (raw === null) return null;
  return JSON.parse(raw) as Application[];
}

export async function saveApplications(
  email: string,
  applications: Application[]
): Promise<void> {
  await AsyncStorage.setItem(keyFor(email), JSON.stringify(applications));
}