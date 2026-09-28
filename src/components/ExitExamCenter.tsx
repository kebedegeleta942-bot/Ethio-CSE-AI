import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Brain,
  ShieldCheck,
  Target,
  ArrowRight,
  Layers,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import {
  AcademicLevel,
  AILearningMode,
  ExitExamQuestion,
  PastExitExamPaper,
  ExitExamDomain,
} from '../types';
import {
  moeExitExamBlueprints,
  pastExitExamPapers,
  pastExitExamQuestions,
  exitExamCheatSheets,
} from '../data/exitExamData';

interface ExitExamCenterProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const ExitExamCenter: React.FC<ExitExamCenterProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [activeTab, setActiveTab] = useState<'pre_help' | 'past_papers' | 'clusters' | 'timed_sim'>('pre_help');

  // Selected Past Exam Paper
  const [selectedPaperId, setSelectedPaperId] = useState<string>('moe-2016-ec');
  const [paperStudyMode, setPaperStudyMode] = useState<'study' | 'interactive'>('study');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Single Question in Past Papers tab (if interactive mode is active)
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Timed Mock Simulator State
  const [simActive, setSimActive] = useState(false);
  const [simQuestions, setSimQuestions] = useState<ExitExamQuestion[]>([]);
  const [simCurrentIndex, setSimCurrentIndex] = useState(0);
  const [simAnswers, setSimAnswers] = useState<Record<string, string>>({});
  const [simFlagged, setSimFlagged] = useState<Record<string, boolean>>({});
  const [simSecondsLeft, setSimSecondsLeft] = useState(45 * 60); // 45 mins
  const [simSubmitted, setSimSubmitted] = useState(false);

  // Quick Diagnostic Readiness Quiz (In Pre-Help Tab)
  const [diagAnswers, setDiagAnswers] = useState<Record<string, string>>({});
  const [diagSubmitted, setDiagSubmitted] = useState(false);

  // Selected Blueprint for Cluster Tab
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);

  // Copy helper
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Timer countdown for Timed Mock Simulator
  useEffect(() => {
    let interval: any = null;
    if (simActive && !simSubmitted && simSecondsLeft > 0) {
      interval = setInterval(() => {
        setSimSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setSimSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simActive, simSubmitted, simSecondsLeft]);

  const selectedPaper =
    pastExitExamPapers.find((p) => p.id === selectedPaperId) ||
    pastExitExamPapers[0];

  // Filtered questions for past exam papers
  const filteredPaperQuestions = selectedPaper.questions.filter((q) => {
    const matchDomain =
      selectedDomainFilter === 'all' || q.domain === selectedDomainFilter;
    const matchSearch =
      q.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDomain && matchSearch;
  });

  // Diagnostic questions (sample of 5 representative exit exam questions across all 5 domains)
  const diagnosticQuestions = [
    pastExitExamQuestions.find((q) => q.domain === 'Programming & Data Structures')!,
    pastExitExamQuestions.find((q) => q.domain === 'Database Systems')!,
    pastExitExamQuestions.find((q) => q.domain === 'Operating Systems & Architecture')!,
    pastExitExamQuestions.find((q) => q.domain === 'Computer Networks & Security')!,
    pastExitExamQuestions.find((q) => q.domain === 'Software Engineering & Design')!,
  ].filter(Boolean);

  const handleStartSim = (questionPool?: ExitExamQuestion[]) => {
    const questionsToUse = questionPool || [...pastExitExamQuestions].sort(() => 0.5 - Math.random());
    setSimQuestions(questionsToUse);
    setSimCurrentIndex(0);
    setSimAnswers({});
    setSimFlagged({});
    setSimSecondsLeft(questionsToUse.length * 90); // 1.5 mins per question
    setSimSubmitted(false);
    setSimActive(true);
    setActiveTab('timed_sim');
  };

  const handleEndSim = () => {
    setSimSubmitted(true);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Diagnostic score calculation
  const diagCorrectCount = diagnosticQuestions.reduce((acc, q) => {
    return acc + (diagAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  // Timed Simulator score calculation
  const simScore = simQuestions.reduce((acc, q) => {
    return acc + (simAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);
  const simPercentage = simQuestions.length > 0 ? Math.round((simScore / simQuestions.length) * 100) : 0;
  const isSimPassed = simPercentage >= 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-amber-950/40 border border-emerald-500/30 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span>🇪🇹</span>
                <span>MoE National Competency Exit Exam</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Passing Threshold: ≥ 50%
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-neutral-800 text-neutral-300">
                Level: {studentLevel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-8 h-8 text-emerald-400" />
              <span>MoE Computer Science Exit Exam Center</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Official past exit exam papers (2015 E.C., 2016 E.C., 2017 E.C. Model), interactive exam simulations, competency blueprints across all 5 core clusters, and continuous <strong>AI Pre-Help Coaching</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setActiveTab('pre_help');
                onLaunchAIMode(
                  'examprep',
                  `I am preparing for the Ethiopian Ministry of Education (MoE) Computer Science Exit Exam as a ${studentLevel} student. What are my highest priority revision topics across the 5 clusters to guarantee passing above 75%?`
                );
              }}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pre Help Me for Exit Exam</span>
            </button>

            <button
              onClick={() => handleStartSim()}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Timed Mock Exam</span>
            </button>
          </div>
        </div>

        {/* Background accent badge */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('pre_help')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pre_help'
              ? 'bg-emerald-500 text-neutral-950 shadow-md'
              : 'text-neutral-400 hover:text-white bg-neutral-900/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Pre-Help & AI Coach</span>
        </button>

        <button
          onClick={() => setActiveTab('past_papers')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'past_papers'
              ? 'bg-emerald-500 text-neutral-950 shadow-md'
              : 'text-neutral-400 hover:text-white bg-neutral-900/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Past Exam Papers ({pastExitExamPapers.length} Editions)</span>
        </button>

        <button
          onClick={() => setActiveTab('clusters')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'clusters'
              ? 'bg-emerald-500 text-neutral-950 shadow-md'
              : 'text-neutral-400 hover:text-white bg-neutral-900/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>The 5 Competency Clusters</span>
        </button>

        <button
          onClick={() => setActiveTab('timed_sim')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeTab === 'timed_sim'
              ? 'bg-emerald-500 text-neutral-950 shadow-md'
              : 'text-neutral-400 hover:text-white bg-neutral-900/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Timed Mock Simulator</span>
          {simActive && !simSubmitted && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* ========================================================
          TAB 1: PRE-HELP FOR EXIT EXAM (AI Readiness & Diagnostics)
         ======================================================== */}
      {activeTab === 'pre_help' && (
        <div className="space-y-6">
          {/* Quick AI Pre-Help Launcher Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Instant Exit Exam AI Coaching Prompts</span>
              </h2>
              <span className="text-[11px] text-neutral-400 font-mono">
                Click any prompt to launch an in-depth AI consultation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() =>
                  onLaunchAIMode(
                    'examprep',
                    `I am a ${studentLevel} student preparing for the MoE Computer Science exit exam. Create a high-yield, 30-day preparation schedule allocating time across Programming, Databases, OS, Networks, and Software Engineering based on official MoE weightages.`
                  )
                }
                className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-emerald-500/60 transition-all text-left group flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold block w-fit mb-2">
                    Strategy & Timetable
                  </span>
                  <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-400 transition-colors">
                    30-Day Exit Exam Cramming Schedule
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                    Allocate daily study blocks by course weight to hit a 75%+ score without burnout.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pt-2 border-t border-neutral-800/80">
                  <span>Launch Study Planner</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() =>
                  onLaunchAIMode(
                    'examprep',
                    `Explain the top 5 most common tricky questions that trap Ethiopian students on the MoE CS Exit Exam in Database Normalization (1NF, 2NF, 3NF, BCNF) and give step-by-step detection rules.`
                  )
                }
                className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-cyan-500/60 transition-all text-left group flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold block w-fit mb-2">
                    Database Normalization
                  </span>
                  <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-cyan-400 transition-colors">
                    Normalization 2NF/3NF/BCNF Traps
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                    Master partial dependencies, transitive rules, and candidate key determinants.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-semibold pt-2 border-t border-neutral-800/80">
                  <span>Deconstruct SQL Traps</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() =>
                  onLaunchAIMode(
                    'examprep',
                    `Teach me how to calculate IPv4 Subnetting for MoE Exit Exam questions in 30 seconds: CIDR /25 to /30, Network ID, Broadcast IP, and usable host count.`
                  )
                }
                className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/60 transition-all text-left group flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold block w-fit mb-2">
                    Computer Networks
                  </span>
                  <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-400 transition-colors">
                    Subnetting & CIDR Speed Calculation
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                    Guaranteed 3-4 questions on every exam. Learn the power-of-2 fast mental shortcuts.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold pt-2 border-t border-neutral-800/80">
                  <span>Master Subnetting</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() =>
                  onLaunchAIMode(
                    'practice',
                    `Act as an Ethiopian University Computer Science Exit Exam Examiner. Give me 1 challenging multiple-choice question on Operating Systems (CPU Scheduling or Deadlock), wait for my answer, and evaluate my reasoning with full diagnostic feedback.`
                  )
                }
                className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-purple-500/60 transition-all text-left group flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold block w-fit mb-2">
                    1-on-1 Socratic Mock
                  </span>
                  <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-purple-400 transition-colors">
                    Live Oral Exit Exam Simulation
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                    Interactive AI examiner testing your conceptual depth without spoon-feeding answers.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-purple-400 font-semibold pt-2 border-t border-neutral-800/80">
                  <span>Start Live Session</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Diagnostic Readiness Assessment Widget */}
          <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  MoE Diagnostic Quick Test (5 Clusters)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  Are You Ready to Pass the Exit Exam Right Now?
                </h3>
                <p className="text-xs text-neutral-400">
                  Answer 5 high-frequency questions (1 from each core domain) to evaluate your current baseline.
                </p>
              </div>

              {diagSubmitted ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 block font-mono">Diagnostic Result</span>
                    <span className={`text-lg font-black font-mono ${diagCorrectCount >= 3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {diagCorrectCount} / 5 ({diagCorrectCount * 20}%)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setDiagAnswers({});
                      setDiagSubmitted(false);
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                    title="Reset Diagnostic"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="text-xs font-mono px-3 py-1 rounded-lg bg-neutral-800 text-neutral-300">
                  5 Diagnostic Questions
                </span>
              )}
            </div>

            {/* Questions list */}
            <div className="space-y-4">
              {diagnosticQuestions.map((q, idx) => {
                const selectedOpt = diagAnswers[q.id];
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-neutral-950/70 border border-neutral-850 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-400 font-bold">
                        Domain {idx + 1}: {q.domain}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {q.courseCode} · {q.yearEC}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      {q.prompt}
                    </h4>

                    {q.codeSnippet && (
                      <pre className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                        {q.codeSnippet}
                      </pre>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedOpt === opt;
                        const isThisCorrect = opt === q.correctAnswer;

                        let btnStyle = 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700';

                        if (diagSubmitted) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 font-bold';
                          } else {
                            btnStyle = 'bg-neutral-950 border-neutral-800/60 text-neutral-500 opacity-60';
                          }
                        } else if (isThisSelected) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={diagSubmitted}
                            onClick={() =>
                              setDiagAnswers((prev) => ({ ...prev, [q.id]: opt }))
                            }
                            className={`p-3 rounded-xl border text-left text-[11px] sm:text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {diagSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {diagSubmitted && isThisSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {diagSubmitted && (
                      <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                        <span className="font-bold text-emerald-400 block">Explanation:</span>
                        <p>{q.explanation}</p>
                        {q.trapAnalysis && (
                          <p className="text-amber-300/90 pt-1">
                            <strong>MoE Trap Warning:</strong> {q.trapAnalysis}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Diagnostic submit button / verdict */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!diagSubmitted ? (
                <button
                  onClick={() => setDiagSubmitted(true)}
                  disabled={Object.keys(diagAnswers).length < diagnosticQuestions.length}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Submit Diagnostic (Answered {Object.keys(diagAnswers).length} of {diagnosticQuestions.length})
                  </span>
                </button>
              ) : (
                <div className="w-full p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-white block text-sm">
                      {diagCorrectCount >= 3 ? '🎉 Passing Baseline Confirmed (≥ 50%)' : '⚠️ Immediate Revision Required (< 50%)'}
                    </strong>
                    <span className="text-neutral-400">
                      {diagCorrectCount >= 3
                        ? 'You have foundational recall across the core clusters. Focus on timing and edge case questions to achieve distinction.'
                        : 'Your diagnostic indicates gaps in database normalization or OS memory models. Review the clusters tab below.'}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onLaunchAIMode(
                        'examprep',
                        `I just completed the MoE Diagnostic test scoring ${diagCorrectCount}/5 (${diagCorrectCount * 20}%). Explain my weaknesses and give me 3 practice problems to correct my understanding.`
                      )
                    }
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl shrink-0 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Action Plan</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* High-Yield Exit Exam Cheat Sheets */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>MoE High-Probability Formula Cheat Sheets</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exitExamCheatSheets.map((sheet, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs sm:text-sm">{sheet.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400 font-bold">
                      {sheet.domain}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {sheet.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: PAST EXAM PAPERS (2015 E.C., 2016 E.C., 2017 E.C.)
         ======================================================== */}
      {activeTab === 'past_papers' && (
        <div className="space-y-6">
          {/* Paper Selector & Study Mode Toggle */}
          <div className="p-5 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Official MoE Item Bank
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Select Past Exit Exam Paper
                </h2>
              </div>

              {/* Paper Selection Tabs */}
              <div className="flex flex-wrap gap-2 text-xs">
                {pastExitExamPapers.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => {
                      setSelectedPaperId(paper.id);
                      setInteractiveAnswers({});
                      setRevealedSolutions({});
                    }}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                      selectedPaperId === paper.id
                        ? 'bg-emerald-500 text-neutral-950 shadow-md'
                        : 'bg-neutral-950 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {paper.yearEC}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Paper Details Summary */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm">{selectedPaper.title}</h3>
                <p className="text-neutral-400 text-[11px] leading-relaxed max-w-3xl">
                  {selectedPaper.description}
                </p>
                <div className="flex flex-wrap gap-3 text-[11px] text-neutral-400 font-mono pt-1">
                  <span>🏛️ {selectedPaper.administeredBy}</span>
                  <span>⏱️ {selectedPaper.timeLimitMinutes} mins allocated</span>
                  <span>🎯 Pass threshold: 50%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleStartSim(selectedPaper.questions)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Simulate this Paper</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions by keyword (e.g., BST, Normalization, Subnet, Deadlock, Cohesion)..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <select
                  value={selectedDomainFilter}
                  onChange={(e) => setSelectedDomainFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Domains (5 Clusters)</option>
                  <option value="Programming & Data Structures">Programming & Data Structures</option>
                  <option value="Database Systems">Database Systems</option>
                  <option value="Operating Systems & Architecture">Operating Systems & Architecture</option>
                  <option value="Computer Networks & Security">Computer Networks & Security</option>
                  <option value="Software Engineering & Design">Software Engineering & Design</option>
                </select>

                <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                  <button
                    onClick={() => setPaperStudyMode('study')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      paperStudyMode === 'study'
                        ? 'bg-neutral-800 text-emerald-400 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Study Mode
                  </button>
                  <button
                    onClick={() => setPaperStudyMode('interactive')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      paperStudyMode === 'interactive'
                        ? 'bg-neutral-800 text-emerald-400 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Practice Mode
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <span>Showing {filteredPaperQuestions.length} Questions</span>
              <span>{paperStudyMode === 'study' ? 'Solutions revealed with trap analysis' : 'Click an option to test your answer'}</span>
            </div>

            {filteredPaperQuestions.map((q, qIndex) => {
              const selectedOpt = interactiveAnswers[q.id];
              const isSolutionShown = paperStudyMode === 'study' || revealedSolutions[q.id] || selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-400 font-bold">
                        Q{qIndex + 1}
                      </span>
                      <span className="text-neutral-500">·</span>
                      <span className="font-mono text-neutral-300">{q.courseCode}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-400">{q.courseName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {q.domain}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        q.difficulty === 'High Frequency'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    {q.prompt}
                  </h3>

                  {q.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                      {q.codeSnippet}
                    </pre>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedOpt === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let style = 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700';

                      if (isSolutionShown) {
                        if (isThisCorrect) {
                          style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isOptionSelected && !isThisCorrect) {
                          style = 'bg-rose-950/40 border-rose-500 text-rose-300 font-bold';
                        } else {
                          style = 'bg-neutral-950 border-neutral-800/60 text-neutral-500 opacity-60';
                        }
                      } else if (isOptionSelected) {
                        style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => {
                            setInteractiveAnswers((prev) => ({ ...prev, [q.id]: opt }));
                            setRevealedSolutions((prev) => ({ ...prev, [q.id]: true }));
                          }}
                          className={`p-3.5 rounded-xl border text-left text-[11px] sm:text-xs transition-all flex items-center justify-between ${style}`}
                        >
                          <span>{opt}</span>
                          {isSolutionShown && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {isSolutionShown && isOptionSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution & Trap Analysis */}
                  {isSolutionShown && (
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2 pt-3">
                      <div>
                        <strong className="text-emerald-400 block mb-0.5">Official Answer & Explanation:</strong>
                        <p className="text-neutral-300 leading-relaxed">{q.explanation}</p>
                      </div>

                      {q.trapAnalysis && (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-[11px]">
                          <strong className="text-amber-400 block mb-0.5">⚠️ Why Students Fail This Question (MoE Trap):</strong>
                          {q.trapAnalysis}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                        <div className="flex gap-1">
                          {q.tags.map((t, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            onLaunchAIMode(
                              'examprep',
                              `Explain this MoE past exit exam question in greater depth: "${q.prompt}". Show me why "${q.correctAnswer}" is correct and generate a similar practice question.`
                            )
                          }
                          className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Ask AI Tutor to Elaborate</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: THE 5 COMPETENCY CLUSTERS DEEP DIVE
         ======================================================== */}
      {activeTab === 'clusters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cluster Selector List */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block px-1">
              MoE 5 Core Clusters ({moeExitExamBlueprints.reduce((a, b) => a + b.weightPercentage, 0)}% Total)
            </span>

            <div className="space-y-2">
              {moeExitExamBlueprints.map((blueprint, idx) => {
                const isSelected = selectedClusterIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedClusterIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-neutral-800/90 border-emerald-500 shadow-md text-white'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm">{blueprint.domain}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {blueprint.weightPercentage}% Weight
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                      {blueprint.officialCourses.map((c) => c.name).join(', ')}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Cluster Deep Dive */}
          <div className="lg:col-span-8 space-y-6 bg-neutral-900/40 p-5 sm:p-6 rounded-2xl border border-neutral-800">
            {(() => {
              const currentCluster = moeExitExamBlueprints[selectedClusterIndex];
              const clusterQuestions = pastExitExamQuestions.filter(
                (q) => q.domain === currentCluster.domain
              );

              return (
                <div className="space-y-6">
                  {/* Cluster Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Weight: {currentCluster.weightPercentage}% of Exit Exam
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                        {currentCluster.domain}
                      </h2>
                    </div>

                    <button
                      onClick={() =>
                        onLaunchAIMode(
                          'examprep',
                          `Provide an intensive diagnostic tutorial for the MoE Exit Exam cluster: "${currentCluster.domain}". Cover the highest probability topics and generate 5 practice questions.`
                        )
                      }
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all self-start"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Cluster AI Crash Course</span>
                    </button>
                  </div>

                  {/* Courses In This Cluster */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                      Official MoE Curriculum Courses in this Cluster:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentCluster.officialCourses.map((c, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex justify-between items-center text-neutral-200">
                          <div>
                            <span className="font-mono text-emerald-400 text-[10px] mr-1.5">{c.code}</span>
                            <span>{c.name}</span>
                          </div>
                          <span className="font-mono text-neutral-400 text-[10px]">{c.weight}% wt</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Topics */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block">
                      Core Syllabus Topics Tested:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {currentCluster.keyTopics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Strategy & Pitfalls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                      <span className="font-bold text-cyan-400 block">💡 High-Score Strategy:</span>
                      <p className="text-neutral-300 leading-relaxed">{currentCluster.recommendedStrategy}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                      <span className="font-bold text-rose-400 block">⚠️ Common Student Mistakes:</span>
                      <ul className="space-y-1 text-neutral-300">
                        {currentCluster.commonPitfalls.map((pf, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{pf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Past Exam Questions For This Cluster */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block">
                        Past Exam Questions in this Cluster ({clusterQuestions.length})
                      </span>
                      <button
                        onClick={() => handleStartSim(clusterQuestions)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Simulate this Cluster ({clusterQuestions.length} Qs)</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {clusterQuestions.map((q, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <span className="font-mono text-emerald-400 text-[10px]">{q.yearEC} · {q.courseCode}</span>
                            <p className="text-neutral-200 line-clamp-1 font-medium">{q.prompt}</p>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 shrink-0">
                            {q.difficulty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: TIMED MOCK EXAM SIMULATOR
         ======================================================== */}
      {activeTab === 'timed_sim' && (
        <div className="space-y-6">
          {!simActive ? (
            /* Simulator Start Screen */
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <Clock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  MoE Computer Science Exit Exam Simulator
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Experience authentic examination pressure under timed conditions. Strictly graded with the official 50% passing threshold.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-left p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500 block">Question Count</span>
                  <span className="text-white font-bold font-mono">{pastExitExamQuestions.length} Questions</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Time Allocation</span>
                  <span className="text-white font-bold font-mono">30 Minutes</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Passing Mark</span>
                  <span className="text-emerald-400 font-bold font-mono">≥ 50%</span>
                </div>
              </div>

              <button
                onClick={() => handleStartSim()}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Begin Timed Examination</span>
              </button>
            </div>
          ) : !simSubmitted ? (
            /* Active Simulation Running */
            <div className="space-y-5">
              {/* Simulator Navigation Bar */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-white">
                    Question {simCurrentIndex + 1} of {simQuestions.length}
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-xs text-neutral-400">
                    {simQuestions[simCurrentIndex]?.domain}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Timer Display */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                    simSecondsLeft < 300
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                      : 'bg-neutral-950 text-emerald-400 border border-neutral-800'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>Time Remaining: {formatTime(simSecondsLeft)}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to finish and submit your exam?')) {
                        handleEndSim();
                      }
                    }}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl"
                  >
                    Submit Exam
                  </button>
                </div>
              </div>

              {/* Question Palette Buttons */}
              <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-neutral-950 border border-neutral-850">
                {simQuestions.map((sq, sIdx) => {
                  const isCurrent = simCurrentIndex === sIdx;
                  const isAnswered = simAnswers[sq.id] !== undefined;
                  const isFlagged = simFlagged[sq.id];

                  let pillStyle = 'bg-neutral-900 text-neutral-400 border-neutral-800';
                  if (isCurrent) {
                    pillStyle = 'bg-emerald-500 text-neutral-950 font-bold border-emerald-400';
                  } else if (isFlagged) {
                    pillStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                  } else if (isAnswered) {
                    pillStyle = 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30';
                  }

                  return (
                    <button
                      key={sq.id}
                      onClick={() => setSimCurrentIndex(sIdx)}
                      className={`w-7 h-7 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${pillStyle}`}
                    >
                      {sIdx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Active Exam Question Card */}
              {(() => {
                const currentQ = simQuestions[simCurrentIndex];
                if (!currentQ) return null;
                const chosenOpt = simAnswers[currentQ.id];

                return (
                  <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
                    <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800">
                      <span className="font-mono text-emerald-400">
                        {currentQ.courseCode} · {currentQ.courseName}
                      </span>
                      <button
                        onClick={() =>
                          setSimFlagged((prev) => ({
                            ...prev,
                            [currentQ.id]: !prev[currentQ.id],
                          }))
                        }
                        className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                          simFlagged[currentQ.id]
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                        }`}
                      >
                        {simFlagged[currentQ.id] ? '★ Flagged for Review' : '☆ Flag for Review'}
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {currentQ.prompt}
                    </h3>

                    {currentQ.codeSnippet && (
                      <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                        {currentQ.codeSnippet}
                      </pre>
                    )}

                    <div className="space-y-2.5">
                      {currentQ.options.map((opt, oIdx) => {
                        const isChosen = chosenOpt === opt;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() =>
                              setSimAnswers((prev) => ({ ...prev, [currentQ.id]: opt }))
                            }
                            className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${
                              isChosen
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {isChosen && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                      <button
                        disabled={simCurrentIndex === 0}
                        onClick={() => setSimCurrentIndex((p) => p - 1)}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>

                      <span className="text-xs text-neutral-500 font-mono">
                        Answered {Object.keys(simAnswers).length} of {simQuestions.length}
                      </span>

                      <button
                        onClick={() => {
                          if (simCurrentIndex < simQuestions.length - 1) {
                            setSimCurrentIndex((p) => p + 1);
                          } else {
                            if (confirm('This is the last question. Submit your exam now?')) {
                              handleEndSim();
                            }
                          }
                        }}
                        className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>{simCurrentIndex === simQuestions.length - 1 ? 'Finish & Submit' : 'Next'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Simulator Results Screen */
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 text-center space-y-4 max-w-2xl mx-auto">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                  isSimPassed
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {isSimPassed ? <Award className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Official Exit Exam Result
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {isSimPassed ? 'PASSED — Exam Ready! 🎓' : 'DID NOT PASS (< 50%) ⚠️'}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Passing requires a score of at least 50% across the nationwide testing system.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center gap-8 font-mono">
                  <div>
                    <span className="text-neutral-500 text-xs block">Raw Score</span>
                    <span className="text-2xl font-bold text-white">{simScore} / {simQuestions.length}</span>
                  </div>
                  <div className="w-px h-10 bg-neutral-800" />
                  <div>
                    <span className="text-neutral-500 text-xs block">Percentage</span>
                    <span className={`text-2xl font-black ${isSimPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {simPercentage}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleStartSim()}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Simulator</span>
                  </button>

                  <button
                    onClick={() =>
                      onLaunchAIMode(
                        'examprep',
                        `I just completed a full MoE CS Exit Exam Mock Simulator and scored ${simScore}/${simQuestions.length} (${simPercentage}%). Analyze my mistakes and break down what I must study to guarantee a passing grade.`
                      )
                    }
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Mistakes with AI Tutor</span>
                  </button>
                </div>
              </div>

              {/* Complete Question Review */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Detailed Answer Review ({simQuestions.length} Questions)
                </h3>

                <div className="space-y-4">
                  {simQuestions.map((q, idx) => {
                    const studentChoice = simAnswers[q.id];
                    const isQuestionCorrect = studentChoice === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border ${
                          isQuestionCorrect
                            ? 'bg-neutral-900/40 border-emerald-500/30'
                            : 'bg-neutral-950 border-rose-500/30'
                        } space-y-3`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-neutral-300">
                            Q{idx + 1}: {q.courseCode} ({q.domain})
                          </span>
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                            isQuestionCorrect
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {isQuestionCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-white">
                          {q.prompt}
                        </p>

                        <div className="text-xs space-y-1">
                          <div className="text-neutral-400 text-[11px]">
                            <strong>Your Answer:</strong> {studentChoice || 'Not Answered'}
                          </div>
                          <div className="text-emerald-400 text-[11px]">
                            <strong>Correct Answer:</strong> {q.correctAnswer}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                          <strong>Explanation:</strong>
                          <p>{q.explanation}</p>
                          {q.trapAnalysis && (
                            <p className="text-amber-300/90 pt-1">
                              <strong>MoE Trap Warning:</strong> {q.trapAnalysis}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
