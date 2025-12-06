import LikesIcon from "@/assets/icons/likes-icon.svg";
import PersonIcon from "@/assets/icons/person-icon.svg";
import ViewsIcon from "@/assets/icons/views-icon.svg";
import VideoPlayer from "@/components/VideoPlayer";
import {
  COLORS,
  SPACING,
  FONTS,
  FONT_SIZES,
  DIMENSIONS,
  BORDER_RADIUS,
  LAYOUT,
} from "@/constants/theme";
import { useVideoDetails } from "@/hooks/useVideoDetails";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Video() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { video, loading } = useVideoDetails(id);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.loading} />
      </View>
    );
  }

  if (!video) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{"Video not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <VideoPlayer />
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        <View style={styles.channelRow}>
          <View style={styles.avatar}>
            <PersonIcon />
          </View>
          <Text style={styles.channelName}>{video.channelTitle}</Text>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{video.description}</Text>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ViewsIcon />
            <Text style={styles.statValue}>{video.viewCount} views</Text>
          </View>
          <View style={styles.statBox}>
            <LikesIcon />
            <Text style={styles.statValue}>{video.likeCount} likes</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    margin: LAYOUT.contentMargin,
    marginTop: SPACING.xl,
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT_SIZES.xl,
    marginBottom: SPACING.md,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xl,
  },
  avatar: {
    width: DIMENSIONS.avatarSize,
    height: DIMENSIONS.avatarSize,
    backgroundColor: COLORS.backgroundLightCard,
    borderRadius: DIMENSIONS.avatarRadius,
    marginRight: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  channelName: {
    fontFamily: FONTS.bold,
    fontSize: FONT_SIZES.lg,
    color: COLORS.text.primary,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: COLORS.text.primary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  statsRow: {
    marginTop: SPACING.md,
    flexDirection: "row",
    gap: LAYOUT.statsGap,
  },
  statBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.backgroundLightCard,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.sm,
  },
  statValue: {
    color: COLORS.primary,
    fontWeight: "500",
    fontSize: FONT_SIZES.sm,
    textAlign: "center",
  },
  errorText: {
    color: COLORS.loading,
    fontSize: FONT_SIZES.lg,
  },
});
