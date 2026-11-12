import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

type Props<T extends string> = {
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function FilterChips<T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexGrow: 0, marginVertical: SPACING.md },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  textActive: { color: "#fff" },
});