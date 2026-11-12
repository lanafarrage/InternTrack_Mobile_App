import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { Application } from "../types/application";
import StatusBadge from "./StatusBadge";

type Props = {
  application: Application;
  onPress: () => void;
};

export default function ApplicationCard({ application, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.company}>{application.company}</Text>
          <Text style={styles.position}>{application.position}</Text>
        </View>
        <StatusBadge status={application.status} />
      </View>
      <Text style={styles.meta}>
        {application.location}
        {application.deadline ? `  •  Deadline: ${application.deadline}` : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  pressed: { opacity: 0.7 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  info: { flex: 1, marginRight: SPACING.sm },
  company: { fontSize: 18, fontWeight: "700", color: COLORS.text },
  position: { fontSize: 15, color: COLORS.textMuted, marginTop: 2 },
  meta: { fontSize: 13, color: COLORS.textMuted, marginTop: SPACING.sm },
});