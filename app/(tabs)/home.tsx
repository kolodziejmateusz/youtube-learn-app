import SettingsIcon from "@/assets/icons/settings-icon.svg";
import Button from "@/components/Button";

import SearchInput from "@/components/SearchInput";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <SearchInput />
        </View>
        <SettingsIcon style={styles.icon} />
      </View>
      <Button style={styles.button} onPress={() => router.replace("/")}>
        Back
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  icon: {
    marginRight: 24,
  },
  button: {
    marginTop: 50,
  },
});
