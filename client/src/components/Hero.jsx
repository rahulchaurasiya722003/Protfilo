"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Mail, Send, Phone, Sparkles, Code2 } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";
import { LinkedinIcon, GithubIcon } from "./SocialIcons";

const typewriterTitles = [
  "Full Stack Developer (MERN Stack)",
  "React.js & Node.js Specialist",
  "AI Applications Developer",
  "RESTful API & Backend Architect",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetTitle = typewriterTitles[titleIndex];
    let timeout;

    if (!isDeleting && currentText.length < targetTitle.length) {
      timeout = setTimeout(() => {
        setCurrentText(targetTitle.substring(0, currentText.length + 1));
      }, 70);
    } else if (!isDeleting && currentText.length === targetTitle.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(targetTitle.substring(0, currentText.length - 1));
      }, 40);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % typewriterTitles.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Animated Gradient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-700/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-700/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-blue-500/30 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono text-cyan-300 tracking-wide">Available for Full-time Roles &amp; Projects</span>
            </div>

            {/* Main Greeting */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Hi, I&apos;m <span className="gradient-text">{personalDetails.name}</span>
              </h1>
              <div className="h-12 mt-2 flex items-center">
                <span className="sr-only">
                  Specializing in: {typewriterTitles.join(", ")}
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-slate-300 font-mono" aria-hidden="true">
                  <span className="text-blue-400">&gt; </span>
                  {currentText}
                  <span className="animate-pulse text-cyan-400 font-bold">|</span>
                </p>
              </div>
            </div>

            {/* Short Introduction */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Full Stack Developer building high-performance MERN stack applications — contributor to MCM live production projects <span className="text-blue-400 font-medium">Float Chat</span> &amp; <span className="text-cyan-400 font-medium">Unified MCM Portal</span>, and creator of AI-powered systems like <span className="text-purple-400 font-medium">AI Study Assistant</span> &amp; <span className="text-cyan-400 font-medium">AI Resume Analyzer</span>.
            </p>

            {/* Highlights Grid Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl py-2">
              {personalDetails.highlights.map((item, idx) => (
                <div key={idx} className="glass-card p-3 rounded-xl flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold gradient-text">{item.number}</span>
                  <span className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href={personalDetails.resumePdf}
                download="Rahul_Chaurasiya_Resume.pdf"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-105 active:scale-95 focus-ring"
                aria-label="Download Rahul Chaurasiya's Resume"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Resume Download
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white glass-card hover:bg-slate-800/80 border border-slate-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-ring"
              >
                <Send className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                Hire Me
              </a>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white glass-card hover:border-cyan-500/40 rounded-xl transition-all duration-300 focus-ring"
              >
                <Mail className="w-4 h-4 text-purple-400" aria-hidden="true" />
                Contact
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full">
              <span className="text-xs text-slate-400 font-mono">CONNECT:</span>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all focus-ring"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </a>
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition-all focus-ring"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5 text-purple-400" aria-hidden="true" />
              </a>
              <a
                href={`tel:${personalDetails.phone}`}
                className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-600/10 transition-all flex items-center gap-2 text-xs font-mono focus-ring"
                aria-label={`Call Rahul Chaurasiya at ${personalDetails.phone}`}
              >
                <Phone className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>{personalDetails.phone}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Profile Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              {/* Outer Pulsing Glow Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 rounded-3xl blur-2xl opacity-50 animate-pulse-glow" />

              {/* Photo Card Frame */}
              <div className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-400 shadow-2xl overflow-hidden glass-card">
                <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative group">
                  <Image
                    src={personalDetails.photo}
                    alt={personalDetails.name}
                    width={500}
                    height={500}
                    priority
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-card backdrop-blur-md border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">{personalDetails.name}</h3>
                      <p className="text-[11px] text-cyan-400 font-mono">MERN Full Stack Developer</p>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 px-3 py-1.5 rounded-xl glass-card border border-blue-500/40 shadow-xl flex items-center gap-2 text-xs font-semibold text-white"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                React.js &amp; Node.js
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-xl glass-card border border-purple-500/40 shadow-xl flex items-center gap-2 text-xs font-semibold text-white"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                AI Applications
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
