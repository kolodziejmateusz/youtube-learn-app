import Card from "@/components/Card";
import SearchInput from "@/components/SearchInput";
import SortModal, { SortOption } from "@/components/SortModal";
import { useYoutubeSearch } from "@/hooks/useYoutubeSearch";
import { formatDate } from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Search() {
  const { query: initialQuery } = useLocalSearchParams();
  const { results, totalResults, loading, search } = useYoutubeSearch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (initialQuery && typeof initialQuery === "string") {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await search(query);
  };

  const getSortedResults = () => {
    const sorted = [...results];

    if (sortOption === "latest") {
      return sorted.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );
    }

    if (sortOption === "oldest") {
      return sorted.sort(
        (a, b) =>
          new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()
      );
    }

    return sorted;
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case "latest":
        return "Upload date: latest";
      case "oldest":
        return "Upload date: oldest";
      case "popular":
        return "Most popular";
    }
  };

  const sortedResults = getSortedResults();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onSearch={handleSearch} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {results.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {totalResults} results found for:{" "}
              <Text style={styles.resultsTextBold}>
                {'"'}
                {searchQuery}
                {'"'}
              </Text>
            </Text>
            <Pressable
              style={styles.sortByContainer}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.resultsText}>
                Sort By:{" "}
                <Text style={styles.resultsTextBold}>{getSortLabel()}</Text>
              </Text>
            </Pressable>
          </View>
        )}

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2B8AC2" />
          </View>
        )}

        {results.length === 0 && !searchQuery && !loading && (
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderText}>
              Enter name to search video
            </Text>
          </View>
        )}

        {sortedResults.map((video) => (
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

      <SortModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSortSelect={setSortOption}
        selectedSort={sortOption}
      />
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
    paddingVertical: 8,
  },
});
