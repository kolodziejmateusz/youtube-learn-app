import SearchIcon from "@/assets/icons/search-icon.svg";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchInput() {
  return (
    <View style={styles.container}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        placeholder="Search videos"
        placeholderTextColor="#B3B3B3"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    // marginTop: 50,

    flexDirection: "row",
    alignItems: "center",
    borderColor: "#2B2D42",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 12,
    gap: 5,
    backgroundColor: "white",
  },

  input: {
    fontSize: 16,
    color: "#2B2D4299",
  },
});
