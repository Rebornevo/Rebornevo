"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Trophy, History } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  iconType: "work" | "study" | "achievement";
  achievements: string[];
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: "2024 - PRESENT",
    role: "Lead Design Engineer",
    company: "TechHive SaaS",
    description: "Spearheaded the frontend architecture overhaul of the enterprise analytics platform, integrating design tokens and sub-millisecond charting metrics.",
    iconType: "work",
    achievements: ["Reduced web load times by 45%", "Managed a team of 4 design engineers", "Re-engineered design systems across 3 products"]
  },
  {
    id: 2,
    year: "2022 - 2024",
    role: "Senior Full Stack Engineer",
    company: "Apex Labs",
    description: "Developed and optimized robust backend pipelines, real-time sync systems, and GraphQL databases handling thousands of concurrent sessions.",
    iconType: "work",
    achievements: ["Configured 15ms latency GraphQL endpoints", "Set up Dockerized microservice architecture", "Integrated automated cloud deployment pipelines"]
  },
  {
    id: 3,
    year: "2020 - 2022",
    role: "Co-Founder & CTO",
    company: "Nexus Spatial Web",
    description: "Bootstrapped a WebGL catalog creation platform for digital retail spaces, using React Three Fiber and customized vertex shader buffers.",
    iconType: "achievement",
    achievements: ["Raised $850k in pre-seed funding", "Built and optimized 3D configurator engines", "Onboarded first 12 enterprise clients"]
  },
  {
    id: 4,
    year: "2016 - 2020",
    role: "B.S. in Computer Science",
    company: "Stanford University",
    description: "Specialized in computer graphics algorithms, distributed networks, and human-computer interaction designs. Graduated with Honors.",
    iconType: "study",
    achievements: ["Academic honors list for 3 years", "Developed open-source canvas drawing libraries", "TA for advanced Web Application architecture"]
  }
];

export default function Journey() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    // GSAP ScrollTrigger to scale the central timeline line based on scrolling
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-5 h-5 text-neon-blue" />;
      case "study":
        return <GraduationCap className="w-5 h-5 text-neon-pink" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-neon-purple animate-pulse" />;
      default:
        return <History className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-12 bg-black border-t border-zinc-900 overflow-hidden"
    >
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <div className="flex items-center gap-2 text-neon-purple font-mono text-xs uppercase tracking-widest mb-3">
            <History className="w-4 h-4 text-neon-purple animate-pulse" />
            <span>Interactive History</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Developer <span className="text-zinc-500 font-light">Journey Timeline</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            A linear trace of career milestones, startup launches, and engineering accomplishments. Scroll down to expand the path.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-zinc-900 -translate-x-1/2 pointer-events-none">
            {/* GSAP Scaled active glow line */}
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink rounded-full origin-top shadow-[0_0_8px_#bd00ff]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.id}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Indicator Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-8 h-8 rounded-full bg-black border-2 border-zinc-800 -translate-x-1/2 z-10 flex items-center justify-center shadow-lg group">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-neon-blue group-hover:scale-125 transition-all duration-300" />
                  </div>

                  {/* Empty space block for spacing (Desktop only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 py-2"
                  >
                    <div className="glass-panel p-6 md:p-8 rounded-2xl relative hover:border-white/15 transition-all duration-300 hover:scale-[1.01] hover-target">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        {getIcon(milestone.iconType)}
                      </div>

                      <span className="inline-block px-3 py-1 rounded-full text-[9px] font-mono font-bold text-neon-blue bg-neon-blue/10 border border-neon-blue/20 tracking-wider mb-4">
                        {milestone.year}
                      </span>

                      <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                        {milestone.role}
                      </h3>
                      <p className="text-sm font-mono text-zinc-500 mb-4">{milestone.company}</p>

                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        {milestone.description}
                      </p>

                      {/* Achievements breakdown list */}
                      <div className="border-t border-white/5 pt-4 space-y-2">
                        {milestone.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-center gap-2 text-xs text-zinc-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
