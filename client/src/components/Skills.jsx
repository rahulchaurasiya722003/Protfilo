"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  FileCode2,
  Layout,
  Cpu,
  Network,
  Smartphone,
  Globe,
  Server,
  Zap,
  Layers,
  Lock,
  KeyRound,
  Code,
  Database,
  TableProperties,
  DatabaseBackup,
  Binary,
  GitBranch,
  Terminal,
  Send,
  Users,
  Boxes,
  Sparkles,
} from "lucide-react";
import { skillsData } from "@/data/portfolioData";

const iconMap = {
  Code2,
  FileCode2,
  Layout,
  Cpu,
  Network,
  Smartphone,
  Globe,
  Server,
  Zap,
  Layers,
  Lock,
  KeyRound,
  Code,
  Database,
  TableProperties,
  DatabaseBackup,
  Binary,
  GitBranch,
  Terminal,
  Send,
  Users,
  Boxes,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "tools", label: "Tools & Workflow" },
  ];

  const getFilteredSkills = () => {
    if (activeTab === "all") {
      return [
        ...skillsData.frontend.map((s) => ({ ...s, category: "Frontend" })),
        ...skillsData.backend.map((s) => ({ ...s, category: "Backend" })),
        ...skillsData.databases.map((s) => ({ ...s, category: "Databases" })),
        ...skillsData.tools.map((s) => ({ ...s, category: "Tools" })),
      ];
    }
    return (skillsData[activeTab] || []).map((s) => ({ ...s, category: activeTab }));
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12" role="tablist" aria-label="Skills Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls="skills-grid"
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 focus-ring ${
                activeTab === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "glass-card text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div id="skills-grid" layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-live="polite">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                        <span className="text-[10px] text-slate-300 font-mono">{skill.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div 
                    className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${skill.name} expertise level`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.03, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Familiar Technologies Badge Footer */}
        <div className="mt-12 glass-card p-6 rounded-2xl border border-slate-800/80 max-w-2xl mx-auto text-center">
          <h4 className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Also Familiar & Learning:
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {skillsData.familiar.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full text-xs font-mono font-medium text-slate-200 bg-slate-900 border border-purple-500/30 hover:border-purple-500/60 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
