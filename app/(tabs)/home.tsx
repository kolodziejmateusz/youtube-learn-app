import SettingsIcon from "@/assets/icons/settings-icon.svg";
import Card from "@/components/Card";
import Divider from "@/components/Divider";
import SearchInput from "@/components/SearchInput";
import { COLORS, SPACING, FONTS, LAYOUT, FONT_SIZES } from "@/constants/theme";
import { useCategories } from "@/hooks/useCategories";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const { categories, loading } = useCategories();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "pl" ? "en" : "pl";
    i18n.changeLanguage(newLang);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.loading} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.replace("/search")}
          style={styles.inputContainer}
        >
          <SearchInput disableInput />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={toggleLanguage} 
          style={styles.icon}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={category.query}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{category.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/search",
                    params: { query: category.query },
                  })
                }
              >
                <Text style={styles.showMore}>{t("showMore")}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {category.videos.map((video) => (
                <Card
                  key={video.id.videoId}
                  id={video.id.videoId}
                  title={video.snippet.title}
                  thumbnailUrl={video.snippet.thumbnails.high.url}
                  publishedAt={formatDate(video.snippet.publishedAt)}
                />
              ))}
            </ScrollView>
            {index < categories.length - 1 && <Divider />}
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: LAYOUT.topMargin,
    marginBottom: LAYOUT.bottomMargin,
  },
  inputContainer: {
    flex: 1,
  },
  icon: {
    marginRight: SPACING.xxxl,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.xxxl,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FONTS.bold,
    fontWeight: "800",
    fontSize: FONT_SIZES.xl,
    marginLeft: SPACING.xxxl,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  showMore: {
    textDecorationLine: "underline",
  },
});
