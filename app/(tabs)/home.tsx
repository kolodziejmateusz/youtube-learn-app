import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontFamily: "Poppins-Regular" }}>This is Home view</Text>
      <Button onPress={() => router.replace("/")}>Back</Button>
    </View>
  );
}
