import Card from "@/components/Card";
import SearchInput from "@/components/SearchInput";
import SortModal, { SortOption } from "@/components/SortModal";
import { COLORS, SPACING, FONTS, FONT_SIZES, LAYOUT } from "@/constants/theme";
import { useYoutubeSearch } from "@/hooks/useYoutubeSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { formatDate } from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { VideoItem } from "@/types/VideoItem";

export default function Search() {
  const { t } = useTranslation();
  const { query: initialQuery } = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [modalVisible, setModalVisible] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useYoutubeSearch({
    query: debouncedQuery,
    maxResults: 30,
    enabled: debouncedQuery.trim().length > 0,
  });

  useEffect(() => {
    if (initialQuery && typeof initialQuery === "string") {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const allResults = useMemo(() => {
    if (!data?.pages) return [];

    const allVideos = data.pages.flatMap((page) => page.items || []);

    const videoMap = new Map<string, VideoItem>();

    allVideos.forEach((video) => {
      const videoId = video.id.videoId;
      if (!videoMap.has(videoId)) {
        videoMap.set(videoId, video);
      }
    });

    return Array.from(videoMap.values());
  }, [data]);

  const totalResults = data?.pages?.[0]?.pageInfo?.totalResults || 0;

  const getSortedResults = () => {
    const sorted = [...allResults];

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({ item }: { item: VideoItem }) => (
    <Card
      key={item.id.videoId}
      id={item.id.videoId}
      title={item.snippet.title}
      thumbnailUrl={item.snippet.thumbnails.high.url}
      publishedAt={formatDate(item.snippet.publishedAt)}
      channelTitle={item.snippet.channelTitle}
      variant="full"
    />
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.loading} />
      </View>
    );
  };

  const renderHeader = () => {
    if (sortedResults.length === 0) return null;

    return (
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
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.loading} />
        </View>
      );
    }

    if (!searchQuery.trim()) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.placeholderText}>{t("search.placeholder")}</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.placeholderText}>{t("search.error")}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onSearch={setSearchQuery} />
      </View>

      <FlatList
        data={sortedResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.videoId}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          sortedResults.length === 0 && styles.emptyListContent
        }
      />

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
  footerLoader: {
    paddingVertical: SPACING.xl,
    alignItems: "center",
  },
  emptyListContent: {
    flexGrow: 1,
  },
});
