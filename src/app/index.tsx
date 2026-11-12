import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SPACING } from "../constants/theme";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.hero}>
        <Text style={styles.logo}>InternTrack</Text>
        <Text style={styles.tagline}>Your Internship Journey, Organized.</Text>
        <Text style={styles.description}>
          Keep every internship application, deadline, and status in one place.
        </Text>
      </View>

      <PrimaryButton title="Get Started" onPress={() => router.push("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: "space-between",
  },
  hero: { flex: 1, justifyContent: "center" },
  logo: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  description: { fontSize: 16, color: COLORS.textMuted, lineHeight: 24 },
});