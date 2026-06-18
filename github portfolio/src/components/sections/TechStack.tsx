"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Layers, Globe, Database, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechNode {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "devops";
  x: number; // percentage
  y: number; // percentage
  connections: string[];
  description: string;
  stats: { metric: string; val: string }[];
  confidence: number;
}

const techNodes: TechNode[] = [
  {
    id: "ts",
    name: "TypeScript",
    category: "languages",
    x: 50,
    y: 50,
    connections: ["react", "next", "node", "graphql"],
    description: "Type-safe programming for large-scale enterprise development. Drives architectural robustness, API integrity, and clean compiler contracts.",
    stats: [{ metric: "Production Code", val: "500k+ lines" }, { metric: "Strict Rule Set", val: "Enabled" }],
    confidence: 96,
  },
  {
    id: "next",
    name: "Next.js",
    category: "frontend",
    x: 28,
    y: 35,
    connections: ["ts", "react", "tailwind"],
    description: "Production-ready meta-framework featuring Server Components, App Routing, and optimized build engines for dynamic, fast-loading SEO-perfect applications.",
    stats: [{ metric: "Load Time", val: "Sub-100ms" }, { metric: "SSG/SSR Projects", val: "25+ Live" }],
    confidence: 95,
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    x: 20,
    y: 65,
    connections: ["ts", "next", "three"],
    description: "Modular component engineering utilizing state scheduling, custom lifecycle hook layers, and virtualization protocols for 60fps user interfaces.",
    stats: [{ metric: "State Engines", val: "Redux/Zustand" }, { metric: "Hook Patterns", val: "100+ Custom" }],
    confidence: 98,
  },
  {
    id: "three",
    name: "Three.js",
    category: "frontend",
    x: 38,
    y: 80,
    connections: ["react"],
    description: "High-performance WebGL animations, procedural particle galaxies, shaders, raycasting, and GPU-driven vector math animations.",
    stats: [{ metric: "WebGL Renderer", val: "GPU Bound" }, { metric: "Shader Languages", val: "GLSL" }],
    confidence: 88,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    x: 12,
    y: 45,
    connections: ["next", "react"],
    description: "Utility-first UI engine mapping directly to modern design systems. Configured with CSS custom variables, theme extensions, and dark system states.",
    stats: [{ metric: "Styling Flow", val: "Utility-First" }, { metric: "Build Size", val: "Minimized" }],
    confidence: 97,
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    x: 72,
    y: 42,
    connections: ["ts", "postgres", "graphql", "docker"],
    description: "Asynchronous runtime layer powering backend architecture. Engineered for high-throughput API systems, web sockets, and server streams.",
    stats: [{ metric: "Server Frameworks", val: "Express/NestJS" }, { metric: "API Speed", val: "15ms Latency" }],
    confidence: 92,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "backend",
    x: 88,
    y: 68,
    connections: ["node"],
    description: "Structured database configuration featuring query optimization, row-level locking, JSONB parsing, custom triggers, and index configurations.",
    stats: [{ metric: "Query Optimization", val: "Indexed" }, { metric: "Storage Engines", val: "Relational" }],
    confidence: 90,
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "backend",
    x: 68,
    y: 78,
    connections: ["ts", "node"],
    description: "Flexible query orchestration resolving over-fetching. Configured using type-safe schema compilers, client caching, and batched resolvers.",
    stats: [{ metric: "API Design", val: "Federated" }, { metric: "Query Mapping", val: "Type-safe" }],
    confidence: 89,
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    x: 58,
    y: 20,
    connections: ["node", "aws"],
    description: "Container virtualization standardizing operational environments, container isolation, environment parity, and robust multi-stage builds.",
    stats: [{ metric: "Image Size", val: "Optimized" }, { metric: "Build Strategy", val: "Multi-stage" }],
    confidence: 85,
  },
  {
    id: "aws",
    name: "AWS / Cloud",
    category: "devops",
    x: 82,
    y: 22,
    connections: ["docker"],
    description: "Cloud systems design incorporating Serverless Lambdas, EC2 scaling clusters, S3 asset delivery networks, and global CDN edge routing.",
    stats: [{ metric: "Availability", val: "99.99% SLA" }, { metric: "Hosting Edges", val: "Vercel / AWS" }],
    confidence: 87,
  },
];

