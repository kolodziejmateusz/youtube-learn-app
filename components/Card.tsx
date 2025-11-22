import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Card() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://i.ytimg.com/vi/gvkqT_Uoahw/maxresdefault.jpg",
        }}
      />
      <Text style={styles.text}>
        Super fajny film o react Super fajny film o react
      </Text>
      <Text style={styles.date}>18.10.2025</Text>
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
    height: 130,
    borderRadius: 12,
  },
  text: {
    width: 180,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
  date: {
    color: "#2B2D42",
    fontSize: 13,
    alignSelf: "flex-end",
  },
});
