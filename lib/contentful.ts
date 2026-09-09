import { createClient, EntriesQueries, type EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export interface BlogPostFields {
  title: string;
  slug: string;
  publicationDate?: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
      title?: string;
    };
  };
  body: Document;
  tags?: string[];
}

export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: BlogPostFields;
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "blogPost";
  fields: BlogPostFields;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query: EntriesQueries<BlogPostSkeleton, undefined> & { order?: string[] } = {
    content_type: "blogPost",
    order: ["-fields.publicationDate"],
  };

  const response = await client.getEntries<BlogPostSkeleton>(query);
  return response.items as unknown as BlogPost[];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const entry = await client.getEntry<BlogPostSkeleton>(id);
    return entry as unknown as BlogPost;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query: Record<string, unknown> = {
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  };

  const response = await client.getEntries<BlogPostSkeleton>(
    query as EntriesQueries<BlogPostSkeleton, undefined>
  );

  if (!response.items.length) return null;
  return response.items[0] as unknown as BlogPost;
}