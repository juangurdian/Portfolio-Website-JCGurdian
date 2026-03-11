import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-neural-bg text-white">
      <div className="container py-32">
        <div className="mb-12">
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            Content
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-3">
            Blog & Projects
          </h1>
          <p className="text-white/40 mt-3 max-w-lg">
            Explore my thoughts, research, 3D prints, project videos, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="glass-card p-5 h-full hover:border-neural-primary/20 transition-all duration-300 group">
                {/* Category & date */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-neural-primary tracking-wider uppercase">
                    {post.category}
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="font-mono text-[10px] text-white/30">
                    {post.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-neural-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/40 text-sm mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
