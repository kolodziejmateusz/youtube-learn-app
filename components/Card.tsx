import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  SPACING,
  FONTS,
  FONT_SIZES,
  DIMENSIONS,
  BORDER_RADIUS,
} from "@/constants/theme";

type CardProps = {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle?: string;
  publishedAt: string;
  variant?: "horizontal" | "full";
};

export default function Card({
  id,
  title,
  thumbnailUrl,
  publishedAt,
  channelTitle,
  variant = "horizontal",
}: CardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/video/[id]",
      params: { id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[styles.container, variant === "full" && styles.containerFull]}
      >
        <Image
          style={[styles.logo, variant === "full" && styles.logoFull]}
          source={{
            uri: thumbnailUrl,
          }}
        />
        <View style={styles.textContainer}>
          {channelTitle && (
            <Text style={styles.channelTitle}>{channelTitle}</Text>
          )}
          <Text
            style={[styles.text, variant === "full" && styles.textFull]}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text style={styles.date}>{publishedAt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: SPACING.xxxl,
    marginVertical: SPACING.xxxl,
    width: DIMENSIONS.cardWidth,
  },
  containerFull: {
    width: "auto",
    marginHorizontal: SPACING.xxxl,
  },
  logo: {
    width: DIMENSIONS.cardWidth,
    height: DIMENSIONS.cardHeight,
    borderRadius: BORDER_RADIUS.card,
  },
  logoFull: {
    width: "100%",
    height: DIMENSIONS.cardHeightFull,
  },
  textContainer: {
    marginTop: SPACING.md,
  },
  text: {
    width: DIMENSIONS.cardWidth,
    fontFamily: FONTS.regular,
    fontWeight: "600",
  },
  textFull: {
    width: "100%",
  },
  date: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZES.sm,
    alignSelf: "flex-end",
    marginTop: SPACING.sm,
  },
  channelTitle: {
    fontFamily: FONTS.bold,
  },
});
