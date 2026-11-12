import { StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import PrimaryButton from "./PrimaryButton";

type Props = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <PrimaryButton title={actionLabel} onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: SPACING.xl },
  title: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: SPACING.xs },
  message: { fontSize: 15, color: COLORS.textMuted, textAlign: "center", marginBottom: SPACING.md },
});
