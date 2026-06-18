import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Journey from "@/components/sections/Journey";
import GithubDashboard from "@/components/sections/GithubDashboard";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-neon-blue selection:text-black">
      {/* Universal Apple/Stripe-style Navbar */}
      <Navbar />

      {/* Hero 3D Particle Galaxy landing section */}
      <Hero />

      {/* Main sections wrapper */}
      <main className="relative z-10">
        {/* Startup launch projects cards & details dashboard */}
        <Projects />

        {/* Dynamic skills coordinate connection web */}
        <TechStack />

        {/* GSAP scroll-stepped career journey timeline */}
        <Journey />

        {/* Live engineer performance analytics & contrib charts */}
        <GithubDashboard />

        {/* Encrypted contact logger & submission reactions */}
        <Contact />
      </main>

      {/* Global premium footer */}
      <footer className="w-full bg-[#030303] border-t border-white/5 py-12 px-6 md:px-12 text-center text-zinc-600 font-mono text-[10px] uppercase tracking-wider relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Alex Rivers. All telemetry protocols reserved.</p>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-white transition-colors duration-300">Back To Core</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GitHub API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
