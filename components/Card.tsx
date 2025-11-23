import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type CardProps = {
  title: string;
  thumbnailUrl: string;
  channelTitle?: string;
  publishedAt: string;
  variant?: "horizontal" | "full";
};

export default function Card({
  title,
  thumbnailUrl,
  publishedAt,
  channelTitle,
  variant = "horizontal",
}: CardProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginVertical: 24,
    width: 180,
  },

  containerFull: {
    width: "auto",
    marginHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 100,
    borderRadius: 12,
  },
  logoFull: {
    width: "100%",
    height: 185,
  },
  textContainer: {
    marginTop: 8,
  },
  text: {
    width: 180,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  textFull: {
    width: "100%",
  },
  date: {
    color: "#2B2D42",
    fontSize: 13,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  channelTitle: {
    fontFamily: "Poppins-Bold",
  },
});
