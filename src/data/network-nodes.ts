export interface NetworkNode {
  id: string;
  label: string;
  tier: "core" | "primary" | "secondary" | "tertiary";
  position: [number, number, number];
  color: string;
  linkedSection?: string;
  scale?: number;
  description?: string;
  tech?: string[];
}

export interface NetworkConnection {
  source: string;
  target: string;
  strength?: number;
}

export const networkNodes: NetworkNode[] = [
  // Core node — JCG monogram (center of sphere) — also the About node
  {
    id: "jcg",
    label: "JCG",
    tier: "core",
    position: [0, 0, 0],
    color: "#00d4ff",
    scale: 1.4,
    linkedSection: "about",
    description: "TCU Computer Science graduate, Junior AI Developer at yorCMO.ai. Originally from Nicaragua, building AI solutions for Latin American businesses.",
  },
  // Primary project nodes — radius ~3.0, front hemisphere, 120° apart
  {
    id: "panelcast",
    label: "PanelCast",
    tier: "primary",
    position: [-2.1, 1.5, 1.5],
    color: "#00d4ff",
    linkedSection: "projects",
    description: "Production SaaS that transforms panel discussions into multi-format content. Built solo from scratch — handles audio processing, AI transcription, and content generation. Serves paying customers in production.",
    tech: ["Next.js", "Python", "OpenAI"],
  },
  {
    id: "beast-ai",
    label: "Beast AI",
    tier: "primary",
    position: [2.1, 1.5, 1.5],
    color: "#38bdf8",
    linkedSection: "projects",
    description: "AI-powered content generation platform for marketing teams at yorCMO.ai. Uses LangChain pipelines to generate blog posts, social media, and email campaigns from minimal input.",
    tech: ["LangChain", "FastAPI", "React"],
  },
  {
    id: "bug-butler",
    label: "Bug Butler",
    tier: "primary",
    position: [0, -1.8, 2.4],
    color: "#60a5fa",
    linkedSection: "opensource",
    description: "Open-source VS Code extension that uses AI to debug code contextually. Analyzes error traces, suggests fixes, and explains bugs in plain language. Winner of community recognition.",
    tech: ["TypeScript", "VS Code API", "OpenAI"],
  },
  // Secondary project nodes — radius ~3.5, mid-latitudes
  {
    id: "boleto",
    label: "Bole.to",
    tier: "secondary",
    position: [2.5, -0.5, -2.0],
    color: "#00d4ff",
    linkedSection: "projects",
    description: "Social ticketing platform for events in Latin America. Mobile-first with real-time ticket management and social sharing features.",
    tech: ["Next.js", "React Native", "Supabase"],
  },
  {
    id: "jarvis",
    label: "Jasper AI",
    tier: "secondary",
    position: [-1.5, 2.5, -1.5],
    color: "#38bdf8",
    linkedSection: "projects",
    description: "AI productivity assistant with natural conversation interface. Integrates with Google Calendar, Gmail, and task management through voice and text.",
    tech: ["React", "OpenAI", "Google APIs"],
  },
  {
    id: "frogcrew",
    label: "FrogCrew",
    tier: "secondary",
    position: [0, -3.2, -1.5],
    color: "#60a5fa",
    linkedSection: "projects",
    description: "Crew scheduling and management platform for TCU sports broadcasting. Handles shift assignments, availability tracking, and real-time coordination.",
    tech: ["Vue 3", "Spring Boot"],
  },
  {
    id: "pearlwolf",
    label: "Social Hour",
    tier: "secondary",
    position: [1.5, -2.5, -1.5],
    color: "#38bdf8",
    linkedSection: "projects",
    description: "Full marketing website and brand identity for Social Hour Studio. Custom animations, responsive design, and content management.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  // Section nodes — radius ~3.8, distributed around sphere
  {
    id: "experience",
    label: "EXPERIENCE",
    tier: "secondary",
    position: [-3.0, 0.5, -2.0],
    color: "#38bdf8",
    linkedSection: "experience",
    scale: 1.3,
    description: "Professional journey from Fortune 500 (Cargill) to AI startups. Currently at yorCMO.ai building production AI systems. Previous experience at AtomChat and freelance work in Nicaragua.",
  },
  {
    id: "mission",
    label: "MISSION",
    tier: "secondary",
    position: [-2.5, -1.5, -1.0],
    color: "#00d4ff",
    linkedSection: "mission",
    scale: 1.3,
    description: "On a mission to bring safe, adequate AI adoption to Latin American businesses. Starting in Nicaragua with plans to expand across the region.",
  },
  {
    id: "stack",
    label: "STACK",
    tier: "secondary",
    position: [0, 3.2, -1.5],
    color: "#60a5fa",
    linkedSection: "stack",
    description: "Full-stack AI engineering toolkit. Python and TypeScript core, with React/Next.js frontend, LangChain/OpenAI for AI, and Supabase/PostgreSQL for data.",
  },
  {
    id: "contact",
    label: "CONTACT",
    tier: "secondary",
    position: [3.0, 0.5, -2.0],
    color: "#00d4ff",
    linkedSection: "contact",
    scale: 1.5,
    description: "Open to collaborations, consulting, and new opportunities. Based in Nicaragua, working globally. Let's build something impactful together.",
  },
  // Tertiary — scattered on outer sphere (radius ~5) for depth
  { id: "t1", label: "", tier: "tertiary", position: [-3.5, 2.8, -2.8], color: "#00d4ff" },
  { id: "t2", label: "", tier: "tertiary", position: [3.8, -1.2, -2.5], color: "#38bdf8" },
  { id: "t3", label: "", tier: "tertiary", position: [1.0, 4.0, -2.5], color: "#60a5fa" },
  { id: "t4", label: "", tier: "tertiary", position: [-2.5, -3.5, -2.8], color: "#00d4ff" },
  { id: "t5", label: "", tier: "tertiary", position: [3.5, 3.0, -2.5], color: "#38bdf8" },
  { id: "t6", label: "", tier: "tertiary", position: [-1.0, -4.2, -2.0], color: "#60a5fa" },
  { id: "t7", label: "", tier: "tertiary", position: [4.2, 1.5, -2.0], color: "#00d4ff" },
  { id: "t8", label: "", tier: "tertiary", position: [-4.5, -0.5, -2.2], color: "#38bdf8" },
  { id: "t9", label: "", tier: "tertiary", position: [2.0, -4.0, -2.5], color: "#60a5fa" },
  { id: "t10", label: "", tier: "tertiary", position: [-2.0, 4.2, -2.5], color: "#00d4ff" },
];

export const networkConnections: NetworkConnection[] = [
  // Core → project nodes (strong)
  { source: "jcg", target: "panelcast", strength: 1 },
  { source: "jcg", target: "beast-ai", strength: 1 },
  { source: "jcg", target: "bug-butler", strength: 1 },
  { source: "jcg", target: "boleto", strength: 0.8 },
  { source: "jcg", target: "jarvis", strength: 0.8 },
  { source: "jcg", target: "frogcrew", strength: 0.7 },
  { source: "jcg", target: "pearlwolf", strength: 0.6 },
  // Core → section nodes
  { source: "jcg", target: "experience", strength: 0.6 },
  { source: "jcg", target: "mission", strength: 0.7 },
  { source: "jcg", target: "stack", strength: 0.6 },
  { source: "jcg", target: "contact", strength: 0.5 },
  // Cross-connections (shared tech, relationships)
  { source: "panelcast", target: "beast-ai", strength: 0.5 },
  { source: "panelcast", target: "stack", strength: 0.4 },
  { source: "beast-ai", target: "bug-butler", strength: 0.4 },
  { source: "bug-butler", target: "stack", strength: 0.4 },
  { source: "boleto", target: "panelcast", strength: 0.3 },
  { source: "jarvis", target: "beast-ai", strength: 0.3 },
  { source: "experience", target: "panelcast", strength: 0.3 },
  { source: "experience", target: "beast-ai", strength: 0.3 },
  { source: "mission", target: "boleto", strength: 0.4 },
  { source: "mission", target: "jcg", strength: 0.3 },
  { source: "frogcrew", target: "experience", strength: 0.3 },
  { source: "pearlwolf", target: "mission", strength: 0.3 },
  { source: "contact", target: "mission", strength: 0.3 },
  // Tertiary atmosphere
  { source: "t1", target: "experience", strength: 0.15 },
  { source: "t2", target: "contact", strength: 0.15 },
  { source: "t3", target: "stack", strength: 0.15 },
  { source: "t4", target: "pearlwolf", strength: 0.15 },
  { source: "t5", target: "beast-ai", strength: 0.15 },
  { source: "t6", target: "mission", strength: 0.15 },
  { source: "t7", target: "contact", strength: 0.15 },
  { source: "t8", target: "experience", strength: 0.15 },
  { source: "t9", target: "contact", strength: 0.15 },
  { source: "t10", target: "jarvis", strength: 0.15 },
];

// Mobile node chain (vertical layout)
export const mobileNodes = [
  { id: "work", label: "WORK", linkedSection: "projects" },
  { id: "about", label: "ABOUT", linkedSection: "about" },
  { id: "experience", label: "EXPERIENCE", linkedSection: "experience" },
  { id: "mission", label: "MISSION", linkedSection: "mission" },
  { id: "stack", label: "STACK", linkedSection: "stack" },
  { id: "opensource", label: "OPEN SOURCE", linkedSection: "opensource" },
  { id: "contact", label: "CONTACT", linkedSection: "contact" },
];
