"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  dateRange: string;
  achievements: string[];
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    role: "Junior AI Developer",
    company: "yorCMO.ai",
    companyUrl: "https://yorcmo.ai",
    dateRange: "2025 — Present",
    achievements: [
      "Built PanelCast — a production SaaS for transforming panel discussions into multi-format content — solo from architecture to deployment",
      "Developed Beast AI content generation platform with fine-tuned LLMs for brand-consistent marketing copy",
      "Designed and shipped AI pipelines: transcription, speaker diarization, automated content generation",
    ],
    current: true,
  },
  {
    role: "ML Intern",
    company: "AtomChat",
    companyUrl: "https://atomchat.com",
    dateRange: "Jul — Oct 2024",
    achievements: [
      "Built ML models for chat analytics and user behavior prediction",
      "Implemented NLP features for sentiment analysis in real-time messaging",
    ],
  },
  {
    role: "Digital Transformation Intern",
    company: "Cargill",
    companyUrl: "https://cargill.com",
    dateRange: "Jun — Aug 2023",
    achievements: [
      "Led digital transformation initiatives for supply chain operations",
      "Built data dashboards and automation tools that improved operational efficiency",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Nicaragua & US Clients",
    dateRange: "2023 — Present",
    achievements: [
      "Built websites and AI tools for small businesses in Nicaragua and the US",
      "Delivered Social Hour Studio site, O.R.I.O.N customer AI assistant, and more",
      "Pioneering AI adoption for Latin American businesses",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            Career Path
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            Experience
          </h2>
          <p className="text-white/40 mt-3 max-w-lg">
            From TCU to production AI — building real systems that ship.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neural-primary/40 via-neural-primary/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.dateRange}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline node */}
                <div className="absolute left-2.5 md:left-6.5 top-1">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      exp.current
                        ? "bg-neural-primary border-neural-primary shadow-node-glow"
                        : "bg-neural-bg border-neural-primary/40"
                    }`}
                  />
                  {exp.current && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-neural-primary animate-ping-large opacity-40" />
                  )}
                </div>

                {/* Content card */}
                <div className="glass-card p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-neural-primary hover:text-neural-secondary transition-colors"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span className="text-sm text-neural-primary">
                          {exp.company}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-white/30 tracking-wider">
                      {exp.dateRange}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm text-white/50"
                      >
                        <span className="text-neural-primary mt-0.5 shrink-0">
                          &#9656;
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.current && (
                    <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neural-primary/10 border border-neural-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[10px] font-mono text-neural-primary tracking-wider">
                        CURRENT
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
