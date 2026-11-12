import { StyleSheet, Text, View } from "react-native";
import { ApplicationStatus } from "../types/application";

const BADGE_COLORS: Record<ApplicationStatus, { bg: string; text: string }> = {
  Interested: { bg: "#e0e7ff", text: "#3730a3" },
  Applied: { bg: "#dbeafe", text: "#1e40af" },
  Interview: { bg: "#fef3c7", text: "#92400e" },
  Accepted: { bg: "#dcfce7", text: "#166534" },
  Rejected: { bg: "#fee2e2", text: "#991b1b" },
};

type Props = { status: ApplicationStatus };

export default function StatusBadge({ status }: Props) {
  const colors = BADGE_COLORS[status];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  text: { fontSize: 12, fontWeight: "700" },
});