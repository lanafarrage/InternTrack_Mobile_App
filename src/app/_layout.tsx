import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: "#1e3a8a",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  );
}