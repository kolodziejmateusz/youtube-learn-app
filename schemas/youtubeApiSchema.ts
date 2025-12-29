import { z } from "zod";

const SearchResultSchema = z.object({
  id: z.object({
    videoId: z.string(),
  }),
  snippet: z.object({
    title: z.string(),
    description: z.string(),
    channelId: z.string(),
    channelTitle: z.string(),
    publishedAt: z.string(),
    thumbnails: z.object({
      high: z.object({
        url: z.string().url(),
        width: z.number().int().nonnegative().optional(),
        height: z.number().int().nonnegative().optional(),
      }),
    }),
  }),
});

export const SearchResponseSchema = z.object({
  items: z.array(SearchResultSchema),
  nextPageToken: z.string().nullable().optional(),
  pageInfo: z
    .object({
      totalResults: z.number().int(),
      resultsPerPage: z.number().int(),
    })
    .optional(),
});

export const VideoDetailsResponseSchema = z.object({
  items: z.array(
    z.object({
      snippet: z.object({
        title: z.string(),
        description: z.string(),
        channelTitle: z.string(),
        publishedAt: z.string(),
        thumbnails: z.object({
          high: z
            .object({
              url: z.string().url(),
            })
            .optional(),
        }),
      }),
      statistics: z.object({
        viewCount: z.string(),
        likeCount: z.string().optional(),
      }),
    })
  ),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type VideoDetailsResponse = z.infer<typeof VideoDetailsResponseSchema>;
