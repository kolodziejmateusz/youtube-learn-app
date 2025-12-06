import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, FONT_SIZES, LAYOUT } from "@/constants/theme";

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
    backgroundColor: COLORS.backgroundLight,
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
    marginHorizontal: LAYOUT.contentMargin,
    gap: 25,
  },
  welcomeText: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.bold,
    fontWeight: "bold",
    color: COLORS.text.white,
  },
  policyText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.sm,
    textAlign: "center",
    fontFamily: FONTS.regular,
  },
  policyLink: {
    color: COLORS.text.primary,
    textDecorationLine: "underline",
  },
});
