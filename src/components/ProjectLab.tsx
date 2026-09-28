import React, { useState } from 'react';
import {
  Rocket,
  Search,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  Code2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { ProjectLabItem, AcademicLevel, AILearningMode } from '../types';
import { projectLabItems } from '../data/defaultData';

interface ProjectLabProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const ProjectLab: React.FC<ProjectLabProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [projects] = useState<ProjectLabItem[]>(projectLabItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectLabItem | null>(projects[1]);

  const categories = [
    'all',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Graduation Project',
    'Build for Ethiopia 🇪🇹',
  ];

  const filteredProjects = projects.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Rocket className="w-5 h-5 text-amber-400" />
            <span>Project Lab & Real-World Software Engineering</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Progress from polished beginner tools to production-grade distributed apps and Ethiopian problem solvers.
          </p>
        </div>

        <button
          onClick={() =>
            onLaunchAIMode(
              'project',
              `I want to build a software project for my ${studentLevel} portfolio. Generate a 6-stage architecture breakdown: Problem, DB Schema, REST Endpoints, UI Layout, Testing, and Deployment.`
            )
          }
          className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Project Roadmap</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by tech stack (PostgreSQL, React, Python) or problem..."
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Projects List + Detailed Architecture Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Project Cards */}
        <div className="space-y-3">
          {filteredProjects.map((p) => {
            const isSelected = selectedProject?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-neutral-850 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-amber-400 font-semibold">{p.category}</span>
                  <span className="capitalize text-neutral-400 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    {p.status}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm leading-snug">{p.title}</h3>
                <p className="text-neutral-400 text-xs line-clamp-2">{p.tagline}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {p.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 text-neutral-300 border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Full Architecture Blueprint of Selected Project */}
        {selectedProject ? (
          <div className="lg:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-amber-400 font-bold">{selectedProject.category}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400 capitalize">{selectedProject.status}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
                <p className="text-xs text-neutral-300">{selectedProject.tagline}</p>
              </div>

              <button
                onClick={() =>
                  onLaunchAIMode(
                    'project',
                    `Help me build "${selectedProject.title}". Give me the step-by-step development sprint plan for Week 1.`
                  )
                }
                className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl transition-colors whitespace-nowrap shadow-sm"
              >
                Sprint Plan with AI →
              </button>
            </div>

            {/* Problem & Users */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                <span className="font-bold text-neutral-400 block uppercase tracking-wider text-[11px]">
                  Real-World Problem Statement
                </span>
                <p className="text-neutral-200 leading-relaxed">
                  {selectedProject.problemStatement}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                <span className="font-bold text-neutral-400 block uppercase tracking-wider text-[11px]">
                  Target Users & Market
                </span>
                <p className="text-neutral-200 leading-relaxed">
                  {selectedProject.targetUsers}
                </p>
              </div>
            </div>

            {/* Ethiopian Context if present */}
            {selectedProject.ethiopianContext && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 leading-relaxed">
                <strong className="block text-amber-300 font-semibold mb-0.5">
                  🇪🇹 Ethiopian Reality Grounding:
                </strong>
                {selectedProject.ethiopianContext}
              </div>
            )}

            {/* Features list */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-neutral-300 block uppercase tracking-wider text-[11px]">
                Core Product Features & Deliverables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 flex items-center gap-2 text-neutral-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Database & Tech stack */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-300 font-semibold">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Database & Architecture Blueprint</span>
              </div>
              <p className="text-neutral-300 leading-relaxed font-mono text-[11px]">
                {selectedProject.dbArchitecture}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md font-mono text-emerald-300 bg-neutral-800 border border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() =>
                  onLaunchAIMode(
                    'codereview',
                    `I am designing the database and API schema for "${selectedProject.title}". What are the critical edge cases and security vulnerabilities to guard against?`
                  )
                }
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Security & Schema Audit →
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
