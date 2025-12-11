import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from "@/constants/theme";

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
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.card,
    paddingVertical: SPACING.xl,
    paddingHorizontal: 100,
  },
  text: {
    color: COLORS.light,
    fontWeight: "600",
    fontSize: FONT_SIZES.lg,
    textAlign: "center",
  },
});
