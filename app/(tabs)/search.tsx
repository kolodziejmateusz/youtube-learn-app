import Card from "@/components/Card";
import SearchInput from "@/components/SearchInput";
import { VideoItem } from "@/types/VideoItem";
import { formatDate } from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const MAX_RESULTS = 10;

export default function Search() {
  const { query: initialQuery } = useLocalSearchParams();
  useEffect(() => {
    if (initialQuery && typeof initialQuery === "string") {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const [searchResults, setSearchResults] = useState<VideoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      return;
    }

    try {
      const url = `http://192.168.55.105:3000/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        query
      )}&key=${YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`;

      const response = await fetch(url);
      const data = await response.json();

      setSearchResults(data.items || []);
      setTotalResults(data.pageInfo?.totalResults || 0);
    } catch (error) {
      console.error("Error fetching:", error);
      setSearchResults([]);
      setTotalResults(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onSearch={handleSearch} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {searchResults.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {totalResults} results found for:{" "}
              <Text style={styles.resultsTextBold}>
                {'"'}
                {searchQuery}
                {'"'}
              </Text>
            </Text>
            <View style={styles.sortByContainer}>
              <Text style={styles.resultsText}>
                Sort By:{" "}
                <Text style={styles.resultsTextBold}>Most popular</Text>
              </Text>
            </View>
          </View>
        )}

        {searchResults.length === 0 && !searchQuery && (
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderText}>
              Enter name to search video
            </Text>
          </View>
        )}

        {searchResults.map((video) => (
          <Card
            key={video.id.videoId}
            id={video.id.videoId}
            title={video.snippet.title}
            thumbnailUrl={video.snippet.thumbnails.high.url}
            publishedAt={formatDate(video.snippet.publishedAt)}
            channelTitle={video.snippet.channelTitle}
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
    marginTop: 60,
    marginBottom: 25,
  },
  resultsHeader: {
    paddingHorizontal: 24,
  },
  resultsText: {
    fontFamily: "Poppins-Regular",
    color: "#2B2D42",
    fontSize: 10,
  },
  resultsTextBold: {
    fontFamily: "Poppins-Bold",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  placeholderText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
  sortByContainer: {
    marginTop: 2,
    alignItems: "flex-end",
  },
});
