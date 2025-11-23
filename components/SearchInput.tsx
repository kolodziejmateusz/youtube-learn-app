import SearchIcon from "@/assets/icons/search-icon.svg";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchInputProps {
  onSearch?: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        placeholder="Search videos"
        placeholderTextColor="#B3B3B3"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
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
