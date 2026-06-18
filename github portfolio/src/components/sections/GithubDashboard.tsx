"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, GitPullRequest, Star, Layers, Activity, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RepoHighlight {
  name: string;
  desc: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  buildStatus: "passing" | "failing";
  coverage: string;
}

const repos: RepoHighlight[] = [
  {
    name: "pulse-copilot-engine",
    desc: "Active Semantic LLM caching layer with WebSocket pipeline streaming.",
    language: "TypeScript",
    langColor: "bg-blue-500",
    stars: 382,
    forks: 41,
    buildStatus: "passing",
    coverage: "98.4%"
  },
  {
    name: "hyperion-agent-rust",
    desc: "Predictive resource autoscaler daemon for Kubernetes clusters.",
    language: "Rust",
    langColor: "bg-amber-600",
    stars: 189,
    forks: 18,
    buildStatus: "passing",
    coverage: "100%"
  }
];

// Generate fake GitHub contributions: 24 weeks * 7 days
interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0 to 4
}

export default function GithubDashboard() {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [activeRepoIdx, setActiveRepoIdx] = useState<number>(0);

  // Generate mock contribution calendar data
  const contributions = useMemo(() => {
    const data: ContributionDay[] = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 24 * 7);

    for (let i = 0; i < 24 * 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const rand = Math.random();
      let count = 0;
      let level = 0;

      if (rand > 0.85) {
        count = Math.floor(Math.random() * 8) + 5;
        level = 4;
      } else if (rand > 0.6) {
        count = Math.floor(Math.random() * 4) + 2;
        level = 3;
      } else if (rand > 0.3) {
        count = 1;
        level = 2;
      } else if (rand > 0.1) {
        count = 0;
        level = 1;
      }

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count,
        level,
      });
    }
    return data;
  }, []);

  return (
    <section
      id="dashboard"
      className="relative w-full py-28 px-6 md:px-12 bg-black border-t border-zinc-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 space-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-neon-blue font-mono text-xs uppercase tracking-widest mb-3">
            <Activity className="w-4 h-4 text-neon-blue animate-pulse" />
            <span>Engineering Telemetry</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Production <span className="text-zinc-500 font-light">Analytics Dashboard</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            Live developer velocity analytics. Integrates real-time contribution maps, active codebase stats, and service deployment logs.
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stats Bar */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-4">
                <span>COMMIT VELOCITY</span>
                <GitBranch className="w-4 h-4 text-neon-blue" />
              </div>
              <div>
                <p className="text-3xl font-bold font-mono text-white">2,482</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-1">+12.4% this month</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-4">
                <span>PR MERGE SPEED</span>
                <GitPullRequest className="w-4 h-4 text-neon-purple" />
              </div>
              <div>
                <p className="text-3xl font-bold font-mono text-white">42 min</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-1">Top 2% Globally</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-4">
                <span>TEST COVERAGE</span>
                <ShieldCheck className="w-4 h-4 text-neon-pink" />
              </div>
              <div>
                <p className="text-3xl font-bold font-mono text-white">99.8%</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">All pipelines green</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-4">
                <span>DEPLOY SLA</span>
                <Server className="w-4 h-4 text-neon-blue" />
              </div>
              <div>
                <p className="text-3xl font-bold font-mono text-white">99.99%</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-1">High Availability</p>
              </div>
            </div>
          </div>

          {/* Left: Contributions Map */}
          <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="text-xs font-mono text-zinc-400">COMMIT CONTRIB_MAP (24 WEEKS)</span>
                <span className="text-[10px] font-mono text-zinc-500">SYS: OPERATIONAL</span>
              </div>

              {/* Grid Calendar */}
              <div className="relative">
                <div className="grid grid-cols-24 gap-[4px] md:gap-[6px] max-w-full overflow-x-auto no-scrollbar py-2">
                  {Array.from({ length: 24 }).map((_, weekIdx) => (
                    <div key={weekIdx} className="grid grid-rows-7 gap-[4px] md:gap-[6px]">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const dayData = contributions[weekIdx * 7 + dayIdx];
                        if (!dayData) return null;

                        return (
                          <div
                            key={dayIdx}
                            className={cn(
                              "w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-all duration-200 cursor-crosshair hover:scale-125 hover:z-10",
                              dayData.level === 0 && "bg-zinc-950 border border-zinc-900",
                              dayData.level === 1 && "bg-neon-blue/10 border border-neon-blue/5",
                              dayData.level === 2 && "bg-neon-blue/30",
                              dayData.level === 3 && "bg-neon-purple/60",
                              dayData.level === 4 && "bg-neon-pink shadow-[0_0_8px_#ff007a]"
                            )}
                            onMouseEnter={() => setHoveredDay(dayData)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Day Hover Tooltip */}
                <div className="h-6 mt-4">
                  <AnimatePresence mode="wait">
                    {hoveredDay ? (
                      <motion.p
                        key={hoveredDay.date}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs font-mono text-zinc-300"
                      >
                        {hoveredDay.date} &mdash; <span className="text-neon-blue font-bold">{hoveredDay.count} commits</span>
                      </motion.p>
                    ) : (
                      <p className="text-xs font-mono text-zinc-500">Hover nodes to inspect individual commit payloads.</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-400">DEPLOYMENT RESPONSE LATENCY (MS)</span>
                <span className="text-[10px] text-zinc-500 font-mono">24H AVERAGE: 12ms</span>
              </div>
              <div className="h-28 w-full border border-white/[0.03] bg-black/45 rounded-xl flex items-center justify-center overflow-hidden px-4 relative">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  {/* Glowing neon paths */}
                  <path
                    d="M 0 80 Q 50 20 100 60 T 200 15 T 300 45 T 400 30"
                    fill="none"
                    stroke="url(#latencyGrad)"
                    strokeWidth="2"
                    className="opacity-90 shadow-glow"
                  />
                  <defs>
                    <linearGradient id="latencyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f0ff" />
                      <stop offset="60%" stopColor="#bd00ff" />
                      <stop offset="100%" stopColor="#ff007a" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-2 left-4 text-[9px] font-mono text-zinc-500">00:00</div>
                <div className="absolute bottom-2 right-4 text-[9px] font-mono text-zinc-500">23:59</div>
              </div>
            </div>
          </div>

          {/* Right: Repository Specs */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="glass-panel p-6 rounded-2xl backdrop-blur-md flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-zinc-400">ACTIVE REPOSITORIES</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="space-y-4">
                  {repos.map((repo, idx) => (
                    <div
                      key={repo.name}
                      onClick={() => setActiveRepoIdx(idx)}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300 cursor-pointer hover-target",
                        activeRepoIdx === idx
                          ? "bg-white/[0.02] border-neon-blue shadow-[0_0_12px_rgba(0,240,255,0.1)]"
                          : "bg-transparent border-white/5 hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm font-bold text-white font-mono truncate">{repo.name}</h4>
                        <span className={cn("w-1.5 h-1.5 rounded-full", repo.langColor)} />
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-normal">{repo.desc}</p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-zinc-500" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-zinc-500" />
                          COV: {repo.coverage}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Repo Pipeline Logs */}
              <div className="border-t border-white/5 pt-6 mt-6">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">CI/CD BUILD LOGS</span>
                <div className="bg-zinc-950 p-4 rounded-xl font-mono text-[9px] text-zinc-400 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-400 border-b border-white/5 pb-1.5 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>BUILDS PASSING</span>
                    </span>
                    <span>100% OK</span>
                  </div>
                  <p className="text-zinc-500">running build task list...</p>
                  <p>&gt; check lint standards... PASS</p>
                  <p>&gt; bundle bundle configs... OK (142kb)</p>
                  <p>&gt; edge optimization run... SUCCESS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .grid-cols-24 {
          grid-template-columns: repeat(24, minmax(0, 1fr));
        }
      `}</style>
    </section>
  );
}