export default function TechStack() {
  const [activeTech, setActiveTech] = useState<TechNode>(techNodes[0]);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "languages":
        return <Terminal className="w-4 h-4" />;
      case "frontend":
        return <Layers className="w-4 h-4" />;
      case "backend":
        return <Database className="w-4 h-4" />;
      case "devops":
        return <Globe className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="tech"
      className="relative w-full min-h-screen py-28 px-6 md:px-12 bg-black overflow-hidden flex flex-col justify-center border-t border-zinc-900"
    >
      {/* Background Aura Radial Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 space-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-neon-purple font-mono text-xs uppercase tracking-widest mb-3">
            <Network className="w-4 h-4 text-neon-purple animate-pulse" />
            <span>Infrastructure Map</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Ecosystem <span className="text-zinc-500 font-light">&amp; Connections</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            Interactive relational technology map. Hover or click nodes to trace connection flows, dependency pipelines, and technical specifications.
          </p>
        </div>

        {/* Ecosystem Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Active Tech Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider",
                    activeTech.category === "languages" && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                    activeTech.category === "frontend" && "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                    activeTech.category === "backend" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                    activeTech.category === "devops" && "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20"
                  )}
                >
                  {activeTech.category}
                </span>
                <span className="text-zinc-500 text-xs font-mono">SYS_NODE_ID: {activeTech.id.toUpperCase()}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    {getCategoryIcon(activeTech.category)}
                    {activeTech.name}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                    {activeTech.description}
                  </p>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {activeTech.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono mb-1">{stat.metric}</p>
                        <p className="text-sm font-semibold text-white font-mono">{stat.val}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Confidence Slider Meter */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-500 uppercase tracking-widest">Ecosystem Confidence</span>
                <span className="text-neon-blue">{activeTech.confidence}%</span>
              </div>
              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeTech.confidence}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_8px_#00f0ff]"
                />
              </div>
            </div>
          </div>

          {/* Right: SVG Node Network Graph */}
          <div className="lg:col-span-7 relative bg-white/[0.01] border border-white/5 rounded-2xl h-[450px] md:h-[600px] overflow-hidden select-none">
            {/* Connection SVG Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {techNodes.map((node) => {
                return node.connections.map((connId) => {
                  const target = techNodes.find((n) => n.id === connId);
                  if (!target) return null;

                  const isHighlit =
                    hoveredTechId === node.id ||
                    hoveredTechId === target.id ||
                    (activeTech.id === node.id && hoveredTechId === null) ||
                    (activeTech.id === target.id && hoveredTechId === null);

                  return (
                    <line
                      key={`${node.id}-${connId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isHighlit ? "#bd00ff" : "rgba(255, 255, 255, 0.04)"}
                      strokeWidth={isHighlit ? "1.5" : "0.5"}
                      className={cn(
                        "transition-all duration-300",
                        isHighlit && "animate-pulse stroke-glow"
                      )}
                    />
                  );
                });
              })}
            </svg>

            {/* Tech Nodes Buttons Layer */}
            {techNodes.map((node) => {
              const isActive = activeTech.id === node.id;
              const isHovered = hoveredTechId === node.id;
              const isConnected =
                hoveredTechId !== null &&
                (hoveredTechId === node.id ||
                  node.connections.includes(hoveredTechId) ||
                  techNodes.find((n) => n.id === hoveredTechId)?.connections.includes(node.id));

              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="z-10 group"
                  onMouseEnter={() => setHoveredIdxAndHighlight(node.id)}
                  onMouseLeave={() => setHoveredTechId(null)}
                  onClick={() => setActiveTech(node)}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={cn(
                      "cursor-pointer flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300 border hover-target",
                      isActive
                        ? "bg-black border-neon-blue text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                        : isConnected
                        ? "bg-black/80 border-neon-purple text-zinc-200"
                        : "bg-black/90 border-white/5 text-zinc-500 group-hover:border-white/20 group-hover:text-zinc-300"
                    )}
                  >
                    <span className="text-[10px] md:text-xs font-mono font-medium whitespace-nowrap px-2">
                      {node.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  function setHoveredIdxAndHighlight(nodeId: string) {
    setHoveredTechId(nodeId);
  }
}
