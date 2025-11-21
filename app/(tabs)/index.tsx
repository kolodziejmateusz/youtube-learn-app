import Button from "@/components/Button";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is search view</Text>
      <Button>Home view</Button>
    </View>
  );
}
