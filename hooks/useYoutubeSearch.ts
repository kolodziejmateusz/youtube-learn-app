import { youtubeApi } from "@/services/youtubeApi";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseYoutubeSearchParams = {
  query: string;
  maxResults?: number;
  enabled?: boolean;
};

export const useYoutubeSearch = ({
  query,
  maxResults = 10,
  enabled = true,
}: UseYoutubeSearchParams) => {
  return useInfiniteQuery({
    queryKey: ["youtube-search", query, maxResults],
    queryFn: ({ pageParam }) =>
      youtubeApi.searchVideos({
        query,
        maxResults,
        pageToken: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    enabled: enabled && query.trim().length > 0,
    gcTime: 10 * 60 * 1000,
  });
};
