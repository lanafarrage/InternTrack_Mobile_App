import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SPACING } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../schemas/loginSchema";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function handleLogin() {
    setLoginError("");

    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }
    setErrors({});

    
    setIsLoggingIn(true);
    const success = await login(result.data.email, result.data.password);
    setIsLoggingIn(false);

    if (success) {
      router.replace("/dashboard");
    } else {
      setLoginError("Incorrect email or password.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Log in" }} />

      <View style={styles.form}>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subheading}>Log in to manage your applications.</Text>

        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="student@interntrack.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          placeholder="Your password"
          secureTextEntry
        />

        {loginError ? <Text style={styles.loginError}>{loginError}</Text> : null}

        <PrimaryButton title="Log in" onPress={handleLogin} loading={isLoggingIn} />

        <Text style={styles.link} onPress={() => router.replace("/signup")}>
          Don't have an account? Sign up
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center" },
  form: { padding: SPACING.lg },
  heading: { fontSize: 28, fontWeight: "800", color: COLORS.primary, marginBottom: SPACING.xs },
  subheading: { fontSize: 16, color: COLORS.textMuted, marginBottom: SPACING.lg },
  loginError: { color: COLORS.danger, fontSize: 14, marginBottom: SPACING.md },
  link: { textAlign: "center", color: COLORS.primary, fontWeight: "600", marginTop: SPACING.lg },
});