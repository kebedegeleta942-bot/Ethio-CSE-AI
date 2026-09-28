import React, { useState } from 'react';
import {
  Award,
  Flame,
  CheckCircle2,
  Code2,
  Rocket,
  Brain,
  TrendingUp,
  BarChart3,
  Calendar,
  DollarSign,
  Heart,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { StudentProfile, GamificationBadge, ScorecardMetric, AcademicLevel, AILearningMode } from '../types';
import { gamificationBadges } from '../data/defaultData';

interface GamificationProgressProps {
  profile: StudentProfile;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
  onIncrementProblemCount: () => void;
}

export const GamificationProgress: React.FC<GamificationProgressProps> = ({
  profile,
  onLaunchAIMode,
  onIncrementProblemCount,
}) => {
  const [badges, setBadges] = useState<GamificationBadge[]>(gamificationBadges);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const scorecardData: ScorecardMetric = {
    monthName: 'Current Semester',
    codingHours: 124,
    universityGradeAvg: 3.68,
    projectsCompleted: 3,
    githubContributions: 184,
    skillsMasteredCount: 14,
    jobApplicationsSent: 4,
    interviewsCount: 2,
    freelanceProposalsSent: 3,
    incomeETB: 35000,
    incomeUSD: 0,
    exerciseDaysPerWeek: 4,
    sleepHoursAvg: 7.2,
    englishSpeakingMinsPerDay: 25,
  };

  const categories = ['all', 'Projects', 'Problems', 'Streak', 'AI', 'Community'];

  const filteredBadges = badges.filter(
    (b) => selectedCategory === 'all' || b.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase tracking-wider">
              {profile.academicLevel} Milestones & Analytics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            My Progress, Badges & Quantitative Scorecard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Track tangible growth across academic excellence, coding problem count, production builds, and physical balance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onIncrementProblemCount}
            className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-neutral-700"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>+1 Solved Problem</span>
          </button>
          <button
            onClick={() =>
              onLaunchAIMode(
                'planner',
                `Evaluate my current semester progress as a ${profile.academicLevel} student. I have solved ${profile.solvedProblemsCount} problems, completed ${profile.completedTasksCount} tasks, with a ${profile.streakDays}-day streak. Where should I focus my efforts next week?`
              )
            }
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Progress Review</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {profile.streakDays} Days
            </div>
            <div className="text-xs text-neutral-400">Current Study Streak</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {profile.solvedProblemsCount}
            </div>
            <div className="text-xs text-neutral-400">DSA Problems Solved</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {profile.completedTasksCount}
            </div>
            <div className="text-xs text-neutral-400">Tasks Completed</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {badges.filter((b) => b.unlocked).length} / {badges.length}
            </div>
            <div className="text-xs text-neutral-400">Badges Unlocked</div>
          </div>
        </div>
      </div>

      {/* 15-Metric Quantitative Scorecard */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            15-Point Quantitative Engineering Scorecard
          </h2>
          <span className="text-xs font-mono text-neutral-400">
            Metrics over Last 30 Days
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Coding Hours</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.codingHours} hrs
            </span>
            <span className="text-[10px] text-emerald-400 block font-mono">Goal: 100+</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Current GPA</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.universityGradeAvg} / 4.0
            </span>
            <span className="text-[10px] text-emerald-400 block font-mono">Target: &gt; 3.5</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Shipped Projects</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.projectsCompleted}
            </span>
            <span className="text-[10px] text-emerald-400 block font-mono">Live on Web</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">GitHub Commits</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.githubContributions}
            </span>
            <span className="text-[10px] text-emerald-400 block font-mono">Active Green Streak</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Skills Mastered</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.skillsMasteredCount}
            </span>
            <span className="text-[10px] text-purple-400 block font-mono">Verified in Code</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Job / Internship Apps</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.jobApplicationsSent}
            </span>
            <span className="text-[10px] text-cyan-400 block font-mono">Custom Tailored</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Interviews Attended</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.interviewsCount}
            </span>
            <span className="text-[10px] text-emerald-400 block font-mono">Tech + HR</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Freelance Proposals</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.freelanceProposalsSent}
            </span>
            <span className="text-[10px] text-amber-400 block font-mono">Milestone-Scoped</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Income Earned (ETB)</span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              {scorecardData.incomeETB.toLocaleString()} ETB
            </span>
            <span className="text-[10px] text-emerald-500 block font-mono">Via Chapa / Telebirr</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Exercise / Health</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.exerciseDaysPerWeek} days/wk
            </span>
            <span className="text-[10px] text-rose-400 block font-mono">Cardio & Walking</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">Average Sleep</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.sleepHoursAvg} hrs/night
            </span>
            <span className="text-[10px] text-neutral-400 block font-mono">Rest & Focus</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-neutral-400 block">English Fluency Practice</span>
            <span className="text-base font-bold text-white font-mono">
              {scorecardData.englishSpeakingMinsPerDay} min/day
            </span>
            <span className="text-[10px] text-cyan-400 block font-mono">Daily Audio/Reading</span>
          </div>
        </div>
      </div>

      {/* Gamification Badges Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Skill Mastery & Milestone Badges
          </h2>

          <div className="flex gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  selectedCategory === c
                    ? 'bg-neutral-800 text-amber-400 font-bold'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/60'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                b.unlocked
                  ? 'bg-neutral-900/80 border-amber-500/40 shadow-sm'
                  : 'bg-neutral-950/40 border-neutral-800/80 opacity-60'
              }`}
            >
              <div className="text-3xl p-2 rounded-xl bg-neutral-950 border border-neutral-800 shrink-0">
                {b.icon}
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{b.title}</h4>
                  {b.unlocked ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-500">
                      {b.progress} / {b.maxProgress}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {b.description}
                </p>

                {!b.unlocked && (
                  <div className="pt-1">
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round((b.progress / b.maxProgress) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
