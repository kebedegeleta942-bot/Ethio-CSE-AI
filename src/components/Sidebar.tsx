import React from 'react';
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  Brain,
  GraduationCap,
  Code2,
  Rocket,
  Map,
  BarChart3,
  Calendar,
  Compass,
  Briefcase,
  Sparkles,
  FileText,
  Settings,
  Flame,
  Sun,
  Moon,
  Laptop,
  Globe,
  Terminal,
  Layers,
} from 'lucide-react';
import { ViewMode, StudentProfile } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  profile: StudentProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenSettings: () => void;
  onToggleTheme: (theme: 'dark' | 'light' | 'system') => void;
}

interface NavSection {
  title: string;
  items: {
    id: ViewMode;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  profile,
  isOpenMobile,
  onCloseMobile,
  onOpenSettings,
  onToggleTheme,
}) => {
  const navSections: NavSection[] = [
    {
      title: 'Core Workspace',
      items: [
        {
          id: 'dashboard',
          label: 'My CSE Journey',
          icon: <LayoutDashboard className="w-4 h-4 text-emerald-400" />,
        },
        {
          id: 'assistant',
          label: 'AI Tutor & Copilot',
          icon: <Bot className="w-4 h-4 text-teal-400" />,
          badge: '11 Modes',
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        },
      ],
    },
    {
      title: 'Learn & Master',
      items: [
        {
          id: 'learn',
          label: 'CS Curriculum',
          icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
          badge: 'Ethio + Harvard',
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
        },
        {
          id: 'exitexam',
          label: 'MoE CS Exit Exam Hub',
          icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
          badge: 'National',
          badgeColor: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
        },
        {
          id: 'coding',
          label: 'Coding Lab & A2SV Patterns',
          icon: <Code2 className="w-4 h-4 text-cyan-400" />,
          badge: 'A2SV Top 75',
          badgeColor: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
        },
      ],
    },
    {
      title: 'Build & Innovate',
      items: [
        {
          id: 'projects',
          label: 'Project Lab & Blueprints',
          icon: <Rocket className="w-4 h-4 text-amber-400" />,
        },
        {
          id: 'ethiopia',
          label: 'Build for Ethiopia 🇪🇹',
          icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
          badge: 'Local Tech',
          badgeColor: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
        },
        {
          id: 'roadmap',
          label: 'My Skills & Roadmap',
          icon: <Map className="w-4 h-4 text-indigo-400" />,
        },
      ],
    },
    {
      title: 'Career & Workflow',
      items: [
        {
          id: 'career',
          label: 'Tech Careers & Companies',
          icon: <Compass className="w-4 h-4 text-emerald-400" />,
        },
        {
          id: 'freelance',
          label: 'Freelance & Remote Hub',
          icon: <Briefcase className="w-4 h-4 text-blue-400" />,
          badge: 'USD / ETB',
          badgeColor: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
        },
        {
          id: 'planner',
          label: 'Study Planner & Timetable',
          icon: <Calendar className="w-4 h-4 text-rose-400" />,
        },
        {
          id: 'progress',
          label: 'Achievements & Scorecard',
          icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
        },
        {
          id: 'notes',
          label: 'Knowledge & Bookmarks',
          icon: <FileText className="w-4 h-4 text-neutral-400" />,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-neutral-900/95 dark:bg-neutral-950/95 border-r border-neutral-800/80 backdrop-blur-md flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-neutral-800/80 flex items-center justify-between">
          <button
            onClick={() => {
              onSelectView('dashboard');
              onCloseMobile();
            }}
            className="flex items-center gap-3 text-left group"
          >
            {/* Custom Logo: Modern code bracket with Ethiopian emerald/gold star-burst node */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 shadow-md shadow-emerald-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-mono font-bold text-base relative overflow-hidden group-hover:scale-105 transition-transform">
                <span className="text-emerald-400">&lt;</span>
                <span className="text-amber-400 font-sans font-black text-xs">E</span>
                <span className="text-emerald-400">&gt;</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Ethio CSE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-neutral-400 leading-none mt-1">
                Learn. Build. Innovate.
              </p>
            </div>
          </button>
        </div>

        {/* Student Quick Profile Card */}
        <div className="p-3 mx-3 my-2.5 rounded-xl bg-neutral-900 border border-neutral-800/90 text-xs shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-neutral-400 text-[11px] flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              {profile.academicLevel}
            </span>
            <button
              onClick={() => {
                onOpenSettings();
                onCloseMobile();
              }}
              className="text-[10px] font-mono text-emerald-400 hover:underline"
            >
              Change
            </button>
          </div>
          <div className="font-semibold text-neutral-100 truncate">{profile.name}</div>
          <div className="text-[11px] text-neutral-400 truncate mt-0.5">{profile.university}</div>
        </div>

        {/* Grouped Navigation List */}
        <nav className="flex-1 px-3 py-1 space-y-4 overflow-y-auto scrollbar-none text-xs">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-500">
                {section.title}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentView === item.id || (item.id === 'exitexam' && currentView === 'practice');
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectView(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left font-medium ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={isActive ? 'text-emerald-400 shrink-0' : 'text-neutral-400 shrink-0'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono shrink-0 ml-1.5 ${
                            item.badgeColor || 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Area: Streak & Theme Controls */}
        <div className="p-3 border-t border-neutral-800/80 space-y-2 bg-neutral-950/60">
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{profile.streakDays} Day Streak</span>
            </div>
            <button
              onClick={() => {
                onOpenSettings();
                onCloseMobile();
              }}
              className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onSelectView('landing');
                onCloseMobile();
              }}
              className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 py-1 px-2 rounded hover:bg-neutral-800"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <div className="flex items-center bg-neutral-900 rounded-lg p-0.5 border border-neutral-800 text-neutral-400">
              <button
                onClick={() => onToggleTheme('light')}
                className={`p-1 rounded ${profile.theme === 'light' ? 'bg-neutral-800 text-amber-400' : 'hover:text-neutral-200'}`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onToggleTheme('dark')}
                className={`p-1 rounded ${profile.theme === 'dark' ? 'bg-neutral-800 text-emerald-400' : 'hover:text-neutral-200'}`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onToggleTheme('system')}
                className={`p-1 rounded ${profile.theme === 'system' ? 'bg-neutral-800 text-cyan-400' : 'hover:text-neutral-200'}`}
                title="System Default"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
