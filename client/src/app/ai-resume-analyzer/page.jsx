"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FileUp,
  FileText,
  Loader2,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Target,
} from "lucide-react";
import { extractPdfText } from "@/lib/extractPdfText";

export default function AiResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setFileName(file.name);

    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      setExtracting(true);
      try {
        const text = await extractPdfText(file);
        if (!text || text.length < 30) {
          setError("Could not read text from this PDF (it may be a scanned image). Please paste the text manually.");
        } else {
          setResumeText(text);
        }
      } catch (err) {
        setError(err.message || "Failed to extract PDF text. Please paste the content manually.");
      } finally {
        setExtracting(false);
      }
    } else {
      const text = await file.text();
      setResumeText(text);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || resumeText.trim().length < 30) {
      setError("Please upload a resume PDF or paste at least a few lines of resume text.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/resume-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analysis failed. Please try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setResumeText("");
    setJobDescription("");
    setFileName("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const scoreColor = (score) =>
    score >= 80 ? "text-emerald-400" : score >= 60 ? "text-cyan-400" : score >= 40 ? "text-amber-400" : "text-rose-400";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-purple-600/15 via-cyan-600/10 to-blue-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors focus-ring rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            AI PROJECT DEMO
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI <span className="gradient-text">Resume Analyzer</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Upload your resume PDF, optionally paste a job description, and get an instant
            ATS score with targeted improvement suggestions.
          </p>
        </div>

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Input */}
            <div className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Your Resume
              </h2>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors focus-ring"
              >
                {extracting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                    <span className="text-xs font-mono">Extracting text from PDF…</span>
                  </>
                ) : (
                  <>
                    <FileUp className="w-6 h-6" />
                    <span className="text-xs font-mono">
                      {fileName ? `Uploaded: ${fileName}` : "Click to upload PDF or TXT"}
                    </span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
                placeholder="…or paste your resume text here"
                className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 resize-y"
              />
            </div>

            {/* Job Description Input */}
            <div className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4 flex flex-col">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                Job Description <span className="text-slate-500 font-normal text-xs">(optional)</span>
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                placeholder="Paste the job description to get keyword-match scoring and missing-keyword suggestions"
                className="w-full flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/60 resize-y"
              />

              {error && (
                <div className="flex items-start gap-2 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/40 rounded-xl p-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || extracting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100 focus-ring"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing resume…
                  </>
                ) : (
                  <>
                    <Gauge className="w-4 h-4" />
                    Analyze & Get ATS Score
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className="glass-card rounded-3xl border border-slate-800 p-8 text-center">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">ATS Compatibility Score</p>
                <div className={`text-6xl font-extrabold ${scoreColor(result.ats_score)}`}>
                  {result.ats_score}
                  <span className="text-2xl text-slate-500">/100</span>
                </div>
                <p className="text-sm text-slate-300 mt-3 max-w-xl mx-auto">{result.verdict}</p>
              </div>

              {/* Breakdown */}
              <div className="glass-card rounded-3xl border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-4">Score Breakdown</h3>
                <div className="space-y-3">
                  {(result.score_breakdown || []).map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-mono text-cyan-300">{item.score}/{item.max}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.score / item.max) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="glass-card rounded-3xl border border-slate-800 p-6">
                  <h3 className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Strengths
                  </h3>
                  <ul className="space-y-2.5">
                    {(result.strengths || []).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="glass-card rounded-3xl border border-slate-800 p-6">
                  <h3 className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Suggested Improvements
                  </h3>
                  <ul className="space-y-2.5">
                    {(result.improvements || []).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Keywords */}
              {(result.matched_keywords?.length > 0 || result.missing_keywords?.length > 0) && (
                <div className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4">
                  {result.matched_keywords?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Matched Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matched_keywords.map((k) => (
                          <span key={k} className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-800/40">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.missing_keywords?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.missing_keywords.map((k) => (
                          <span key={k} className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-rose-300 bg-rose-950/40 border border-rose-800/40">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white glass-card border border-slate-800 hover:border-slate-700 transition-all focus-ring"
              >
                <RefreshCw className="w-4 h-4" />
                Analyze Another Resume
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
