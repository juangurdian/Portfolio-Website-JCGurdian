import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import grainImage from "@/assets/images/grain.jpg";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container py-32">
        <SectionHeader
          title="My Blog & Projects"
          eyebrow="Content"
          description="Explore my thoughts, research, 3D prints, project videos, and more."
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="p-6 relative overflow-hidden h-full hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 opacity-5 -z-10" style={{
                  backgroundImage: `url(${grainImage.src})`,
                }}></div>
                <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text mb-4">
                  <span>{post.category}</span>
                  <span>&bull;</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-serif mb-2">{post.title}</h3>
                <p className="text-white/60">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 