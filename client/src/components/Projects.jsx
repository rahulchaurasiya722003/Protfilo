"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, CheckCircle2, Calendar } from "lucide-react";
import { projectsData } from "@/data/portfolioData";
import { GithubIcon } from "./SocialIcons";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "MCM Live Projects", "AI & Full Stack"];

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-slate-950/60">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>FEATURED PORTFOLIO WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-14" role="tablist" aria-label="Projects Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="projects-grid"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 focus-ring ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "glass-card text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Projects Showcase Grid */}
        <div id="projects-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8" role="region" aria-live="polite">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl border border-slate-800 flex flex-col justify-between overflow-hidden shadow-2xl relative group"
            >
              {/* Top Banner & Header */}
              <div className={`p-6 bg-gradient-to-br ${project.imageBg} border-b border-slate-800/80 relative`}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-cyan-300 bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{project.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Features:</h4>
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {project.liveUrl || project.githubUrl ? (
                    <div className={`grid gap-3 pt-4 border-t border-slate-800 ${project.liveUrl && project.githubUrl ? "grid-cols-2" : "grid-cols-1"}`}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-blue-600/20 transition-all hover:scale-105 focus-ring"
                          aria-label={`View Live Demo for ${project.title}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          Live Demo
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white glass-card hover:border-slate-700 transition-all hover:scale-105 focus-ring"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
                          GitHub
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-800">
                      <span className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Live Production Project (Private)
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
