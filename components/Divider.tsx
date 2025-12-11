import React from "react";
import { View, StyleSheet } from "react-native";
import { SPACING } from "@/constants/theme";

export default function Divider() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    height: 3,
    backgroundColor: "#2B2D42",
    width: "100%",
    marginVertical: SPACING.lg,
  },
});
