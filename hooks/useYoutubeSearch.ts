import { youtubeApi } from "@/services/youtubeApi";
import { VideoItem } from "@/types/VideoItem";
import { useState } from "react";

type UseYoutubeSearchReturn = {
  results: VideoItem[];
  totalResults: number;
  loading: boolean;
  search: (
    query: string,
    maxResults?: number,
    signal?: AbortSignal
  ) => Promise<void>;
};

export const useYoutubeSearch = (): UseYoutubeSearchReturn => {
  const [results, setResults] = useState<VideoItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const search = async (
    query: string,
    maxResults = 10,
    signal?: AbortSignal
  ) => {
    if (!query.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);

    try {
      const data = await youtubeApi.searchVideos(
        { query, maxResults },
        signal
      );

      if (signal?.aborted) {
        return;
      }

      setResults(data.items || []);
      setTotalResults(data.pageInfo?.totalResults || 0);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Search cancelled");
        return;
      }

      console.error("Search error:", err);

      if (!signal?.aborted) {
        setResults([]);
        setTotalResults(0);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  return { results, totalResults, loading, search };
};
