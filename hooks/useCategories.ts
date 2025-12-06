import { youtubeApi } from "@/services/youtubeApi";
import { VideoItem } from "@/types/VideoItem";
import { useEffect, useState } from "react";

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
  const [categories, setCategories] = useState<Category[]>(
    initialCategories.map((category) => ({
      ...category,
      videos: [],
      loading: true,
    }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);

      const updatedCategories = await Promise.all(
        categories.map(async (category) => {
          try {
            const data = await youtubeApi.searchVideos({
              query: category.query,
              maxResults,
            });
            return {
              ...category,
              videos: data.items || [],
              loading: false,
            };
          } catch (err) {
            console.error(`Error fetching ${category.name}:`, err);
            return {
              ...category,
              videos: [],
              loading: false,
            };
          }
        })
      );

      setCategories(updatedCategories);
      setLoading(false);
    };

    fetchAllCategories();
  }, [maxResults]);

  return { categories, loading };
};
