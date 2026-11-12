
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://www.haigazian.edu.lb/wp-content/uploads/2018/11/HU-LOGO-Without-Background.png" }}
    />
  );
}

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <Button
              onPress={() => setCount(c => c + 1)}
              title="Update count"
            />
          ),
        }}
      />

      <View style={styles.container}>
        <Text>Welcome to mobile</Text>
        <Text>Count: {count}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 70,
  },
});
