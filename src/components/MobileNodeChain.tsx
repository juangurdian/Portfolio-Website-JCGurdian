"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mobileNodes } from "@/data/network-nodes";
import { networkNodes } from "@/data/network-nodes";

export default function MobileNodeChain() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleClick = (node: (typeof mobileNodes)[0]) => {
    if (expandedId === node.id) {
      // Second tap — navigate
      setExpandedId(null);
      const el = document.getElementById(node.linkedSection);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setExpandedId(node.id);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 relative px-4">
      {/* Vertical glowing connection line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-neural-primary/30 to-transparent" />
        {/* Animated pulse on the line */}
        <motion.div
          className="absolute left-0 w-px h-16 bg-gradient-to-b from-transparent via-neural-primary/60 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {mobileNodes.map((node, i) => {
        const isExpanded = expandedId === node.id;
        // Find matching full node data for description
        const fullNode = networkNodes.find(
          (n) => n.id === node.id || n.linkedSection === node.linkedSection
        );

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="relative my-2 w-full max-w-xs"
          >
            <button
              onClick={() => handleClick(node)}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative z-10"
              style={{
                background: isExpanded
                  ? "rgba(0, 212, 255, 0.08)"
                  : "transparent",
                border: isExpanded
                  ? "1px solid rgba(0, 212, 255, 0.2)"
                  : "1px solid transparent",
              }}
            >
              {/* Node dot with ping */}
              <div className="relative shrink-0">
                <motion.div
                  className="w-3 h-3 rounded-full bg-neural-primary"
                  animate={
                    isExpanded
                      ? { scale: [1, 1.3, 1], boxShadow: ["0 0 10px rgba(0,212,255,0.4)", "0 0 20px rgba(0,212,255,0.7)", "0 0 10px rgba(0,212,255,0.4)"] }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ boxShadow: "0 0 10px rgba(0,212,255,0.4)" }}
                />
                {isExpanded && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-neural-primary animate-ping opacity-30" />
                )}
              </div>

              {/* Label */}
              <span
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                  isExpanded
                    ? "text-neural-primary font-bold"
                    : "text-white/40 group-hover:text-white/60"
                }`}
              >
                {node.label}
              </span>

              {/* Arrow */}
              <motion.svg
                className="w-3 h-3 ml-auto text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isExpanded ? 90 : 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </button>

            {/* Expanded info */}
            <AnimatePresence>
              {isExpanded && fullNode?.description && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 pt-1">
                    <p className="text-white/40 text-xs leading-relaxed">
                      {fullNode.description}
                    </p>
                    {fullNode.tech && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {fullNode.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neural-primary/10 text-neural-primary/60 border border-neural-primary/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-[9px] font-mono text-white/20 mt-2 tracking-wider">
                      TAP AGAIN TO NAVIGATE →
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
