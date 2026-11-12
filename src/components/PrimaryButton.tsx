import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        (pressed || disabled) && styles.dimmed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" ? COLORS.primary : "#fff"} />
      ) : (
        <Text style={[styles.text, variant === "secondary" && styles.secondaryText]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: { backgroundColor: COLORS.primary },
  secondary: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  danger: { backgroundColor: COLORS.danger },
  dimmed: { opacity: 0.6 },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryText: { color: COLORS.primary },
});