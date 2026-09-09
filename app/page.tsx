import { getBlogPosts } from "@/lib/contentful";
import BlogCard from "./components/BlogCard";

export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-black-one text-gray-100">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className=" text-center sm:text-left space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-blue-main">
            Some Web Dev Insights
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Articles, tutorials, and deep dives into Next.js, Contentful, TypeScript, and modern web architecture.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {posts.map((post) => (
            <BlogCard key={post.sys.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}