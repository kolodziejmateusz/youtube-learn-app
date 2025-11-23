import LikesIcon from "@/assets/icons/likes-icon.svg";
import PersonIcon from "@/assets/icons/person-icon.svg";
import ViewsIcon from "@/assets/icons/views-icon.svg";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type VideoDetails = {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  viewCount: string;
  likeCount: string;
  thumbnailUrl: string;
  publishedAt: string;
};

export default function Video() {
  //   const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [video, setVideo] = useState<VideoDetails | null>(null);

  const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    if (id) {
      fetchVideoDetails(id);
    }
  }, [id]);

  const fetchVideoDetails = async (videoId: string) => {
    try {
      const url = `http://192.168.55.105:3000/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      const item = data.items[0];
      const snippet = item.snippet;
      const statistics = item.statistics;

      setVideo({
        id: videoId,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        description: snippet.description,
        viewCount: statistics.viewCount,
        likeCount: statistics.likeCount,
        thumbnailUrl: snippet.thumbnails.high.url,
        publishedAt: snippet.publishedAt,
      });
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  };
  console.log(video);

  if (!video) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 30,
    marginTop: 50,
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
});
