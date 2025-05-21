import { SectionHeader } from "@/components/Sectionheader";
import { Card } from "@/components/Card";
import grainImage from "@/assets/images/grain.jpg";
import Image from "next/image";

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
          {/* Content cards will go here */}
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 -z-10" style={{
              backgroundImage: `url(${grainImage.src})`,
            }}></div>
            <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text mb-4">
              <span>3D Printing</span>
            </div>
            <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
            <p className="text-white/60">My 3D printing projects and designs will be featured here.</p>
          </Card>
          
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 -z-10" style={{
              backgroundImage: `url(${grainImage.src})`,
            }}></div>
            <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text mb-4">
              <span>Research</span>
            </div>
            <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
            <p className="text-white/60">Articles and research on technology, AI, and software development.</p>
          </Card>
          
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 -z-10" style={{
              backgroundImage: `url(${grainImage.src})`,
            }}></div>
            <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text mb-4">
              <span>Videos</span>
            </div>
            <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
            <p className="text-white/60">Project demonstrations and tutorials will be available here.</p>
          </Card>
        </div>
      </div>
    </main>
  );
} 