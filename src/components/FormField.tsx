import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, style, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={COLORS.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.danger },
  error: { color: COLORS.danger, fontSize: 13, marginTop: SPACING.xs },
});