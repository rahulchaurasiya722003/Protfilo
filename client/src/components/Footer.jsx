"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";
import { LinkedinIcon, GithubIcon } from "./SocialIcons";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 relative" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-blue-500/30 overflow-hidden shadow-lg shadow-blue-500/20 flex items-center justify-center p-0.5 relative">
              <Image
                src={personalDetails.logo}
                alt={`${personalDetails.name} Logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{personalDetails.name}</h3>
              <p className="text-xs text-cyan-400 font-mono">Full Stack Developer (MERN Stack)</p>
            </div>
          </div>

          {/* Nav Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-350 font-medium" aria-label="Footer Navigation">
            <a href="#about" className="hover:text-white transition-colors focus-ring rounded px-1">About</a>
            <a href="#skills" className="hover:text-white transition-colors focus-ring rounded px-1">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors focus-ring rounded px-1">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors focus-ring rounded px-1">Experience</a>
            <a href="#education" className="hover:text-white transition-colors focus-ring rounded px-1">Education</a>
            <a href="#contact" className="hover:text-white transition-colors focus-ring rounded px-1">Contact</a>
          </nav>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={personalDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-white hover:border-blue-500/50 transition-all focus-ring"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-400" aria-hidden="true" />
            </a>
            <a
              href={personalDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-white hover:border-purple-500/50 transition-all focus-ring"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 text-purple-400" aria-hidden="true" />
            </a>
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 10 }}
                  onClick={scrollToTop}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-transform focus-ring"
                  aria-label="Scroll back to top of page"
                >
                  <ArrowUp className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {personalDetails.name}. All rights reserved.</p>
          <p className="font-mono text-cyan-400">
            Designed &amp; Developed with ❤️ by <span className="text-white font-bold">{personalDetails.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
