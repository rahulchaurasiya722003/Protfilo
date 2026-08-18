"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Award, ShieldCheck, Users, Briefcase, GraduationCap, MapPin, Phone } from "lucide-react";
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo & Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative group">
                <Image
                  src={personalDetails.photo}
                  alt={personalDetails.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 glass-card rounded-xl border border-slate-700/60">
                  <p className="text-xs text-cyan-300 font-mono font-semibold">Prahladrai Dalmia Lions College, Mumbai</p>
                  <p className="text-xs text-slate-300">B.Sc. in Information Technology</p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-300 truncate">Mumbai, MH</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-slate-300 font-mono truncate">{personalDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-slate-300 truncate">B.Sc. IT (2025)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300 truncate">SDAC Certified</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Professional Summary & Objectives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
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
                <h4 className="text-base font-bold text-white mb-1">6-Month Internship</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Delivered responsive, cross-browser-compatible interfaces for 3+ real-time production websites.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Rentoo Platform</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Architected peer-to-peer vehicle rental platform with RESTful APIs, JWT auth, and end-to-end full stack architecture.
                </p>
              </div>

              <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">300+ Team Leader</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Proven leader with hands-on experience coordinating and guiding 300+ member teams across tech initiatives.
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
