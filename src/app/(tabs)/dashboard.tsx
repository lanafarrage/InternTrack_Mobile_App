import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { userName } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {userName}</Text>
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