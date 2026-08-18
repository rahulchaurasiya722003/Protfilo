"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Building2, CheckCircle2 } from "lucide-react";
import { educationData } from "@/data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="py-20 relative overflow-hidden bg-slate-950/40">
      {/* Background Orbs */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education <span className="gradient-text">Timeline</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30 hidden sm:block" />

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative z-10 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[2px] shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-cyan-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-sm font-medium text-cyan-400">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {edu.description}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{edu.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
