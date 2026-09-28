"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import factsData from "@/data/facts.json";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

const COMMANDS: Record<string, string> = {
  help: factsData.commands.help,
  whoami: factsData.commands.whoami,
  experience: factsData.commands.experience,
  projects: factsData.commands.projects,
  contact: factsData.commands.contact,
  resume: factsData.commands.resume,
  skills: `AI/ML: ${factsData.skills.ai_ml.slice(0, 5).join(", ")}... | Backend: ${factsData.skills.backend.slice(0, 4).join(", ")}... | Frontend: ${factsData.skills.frontend.slice(0, 3).join(", ")}...`,
  linky: "Linky: Autonomous LinkedIn outreach platform. ~6,000 companies, ~12,000 prospects per client. ~90% draft approval without edits. Platform lead role at yorCMO. [Source: yorCMO experience]",
  core: "CORE Growth Platform: Built 4/11 production LLM agents serving 24 client orgs across 25+ integrations including LinkedIn, WordPress, HubSpot, GA, and more. [Source: yorCMO experience]",
  gynka: "Gynka: AI fitness coaching app (closed beta). Sole technical owner. Multi-agent coach adapts workouts to biomarker data from wearables. React Native + FastAPI + AWS. [Source: Gynka CTO role]",
  clear: "",
};

function processCommand(input: string): string {
  const trimmed = input.trim().toLowerCase();
  
  if (trimmed === "clear") {
    return "__CLEAR__";
  }
  
  if (trimmed in COMMANDS) {
    return COMMANDS[trimmed];
  }
  
  if (trimmed.startsWith("ask ")) {
    const question = trimmed.slice(4).toLowerCase();
    
    if (question.includes("location") || question.includes("where") || question.includes("based")) {
      return "Tampa, FL. Open to Tampa hybrid/onsite and US remote roles. [Source: profile]";
    }
    if (question.includes("available") || question.includes("looking") || question.includes("hire")) {
      return "Yes, actively looking for early/mid AI Engineer roles. Tampa hybrid/onsite or US remote preferred. [Source: profile]";
    }
    if (question.includes("stack") || question.includes("technologies")) {
      return `Primary: Python, TypeScript, React/Next.js, FastAPI. AI: LLM Agents, RAG, MCP, OpenAI, Claude. Infra: AWS, Supabase, Docker, Vercel, Modal. [Source: skills]`;
    }
    if (question.includes("agent") || question.includes("llm")) {
      return "Built multiple production agent systems at yorCMO: Linky (autonomous outreach), CORE Growth (4/11 agents), Practice Growth (5-agent system). Also built MCP server for Claude integration. [Source: yorCMO experience]";
    }
    if (question.includes("education") || question.includes("school") || question.includes("degree")) {
      return `B.S. Computer Information Technology, Texas Christian University (TCU), May 2025. Claude Code Certified. [Source: profile]`;
    }
    if (question.includes("mcp")) {
      return "Built and maintain the MCP server at yorCMO that exposes platform agents as tools inside Claude, plus the shared orchestration/tool-calling layer. [Source: yorCMO experience]";
    }
    
    return `I can answer questions about Juan's experience, skills, projects, and availability. Try: "ask what agents has he built?" or "ask is he available?" [Keyword search only in demo mode]`;
  }
  
  return `Command not found: ${trimmed}. Type "help" for available commands.`;
}

interface TerminalProps {
  onClose: () => void;
}

export function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Recruiter Brief Terminal v1.0" },
    { type: "output", content: "Type 'help' for available commands." },
    { type: "output", content: "" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `> ${currentInput}` },
    ];

    const result = processCommand(currentInput);
    
    if (result === "__CLEAR__") {
      setLines([
        { type: "output", content: "Recruiter Brief Terminal v1.0" },
        { type: "output", content: "" },
      ]);
    } else {
      newLines.push({ type: "output", content: result });
      newLines.push({ type: "output", content: "" });
      setLines(newLines);
    }

    setHistory((prev) => [...prev, currentInput]);
    setHistoryIndex(-1);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-2xl bg-terminal-bg border border-stone-800 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-stone-900 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-3 text-xs font-mono text-stone-500">recruiter-brief</span>
          </div>
          <span className="text-xs font-mono text-stone-600">ESC to close</span>
        </div>

        {/* Terminal content */}
        <div
          ref={containerRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm cursor-text"
          onClick={focusInput}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                line.type === "input"
                  ? "text-terminal-amber"
                  : line.type === "error"
                    ? "text-red-400"
                    : "text-terminal-green"
              }`}
            >
              {line.content || "\u00A0"}
            </div>
          ))}
          
          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-terminal-amber mr-2">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-terminal-green outline-none caret-terminal-green"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="w-2 h-4 bg-terminal-green animate-terminal-blink" />
          </form>
        </div>

        {/* Help hint */}
        <div className="px-4 py-2 bg-stone-900/50 border-t border-stone-800">
          <p className="text-xs font-mono text-stone-600">
            Commands: whoami, experience, projects, skills, contact, resume, linky, core, gynka, ask {"<question>"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface CRTTerminalButtonProps {
  className?: string;
}

export function CRTTerminalButton({ className = "" }: CRTTerminalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border bg-surface-card text-stone-400 hover:border-terminal-green/30 hover:text-terminal-green transition-all ${className}`}
        aria-label="Open recruiter terminal"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-mono">Recruiter Brief</span>
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && <Terminal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default CRTTerminalButton;
