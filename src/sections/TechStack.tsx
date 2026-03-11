"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TechItem {
  name: string;
  projects: string[];
}

interface TechGroup {
  domain: string;
  items: TechItem[];
}

const techGroups: TechGroup[] = [
  {
    domain: "AI / ML",
    items: [
      { name: "OpenAI", projects: ["PanelCast", "Beast AI", "Bug Butler", "Jasper AI", "O.R.I.O.N"] },
      { name: "LangChain", projects: ["Beast AI", "Bug Butler", "O.R.I.O.N"] },
      { name: "LangSmith", projects: ["Beast AI"] },
      { name: "FAISS", projects: ["O.R.I.O.N"] },
      { name: "RAG", projects: ["O.R.I.O.N", "Bug Butler"] },
      { name: "Hugging Face", projects: ["O.R.I.O.N"] },
    ],
  },
  {
    domain: "Backend",
    items: [
      { name: "Python", projects: ["PanelCast", "Beast AI", "O.R.I.O.N"] },
      { name: "FastAPI", projects: ["PanelCast", "Beast AI"] },
      { name: "Flask", projects: ["O.R.I.O.N"] },
      { name: "Node.js", projects: ["Jasper AI", "Bug Butler"] },
      { name: "Spring Boot", projects: ["FrogCrew", "MotivateMe"] },
      { name: "Express.js", projects: ["Social Hour Studio"] },
    ],
  },
  {
    domain: "Frontend",
    items: [
      { name: "React", projects: ["PanelCast", "Beast AI", "Jasper AI"] },
      { name: "Next.js", projects: ["PanelCast", "Bole.to"] },
      { name: "TypeScript", projects: ["PanelCast", "Bole.to", "Bug Butler"] },
      { name: "Vue 3", projects: ["FrogCrew"] },
      { name: "React Native", projects: ["Bole.to", "MotivateMe"] },
      { name: "Tailwind CSS", projects: ["PanelCast", "Bole.to", "FrogCrew"] },
    ],
  },
  {
    domain: "Data & Infra",
    items: [
      { name: "PostgreSQL", projects: ["FrogCrew", "MotivateMe", "Beast AI"] },
      { name: "Supabase", projects: ["PanelCast", "Bole.to"] },
      { name: "Vercel", projects: ["PanelCast", "Bole.to"] },
      { name: "Docker", projects: ["PanelCast", "Beast AI"] },
      { name: "Git", projects: ["All projects"] },
      { name: "REST APIs", projects: ["All projects"] },
    ],
  },
  {
    domain: "Tools",
    items: [
      { name: "VS Code", projects: ["All projects"] },
      { name: "Figma", projects: ["Bole.to", "Social Hour Studio"] },
      { name: "Jira", projects: ["FrogCrew", "Cargill"] },
      { name: "Sentry", projects: ["PanelCast", "Bole.to"] },
    ],
  },
];

export const TechStackSection = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="stack" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            Technologies
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            Tech Stack
          </h2>
          <p className="text-white/40 mt-3 max-w-lg">
            Hover over any technology to see which projects use it.
          </p>
        </motion.div>

        <div className="space-y-8">
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
            >
              <h3 className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">
                {group.domain}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredTech(item.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 cursor-default ${
                        hoveredTech === item.name
                          ? "bg-neural-primary/15 border border-neural-primary/40 text-neural-primary shadow-node-glow"
                          : "bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white/80 hover:border-white/15"
                      }`}
                    >
                      {item.name}
                    </div>

                    {/* Tooltip */}
                    {hoveredTech === item.name && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-neural-bg border border-neural-primary/20 shadow-lg z-20 whitespace-nowrap">
                        <div className="text-[10px] font-mono text-neural-primary/60 uppercase tracking-wider mb-1">
                          Used in
                        </div>
                        <div className="text-xs text-white/70">
                          {item.projects.join(" · ")}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
