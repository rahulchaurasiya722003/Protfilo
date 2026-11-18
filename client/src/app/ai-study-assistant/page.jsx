"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  FileUp,
  Loader2,
  Sparkles,
  MessageCircleQuestion,
  ListChecks,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  FileText,
} from "lucide-react";
import { extractPdfText } from "@/lib/extractPdfText";

const MODES = [
  { id: "ask", label: "Ask a Question", icon: MessageCircleQuestion, hint: "Ask anything about your uploaded study material" },
  { id: "summarize", label: "Summarize", icon: ListChecks, hint: "Get a concise summary of the document" },
  { id: "explain", label: "Explain Concept", icon: Lightbulb, hint: "Get a simple explanation of a concept" },
];

export default function AiStudyAssistant() {
  const [mode, setMode] = useState("ask");
  const [question, setQuestion] = useState("");
  const [docText, setDocText] = useState("");
  const [fileName, setFileName] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const activeMode = MODES.find((m) => m.id === mode);

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
          setDocText(text);
        }
      } catch (err) {
        setError(err.message || "Failed to extract PDF text. Please paste the content manually.");
      } finally {
        setExtracting(false);
      }
    } else {
      const text = await file.text();
      setDocText(text);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (mode === "summarize" && !docText.trim()) {
      setError("Please upload a PDF or paste study material to summarize.");
      return;
    }
    if (mode !== "summarize" && !question.trim()) {
      setError("Please type your question first.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/study-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, question, document: docText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const askFollowUp = (q) => {
    setMode(q.toLowerCase().startsWith("summarize") ? "summarize" : "ask");
    setQuestion(q.toLowerCase().startsWith("summarize") ? "" : q);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            AI PROJECT DEMO
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI <span className="gradient-text">Study Assistant</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Upload study material (PDF), then ask questions, get summaries, or have concepts
            explained in student-friendly language.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" role="tablist" aria-label="Assistant modes">
          {MODES.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={mode === m.id}
                onClick={() => { setMode(m.id); setError(""); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 focus-ring ${
                  mode === m.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "glass-card text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Document */}
          <div className="lg:col-span-2 glass-card rounded-3xl border border-slate-800 p-6 space-y-4 h-fit">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Study Material
            </h2>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-700 hover:border-blue-500/60 rounded-2xl p-5 flex flex-col items-center gap-2 text-slate-400 hover:text-blue-300 transition-colors focus-ring"
            >
              {extracting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  <span className="text-xs font-mono">Extracting text from PDF…</span>
                </>
              ) : (
                <>
                  <FileUp className="w-6 h-6" />
                  <span className="text-xs font-mono text-center">
                    {fileName ? `Uploaded: ${fileName}` : "Upload PDF or TXT notes"}
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
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              rows={10}
              placeholder="…or paste your study notes / chapter text here"
              className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 resize-y"
            />
          </div>

          {/* Right: Question + Result */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                {activeMode.label}
              </h2>
              <p className="text-xs text-slate-500">{activeMode.hint}</p>

              {mode !== "summarize" && (
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  placeholder={mode === "explain" ? "e.g. Explain JWT authentication in simple terms" : "e.g. What are the key points of chapter 3?"}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/60 resize-y"
                />
              )}

              {error && (
                <div className="flex items-start gap-2 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/40 rounded-xl p-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || extracting}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100 focus-ring"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {mode === "summarize" ? "Summarize Document" : mode === "explain" ? "Explain It" : "Get Answer"}
                  </>
                )}
              </button>
            </div>

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl border border-slate-800 p-6 space-y-5"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    {result.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {result.answer}
                  </p>

                  {result.key_points?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Key Points</h4>
                      <ul className="space-y-2">
                        {result.key_points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <ListChecks className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.follow_up?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Ask Next</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.follow_up.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => askFollowUp(q)}
                            className="px-3 py-1.5 rounded-full text-[11px] font-mono text-blue-300 bg-blue-950/40 border border-blue-800/40 hover:border-blue-500/60 hover:text-blue-200 transition-colors focus-ring"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => { setResult(null); setQuestion(""); }}
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors focus-ring rounded-lg px-2 py-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    New question
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
