import SearchIcon from "@/assets/icons/search-icon.svg";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface SearchInputProps {
  onSearch?: (query: string) => void;
  disableInput?: boolean;
}

export default function SearchInput({
  onSearch,
  disableInput,
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <SearchIcon />
      {!disableInput ? (
        <TextInput
          style={styles.input}
          placeholder="Search videos"
          placeholderTextColor="#B3B3B3"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      ) : (
        <Text style={styles.disabledText}>Search videos</Text>
      )}
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

  disabledText: {
    fontSize: 16,
    color: "#2B2D4299",
    flex: 1,
    lineHeight: 24,
    height: 44,
    textAlignVertical: "center",
  },
});
