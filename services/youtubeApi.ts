import {
  SearchResponseSchema,
  VideoDetailsResponseSchema,
} from "@/schemas/youtubeApiSchema";

const baseUrl = "https://www.googleapis.com/youtube/v3";
// const baseUrl = "http://192.168.55.109:3000/youtube/v3";
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
      throw error;
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
      throw error;
    }
  },
};
