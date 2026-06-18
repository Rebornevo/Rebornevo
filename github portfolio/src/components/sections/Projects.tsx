"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Activity, Network, Terminal, CheckCircle2, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: { name: string; val: string }[];
  features: string[];
  tech: string[];
  architecture: {
    nodes: { label: string; x: number; y: number; type: string }[];
    connections: { from: number; to: number }[];
  };
  terminalLogs: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    id: "pulse",
    title: "Pulse AI (Copilot Engine)",
    category: "SaaS Platform & AI",
    description: "Enterprise-grade AI copilot automating developer workflows. Features real-time state synchronization, context window management, and active semantic caching.",
    metrics: [
      { name: "Query Latency", val: "12ms" },
      { name: "Active Agents", val: "150k" },
      { name: "LLM Cache Hits", val: "94.2%" }
    ],
    features: [
      "Real-time code stream mapping for dynamic contexts",
      "Dynamic semantic cache clustering to cut API costs",
      "Multi-model LLM integration layer with hot-swapping"
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js", "GraphQL", "Docker"],
    architecture: {
      nodes: [
        { label: "React Frontend", x: 50, y: 50, type: "client" },
        { label: "Node.js WS Gateway", x: 200, y: 50, type: "backend" },
        { label: "FastAPI LLM Mesh", x: 350, y: 25, type: "llm" },
        { label: "Qdrant Vector DB", x: 350, y: 75, type: "db" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 1, to: 3 }
      ]
    },
    terminalLogs: [
      "SYSTEM: Initializing semantic cache engine...",
      "SYSTEM: Connecting to Qdrant vector cluster...",
      "WS: Listening on port 4000 (secured via TLS)",
      "PULSE: Handshaking with OpenAI/Claude APIs...",
      "PULSE: Optimization parameters loaded (T=0.1)",
      "INFO: Engine active. Telemetry pipeline streaming..."
    ],
    github: "https://github.com",
    demo: "https://pulse.ai"
  },
  {
    id: "hyperion",
    title: "Hyperion Cloud Orchestrator",
    category: "DevOps & Cloud Analytics",
    description: "Cloud-native resource tracker optimizing cloud spends dynamically using predictive node scheduling and cost analysis models.",
    metrics: [
      { name: "Database Overhead", val: "Sub-5ms" },
      { name: "Infrastructure Savings", val: "45%" },
      { name: "Monitored Pods", val: "12,400" }
    ],
    features: [
      "Automated autoscaling limit adjustments to trim idle state",
      "Visual dependency mapping for microservice clusters",
      "Instant dry-run cluster config deployments via GitOps"
    ],
    tech: ["React", "TypeScript", "Tailwind", "PostgreSQL", "AWS / Cloud", "Docker"],
    architecture: {
      nodes: [
        { label: "GraphQL Dashboard", x: 50, y: 50, type: "client" },
        { label: "Rust Config Pipeline", x: 200, y: 50, type: "backend" },
        { label: "Kubernetes Cluster", x: 350, y: 25, type: "infra" },
        { label: "PostgreSQL Analytics", x: 350, y: 75, type: "db" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 1, to: 3 }
      ]
    },
    terminalLogs: [
      "SYSTEM: Bootstrapping Hyperion core monitoring...",
      "K8S: Synchronized with AWS EKS control plane...",
      "DB: Connected to Postgres database instance...",
      "ANALYTICS: Resource optimizer algorithm scheduled...",
      "SYSTEM: Core node running on host: 10.0.4.82",
      "READY: Monitoring dashboards operational..."
    ],
    github: "https://github.com",
    demo: "https://hyperion.io"
  },
  {
    id: "orion",
    title: "Orion 3D Spatial Canvas",
    category: "WebGL Engineering",
    description: "Immersive WebGL design engine allowing real-time CAD layout modeling directly inside browsers, leveraging custom vertex buffer rendering algorithms.",
    metrics: [
      { name: "FPS (Locked)", val: "60 FPS" },
      { name: "Asset Load Speed", val: "0.2s" },
      { name: "Max Render Polygons", val: "2.1M" }
    ],
    features: [
      "Custom physical shader mappings and lighting controls",
      "Interactive boundary collision checks on load assets",
      "Instant cloud compression formatting for fast downloads"
    ],
    tech: ["React", "TypeScript", "Three.js", "Tailwind", "AWS / Cloud"],
    architecture: {
      nodes: [
        { label: "ThreeJS Canvas", x: 50, y: 50, type: "client" },
        { label: "Buffer API Node", x: 200, y: 50, type: "backend" },
        { label: "Asset CDN Store", x: 350, y: 50, type: "storage" }
      ],
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2 }
      ]
    },
    terminalLogs: [
      "GL: WebGL Context verified (GLSL ES 3.0)",
      "GL: Instanced drawing configurations loaded...",
      "CDN: Connecting to AWS S3 CloudFront distributions...",
      "GL: Vertex buffer geometries initialized...",
      "PHYSICS: Octree bounding spheres resolved (t=0.01)",
      "ENGINE: System running. 2.1M polygons pre-cached..."
    ],
    github: "https://github.com",
    demo: "https://orion3d.com"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const normX = x / (box.width / 2);
    const normY = y / (box.height / 2);
    
    card.style.setProperty("--rot-x", `${-normY * 8}deg`);
    card.style.setProperty("--rot-y", `${normX * 8}deg`);
    card.style.setProperty("--glow-x", `${e.clientX - box.left}px`);
    card.style.setProperty("--glow-y", `${e.clientY - box.top}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rot-x", `0deg`);
    card.style.setProperty("--rot-y", `0deg`);
  };

  return (
    <section id="projects" className="relative w-full py-28 px-6 md:px-12 bg-black border-t border-zinc-900 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 space-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-neon-blue font-mono text-xs uppercase tracking-widest mb-3">
            <Activity className="w-4 h-4 text-neon-blue animate-pulse" />
            <span>Product Launchpad</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Featured <span className="text-zinc-500 font-light">Launch Engines</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            High-performance applications built from scratch. Explore technical briefs, live server simulations, and production metrics.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedProject(project)}
              style={{
                transform: "perspective(1000px) rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg))",
                transformStyle: "preserve-3d",
              }}
              className="glass-panel p-8 rounded-2xl cursor-pointer hover:border-white/20 transition-all duration-300 relative group select-none hover-target"
            >
              {/* Radial glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(circle 220px at var(--glow-x, 0px) var(--glow-y, 0px), rgba(0, 240, 255, 0.08), transparent 85%)`,
                }}
              />

              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neon-blue uppercase tracking-widest mb-4 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                {/* Card metrics brief */}
                <div>
                  <div className="border-t border-white/5 pt-6 flex justify-between gap-2">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx}>
                        <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono mb-1">{m.name}</p>
                        <p className="text-sm font-semibold text-white font-mono">{m.val}</p>
                      </div>
                    ))}
                    <div className="flex items-center gap-1 text-[10px] font-mono text-neon-purple mt-4 group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>EXPAND ENGINE</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Startup Launch Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl glass-panel-heavy rounded-2xl p-6 md:p-10 z-50 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all duration-300 hover-target"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
                {/* Left Column: Spec Sheet */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-neon-blue uppercase tracking-widest mb-3 block">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {selectedProject.title}
                    </h3>
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-4 mb-8">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Core Functions</p>
                      {selectedProject.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-neon-blue mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Repo */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors duration-300 hover-target"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Launch Application
                    </a>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white font-semibold text-sm hover:bg-white/[0.04] transition-colors duration-300 hover-target"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Inspect Code
                    </a>
                  </div>
                </div>

                {/* Right Column: Server Dashboard Simulation */}
                <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                  {/* Telemetry widgets */}
                  <div className="space-y-4">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Engine Telemetry</p>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex flex-col justify-center">
                          <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono mb-1 truncate">{m.name}</p>
                          <p className="text-xs font-semibold text-white font-mono">{m.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SVG System Architecture Diagram */}
                  <div className="border border-white/5 bg-black/60 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Network className="w-4 h-4 text-neon-purple animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Architecture Routing</span>
                    </div>

                    <div className="relative h-[160px] border border-white/[0.03] bg-black/50 rounded-lg overflow-hidden flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f0ff" />
                            <stop offset="50%" stopColor="#bd00ff" />
                            <stop offset="100%" stopColor="#ff007a" />
                          </linearGradient>
                        </defs>
                        {selectedProject.architecture.connections.map((c, cIdx) => {
                          const from = selectedProject.architecture.nodes[c.from];
                          const to = selectedProject.architecture.nodes[c.to];
                          return (
                            <g key={cIdx}>
                              <line
                                x1={`${(from.x / 400) * 100}%`}
                                y1={`${(from.y / 100) * 100}%`}
                                x2={`${(to.x / 400) * 100}%`}
                                y2={`${(to.y / 100) * 100}%`}
                                stroke="url(#laserGrad)"
                                strokeWidth="1"
                                strokeDasharray="6,6"
                                className="animate-[dash_12s_linear_infinite]"
                                style={{ strokeDashoffset: 100 }}
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {selectedProject.architecture.nodes.map((node, nIdx) => (
                        <div
                          key={nIdx}
                          style={{
                            position: "absolute",
                            left: `${(node.x / 400) * 100}%`,
                            top: `${(node.y / 100) * 100}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-white border border-neon-blue shadow-[0_0_6px_#00f0ff] mb-1" />
                          <span className="text-[8px] font-mono text-zinc-400 bg-black/80 px-1 py-0.5 rounded whitespace-nowrap">
                            {node.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Live Terminal Logs */}
                  <div className="border border-white/5 bg-black/80 p-4 rounded-xl font-mono text-[10px] text-emerald-400 space-y-1">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>LIVE CORE LOGS</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="h-[90px] overflow-y-auto no-scrollbar flex flex-col justify-end space-y-1">
                      {selectedProject.terminalLogs.map((log, lIdx) => (
                        <p key={lIdx} className="leading-normal truncate">
                          {log}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* SVG Path animation style helper */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
