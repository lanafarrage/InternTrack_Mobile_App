import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import ApplicationCard from "../../components/ApplicationCard";
import EmptyState from "../../components/EmptyState";
import PrimaryButton from "../../components/PrimaryButton";
import StatCard from "../../components/StatCard";
import { COLORS, SPACING } from "../../constants/theme";
import { useApplications } from "../../context/ApplicationsContext";
import { useAuth } from "../../context/AuthContext";
import { APPLICATION_STATUSES, ApplicationStatus } from "../../types/application";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Interested: "#6366f1",
  Applied: "#2563eb",
  Interview: "#d97706",
  Accepted: "#16a34a",
  Rejected: "#dc2626",
};

export default function Dashboard() {
  const router = useRouter();
  const { userName } = useAuth();
  const { applications, isLoading } = useApplications();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Everything below is derived from the same list the Applications screen uses,
  // so the numbers always match after an add, edit, or delete.
  const countFor = (status: ApplicationStatus) =>
    applications.filter((app) => app.status === status).length;

  const recent = [...applications]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hello, {userName} 👋</Text>
      <Text style={styles.subtitle}>Here is your internship overview.</Text>

      <View style={styles.grid}>
        <StatCard label="Total" value={applications.length} />
        {APPLICATION_STATUSES.map((status) => (
          <StatCard
            key={status}
            label={status}
            value={countFor(status)}
            accentColor={STATUS_COLORS[status]}
          />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently added</Text>
        {applications.length > 0 ? (
          <Text style={styles.link} onPress={() => router.push("/applications")}>
            See all
          </Text>
        ) : null}
      </View>

      {recent.length === 0 ? (
        <EmptyState
          title="No applications yet"
          message="Add your first internship application to start tracking."
        />
      ) : (
        recent.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onPress={() =>
              router.push({ pathname: "/application/[id]", params: { id: app.id } })
            }
          />
        ))
      )}

      <PrimaryButton
        title="+ Add application"
        onPress={() => router.push("/application/form")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
  greeting: { fontSize: 26, fontWeight: "800", color: COLORS.primary },
  subtitle: { fontSize: 15, color: COLORS.textMuted, marginBottom: SPACING.lg },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  link: { fontSize: 14, fontWeight: "600", color: COLORS.primary },
});