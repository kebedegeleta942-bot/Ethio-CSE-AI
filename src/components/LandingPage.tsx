import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  BookOpen,
  Brain,
  Rocket,
  Compass,
  CheckCircle2,
  Building2,
  GraduationCap,
  ShieldAlert,
  Flame,
  Globe,
  Award,
} from 'lucide-react';
import { ViewMode } from '../types';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenOnboarding,
}) => {
  const levels = [
    {
      year: '1st Year',
      focus: 'Programming Fundamentals, C/C++, Discrete Math, Git, Basic Web',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
    },
    {
      year: '2nd Year',
      focus: 'Data Structures, Algorithms, OOP, Database Normalization, Systems',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400',
    },
    {
      year: '3rd Year',
      focus: 'Networks, Operating Systems, Full-Stack Web, Mobile, AI/ML Intro',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
    },
    {
      year: '4th & 5th Year',
      focus: 'Graduation Capstone, Cloud, Security, MoE Exit Exam, Job Readiness',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
    },
    {
      year: 'Graduates & Self-Learners',
      focus: 'Production Portfolios, Ethiopian Hiring, Remote USD Work, Freelancing',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-400',
    },
  ];

  const pillars = [
    {
      icon: <Brain className="w-6 h-6 text-emerald-400" />,
      title: '11 AI Mentorship Modes',
      desc: 'From Socratic teaching and exam practice to anti-dependence code reviews that explain every line so you ace technical interviews.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      title: 'Production Project Lab',
      desc: 'Build verifiable full-stack applications with PostgreSQL, REST APIs, and modern authentication rather than toy tutorials.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Build for Ethiopia 🇪🇹',
      desc: 'Solve real systemic challenges: Kebele resident identity registries, Merkato offline retail syncing, and Telebirr/Chapa webhooks.',
    },
    {
      icon: <Compass className="w-6 h-6 text-purple-400" />,
      title: 'Local & Remote Employment',
      desc: 'Intelligence on Ethio Telecom, Safaricom, CBE, and tech startups, paired with an 8-stage freelancing roadmap for USD earnings.',
    },
  ];

  const universities = [
    'AAU AAiT',
    'ASTU',
    'AASTU',
    'Jimma University',
    'Hawassa IoT',
    'Bahir Dar BiT',
    'Haramaya',
    'Mekelle MIT',
    'Arba Minch',
    'Gondar',
    'Wollo Kombolcha',
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                <span>&lt;E&gt;</span>
              </div>
            </div>
            <div>
              <div className="font-bold text-white tracking-tight flex items-center gap-1.5 text-sm sm:text-base">
                Ethio CSE AI
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v2.0
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-medium hidden sm:block">
                Learn. Build. Innovate.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenOnboarding}
              className="text-xs text-neutral-300 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-neutral-800"
            >
              Diagnostic Wizard
            </button>
            <button
              onClick={onEnterApp}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Companion for Computer Science in Ethiopia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Learn. Build. <span className="text-emerald-400">Innovate.</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed">
            “From learning Computer Science to building real technology.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            An intelligent academic and career companion engineered specifically for Ethiopian Computer Science, Software Engineering, and computing students across 1st to 5th years, graduates, and self-learners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              <span>Enter Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Personalize My Student Level</span>
            </button>
          </div>
        </div>

        {/* Student Level Cards */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs uppercase tracking-wider font-bold text-neutral-400">
              Personalized Intelligence Across Every Stage
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Engineered for Your Academic Year
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {levels.map((lvl, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${lvl.color} flex flex-col justify-between space-y-2`}
              >
                <div>
                  <h3 className="font-bold text-sm text-white">{lvl.year}</h3>
                  <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
                    {lvl.focus}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                  Customized Syllabus & AI Prompts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="font-bold text-white text-base">{p.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* University Presence */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
            <Building2 className="w-4 h-4" />
            <span>SUPPORTING COMPUTING STUDENTS ACROSS ETHIOPIA</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {universities.map((uni, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-medium"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-6 text-center text-xs text-neutral-500">
        <p>Ethio CSE AI — Learn. Build. Innovate.</p>
        <p className="text-[11px] mt-1 text-neutral-600">
          Built for Ethiopian Computer Science, Software Engineering, and Computing Students.
        </p>
      </footer>
    </div>
  );
};
