// const baseUrl = "https://www.googleapis.com/youtube/v3";
const baseUrl = "http://192.168.55.106:3000/youtube/v3";

const youtubeAPIKey = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

type SearchParams = {
  query: string;
  maxResults?: number;
};

type VideoDetailsParams = {
  videoId: string;
};

export const youtubeApi = {
  searchVideos: async (params: SearchParams) => {
    const { query, maxResults = 10 } = params;

    const url = `${baseUrl}/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&key=${youtubeAPIKey}&maxResults=${maxResults}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch search results");
    return response.json();
  },

  getVideoDetails: async ({ videoId }: VideoDetailsParams) => {
    const url = `${baseUrl}/videos?part=snippet,statistics&id=${videoId}&key=${youtubeAPIKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch video details");
    return response.json();
  },
};
