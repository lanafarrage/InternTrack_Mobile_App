import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { COLORS } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/"); // back to Welcome; no way to go "back" into the app
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        headerStyle: { backgroundColor: COLORS.card },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontWeight: "bold" },
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 16 }}>
            <Text style={{ color: COLORS.danger, fontWeight: "600" }}>Log out</Text>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={focused ? COLORS.primary : COLORS.textMuted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          title: "Applications",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="briefcase-outline"
              size={size}
              color={focused ? COLORS.primary : COLORS.textMuted}
            />
          ),
        }}
      />
    </Tabs>
  );
}