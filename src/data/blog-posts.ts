import grainImage from "@/assets/images/grain.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: "3D Printing" | "Research" | "Videos" | "Personal";
  excerpt: string;
  content: string;
  image: any; // Replace with proper image type
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "my-first-3d-print",
    title: "My First 3D Print: A Journey into Additive Manufacturing",
    date: "January 15, 2024",
    category: "3D Printing",
    excerpt: "Exploring the world of 3D printing with my first successful print.",
    content: "This is a detailed blog post about my first 3D print...",
    image: grainImage,
    tags: ["3D Printing", "Maker", "Technology"],
  },
  {
    slug: "ai-in-software-development",
    title: "The Impact of AI on Modern Software Development",
    date: "February 1, 2024",
    category: "Research",
    excerpt: "How artificial intelligence is transforming the way we build software.",
    content: "This is a detailed blog post about AI in software development...",
    image: grainImage,
    tags: ["AI", "Software Development", "Technology"],
  },
  // Add more blog posts as needed
]; 