import { youtubeApi } from "@/services/youtubeApi";
import { useEffect, useState } from "react";

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

type UseVideoDetailsReturn = {
  video: VideoDetails | null;
  loading: boolean;
};

export const useVideoDetails = (
  videoId: string | undefined
): UseVideoDetailsReturn => {
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    const fetchDetails = async () => {
      setLoading(true);

      try {
        const data = await youtubeApi.getVideoDetails({ videoId });
        const item = data.items?.[0];

        if (!item) throw new Error("Video not found");

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
        console.error("Video details error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [videoId]);

  return { video, loading };
};
