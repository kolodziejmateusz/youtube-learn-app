import Card from "@/components/Card";
import SearchInput from "@/components/SearchInput";
import { VideoItem } from "@/types/VideoItem";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const MAX_RESULTS = 10;

export default function Search() {
  const [searchResults, setSearchResults] = useState<VideoItem[]>([]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const url = `http://192.168.55.105:3000/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        query
      )}&key=${YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`;
      const response = await fetch(url);
      const data = await response.json();

      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error fetching:", error);
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onSearch={handleSearch} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {searchResults.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderText}>
              Enter name to search video
            </Text>
          </View>
        )}

        {searchResults.map((video) => (
          <Card
            key={video.id.videoId}
            title={video.snippet.title}
            thumbnailUrl={video.snippet.thumbnails.high.url}
            publishedAt={formatDate(video.snippet.publishedAt)}
            variant="full"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    marginVertical: 40,
    marginHorizontal: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  placeholderText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
});
