import SettingsIcon from "@/assets/icons/settings-icon.svg";
import Card from "@/components/Card";
import Divider from "@/components/Divider";
import SearchInput from "@/components/SearchInput";
import { useCategories } from "@/hooks/useCategories";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "expo-router";
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

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2B8AC2" />
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
          onPress={() => router.replace("/")}
          style={styles.icon}
        >
          <SettingsIcon />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={index}>
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
                <Text style={styles.showMore}>Show more</Text>
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
    marginTop: 60,
    marginBottom: 25,
  },
  inputContainer: {
    flex: 1,
  },
  icon: {
    marginRight: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontWeight: "800",
    fontSize: 22,
    marginLeft: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  showMore: {
    textDecorationLine: "underline",
  },
});
