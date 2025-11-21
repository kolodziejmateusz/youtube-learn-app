import Button from "@/components/Button";
import React from "react";
import { Text, View } from "react-native";

export default function search() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is search view</Text>
      <Button>Search view</Button>
    </View>
  );
}
