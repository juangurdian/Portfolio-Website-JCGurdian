import { SectionHeader } from "@/components/Sectionheader";
import grainImage from "@/assets/images/grain.jpg";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container py-32">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text mb-4">
            <span>{post.category}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif mb-8">{post.title}</h1>
          
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p>{post.content}</p>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-white/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 