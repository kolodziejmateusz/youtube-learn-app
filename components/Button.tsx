import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
};

export default function Button({ children, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2B2D42",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 100,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
