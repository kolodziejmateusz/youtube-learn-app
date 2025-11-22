import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <Text>This is search view</Text>
      <Button onPress={() => router.replace("/home")}>Log in as guest</Button>
    </View>
  );
}
