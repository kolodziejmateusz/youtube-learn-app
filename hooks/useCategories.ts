import { youtubeApi } from "@/services/youtubeApi";
import { VideoItem } from "@/types/VideoItem";
import { useQueries } from "@tanstack/react-query";

type Category = {
  name: string;
  query: string;
  videos: VideoItem[];
  loading: boolean;
};

type UseCategoriesReturn = {
  categories: Category[];
  loading: boolean;
};

const initialCategories = [
  { name: "React Native", query: "React Native" },
  { name: "React", query: "React.js" },
  { name: "TypeScript", query: "TypeScript" },
  { name: "Javascript", query: "Javascript" },
];

export const useCategories = (maxResults = 4): UseCategoriesReturn => {
  const queries = useQueries({
    queries: initialCategories.map((category) => ({
      queryKey: ["categories", category.query],
      queryFn: async () => {
        const data = await youtubeApi.searchVideos({
          query: category.query,
          maxResults,
        });
        return data.items || [];
      },
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    })),
  });

  const isLoading = queries.some((query) => query.isPending);
  const categories: Category[] = initialCategories.map((category, index) => {
    const query = queries[index];

    return {
      ...category,
      videos: query.data || [],
      loading: query.isPending,
    };
  });

  return {
    categories,
    loading: isLoading,
  };
};
