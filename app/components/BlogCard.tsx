import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/contentful";

export interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { title, slug, publicationDate, featuredImage, tags } = post.fields;
  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : null;

  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article
      key={post.sys.id}
      className="bg-black-two border border-black-two rounded-2xl overflow-hidden shadow-md shadow-[#081011]  hover:shadow-lg hover:shadow-[#122326] hover:scale-105 transition-all duration-500 flex flex-col group"
    >
      <Link
        href={`/blog/${slug}`}
        className="relative aspect-video w-full overflow-hidden bg-black block"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black-two text-gray-200 text-sm">
            No Image Available
          </div>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {formattedDate && (
            <div className="flex items-center gap-1.5 text-sm text-[#758486] font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={publicationDate}>{formattedDate}</time>
            </div>
          )}

          <h2 className="text-xl font-bold text-[#478d96] group-hover:text-blue-main transition-colors leading-snug">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h2>
        </div>

        <div className="space-y-4 pt-2">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#222829] group-hover:text-blue-main] text-gray-400 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#478d96] group-hover:text-blue-main transition-colors"
          >
            Read article <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}