"use client";

import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "@/components/CRTTerminal";

const DeskScene = lazy(() => import("@/components/DeskScene"));

function TerminalFallback({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="h-64 md:h-80 flex items-center justify-center bg-surface-card rounded-lg border border-surface-border">
      <button
        onClick={onOpen}
        className="flex flex-col items-center gap-3 p-8 text-stone-400 hover:text-terminal-green transition-colors"
      >
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="font-mono text-sm">Loading 3D scene...</span>
      </button>
    </div>
  );
}

export const TerminalSection = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Section intro */}
          <div className="text-center mb-8">
            <span className="section-header">Interactive</span>
            <h2 className="section-title">Recruiter Brief</h2>
            <p className="text-stone-400 mt-4 max-w-lg mx-auto">
              Click the CRT monitor to open a terminal where you can ask questions about my experience, 
              skills, and availability. All answers cite specific roles and projects.
            </p>
          </div>

          {/* 3D Scene */}
          <div className="h-64 md:h-80 rounded-lg overflow-hidden">
            <Suspense fallback={<TerminalFallback onOpen={() => setIsTerminalOpen(true)} />}>
              <DeskScene
                onTerminalOpen={() => setIsTerminalOpen(true)}
                className="w-full h-full"
              />
            </Suspense>
          </div>

          {/* Quick commands hint */}
          <div className="mt-6 p-4 bg-surface-card rounded-lg border border-surface-border">
            <p className="text-xs font-mono text-stone-500 text-center">
              Try: whoami · experience · projects · skills · linky · core · gynka · ask {"<question>"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Terminal modal */}
      <AnimatePresence>
        {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};
