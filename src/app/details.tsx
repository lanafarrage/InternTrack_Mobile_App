import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: String(params.name ?? 'Details'),
          headerStyle: { backgroundColor: 'lightblue' },
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ name: 'Updated' });
        }}>
        Update the title
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
