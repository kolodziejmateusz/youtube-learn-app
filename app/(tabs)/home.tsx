import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SearchInput />

      <Button style={styles.button} onPress={() => router.replace("/")}>
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  button: {
    marginTop: 50,
  },
});
