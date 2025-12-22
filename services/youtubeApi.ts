const baseUrl = "http://192.168.55.111:3000/youtube/v3";
// const baseUrl = "https://www.googleapis.com/youtube/v3";

const youtubeAPIKey = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

if (!youtubeAPIKey) {
  throw new Error(
    "YouTube API key is missing. Set EXPO_PUBLIC_YOUTUBE_API_KEY in your environment variables."
  );
}

type SearchParams = {
  query: string;
  maxResults?: number;
};

type VideoDetailsParams = {
  videoId: string;
};

export const youtubeApi = {
  searchVideos: async (params: SearchParams, signal?: AbortSignal) => {
    const { query, maxResults = 10 } = params;

    const url = `${baseUrl}/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&key=${youtubeAPIKey}&maxResults=${maxResults}`;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error("Failed to fetch search results");
      return response.json();
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
      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }
      throw error;
    }
  },
};
