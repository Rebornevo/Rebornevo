"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerExplosion = () => {
    const colors = ["#00f0ff", "#bd00ff", "#ff007a", "#ffffff"];
    const newParticles: Particle[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300, // random offset
      y: (Math.random() - 0.5) * 300,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
    }));
    setParticles(newParticles);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("sending");
    setLogs(["SECURE_CON: Establishing secure socket tunnel...", "ENCRYPTION: Initializing RSA-4096 handshake..."]);

    // Simulating developer-style log streaming
    setTimeout(() => {
      setLogs((prev) => [...prev, "TUNNEL: Socket handshaked successfully.", "PAYLOAD: Compiling transmission packets..."]);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [...prev, "GATEWAY: Delivering payload to core mailer...", "STATUS: Transmit successful (HTTP 200 OK)"]);
    }, 1200);

    setTimeout(() => {
      setStatus("success");
      triggerExplosion();
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-6 md:px-12 bg-black border-t border-zinc-900 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 space-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20 text-center items-center">
          <div className="flex items-center gap-2 text-neon-pink font-mono text-xs uppercase tracking-widest mb-3">
            <Mail className="w-4 h-4 text-neon-pink animate-pulse" />
            <span>Secure Mailbox</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Start <span className="text-zinc-500 font-light">A Conversation</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            Send encrypted messages directly to my pipeline workspace. Enter details below to initialize connection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Terminal Log & Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 rounded-2xl relative">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <span className="text-xs font-mono text-zinc-400">TELEMETRY_TERMINAL</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-neon-blue animate-pulse" />
                  SSL ACTIVE
                </span>
              </div>

              {/* Logger Screen */}
              <div className="bg-zinc-950/80 p-4 rounded-xl font-mono text-[10px] text-zinc-400 border border-white/5 h-[160px] overflow-y-auto mb-8 space-y-1.5 no-scrollbar">
                <p className="text-zinc-600">// Waiting for input transmission...</p>
                {name && <p className="text-neon-blue">PAYLOAD: name=&quot;{name}&quot;</p>}
                {email && <p className="text-neon-purple">PAYLOAD: email=&quot;{email}&quot;</p>}
                {message && <p className="text-neon-pink">PAYLOAD: message=&quot;{message.slice(0, 25)}...&quot;</p>}
                {logs.map((log, idx) => (
                  <p key={idx} className="text-emerald-400 animate-pulse">
                    &gt; {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Social Panel */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">DIRECT CHANNELS</span>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-all duration-300 hover-target"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-all duration-300 hover-target"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-all duration-300 hover-target"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Immersive Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl relative backdrop-blur-md">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form
                  key="form"
                  onSubmit={handleSend}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/30 transition-all duration-300"
                        placeholder="Your Name"
                      />
                    </div>

                    {/* Email input */}
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/30 transition-all duration-300"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink/30 transition-all duration-300 resize-none"
                      placeholder="Transmission Content..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "w-full py-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-300 hover-target active:scale-[0.99]",
                      status === "sending" && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {status === "sending" ? (
                      <>
                        <Terminal className="w-4 h-4 animate-spin" />
                        Transmitting Node Payload...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center relative h-full"
                >
                  {/* Confetti Particles */}
                  <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
                    {particles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute rounded-full"
                        style={{
                          backgroundColor: p.color,
                          width: p.size,
                          height: p.size,
                          boxShadow: `0 0 10px ${p.color}`,
                        }}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">Message Transmitted</h3>
                  <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
                    Connection confirmed. Message payload has been securely buffered in the dashboard pipeline inbox.
                  </p>

                  <button
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setMessage("");
                      setLogs([]);
                      setStatus("idle");
                    }}
                    className="px-6 py-2 rounded-full border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-400 hover:text-white transition-all duration-300 hover-target"
                  >
                    Transmit Another Payload
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
