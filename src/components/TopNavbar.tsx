import React from 'react';
import { Menu, Bot, AlertCircle, Sparkles, User, GraduationCap, Search } from 'lucide-react';
import { ViewMode, StudentProfile } from '../types';

interface TopNavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  profile: StudentProfile;
  onOpenMobileMenu: () => void;
  onOpenSettings: () => void;
  onStuckAlert: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentView,
  onSelectView,
  profile,
  onOpenMobileMenu,
  onOpenSettings,
  onStuckAlert,
}) => {
  const viewTitles: Record<ViewMode, string> = {
    dashboard: 'My CSE Journey',
    assistant: 'Ethio CSE AI Assistant',
    learn: 'CS Curriculum (Ethio MoE & Harvard)',
    practice: 'Practice & Exam Prep',
    exitexam: 'MoE CS Exit Exam Center 🇪🇹',
    coding: 'Coding Lab & Reviews',
    projects: 'Project Lab & Roadmaps',
    roadmap: 'My Skills & Roadmap',
    progress: 'My Progress & Achievements',
    planner: 'Study Planner & Timetable',
    career: 'Career & Future Paths',
    freelance: 'Freelance & Remote Work',
    ethiopia: 'Build for Ethiopia 🇪🇹',
    notes: 'My Knowledge & Notes',
    settings: 'Settings & Student Profile',
    landing: 'Ethio CSE AI Overview',
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Hamburger & Current View Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline-block font-bold text-neutral-300">
              Ethio CSE AI
            </span>
            <span className="hidden sm:inline-block text-neutral-600">/</span>
            <h1 className="text-sm font-semibold text-white tracking-tight">
              {viewTitles[currentView]}
            </h1>
          </div>
        </div>

        {/* Center: Academic Level Badge */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-medium"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{profile.academicLevel}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-300 truncate max-w-[140px]">{profile.university.split(' ')[0]}</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onStuckAlert}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 rounded-lg transition-colors whitespace-nowrap"
            title="Overcome procrastination or coding blocks"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">I'm Stuck</span>
          </button>

          <button
            onClick={() => onSelectView('assistant')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm ${
              currentView === 'assistant'
                ? 'bg-emerald-400 text-neutral-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-colors"
            title="Profile & Settings"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
