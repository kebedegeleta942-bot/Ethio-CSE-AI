import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Filter,
  BarChart2,
} from 'lucide-react';
import { SkillItem, SkillCategory, SkillStatus, AcademicLevel, AILearningMode } from '../types';
import { skillRoadmapItems } from '../data/defaultData';

interface SkillsRoadmapProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const SkillsRoadmap: React.FC<SkillsRoadmapProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [skills, setSkills] = useState<SkillItem[]>(skillRoadmapItems);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<SkillStatus | 'all'>('all');

  const categories: { id: SkillCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Languages' },
    { id: 'web', label: 'Frontend & Web' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'devops', label: 'DevOps & Systems' },
    { id: 'ai', label: 'AI & Data' },
  ];

  const statusOptions: { id: SkillStatus; label: string; color: string }[] = [
    { id: 'not_started', label: 'Not Started', color: 'bg-neutral-800 text-neutral-400' },
    { id: 'learning', label: 'Learning', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'practicing', label: 'Practicing', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    { id: 'comfortable', label: 'Comfortable', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { id: 'advanced', label: 'Advanced', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  ];

  const handleUpdateStatus = (skillId: string, newStatus: SkillStatus) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, status: newStatus } : s))
    );
  };

  const filteredSkills = skills.filter((s) => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchStatus = selectedStatusFilter === 'all' || s.status === selectedStatusFilter;
    return matchCat && matchStatus;
  });

  const comfortableOrAdvanced = skills.filter(
    (s) => s.status === 'comfortable' || s.status === 'advanced'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Map className="w-5 h-5 text-emerald-400" />
            <span>My Skills & Visual Technical Roadmap</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Track your competence from fundamentals to production mastery across 5 core CSE disciplines.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-emerald-400 font-semibold">
            {comfortableOrAdvanced} of {skills.length} Mastered
          </span>
          <button
            onClick={() =>
              onLaunchAIMode(
                'career',
                `Review my technical skills inventory and tell me: what should I learn next, what should I learn later, and what can I ignore for now as a ${studentLevel} student?`
              )
            }
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Filter What to Learn Next</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Status Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === c.id
                  ? 'bg-emerald-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <span>Status filter:</span>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
            className="rounded-lg bg-neutral-900 border border-neutral-700 px-2 py-1 text-neutral-200 text-xs focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="learning">Learning</option>
            <option value="practicing">Practicing</option>
            <option value="comfortable">Comfortable</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Skills Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => {
          return (
            <div
              key={skill.id}
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-3 flex flex-col justify-between hover:border-neutral-700 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{skill.name}</span>
                  <span className="text-[10px] uppercase font-mono text-neutral-500 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    {skill.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Status Switcher & AI Launcher */}
              <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500">Status:</span>
                  <select
                    value={skill.status}
                    onChange={(e) => handleUpdateStatus(skill.id, e.target.value as SkillStatus)}
                    className="rounded-md bg-neutral-950 border border-neutral-700 px-2 py-1 text-xs text-emerald-400 font-medium focus:outline-none"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="learning">Learning</option>
                    <option value="practicing">Practicing</option>
                    <option value="comfortable">Comfortable</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <button
                  onClick={() =>
                    onLaunchAIMode(
                      'practice',
                      `Generate a progressive coding challenge to test and advance my skills in ${skill.name}.`
                    )
                  }
                  className="w-full py-1.5 text-[11px] rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white transition-colors text-center block"
                >
                  Practice with AI →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
