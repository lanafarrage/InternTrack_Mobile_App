import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { useApplications } from "../../context/ApplicationsContext";

export default function Applications() {
  const { applications } = useApplications();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{applications.length} applications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  text: { fontSize: 20, color: COLORS.text },
});