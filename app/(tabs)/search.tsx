import SearchInput from "@/components/SearchInput";
import { StyleSheet, View } from "react-native";

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
});
