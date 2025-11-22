import SettingsIcon from "@/assets/icons/settings-icon.svg";
import Card from "@/components/Card";
import Divider from "@/components/Divider";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <SearchInput />
        </View>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.icon}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.title}>React Native</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
        <Divider />
        <Text style={styles.title}>React </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
        <Divider />
        <Text style={styles.title}>TypeScript</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
        <Divider />
        <Text style={styles.title}>Javascript</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    marginVertical: 40,
  },
  icon: {
    marginRight: 24,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontWeight: "800",
    fontSize: 22,
    marginLeft: 24,
  },
});
