import Card from "@/components/Card";
import SearchInput from "@/components/SearchInput";
import SortModal, { SortOption } from "@/components/SortModal";
import { COLORS, SPACING, FONTS, FONT_SIZES, LAYOUT } from "@/constants/theme";
import { useYoutubeSearch } from "@/hooks/useYoutubeSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { formatDate } from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();
  const { query: initialQuery } = useLocalSearchParams();
  const { results, totalResults, loading, search } = useYoutubeSearch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [modalVisible, setModalVisible] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initialQuery && typeof initialQuery === "string") {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [debouncedQuery]);

  const performSearch = async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    await search(query, 10, abortControllerRef.current.signal);
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
        return t("sortModal.options.latest");
      case "oldest":
        return t("sortModal.options.oldest");
      case "popular":
        return t("sortModal.options.popular");
    }
  };

  const sortedResults = getSortedResults();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onSearch={setSearchQuery} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {results.length > 0 && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {t("search.resultsFound", { count: totalResults })}{" "}
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
                {t("search.sortBy")}{" "}
                <Text style={styles.resultsTextBold}>{getSortLabel()}</Text>
              </Text>
            </Pressable>
          </View>
        )}

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={COLORS.loading} />
          </View>
        )}

        {!loading && results.length === 0 && !searchQuery && (
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderText}>
              {t("search.placeholder")}
            </Text>
          </View>
        )}

        {!loading && sortedResults.length > 0 && (
          <>
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
          </>
        )}
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
    backgroundColor: COLORS.light,
  },
  searchContainer: {
    marginTop: LAYOUT.topMargin,
    marginBottom: LAYOUT.bottomMargin,
  },
  resultsHeader: {
    paddingHorizontal: SPACING.xxxl,
  },
  resultsText: {
    fontFamily: FONTS.regular,
    color: COLORS.text.primary,
    fontSize: FONT_SIZES.xs,
  },
  resultsTextBold: {
    fontFamily: FONTS.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  placeholderText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    textAlign: "center",
  },
  sortByContainer: {
    marginTop: SPACING.sm,
    alignItems: "flex-end",
    paddingVertical: SPACING.md,
  },
});
