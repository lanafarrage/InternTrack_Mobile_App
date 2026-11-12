import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";
import { useApplications } from "../../context/ApplicationsContext";
import { confirmAction, showMessage } from "../../utils/dialogs";

export default function ApplicationDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { applications, deleteApplication, error } = useApplications();

  const application = applications.find((app) => app.id === id);

  // Briefly true right after deleting, before we navigate back.
  if (!application) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: "Application" }} />
        <Text style={styles.muted}>This application no longer exists.</Text>
      </View>
    );
  }

  function handleDelete() {
    confirmAction(
      "Delete application?",
      `This will permanently remove ${application!.company}.`,
      "Delete",
      async () => {
        const success = await deleteApplication(application!.id);
        if (success) {
          router.back();
        } else {
          showMessage("Delete failed", error ?? "Please try again.");
        }
      }
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: application.company }} />

      <View style={styles.card}>
        <Text style={styles.company}>{application.company}</Text>
        <Text style={styles.position}>{application.position}</Text>
        <StatusBadge status={application.status} />

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{application.location}</Text>

        <Text style={styles.label}>Deadline</Text>
        <Text style={styles.value}>{application.deadline || "No deadline set"}</Text>

        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>{application.notes || "No notes"}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title="Edit"
          onPress={() =>
            router.push({ pathname: "/application/form", params: { id: application.id } })
          }
        />
        <View style={{ height: SPACING.sm }} />
        <PrimaryButton title="Delete" variant="danger" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.md },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
  muted: { color: COLORS.textMuted, fontSize: 16 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  company: { fontSize: 24, fontWeight: "800", color: COLORS.text },
  position: { fontSize: 16, color: COLORS.textMuted, marginBottom: SPACING.sm },
  label: { fontSize: 13, fontWeight: "700", color: COLORS.textMuted, marginTop: SPACING.md },
  value: { fontSize: 16, color: COLORS.text, marginTop: 2 },
  actions: { marginTop: SPACING.lg },
});
