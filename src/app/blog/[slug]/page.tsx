import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neural-bg text-white">
      <div className="container py-32">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-neural-primary transition-colors font-mono mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-neural-primary tracking-wider uppercase">
              {post.category}
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-white/30">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-8">{post.title}</h1>

          {/* Image */}
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden border border-white/[0.06]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none text-white/60 leading-relaxed">
            <p>{post.content}</p>
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
