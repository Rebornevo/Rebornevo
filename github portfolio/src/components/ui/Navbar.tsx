"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Tech Network", href: "#tech" },
  { name: "Journey", href: "#journey" },
  { name: "Dashboard", href: "#dashboard" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Active section detection
      const scrollPos = window.scrollY + 250;
      for (const item of navItems) {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 md:px-12 py-4",
          isScrolled ? "bg-black/40 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-white font-mono font-semibold tracking-wider hover:text-neon-blue transition-colors duration-300"
          >
            <Terminal className="w-5 h-5 text-neon-blue animate-pulse-slow" />
            <span>ALEX.RIVERS()</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 relative px-1.5 py-1 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Sliding pill indicator */}
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-0 bg-white/5 rounded-full z-[-1]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-neon-blue rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors duration-300 hover:scale-110"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-white/5 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] bg-black/95 backdrop-blur-lg z-30 flex flex-col px-8 py-12 md:hidden gap-6 border-t border-white/5"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-medium text-zinc-300 hover:text-neon-blue transition-colors duration-300 py-2 border-b border-zinc-800/50"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-6 mt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                <GithubIcon className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-3 text-center rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors duration-300"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
