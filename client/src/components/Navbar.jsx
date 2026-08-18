"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Download, Code2, User, Briefcase, GraduationCap, Award, FileText, Mail, Cpu, Sparkles } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";

const navItems = [
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Projects", href: "#projects", icon: Code2 },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Certifications", href: "#certifications", icon: Award },
  { name: "Resume", href: "#resume", icon: FileText },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Active section detection using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger active section when it enters center view
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all nav-item sections and the hero top area
    navItems.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) observer.observe(element);
    });

    const heroSection = document.getElementById("hero");
    if (heroSection) observer.observe(heroSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "py-3 glass-nav shadow-lg shadow-black/40" : "py-5 bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={pathname === "/cold-email" ? "/" : "#"} className="flex items-center gap-2.5 group focus-ring rounded-xl" aria-label={`Go to top, home page of ${personalDetails.name}`}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-blue-500/30 overflow-hidden shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-0.5 relative">
            <Image
              src={personalDetails.logo}
              alt={`${personalDetails.name} Logo`}
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-wide group-hover:text-blue-400 transition-colors">
              {personalDetails.name}
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase -mt-1">
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 backdrop-blur-md" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = pathname !== "/cold-email" && activeSection === item.href.substring(1);
            const itemHref = pathname === "/cold-email" ? `/${item.href}` : item.href;
            return (
              <Link
                key={item.name}
                href={itemHref}
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 focus-ring ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 shadow-md shadow-blue-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/cold-email"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-cyan-400 bg-slate-950 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-slate-900 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-ring"
            aria-label="Open B2B Cold Email Generator"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            Cold Email AI
          </Link>
          <a
            href={personalDetails.resumePdf}
            download="Rahul_Chaurasiya_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-105 active:scale-95 focus-ring"
            aria-label="Download Rahul Chaurasiya's Resume in PDF format"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/50 border border-slate-700/50 backdrop-blur-md focus-ring"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 origin-left"
        style={{ scaleX }}
      />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-6 shadow-2xl"
            role="menu"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname !== "/cold-email" && activeSection === item.href.substring(1);
                const itemHref = pathname === "/cold-email" ? `/${item.href}` : item.href;
                return (
                  <Link
                    key={item.name}
                    href={itemHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all focus-ring ${
                      isActive 
                        ? "text-white bg-slate-800/80 border-l-2 border-cyan-400" 
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-800 mt-2 space-y-2">
                <Link
                  href="/cold-email"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-cyan-400 bg-slate-900 border border-cyan-500/20 rounded-xl shadow-lg focus-ring"
                  aria-label="Open B2B Cold Email Generator"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  Cold Email AI
                </Link>
                <a
                  href={personalDetails.resumePdf}
                  download="Rahul_Chaurasiya_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-600/30 focus-ring"
                  aria-label="Download Resume"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
