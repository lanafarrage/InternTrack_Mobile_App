import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import FilterChips from "../../components/FilterChips";
import FormField from "../../components/FormField";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, SPACING } from "../../constants/theme";
import { useApplications } from "../../context/ApplicationsContext";
import { ApplicationInput, applicationSchema } from "../../schemas/applicationSchema";
import { APPLICATION_STATUSES, ApplicationStatus } from "../../types/application";
import { showMessage } from "../../utils/dialogs";

type FormErrors = Partial<Record<keyof ApplicationInput, string>>;

export default function ApplicationForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { applications, addApplication, updateApplication, error } = useApplications();

  // If an id was passed, we are editing that application; otherwise adding a new one.
  const existing = id ? applications.find((app) => app.id === id) : undefined;
  const isEditing = existing !== undefined;

  const [company, setCompany] = useState(existing?.company ?? "");
  const [position, setPosition] = useState(existing?.position ?? "");
  const [status, setStatus] = useState<ApplicationStatus>(existing?.status ?? "Interested");
  const [location, setLocation] = useState(existing?.location ?? "");
  const [deadline, setDeadline] = useState(existing?.deadline ?? "");
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    // 1. Validate with Zod; show messages and stop if invalid.
    const result = applicationSchema.safeParse({
      company, position, status, location, deadline, notes,
    });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        company: fieldErrors.company?.[0],
        position: fieldErrors.position?.[0],
        location: fieldErrors.location?.[0],
        deadline: fieldErrors.deadline?.[0],
        notes: fieldErrors.notes?.[0],
      });
      return;
    }
    setErrors({});

    // 2. Save through the context (updates state + AsyncStorage).
    setIsSaving(true);
    const success = isEditing
      ? await updateApplication(existing.id, result.data)
      : await addApplication(result.data);
    setIsSaving(false);

    if (success) {
      showMessage(isEditing ? "Application updated" : "Application added");
      router.back();
    } else {
      showMessage("Could not save", error ?? "Please try again.");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen
        options={{ title: isEditing ? "Edit application" : "Add application" }}
      />

      <FormField label="Company" value={company} onChangeText={setCompany}
        error={errors.company} placeholder="e.g. Spotify" />
      <FormField label="Position" value={position} onChangeText={setPosition}
        error={errors.position} placeholder="e.g. Mobile Developer Intern" />
      <FormField label="Location" value={location} onChangeText={setLocation}
        error={errors.location} placeholder="e.g. Beirut or Remote" />

      <Text style={styles.label}>Status</Text>
      <FilterChips options={APPLICATION_STATUSES} selected={status} onSelect={setStatus} />

      <FormField label="Deadline (optional)" value={deadline} onChangeText={setDeadline}
        error={errors.deadline} placeholder="YYYY-MM-DD" autoCapitalize="none" />
      <FormField label="Notes (optional)" value={notes} onChangeText={setNotes}
        error={errors.notes} placeholder="Anything worth remembering"
        multiline style={{ minHeight: 90, textAlignVertical: "top" }} />

      <PrimaryButton
        title={isEditing ? "Save changes" : "Add application"}
        onPress={handleSave}
        loading={isSaving}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.text },
});