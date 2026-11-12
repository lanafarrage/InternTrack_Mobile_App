import { StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";

type Props = {
  label: string;
  value: number;
  accentColor?: string;
};

export default function StatCard({ label, value, accentColor = COLORS.primary }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 5,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  value: { fontSize: 28, fontWeight: "800", color: COLORS.text },
  label: { fontSize: 14, color: COLORS.textMuted, marginTop: 2 },
});