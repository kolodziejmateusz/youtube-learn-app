import LikesIcon from "@/assets/icons/likes-icon.svg";
import PersonIcon from "@/assets/icons/person-icon.svg";
import ViewsIcon from "@/assets/icons/views-icon.svg";
import VideoPlayer from "@/components/VideoPlayer";
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
        <ActivityIndicator size="large" color="#2B8AC2" />
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
    margin: 30,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 8,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#acebf5ff",
    borderRadius: 35,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  channelName: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#21233A",
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#21233A",
    marginTop: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  statsRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 16,
  },
  statBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#acebf5ff",
    borderRadius: 12,
    padding: 7,
  },
  statValue: {
    color: "black",
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
