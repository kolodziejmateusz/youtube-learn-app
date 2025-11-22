import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Image, Linking, StyleSheet, Text, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("@/assets/icons/logo.png")} />
      </View>
      <View style={styles.icon}>
        <Image source={require("@/assets/icons/app-icon.png")} />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.welcomeText}>
          Welcome to the best YouTube-based learning application.{" "}
        </Text>
        <Button onPress={() => router.replace("/home")}>Log in as guest</Button>
        <Text style={styles.policyText}>
          By continuing you agree with
          <Text
            style={styles.policyLink}
            onPress={() =>
              Linking.openURL(
                "https://github.com/kolodziejmateusz/youtube-learn-app"
              )
            }
          >
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text
            style={styles.policyLink}
            onPress={() =>
              Linking.openURL("https://github.com/kolodziejmateusz/")
            }
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#8D99AE",
  },
  logo: {
    marginTop: 100,
    alignItems: "center",
  },
  icon: {
    alignItems: "center",
  },
  bottom: {
    marginBottom: 80,
    marginHorizontal: 30,
    gap: 25,
  },
  welcomeText: {
    fontSize: 19,
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    color: "white",
  },
  policyText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  policyLink: {
    color: "#2B2D42",
    textDecorationLine: "underline",
  },
});
