"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";
import { LinkedinIcon, GithubIcon } from "./SocialIcons";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const isNameValid = formData.name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isMessageValid = formData.message.trim().length >= 10;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setStatus({ loading: false, success: false, error: "Please fix the validation errors before submitting." });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    // Simulate sending message
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, message: false });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    }, 1000);
  };

  const getInputClassName = (name, isValid) => {
    const base = "w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all focus-ring ";
    if (!touched[name]) {
      return base + "border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500";
    }
    return base + (isValid ? "border-emerald-500/60 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" : "border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500");
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white">Let&apos;s Discuss Your Project</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you have a job opportunity, a project proposal, or just want to connect, feel free to reach out to me anytime!
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${personalDetails.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all group focus-ring"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono uppercase block">Phone / Mobile</span>
                    <span className="text-sm font-bold text-white font-mono">{personalDetails.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${personalDetails.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group focus-ring"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs text-slate-400 font-mono uppercase block">Email Address</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono truncate block">{personalDetails.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono uppercase block">Location</span>
                    <span className="text-sm font-bold text-white">{personalDetails.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <a
                  href={personalDetails.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/20 transition-all focus-ring"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={personalDetails.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all focus-ring"
                >
                  <GithubIcon className="w-4 h-4 text-purple-400" aria-hidden="true" />
                  GitHub
                </a>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Send Me a Message</h3>

              {status.success && (
                <div role="alert" className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                </div>
              )}

              {status.error && (
                <div role="alert" className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
                  <span>{status.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. John Doe"
                      required
                      aria-required="true"
                      aria-invalid={touched.name && !isNameValid ? "true" : "false"}
                      className={getInputClassName("name", isNameValid)}
                    />
                    {touched.name && !isNameValid && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">Please enter your name</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      required
                      aria-required="true"
                      aria-invalid={touched.email && !isEmailValid ? "true" : "false"}
                      className={getInputClassName("email", isEmailValid)}
                    />
                    {touched.email && !isEmailValid && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">Please enter a valid email address</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all focus-ring"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-mono text-slate-400 uppercase">Message *</label>
                    <span className="text-[10px] font-mono text-slate-400" aria-live="polite">
                      {formData.message.length} / 1000 characters
                    </span>
                  </div>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your message here (min. 10 characters)..."
                    required
                    aria-required="true"
                    aria-invalid={touched.message && !isMessageValid ? "true" : "false"}
                    maxLength="1000"
                    className={getInputClassName("message", isMessageValid) + " resize-none"}
                  />
                  {touched.message && !isMessageValid && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">Message must be at least 10 characters long</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 focus-ring"
                >
                  {status.loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
