import SettingsIcon from "@/assets/icons/settings-icon.svg";
import Card from "@/components/Card";
import Divider from "@/components/Divider";
import SearchInput from "@/components/SearchInput";
import { VideoItem } from "@/types/VideoItem";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Category = {
  name: string;
  query: string;
  videos: VideoItem[];
};

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([
    { name: "React Native", query: "React Native", videos: [] },
    { name: "React", query: "React.js", videos: [] },
    { name: "TypeScript", query: "TypeScript", videos: [] },
    { name: "Javascript", query: "Javascript", videos: [] },
  ]);

  const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
  const MAX_RESULTS = 4;

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    const updatedCategories = await Promise.all(
      categories.map((category) => fetchVideos(category))
    );
    setCategories(updatedCategories);
  };

  const fetchVideos = async (category: Category): Promise<Category> => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        category.query
      )}&key=${YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`;

      const response = await fetch(url);
      const data = await response.json();

      return {
        ...category,
        videos: data.items || [],
      };
    } catch (error) {
      console.error(`Error fetching ${category.name}:`, error);
      return {
        ...category,
        videos: [],
      };
    }
  };

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
