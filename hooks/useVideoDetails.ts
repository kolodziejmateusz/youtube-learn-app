import { useQuery } from "@tanstack/react-query";
import { youtubeApi } from "@/services/youtubeApi";

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
  error: Error | null;
};

const fetchVideoDetails = async (videoId: string) => {
  if (!videoId) throw new Error("No videoId");

  const data = await youtubeApi.getVideoDetails({ videoId });
  const item = data.items?.[0];

  if (!item) throw new Error("Video not found");

  const snippet = item.snippet;
  const statistics = item.statistics;

  return {
    id: videoId,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    description: snippet.description,
    viewCount: statistics.viewCount,
    likeCount: statistics.likeCount,
    thumbnailUrl: snippet.thumbnails.high.url,
    publishedAt: snippet.publishedAt,
  };
};

export const useVideoDetails = (videoId: string): UseVideoDetailsReturn => {
  const {
    data: video,
    isPending: loading,
    error,
  } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => fetchVideoDetails(videoId),
    enabled:  videoId != null,
  });

  return {
    video: video ?? null,
    loading,
    error: error ?? null,
  };
};
