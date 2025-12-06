import SearchIcon from "@/assets/icons/search-icon.svg";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  DIMENSIONS,
  BORDER_RADIUS,
} from "@/constants/theme";

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
          placeholderTextColor={COLORS.text.primary}
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
    marginHorizontal: SPACING.xxxl,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.light,
    height: DIMENSIONS.searchInputHeight,
  },
  input: {
    flex: 1,
    height: DIMENSIONS.searchInputHeight,
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.primary,
    paddingVertical: 0,
    textAlignVertical: "center",
    margin: 0,
    padding: SPACING.md,
  },
  disabledText: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.primary,
    height: DIMENSIONS.searchInputHeight,
    lineHeight: 22,
    textAlignVertical: "center",
    padding: SPACING.md,
    margin: 0,
  },
});
