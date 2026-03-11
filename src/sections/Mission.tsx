"use client";

import { motion } from "framer-motion";

export const MissionSection = () => {
  return (
    <section id="mission" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <span className="font-mono text-xs text-neural-primary tracking-widest uppercase">
            The Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            Bringing AI to Latin America
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-neural-primary/20 flex items-center justify-center text-neural-primary text-sm">
                  NI
                </span>
                Starting in Nicaragua
              </h3>
              <p className="text-white/50 leading-relaxed">
                I grew up in Nicaragua, a country full of brilliant entrepreneurs who
                lack access to the AI tools reshaping businesses everywhere else. That
                gap became my mission. I&apos;m already working with Nicaraguan businesses
                to implement AI solutions — from customer service automation to content
                generation — proving that effective AI doesn&apos;t require Silicon Valley
                budgets.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-neural-secondary/20 flex items-center justify-center text-neural-secondary text-sm">
                  LA
                </span>
                Expanding Across Latin America
              </h3>
              <p className="text-white/50 leading-relaxed">
                Nicaragua is the starting point, not the destination. The challenges I
                solve here — language barriers, connectivity constraints, budget
                limitations — are shared across Latin America. Every tool I build, every
                workflow I automate, is designed to scale across the region.
              </p>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-4">
                My AI Philosophy
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Safe",
                    desc: "AI should enhance human capability, not replace judgment. Every system I build has guardrails, fallbacks, and human oversight.",
                  },
                  {
                    label: "Adequate",
                    desc: "Not every problem needs GPT-4. I match the right model and approach to the business need — sometimes a simple automation beats a complex AI.",
                  },
                  {
                    label: "Accessible",
                    desc: "If a local business can't use it, I haven't built it right. Simple interfaces, offline capability where needed, and pricing that works for emerging markets.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="shrink-0 w-16 font-mono text-xs text-neural-primary tracking-wider pt-1">
                      [{item.label.toUpperCase()}]
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card p-6 md:p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "13+", label: "Projects Built" },
                  { value: "8", label: "AI-Powered" },
                  { value: "1", label: "Production SaaS" },
                  { value: "2", label: "Countries Served" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-neural-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-white/40 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
