"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import MobileNodeChain from "@/components/MobileNodeChain";
import { NetworkNode as NodeType } from "@/data/network-nodes";

const NeuralNetwork = dynamic(() => import("@/components/NeuralNetwork"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-neural-primary/30 animate-pulse-glow" />
    </div>
  ),
});

export const HeroSection = () => {
  const [activeNode, setActiveNode] = useState<NodeType | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);

  const handleNodeClick = useCallback(
    (node: NodeType) => {
      // Clicking the same active node → navigate
      if (activeNode?.id === node.id) {
        setActiveNode(null);
        if (node.linkedSection) {
          setTimeout(() => {
            const el = document.getElementById(node.linkedSection!);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }
        return;
      }
      setActiveNode(node);
    },
    [activeNode]
  );

  const handleBackgroundClick = useCallback(() => {
    setActiveNode(null);
  }, []);

  const handleHoverNode = useCallback((node: NodeType | null) => {
    setHoveredNode(node);
  }, []);

  // What to show in the tooltip (hover only, not active)
  const tooltipNode = !activeNode && hoveredNode && hoveredNode.tier !== "core" ? hoveredNode : null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* 3D Neural Network — Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <NeuralNetwork
          className="w-full h-full"
          onNodeClick={handleNodeClick}
          onHoverNode={handleHoverNode}
          activeNodeId={activeNode?.id ?? null}
          onBackgroundClick={handleBackgroundClick}
        />
      </div>

      {/* Mobile: Node chain */}
      <div className="md:hidden pt-24 pb-4">
        <MobileNodeChain />
      </div>

      {/* ——— Active node popup (centered card) ——— */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            key={`popup-${activeNode.id}`}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-30 hidden md:flex items-center justify-center pointer-events-none"
          >
            {/* Backdrop — click to dismiss */}
            <div
              className="absolute inset-0 bg-black/60 pointer-events-auto"
              onClick={handleBackgroundClick}
            />

            {/* Card — fully opaque dark background */}
            <div
              className="relative pointer-events-auto p-8 max-w-md w-full mx-4 rounded-2xl border border-[#1a2a3a] shadow-lg shadow-neural-primary/10"
              style={{ backgroundColor: "#0a0f1a" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleBackgroundClick}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: activeNode.color,
                    boxShadow: `0 0 12px ${activeNode.color}`,
                  }}
                />
                <span className="font-mono text-base text-neural-primary tracking-widest uppercase font-bold">
                  {activeNode.label}
                </span>
              </div>

              {/* Description */}
              {activeNode.description && (
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {activeNode.description}
                </p>
              )}

              {/* Tech pills */}
              {activeNode.tech && activeNode.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {activeNode.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-neural-primary/10 border border-neural-primary/15 rounded text-neural-primary/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Navigate button */}
              {activeNode.linkedSection && (
                <button
                  onClick={() => {
                    setActiveNode(null);
                    setTimeout(() => {
                      const el = document.getElementById(activeNode.linkedSection!);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-neural-primary/10 border border-neural-primary/25 text-neural-primary text-sm font-semibold hover:bg-neural-primary/20 transition-colors"
                >
                  View Section
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Hover tooltip (small, follows right side) ——— */}
      <AnimatePresence>
        {tooltipNode && tooltipNode.description && (
          <motion.div
            key={`tip-${tooltipNode.id}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.15 }}
            className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-12 z-20 hidden md:block pointer-events-none"
          >
            <div className="glass-card p-4 max-w-[220px]" style={{ border: `1px solid ${tooltipNode.color}22` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: tooltipNode.color,
                    boxShadow: `0 0 8px ${tooltipNode.color}`,
                  }}
                />
                <span className="font-mono text-[10px] text-neural-primary tracking-widest uppercase font-bold">
                  {tooltipNode.label}
                </span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                {tooltipNode.description}
              </p>
              <p className="text-[9px] font-mono text-white/20 mt-2 tracking-wider">
                CLICK TO EXPLORE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction hint — top-right corner */}
      <AnimatePresence>
        {!activeNode && !hoveredNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="absolute top-24 right-8 lg:right-16 z-10 hidden md:block pointer-events-none"
          >
            <div className="flex items-center gap-2 text-white/15 font-mono text-[10px] tracking-wider">
              <svg
                className="w-4 h-4 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <span>HOVER & CLICK THE NODES</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content overlay — pointer-events-none so 3D canvas stays interactive */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-8 md:pb-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center md:items-start md:max-w-lg"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-neural-primary/20 bg-neural-bg/80 backdrop-blur-sm mb-6">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping-large" />
            </div>
            <span className="text-sm text-white/60 font-mono">
              Available for new projects
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white">
            JC GURDIAN
          </h1>

          {/* Title */}
          <p className="mt-2 text-lg md:text-xl font-mono text-neural-primary tracking-widest uppercase">
            AI Engineer
          </p>

          {/* Subtitle */}
          <p className="mt-4 max-w-md text-white/50 text-sm md:text-base">
            Building production AI systems, open-source tools, and bringing
            intelligent software to Latin America.
          </p>

          {/* CTA buttons — restore pointer-events */}
          <div className="flex gap-4 mt-8 pointer-events-auto">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neural-primary/10 border border-neural-primary/30 text-neural-primary font-semibold text-sm hover:bg-neural-primary/20 hover:shadow-node-glow transition-all duration-300"
            >
              Explore My Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-neural-bg font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Let&apos;s Connect
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:flex flex-col items-center mt-12"
        >
          <span className="text-xs font-mono text-white/20 tracking-widest uppercase mb-2">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-neural-primary/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};
