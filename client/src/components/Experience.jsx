"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0a0a0c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-[13px] font-mono tracking-widest text-[#38bdf8] uppercase block mb-2 font-medium">
            EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {experienceData.map((exp, expIdx) => (
            <div key={expIdx} className="relative pl-7 sm:pl-9">
              {/* Vertical Timeline Line */}
              <div
                className="absolute left-[7px] sm:left-[9px] top-2 bottom-0 w-[1.5px] bg-[#3b82f6]/40 pointer-events-none"
                aria-hidden="true"
              />

              {/* Timeline Indicator Node */}
              <div
                className="absolute left-0 top-1.5 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-2 border-[#60a5fa] bg-[#0a0a0c] flex items-center justify-center z-10"
                aria-hidden="true"
              >
                <div className="w-[5px] h-[5px] sm:w-[7px] sm:h-[7px] rounded-full bg-[#93c5fd]" />
              </div>

              {/* Employment Header Details */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <p className="text-xs sm:text-sm text-slate-400 font-sans tracking-wide mb-1">
                  {exp.period} · {exp.location}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-normal mt-0.5">
                  {exp.company}
                </p>
              </motion.div>

              {/* Stacked Project Cards */}
              <div className="space-y-6">
                {exp.projects?.map((project, pIdx) => (
                  <motion.div
                    key={project.id || pIdx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: pIdx * 0.15 }}
                    className="group rounded-2xl bg-[#141416]/90 border border-slate-800/90 hover:border-slate-700/80 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/20"
                  >
                    {/* Card Title & Visit Link */}
                    <div className="flex flex-wrap items-baseline gap-2 mb-5">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {project.title}
                      </h4>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#60a5fa] hover:text-[#38bdf8] transition-colors group/link"
                          aria-label={`Visit ${project.title}`}
                        >
                          <span>Visit</span>
                          <span className="text-xs inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                            ↗
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                      {project.bulletPoints?.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className="text-slate-500 select-none text-base leading-4 mt-0.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-sans text-slate-300 bg-transparent border border-slate-700/80 hover:border-slate-600 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
