import AsyncStorage from "@react-native-async-storage/async-storage";

export type StoredUser = {
  name: string;
  email: string;
  password: string; 
};

const USERS_KEY = "interntrack:users";

export async function loadUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw === null ? [] : (JSON.parse(raw) as StoredUser[]);
}

export async function saveUsers(users: StoredUser[]): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}