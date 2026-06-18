"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Activity, ShieldCheck } from "lucide-react";

const HeroCanvas = dynamic(() => import("../canvas/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20 px-6 md:px-12"
    >
      {/* 3D Canvas Background */}
      <HeroCanvas />

      {/* Deep space overlay shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none z-[1]" />
      <div className="absolute inset-0 space-grid pointer-events-none z-[1]" />

      {/* Floating System Glass Cards (Stripe/Apple aesthetic) */}
      <div className="absolute inset-x-0 bottom-24 max-w-7xl mx-auto px-6 hidden xl:flex justify-between pointer-events-none z-[2]">
        {/* Card 1: System Health */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-panel p-4 rounded-xl flex items-center gap-3 backdrop-blur-md pointer-events-auto"
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Engine Status</p>
            <p className="text-xs font-semibold text-white font-mono">DEPLOYED & ACTIVE</p>
          </div>
        </motion.div>

        {/* Card 2: Security */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="glass-panel p-4 rounded-xl flex items-center gap-3 backdrop-blur-md pointer-events-auto"
        >
          <div className="p-2 rounded-lg bg-indigo-500/10 text-neon-blue">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Network Core</p>
            <p className="text-xs font-semibold text-white font-mono">SECURE (SSL/HTTPS)</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-[2] select-none pointer-events-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-400 font-mono mb-8 hover:border-white/20 transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-blue animate-spin-slow" />
          <span>OPEN FOR COLLABORATIONS</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
          >
            Building Digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-glow-blue"
          >
            Experiences That Matter
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-2xl text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10 font-sans px-4"
        >
          Full Stack Developer crafting scalable products, exceptional interfaces, and high-performance web applications.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 justify-center"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/5 active:scale-95"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.08] hover:border-white/30 text-sm font-semibold flex items-center justify-center transition-all duration-300 backdrop-blur-sm active:scale-95"
          >
            Let&apos;s Connect
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[2] opacity-60">
        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_#00f0ff]"
        />
      </div>
    </section>
  );
}
