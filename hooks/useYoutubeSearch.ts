import { youtubeApi } from "@/services/youtubeApi";
import { VideoItem } from "@/types/VideoItem";
import { useState } from "react";

type UseYoutubeSearchReturn = {
  results: VideoItem[];
  totalResults: number;
  loading: boolean;
  search: (query: string, maxResults?: number) => Promise<void>;
};

export const useYoutubeSearch = (): UseYoutubeSearchReturn => {
  const [results, setResults] = useState<VideoItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const search = async (query: string, maxResults = 10) => {
    if (!query.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);

    try {
      const data = await youtubeApi.searchVideos({ query, maxResults });
      setResults(data.items || []);
      setTotalResults(data.pageInfo?.totalResults || 0);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  return { results, totalResults, loading, search };
};
