import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function Card() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://i.ytimg.com/vi/gvkqT_Uoahw/maxresdefault.jpg",
        }}
      />
      <Text>Super fajny film o react</Text>
      <Text>18.10.2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  logo: {
    width: 180,
    height: 130,
    borderRadius: 12
  },
});
