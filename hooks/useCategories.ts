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
    let isMounted = true;
    const abortControllers = initialCategories.map(() => new AbortController());

    const fetchAllCategories = async () => {
      if (!isMounted) return;
      setLoading(true);

      const updatedCategories = await Promise.all(
        categories.map(async (category, index) => {
          try {
            const data = await youtubeApi.searchVideos(
              {
                query: category.query,
                maxResults,
              },
              abortControllers[index].signal
            );

            if (isMounted && !abortControllers[index].signal.aborted) {
              return {
                ...category,
                videos: data.items || [],
                loading: false,
              };
            }

            return category;
          } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
              console.log(`Category ${category.name} fetch cancelled`);
              return category;
            }

            console.error(`Error fetching ${category.name}:`, err);

            if (isMounted) {
              return {
                ...category,
                videos: [],
                loading: false,
              };
            }

            return category;
          }
        })
      );

      if (isMounted) {
        setCategories(updatedCategories);
        setLoading(false);
      }
    };

    fetchAllCategories();

    return () => {
      isMounted = false;
      abortControllers.forEach((controller) => controller.abort());
    };
  }, [maxResults]);

  return { categories, loading };
};
