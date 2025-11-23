import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CardProps {
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export default function Card({ title, thumbnailUrl, publishedAt }: CardProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: thumbnailUrl,
        }}
      />
      <Text style={styles.text} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.date}>{publishedAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginVertical: 24,
    width: 180,
  },
  logo: {
    width: 180,
    height: 100,
    borderRadius: 12,
  },
  text: {
    width: 180,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    marginTop: 8,
  },
  date: {
    color: "#2B2D42",
    fontSize: 13,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});
