import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SPACING } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { signupSchema } from "../schemas/signupSchema";

type Errors = { name?: string; email?: string; password?: string; confirmPassword?: string };

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSignup() {
    setFormError("");

    const result = signupSchema.safeParse({ name, email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }
    setErrors({});

    setIsSaving(true);
    const message = await signup(result.data.name, result.data.email, result.data.password);
    setIsSaving(false);

    if (message === null) {
      router.replace("/dashboard");
    } else {
      setFormError(message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Create account" }} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>Start tracking your internships.</Text>

        <FormField label="Name" value={name} onChangeText={setName}
          error={errors.name} placeholder="Your name" />
        <FormField label="Email" value={email} onChangeText={setEmail}
          error={errors.email} placeholder="you@example.com"
          autoCapitalize="none" keyboardType="email-address" />
        <FormField label="Password" value={password} onChangeText={setPassword}
          error={errors.password} placeholder="At least 6 characters" secureTextEntry />
        <FormField label="Confirm password" value={confirmPassword}
          onChangeText={setConfirmPassword} error={errors.confirmPassword}
          placeholder="Repeat your password" secureTextEntry />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <PrimaryButton title="Sign up" onPress={handleSignup} loading={isSaving} />

        <Text style={styles.link} onPress={() => router.replace("/login")}>
          Already have an account? Log in
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  heading: { fontSize: 28, fontWeight: "800", color: COLORS.primary, marginBottom: SPACING.xs },
  subheading: { fontSize: 16, color: COLORS.textMuted, marginBottom: SPACING.lg },
  formError: { color: COLORS.danger, fontSize: 14, marginBottom: SPACING.md },
  link: { textAlign: "center", color: COLORS.primary, fontWeight: "600", marginTop: SPACING.lg },
});