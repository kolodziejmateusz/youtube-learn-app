import Button from "@/components/Button";
import { Text, View } from "react-native";

export default function Search() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is search view</Text>
      <Button>I am not working</Button>
    </View>
  );
}
