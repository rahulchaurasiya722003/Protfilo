"use client";

import { motion } from "framer-motion";
import { User, Award, ShieldCheck, Users, Briefcase } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND &amp; EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">

          {/* Professional Summary & Feature Cards — full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" />
                Professional Summary
              </h3>
              <p className="text-slate-300 text-base leading-relaxed glass-card p-6 rounded-2xl border border-slate-800/80">
                {personalDetails.summary}
              </p>
            </div>

            {/* Core Achievements & Experience Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <Briefcase className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">MCM Live Projects</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Contributed to live production applications — Float Chat and the Unified MCM Portal — with responsive, cross-browser UIs.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Automation Engineering</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Built and improved automation workflows on Float Chat using React/TanStack, Redis, Docker, and Ubuntu.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Admin Panel Development</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Developed the React-based Admin Panel and management modules of the Unified MCM Portal with dynamic UI components.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">AI Solutions Developer</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered AI Study Assistant &amp; AI Resume Analyzer integrated with OpenAI API and ATS scoring engines.
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
