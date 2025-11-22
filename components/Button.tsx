import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ children, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
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
    textAlign: "center",
  },
});
