"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, Users, Globe } from "lucide-react";
import { experienceData } from "@/data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>WORK & INTERNSHIP HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl"
            >
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px]">
                      <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-cyan-400">
                        <Briefcase className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-sm font-medium text-cyan-400 font-mono">{exp.type}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Key Responsibilities Bullet List */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Responsibilities & Deliverables:</h4>
                <div className="space-y-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <div className="p-1 rounded-full bg-blue-600/20 text-cyan-400 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-mono">Production Websites</p>
                    <p className="text-sm font-bold text-white">3+ Live Apps</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-mono">Rentoo Platform</p>
                    <p className="text-sm font-bold text-white">MERN Architecture</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <Users className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-mono">Leadership</p>
                    <p className="text-sm font-bold text-white">300+ Team Members</p>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
