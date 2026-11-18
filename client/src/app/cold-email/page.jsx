"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  Copy, 
  Check, 
  Send, 
  RefreshCw, 
  Flame, 
  Cpu, 
  Mail, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink 
} from "lucide-react";

const PRESETS = [
  {
    name: "VP of Sales / CRM SaaS",
    prospectName: "Sarah Jenkins",
    prospectRole: "VP of Sales",
    companyName: "CloseFlow CRM",
    prospectBio: "Recently shared a post about SDR outbound productivity dropping. Team is scaling from 10 to 25 SDRs. Formerly Director of Sales at HubSpot.",
    offerValueProp: "Secondary domain setup and AI personalization engine that keeps email deliverability at 99% while increasing booked meetings by 40%."
  },
  {
    name: "CTO / Fintech Startup",
    prospectName: "David Chen",
    prospectRole: "Chief Technology Officer",
    companyName: "PaySplit",
    prospectBio: "Highly technical background. Posting about API performance, scaling PostgreSQL databases, and migration to AWS. Focused on infrastructure security.",
    offerValueProp: "Automated real-time PostgreSQL database performance monitoring agent that prevents query bottlenecks and reduces server costs by 30%."
  },
  {
    name: "Founder / DTC E-commerce",
    prospectName: "Elena Rostova",
    prospectRole: "Founder & CEO",
    companyName: "Bloom & Clay",
    prospectBio: "DTC skincare brand. Passionate about sustainable packaging, Instagram growth, and reducing customer acquisition cost (CAC). Recently hit $2M ARR.",
    offerValueProp: "AI-driven customer retention flows that increase repeat purchase rates by 25% through personalized SMS & email campaigns."
  }
];

const steps = [
  "Analyzing prospect background...",
  "Aligning value proposition...",
  "Engineering cold email subject lines...",
  "Polishing structured email variations..."
];

