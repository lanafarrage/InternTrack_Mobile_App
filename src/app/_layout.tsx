import { Stack } from "expo-router";
import { ApplicationsProvider } from "../context/ApplicationsContext";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <ApplicationsProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: "#1e3a8a",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ApplicationsProvider>
    </AuthProvider>
  );
}