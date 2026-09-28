import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Flame,
  Clock,
  BookOpen,
  Code2,
  Rocket,
  Compass,
  ArrowRight,
  Plus,
  Bot,
  Zap,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  Award,
} from 'lucide-react';
import { StudentProfile, DailyFocusTask, ViewMode, AILearningMode } from '../types';

interface MyCSEJourneyDashboardProps {
  profile: StudentProfile;
  tasks: DailyFocusTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (title: string, category: DailyFocusTask['category']) => void;
  onNavigate: (view: ViewMode) => void;
  onLaunchAIMode: (mode: AILearningMode, initialPrompt?: string) => void;
  onOpenSettings: () => void;
  onStuckAlert: () => void;
}

export const MyCSEJourneyDashboard: React.FC<MyCSEJourneyDashboardProps> = ({
  profile,
  tasks,
  onToggleTask,
  onAddTask,
  onNavigate,
  onLaunchAIMode,
  onOpenSettings,
  onStuckAlert,
}) => {
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<DailyFocusTask['category']>('coding');

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), newTaskCategory);
    setNewTaskTitle('');
    setShowAddTaskInput(false);
  };

  // Level-specific greeting subtitle
  const getLevelAdvice = () => {
    switch (profile.academicLevel) {
      case '1st Year':
        return 'Build rock-solid foundations in C/Python, discrete math logic, and clean algorithmic thinking.';
      case '2nd Year':
        return 'Master Data Structures & Algorithms, relational SQL databases, and Object-Oriented design.';
      case '3rd Year':
        return 'Engineer full-stack systems, computer networks, and real-world software architecture.';
      case '4th Year':
      case '5th Year / Extended Program':
        return 'Ship your Capstone project, ace the MoE Exit Exam, and polish your portfolio for tech jobs.';
      case 'Recent Graduate':
        return 'Target verified Ethiopian tech roles, win remote contracts, and conquer technical coding rounds.';
      case 'Self-Learner':
        return 'Build end-to-end applications that prove practical software competence over credentials.';
      default:
        return 'Turn computing theory into working code that solves real Ethiopian problems.';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {profile.academicLevel}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300 font-medium">{profile.university}</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Target: <strong className="text-neutral-200">{profile.primaryCareer}</strong></span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Good morning, {profile.name} 👋
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Ready to build your future in tech? {getLevelAdvice()}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onLaunchAIMode('explain', `Explain the core concepts of my ${profile.academicLevel} Computer Science focus with a real-world Ethiopian example`)}
              className="px-4 py-2.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl transition-all shadow-md shadow-emerald-950/40 flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </button>

            <button
              onClick={onStuckAlert}
              className="px-3.5 py-2.5 text-xs font-medium bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/60 text-amber-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>I'm Stuck</span>
            </button>
          </div>
        </div>

        {/* Level Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-800/80 text-xs">
          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/70 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <span className="text-neutral-400 text-[11px] block">Learning Streak</span>
              <span className="font-bold text-neutral-100">{profile.streakDays} Days Active</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/70 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-400 text-[11px] block">Study Hours Budget</span>
              <span className="font-bold text-neutral-100">{profile.weeklyStudyHours} hrs / week</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/70 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-400 text-[11px] block">Problems Solved</span>
              <span className="font-bold text-neutral-100">{profile.solvedProblemsCount} Challenges</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/70 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <span className="text-neutral-400 text-[11px] block">Tasks Completed</span>
              <span className="font-bold text-neutral-100">{profile.completedTasksCount} Milestones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Focus & Quick Learning Modes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Recommended Focus */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Today's Focus</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400 font-normal">
                    {progressPercent}% Done
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  High-leverage tasks calibrated for {profile.academicLevel} students.
                </p>
              </div>

              <button
                onClick={() => setShowAddTaskInput(!showAddTaskInput)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Progress line */}
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* New Task Inline Form */}
            {showAddTaskInput && (
              <form onSubmit={handleCreateTask} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row gap-2 text-xs">
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title (e.g. Implement Dijkstra's algorithm in C++)..."
                  className="flex-1 rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="rounded-lg bg-neutral-900 border border-neutral-700 px-2 py-1.5 text-neutral-300 focus:outline-none"
                >
                  <option value="academic">Academic</option>
                  <option value="coding">Coding</option>
                  <option value="project">Project</option>
                  <option value="review">Review</option>
                  <option value="career">Career</option>
                  <option value="ai">AI</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 text-neutral-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  Add
                </button>
              </form>
            )}

            {/* Tasks List */}
            <div className="divide-y divide-neutral-800/60 text-xs">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className="py-3 flex items-start justify-between gap-3 cursor-pointer group hover:bg-neutral-850/40 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className="mt-0.5 text-neutral-500 group-hover:text-emerald-400 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                    <div>
                      <p
                        className={`font-medium ${
                          task.completed
                            ? 'line-through text-neutral-500'
                            : 'text-neutral-200 group-hover:text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                        <span className="capitalize">{task.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{task.durationMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchAIMode('explain', `Help me execute this task: "${task.title}". Explain the underlying theory and give me step 1.`);
                    }}
                    className="text-[11px] text-neutral-400 hover:text-emerald-400 font-mono transition-colors shrink-0"
                  >
                    AI Help →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Learning Modes Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>11 AI Learning Modes (Teaching-First Approach)</span>
              </h3>
              <button
                onClick={() => onNavigate('assistant')}
                className="text-xs text-emerald-400 hover:underline font-mono"
              >
                Open Full Assistant →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <button
                onClick={() => onLaunchAIMode('explain')}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-emerald-500/50 text-left transition-all group"
              >
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">
                  Explain Simply
                </span>
                <p className="text-[11px] text-neutral-400 line-clamp-2">
                  Intuitive breakdown with plain English and local analogies.
                </p>
              </button>

              <button
                onClick={() => onLaunchAIMode('teach')}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-emerald-500/50 text-left transition-all group"
              >
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">
                  Teach Me Tutor
                </span>
                <p className="text-[11px] text-neutral-400 line-clamp-2">
                  Step-by-step guidance with hints before answers.
                </p>
              </button>

              <button
                onClick={() => onLaunchAIMode('quiz')}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-emerald-500/50 text-left transition-all group"
              >
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">
                  Quiz Me
                </span>
                <p className="text-[11px] text-neutral-400 line-clamp-2">
                  Evaluate concepts with instant mistake analysis.
                </p>
              </button>

              <button
                onClick={() => onLaunchAIMode('codereview')}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-emerald-500/50 text-left transition-all group"
              >
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">
                  Anti-AI Review
                </span>
                <p className="text-[11px] text-neutral-400 line-clamp-2">
                  Comprehend every line so you can defend it in interviews.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Ethiopian Builder Spotlight & Study Calendar Preview */}
        <div className="space-y-6">
          {/* MoE Exit Exam Readiness & Pre-Help Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-neutral-900 to-neutral-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                MoE Exit Exam Hub 🇪🇹
              </span>
              <button
                onClick={() => onNavigate('exitexam')}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Open Hub →
              </button>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">
              Past Exit Exams (2015, 2016, 2017) & AI Pre-Help
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Mandatory MoE nationwide competency exam readiness. Practice authentic past questions across the 5 clusters with trap analyses and timed simulations.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigate('exitexam')}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors text-center"
              >
                Past Exam Papers
              </button>
              <button
                onClick={() =>
                  onLaunchAIMode(
                    'examprep',
                    `I am a ${profile.academicLevel} student at ${profile.university}. Pre help me for the MoE Computer Science exit exam: diagnose my readiness and generate a 30-day revision strategy.`
                  )
                }
                className="py-2 px-3 text-xs font-bold rounded-lg bg-emerald-500 text-neutral-950 hover:bg-emerald-400 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pre-Help Me</span>
              </button>
            </div>
          </div>

          {/* Build for Ethiopia Spotlight Card */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-neutral-900 to-neutral-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Build for Ethiopia 🇪🇹
              </span>
              <button
                onClick={() => onNavigate('ethiopia')}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Explore Ideas →
              </button>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">
              Transform Ethiopian Challenges into High-Value Software
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Don't just build generic clones. Solve local friction in payment reconciliation (Telebirr/Chapa), agriculture pricing, bilingual NLP, and campus administration.
            </p>

            <button
              onClick={() => onNavigate('ethiopia')}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition-colors text-center block"
            >
              Run 13-Point Problem Analyzer
            </button>
          </div>

          {/* Quick CS Curriculum Jumper */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>CS Curriculum (Ethio MoE & Harvard)</span>
              </h3>
              <button
                onClick={() => onNavigate('learn')}
                className="text-xs text-emerald-400 hover:underline font-mono"
              >
                Dual Hub →
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              Harmonized Ethiopian university syllabus (AAU, ASTU, AASTU) + Harvard CSE courses (CS50, CS61, CS124).
            </p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigate('learn')}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-left transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
                    <span>🇪🇹 CoSc 2031: DSA</span>
                    <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">Harvard CS124</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">Trees, Graphs, Sorting & Master Theorem</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              <button
                onClick={() => onNavigate('learn')}
                className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-left transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-200">
                    <span>🏛️ Harvard CS50x</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">Ethio CoSc 1011/12</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">C, Pointers, Speller & Python / SQL</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Core Philosophy Quote Card */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
              Ethio CSE AI Philosophy
            </span>
            <blockquote className="text-xs text-neutral-200 italic border-l-2 border-emerald-500/60 pl-3 py-0.5 leading-relaxed">
              "You are not just studying Computer Science. You are building the practical skills to create technology."
            </blockquote>
            <p className="text-[11px] text-neutral-400 pt-1">
              Learn technology. Build for Ethiopia. Think globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