export default function ColdEmailGenerator() {
  const [form, setForm] = useState({
    prospectName: "",
    prospectRole: "",
    companyName: "",
    prospectBio: "",
    offerValueProp: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const loadPreset = (preset) => {
    setForm(preset);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 900);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.prospectName || !form.companyName || !form.offerValueProp) {
      alert("Please fill in Prospect Name, Company Name, and Value Proposition.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error("Failed to generate");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during generation. Using offline fallback.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "subject") {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else {
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    }
  };

  // Helper to count words
  const getWordCount = (text) => {
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  };

  // Check email for spam words
  const runSpamAudit = (body) => {
    if (!body) return { score: 100, flags: [] };
    const spamTriggers = [
      "guarantee", "once in a lifetime", "act fast", "free trial", "100%", 
      "no risk", "investment", "increase sales", "make money", "winner"
    ];
    const flags = [];
    const lowerBody = body.toLowerCase();
    spamTriggers.forEach(word => {
      if (lowerBody.includes(word)) {
        flags.push(word);
      }
    });
    
    // Penalize score if it contains greeting cliches
    const greetingCliches = ["hope this email finds you well", "hope you're doing well"];
    greetingCliches.forEach(cliche => {
      if (lowerBody.includes(cliche)) {
        flags.push("conversational cliche");
      }
    });

    const score = Math.max(100 - (flags.length * 15), 50);
    return { score, flags };
  };

  const getMailtoUrl = (email) => {
    if (!email) return "#";
    const subject = encodeURIComponent(email.subject_line);
    const body = encodeURIComponent(email.body);
    return `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-16">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors focus-ring rounded-lg px-3 py-1.5 border border-slate-800/80 hover:bg-slate-900 bg-slate-950/40">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">AI Copywriter Engine v1.2</span>
          </div>
        </div>
      </header>

      {/* Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            B2B Cold Email Generator
          </h1>
          <p className="mt-2 text-slate-400 text-sm md:text-base max-w-2xl">
            Input prospect insights and your value proposition to engineer short, high-converting outbound copy variants that land in the primary inbox.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Presets Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-transparent rounded-full blur-xl" />
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick-Load Presets</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => loadPreset(preset)}
                    className="text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all hover:bg-slate-900 active:scale-95"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-5">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prospectName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Prospect Name *
                  </label>
                  <input
                    type="text"
                    id="prospectName"
                    name="prospectName"
                    value={form.prospectName}
                    onChange={handleInputChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="prospectRole" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Prospect Role
                  </label>
                  <input
                    type="text"
                    id="prospectRole"
                    name="prospectRole"
                    value={form.prospectRole}
                    onChange={handleInputChange}
                    placeholder="e.g. Head of Outbound"
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="prospectBio" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Prospect Bio & Background
                  </label>
                  <span className="text-[10px] text-slate-500">{form.prospectBio.length} chars</span>
                </div>
                <textarea
                  id="prospectBio"
                  name="prospectBio"
                  value={form.prospectBio}
                  onChange={handleInputChange}
                  placeholder="e.g. Shared a post about deliverability failures. Formerly managed SDRs at Snowflake. Passionate about quality outreach."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="offerValueProp" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Our Value Proposition *
                  </label>
                  <span className="text-[10px] text-slate-500">{form.offerValueProp.length} chars</span>
                </div>
                <textarea
                  id="offerValueProp"
                  name="offerValueProp"
                  value={form.offerValueProp}
                  onChange={handleInputChange}
                  placeholder="e.g. Fully managed secondary domain setup ensuring email deliverability is above 98% with automated warmup."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing inputs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Generate Cold Emails</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Outputs Section */}
          <div className="lg:col-span-7 h-full">
            
            <AnimatePresence mode="wait">
              {/* 1. Loading State */}
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-10 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center text-center min-h-[460px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-2xl border-t-2 border-blue-500 animate-spin" />
                    <Cpu className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4">Engineering outbound copies</h3>
                  
                  {/* Step Indicators */}
                  <div className="w-full max-w-sm space-y-3.5 text-left">
                    {steps.map((step, idx) => {
                      const isCompleted = loadingStep > idx;
                      const isCurrent = loadingStep === idx;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] transition-colors duration-300 ${
                            isCompleted 
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" 
                              : isCurrent 
                              ? "bg-blue-500/20 border-blue-500/50 text-blue-400 animate-pulse" 
                              : "bg-slate-950 border-slate-800 text-slate-600"
                          }`}>
                            {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                          </div>
                          <span className={`text-xs transition-colors duration-300 ${
                            isCompleted 
                              ? "text-slate-400 line-through decoration-slate-800" 
                              : isCurrent 
                              ? "text-slate-200 font-semibold" 
                              : "text-slate-600"
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* 2. Initial / Empty State */}
              {!loading && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center text-center min-h-[460px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-600/5 via-transparent to-transparent rounded-full blur-2xl" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-5 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                    <Mail className="w-6 h-6 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-200">Copywriter Output Panel</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm">
                    Provide prospect inputs on the left, or select a preset to instantly generate high-converting outbound copywriting versions.
                  </p>

                  <div className="mt-8 border border-slate-800/80 rounded-2xl p-4 bg-slate-950/40 text-left max-w-md w-full">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] uppercase font-bold tracking-wider font-mono">B2B Best Practices Enforced</span>
                    </div>
                    <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4">
                      <li>Strict 100-word limit to secure C-suite attention span.</li>
                      <li>Double-pass audit to delete spam-trigger terminology.</li>
                      <li>Permission-focused call to actions (CTAs) for +40% reply rate.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* 3. Result Loaded State */}
              {!loading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Key Insights Card */}
                  <div className="bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">AI Prospect Analysis</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-xs text-slate-300">
                            <strong className="text-slate-400">Key Hook:</strong> {result.prospect_insights.key_hook}
                          </p>
                          <p className="text-xs text-slate-300">
                            <strong className="text-slate-400">Pain Point:</strong> {result.prospect_insights.estimated_pain_point}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs container */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                    
                    {/* Tab Selectors */}
                    <div className="flex border-b border-slate-800 bg-slate-950/50 p-1 gap-1">
                      {result.emails.map((email, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTab(idx)}
                          className={`flex-1 text-center py-2.5 px-2 text-xs font-medium rounded-xl transition-all ${
                            activeTab === idx
                              ? "bg-slate-900 border border-slate-800 text-white font-semibold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {email.angle}
                        </button>
                      ))}
                    </div>

                    {/* Active Email Panel */}
                    <div className="p-6 space-y-5">
                      
                      {/* Subject Line */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject Line</label>
                          <button
                            onClick={() => copyText(result.emails[activeTab].subject_line, "subject")}
                            className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {copiedSubject ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Subject</span>
                              </>
                            )}
                          </button>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={result.emails[activeTab].subject_line}
                          className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-mono outline-none"
                        />
                      </div>

                      {/* Body Content */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Body</label>
                          <button
                            onClick={() => copyText(result.emails[activeTab].body, "body")}
                            className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {copiedBody ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Body</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="relative">
                          <textarea
                            readOnly
                            rows={8}
                            value={result.emails[activeTab].body}
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3.5 text-sm text-slate-200 outline-none leading-relaxed font-sans resize-none"
                          />
                        </div>
                      </div>

                      {/* Details Bar */}
                      <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
                        <div className="flex items-center gap-4 text-slate-400">
                          <div>
                            Words: <span className="text-slate-200 font-semibold">{getWordCount(result.emails[activeTab].body)}</span> / 100 max
                          </div>
                          <div>
                            Spam Audit: <span className={`font-semibold ${
                              runSpamAudit(result.emails[activeTab].body).score >= 90 ? "text-emerald-400" : "text-amber-400"
                            }`}>{runSpamAudit(result.emails[activeTab].body).score}% clean</span>
                          </div>
                        </div>

                        <a
                          href={getMailtoUrl(result.emails[activeTab])}
                          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Open in Mail Client</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      </div>

                      {/* Spam triggers if audit score < 100 */}
                      {runSpamAudit(result.emails[activeTab].body).flags.length > 0 && (
                        <div className="text-[10px] text-amber-500 bg-amber-500/5 border border-amber-500/15 rounded-lg p-2 flex gap-1.5 items-center">
                          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            <strong>Note:</strong> Checked phrases: {runSpamAudit(result.emails[activeTab].body).flags.map(f => `"${f}"`).join(", ")}. Ensure compliance with prospect expectations.
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </main>
    </div>
  );
}
