"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Eye, CheckCircle2 } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";

export default function ResumeSection() {
  return (
    <section id="resume" className="py-20 relative overflow-hidden bg-slate-950/60">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Resume <span className="gradient-text">Preview & Download</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center"
          >
            {/* Action Bar Header */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Rahul Chaurasiya — Resume</h3>
                  <p className="text-xs text-slate-400 font-mono">Full Stack Developer (MERN Stack)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={personalDetails.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white glass-card hover:border-slate-700 rounded-xl transition-all focus-ring"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  View PDF
                </a>
                <a
                  href={personalDetails.resumePdf}
                  download="Rahul_Chaurasiya_Resume.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-105 focus-ring"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume PDF
                </a>
              </div>
            </div>

            {/* Embedded PDF iframe viewer */}
            <div className="w-full h-[300px] md:h-[600px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner relative">
              <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/80 backdrop-blur-sm z-10">
                <FileText className="w-12 h-12 text-cyan-400 mb-4 animate-bounce" aria-hidden="true" />
                <h4 className="text-sm font-bold text-white mb-2">Resume PDF Preview</h4>
                <p className="text-xs text-slate-300 mb-4 max-w-xs">
                  PDF preview is best viewed on larger screens. Click below to view or download directly.
                </p>
                <a
                  href={personalDetails.resumePdf}
                  download="Rahul_Chaurasiya_Resume.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-105 focus-ring"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume PDF
                </a>
              </div>
              <iframe
                src={`${personalDetails.resumePdf}#toolbar=0`}
                className="w-full h-full border-0 hidden md:block"
                title="Rahul Chaurasiya Resume Preview"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
