import {
  SearchResponseSchema,
  VideoDetailsResponseSchema,
} from "@/schemas/youtubeApiSchema";
import Toast from "react-native-toast-message";

import mockSearchResults from "@/assets/data/mockSearchResults.json";
import mockVideoDetails from "@/assets/data/mockVideoDetails.json";
import i18n from "@/utils/i18n";

// const baseUrl = "http://192.168.55.109:3000/youtube/v3";
const baseUrl = "https://www.googleapis.com/youtube/v3";
const youtubeAPIKey = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

if (!youtubeAPIKey) {
  throw new Error(
    "YouTube API key is missing. Set EXPO_PUBLIC_YOUTUBE_API_KEY in your environment variables."
  );
}

type SearchParams = {
  query: string;
  maxResults?: number;
  pageToken?: string;
};

type VideoDetailsParams = {
  videoId: string;
};

// Funkcja do pokazywania Toast z informacją o błędzie
const showApiErrorToast = (message: string) => {
  Toast.show({
    type: "error",
    text1: i18n.t("api.errorTitle"),
    text2: message,
    position: "top",
    visibilityTime: 8000,
  });
};

export const youtubeApi = {
  searchVideos: async (params: SearchParams, signal?: AbortSignal) => {
    const { query, maxResults = 10, pageToken } = params;

    const url = `${baseUrl}/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&key=${youtubeAPIKey}&maxResults=${maxResults}${
      pageToken ? `&pageToken=${pageToken}` : ""
    }`;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error("Failed to fetch search results");

      const data = await response.json();

      if (data.error) {
        throw new Error(`YouTube API error: ${data.error.message}`);
      }

      const parsed = SearchResponseSchema.safeParse(data);

      if (!parsed.success) {
        console.error(
          "YouTube Search API validation failed:",
          parsed.error.format()
        );
        throw new Error("Invalid YouTube Search API response format");
      }

      return parsed.data;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }

      console.warn("Using mock search data due to API error:", error);

      showApiErrorToast(i18n.t("api.searchError"));

      const parsed = SearchResponseSchema.safeParse(mockSearchResults);

      if (!parsed.success) {
        console.error("Mock data validation failed:", parsed.error.format());
        throw new Error("Mock data is invalid");
      }

      return parsed.data;
    }
  },

  getVideoDetails: async (
    { videoId }: VideoDetailsParams,
    signal?: AbortSignal
  ) => {
    const url = `${baseUrl}/videos?part=snippet,statistics&id=${videoId}&key=${youtubeAPIKey}`;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error("Failed to fetch video details");

      const data = await response.json();

      if (data.error) {
        throw new Error(`YouTube API error: ${data.error.message}`);
      }

      const parsed = VideoDetailsResponseSchema.safeParse(data);

      if (!parsed.success) {
        console.error(
          "YouTube Video Details API validation failed:",
          parsed.error.format()
        );
        throw new Error("Invalid YouTube Video Details API response format");
      }

      return parsed.data;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }

      console.warn("Using mock video details due to API error:", error);

      showApiErrorToast(i18n.t("api.videoDetailsError"));

      const parsed = VideoDetailsResponseSchema.safeParse(mockVideoDetails);

      if (!parsed.success) {
        console.error(
          "Mock video data validation failed:",
          parsed.error.format()
        );
        throw new Error("Mock video data is invalid");
      }

      return parsed.data;
    }
  },
};
