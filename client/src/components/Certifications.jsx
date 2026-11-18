"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import { certificationsData } from "@/data/portfolioData";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED QUALIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="max-w-3xl mx-auto">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 p-[2px] shadow-lg shadow-amber-500/20 shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400">
                      <Award className="w-7 h-7" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                    <p className="text-sm font-semibold text-amber-400 font-mono">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{cert.period}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {cert.description}
              </p>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Core Competencies Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium text-slate-200 bg-slate-900 border border-slate-800 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
