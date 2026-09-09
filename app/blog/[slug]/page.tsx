import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { client, getBlogPostBySlug, BlogPostSkeleton } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  MARKS,
  Block,
  Inline,
} from "@contentful/rich-text-types";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-bold text-[#a0d5db]">{text}</strong>
    ),
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-[#222829] text-blue-main font-mono text-sm px-2 py-1 rounded border border-[#2e3738]">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (_node: Block | Inline, children: React.ReactNode) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-main mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: Block | Inline, children: React.ReactNode) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-[#478d96] mt-8 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: React.ReactNode) => (
      <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
        {children}
      </p>
    ),
    [BLOCKS.QUOTE]: (_node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="border-l-4  pl-5 italic text-gray-200 my-8 bg-black-two py-4 pr-4 rounded-r-xl border-y border-r border-[#497479]">
        {children}
      </blockquote>
    ),
    [BLOCKS.UL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
      <ul className="list-disc list-outside pl-6 space-y-3 mb-6 text-gray-300 text-base sm:text-lg">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node: Block | Inline, children: React.ReactNode) => (
      <ol className="list-decimal list-outside pl-6 space-y-3 mb-6 text-gray-300 text-base sm:text-lg">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: React.ReactNode) => (
      <li className="leading-relaxed [&>p]:mb-0 [&>p]:inline">
        {children}
      </li>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={node.data.uri as string}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#478d96] underline font-medium hover:text-blue-main transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
  });

  return response.items.map((item) => ({
    slug: item.fields.slug as string,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | DevBlog",
    };
  }

  return {
    title: `${post.fields.title} | DevBlog`,
    description: `Read about ${post.fields.title} on DevBlog.`,
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, publicationDate, featuredImage, body, tags } = post.fields;
  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : null;

  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-black-one text-gray-100">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#758486] hover:text-blue-main transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to articles
          </Link>
        </div>

        <article className="max-w-3xl mx-auto">
          <div className="space-y-4 mb-8 text-center sm:text-left">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#222829] text-gray-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-[#2e3738]"
                  >
                    <Tag className="w-3 h-3 text-[#478d96]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-main tracking-tight leading-tight">
              {title}
            </h1>

            {formattedDate && (
              <div className="flex items-center gap-2 text-sm text-[#758486] justify-center sm:justify-start pt-1 font-medium">
                <Calendar className="w-4 h-4" />
                <time dateTime={publicationDate}>{formattedDate}</time>
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-lg shadow-[#081011] bg-black-two border border-black-two">
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            {body && documentToReactComponents(body, richTextOptions)}
          </div>
        </article>
      </main>
    </div>
  );
}
