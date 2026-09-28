import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Layers,
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Award,
  Filter,
  ChevronDown,
  ChevronUp,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { CSCourseModule, AcademicLevel, AILearningMode } from '../types';
import {
  allEthiopianCSECourses,
  harvardCSECourses,
  curriculumComparisonBridges,
} from '../data/curriculumData';

interface CSLearningHubProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

type CurriculumTab = 'all' | 'ethiopian' | 'harvard' | 'bridge';

export const CSLearningHub: React.FC<CSLearningHubProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [activeTab, setActiveTab] = useState<CurriculumTab>('ethiopian');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const yearFilters = [
    { id: 'all', label: 'All Years' },
    { id: '1st Year', label: '1st Year (Freshman)' },
    { id: '2nd Year', label: '2nd Year (Sophomore)' },
    { id: '3rd Year', label: '3rd Year (Junior)' },
    { id: '4th Year', label: '4th Year (Senior / Exit)' },
  ];

  const categoryFilters = [
    'all',
    'Fundamentals',
    'Core CS',
    'Systems & Architecture',
    'Software Engineering',
    'Advanced & AI',
  ];

  // Pick courses based on curriculum tab
  const getCoursesForTab = () => {
    switch (activeTab) {
      case 'ethiopian':
        return allEthiopianCSECourses;
      case 'harvard':
        return harvardCSECourses;
      case 'all':
      default:
        return [...allEthiopianCSECourses, ...harvardCSECourses];
    }
  };

  const currentCoursePool = getCoursesForTab();

  const filteredCourses = currentCoursePool.filter((c) => {
    const matchYear = selectedYear === 'all' || c.recommendedYear.includes(selectedYear);
    const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.instructor && c.instructor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.semester && c.semester.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.problemSets && c.problemSets.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchYear && matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Dual Academic Hub
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Harvard SEAS + Ethiopian MoE CSE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span>Computer Science & Engineering Curriculum</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
            All courses given for CSE students in Ethiopian universities (Harmonized MoE Curriculum followed by AAU, ASTU, AASTU, JiT, BiT) alongside world-renowned Harvard University CSE courses (CS50, CS61, CS124, CS181) with a direct equivalence bridge.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onLaunchAIMode(
                'teach',
                `I am a ${studentLevel} Computer Science student in Ethiopia. Walk me through the most critical concept from my curriculum right now, using clear visual step-by-step reasoning.`
              )
            }
            className="px-4 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl transition-all whitespace-nowrap shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch AI Academic Tutor</span>
          </button>
        </div>
      </div>

      {/* Curriculum Summary Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveTab('ethiopian')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'ethiopian'
              ? 'bg-emerald-950/40 border-emerald-500/40 ring-1 ring-emerald-500/20'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Ethiopian MoE Courses</span>
            <span className="text-base">🇪🇹</span>
          </div>
          <div className="text-xl font-bold text-white">
            {allEthiopianCSECourses.length}{' '}
            <span className="text-xs font-normal text-emerald-400">Courses</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">Years 1–4 across AAU, ASTU, AASTU</p>
        </div>

        <div
          onClick={() => setActiveTab('harvard')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'harvard'
              ? 'bg-rose-950/40 border-rose-500/40 ring-1 ring-rose-500/20'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Harvard CSE Courses</span>
            <span className="text-base">🏛️</span>
          </div>
          <div className="text-xl font-bold text-white">
            {harvardCSECourses.length}{' '}
            <span className="text-xs font-normal text-rose-400">Courses</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">CS50x, CS50W, CS61, CS124, CS181</p>
        </div>

        <div
          onClick={() => setActiveTab('bridge')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'bridge'
              ? 'bg-amber-950/40 border-amber-500/40 ring-1 ring-amber-500/20'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Curriculum Bridges</span>
            <span className="text-base">🔄</span>
          </div>
          <div className="text-xl font-bold text-white">
            {curriculumComparisonBridges.length}{' '}
            <span className="text-xs font-normal text-amber-400">Bridges</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">Harvard ↔ Ethiopian Exam Mappings</p>
        </div>

        <div
          onClick={() => setActiveTab('all')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-indigo-950/40 border-indigo-500/40 ring-1 ring-indigo-500/20'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>Combined Total</span>
            <span className="text-base">📚</span>
          </div>
          <div className="text-xl font-bold text-white">
            {allEthiopianCSECourses.length + harvardCSECourses.length}{' '}
            <span className="text-xs font-normal text-indigo-400">Total</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">Full dual curriculum catalog</p>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('ethiopian')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'ethiopian'
              ? 'bg-emerald-500 text-neutral-950 shadow-sm'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <span>🇪🇹 Ethiopian Universities (MoE Harmonized)</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'ethiopian' ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
            }`}
          >
            {allEthiopianCSECourses.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('harvard')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'harvard'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <span>🏛️ Harvard University CSE (SEAS & edX)</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'harvard' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-300'
            }`}
          >
            {harvardCSECourses.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bridge')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'bridge'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <span>🔄 Harvard ↔ Ethiopian Equivalence Bridges</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'bridge' ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
            }`}
          >
            {curriculumComparisonBridges.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-neutral-200 text-neutral-950 shadow-sm'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <span>📚 All Courses ({allEthiopianCSECourses.length + harvardCSECourses.length})</span>
        </button>
      </div>

      {/* Render Curriculum Bridge Tab */}
      {activeTab === 'bridge' ? (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-neutral-900 to-emerald-950/30 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Strategic Study Guide
                </span>
                <span className="text-xs text-neutral-400">Harvard SEAS + Ethiopian Higher Ed</span>
              </div>
              <h2 className="text-base font-bold text-white">
                How Ethiopian CSE Students Can Use Harvard Courses to Top University Exams & Exit Exams
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
                Harvard courses like CS50, CS61, and CS124 break down complex computer science concepts with exceptional world-class visualizations and rigorous problem sets. By pairing Harvard lecture modules with your Ethiopian syllabus, you conquer pointers, operating systems, and dynamic programming with total confidence.
              </p>
            </div>

            <button
              onClick={() =>
                onLaunchAIMode(
                  'planner',
                  'Create an optimal weekly study schedule for me that integrates Harvard CS50/CS124 video modules alongside my Ethiopian university semester courses.'
                )
              }
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 self-start md:self-auto shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Dual Study Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculumComparisonBridges.map((bridge) => (
              <div
                key={bridge.id}
                className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>{bridge.topicDomain}</span>
                    </h3>
                  </div>

                  {/* Comparison columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide block">
                        🇪🇹 Ethiopian Courses
                      </span>
                      <ul className="text-neutral-300 font-mono text-[11px] space-y-0.5">
                        {bridge.ethiopianCourses.map((c, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wide block">
                        🏛️ Harvard Courses
                      </span>
                      <ul className="text-neutral-300 font-mono text-[11px] space-y-0.5">
                        {bridge.harvardCourses.map((c, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* How to study together */}
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs space-y-1">
                    <span className="font-semibold text-neutral-200 block text-[11px]">
                      💡 Study Strategy:
                    </span>
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {bridge.howToStudyTogether}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs gap-2">
                  <span className="text-[11px] text-amber-400 font-medium">
                    ⚡ {bridge.recommendedAction}
                  </span>
                  <button
                    onClick={() =>
                      onLaunchAIMode(
                        'teach',
                        `Explain how the concepts in ${bridge.ethiopianCourses.join(' & ')} align with ${bridge.harvardCourses.join(' & ')}. Teach me the most difficult topic common to both.`
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Bridge AI Tutor</span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Render Course Modules Catalog */
        <div className="space-y-4">
          {/* Filters & Search Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by code (e.g. CoSc 2031, CS50x), topic (Pointers, Normalization, Raft), professor, or pset..."
                  className="w-full rounded-xl bg-neutral-900 border border-neutral-800 pl-9 pr-3 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Year pills */}
              <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto scrollbar-none text-xs">
                {yearFilters.map((y) => (
                  <button
                    key={y.id}
                    onClick={() => setSelectedYear(y.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                      selectedYear === y.id
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {y.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-neutral-500 text-[11px] whitespace-nowrap flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Discipline:</span>
              </span>
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors capitalize ${
                    selectedCategory === cat
                      ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30 font-semibold'
                      : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border border-neutral-850'
                  }`}
                >
                  {cat === 'all' ? 'All Disciplines' : cat}
                </button>
              ))}

              <span className="ml-auto text-[11px] text-neutral-500 whitespace-nowrap font-mono">
                Showing {filteredCourses.length} courses
              </span>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourseId === course.id;
              const isHarvard = course.curriculumSource === 'harvard_university';

              return (
                <div
                  key={course.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    isHarvard
                      ? 'bg-gradient-to-b from-rose-950/15 via-neutral-900/50 to-neutral-900/40 border-rose-950/60 hover:border-rose-700/50'
                      : 'bg-gradient-to-b from-emerald-950/10 via-neutral-900/50 to-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top badging */}
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold border ${
                            isHarvard
                              ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                              : 'bg-neutral-800 text-emerald-400 border-neutral-700'
                          }`}
                        >
                          {course.code}
                        </span>

                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            isHarvard
                              ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {isHarvard ? '🏛️ Harvard University' : '🇪🇹 Ethiopian MoE'}
                        </span>

                        {course.creditHours && (
                          <span className="text-[11px] text-neutral-400 font-mono">
                            {course.creditHours}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                        {course.category}
                      </span>
                    </div>

                    {/* Semester and instructor */}
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      {course.semester && (
                        <span className="text-[11px] text-neutral-300 font-medium">
                          📅 {course.semester}
                        </span>
                      )}
                      {course.instructor && (
                        <span className="text-[11px] text-neutral-400">
                          👨‍🏫 {course.instructor}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-1">
                        {course.description}
                      </p>
                    </div>

                    {/* Equivalence Bridge Banner */}
                    {course.harvardEquivalent && (
                      <div className="p-2 rounded-lg bg-rose-950/20 border border-rose-500/20 flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">
                          🏛️ <strong className="text-rose-300">Harvard Equivalent:</strong>{' '}
                          {course.harvardEquivalent}
                        </span>
                        <button
                          onClick={() => setActiveTab('bridge')}
                          className="text-rose-400 hover:underline font-semibold ml-2 whitespace-nowrap text-[10px]"
                        >
                          View Bridge →
                        </button>
                      </div>
                    )}

                    {course.ethiopianEquivalent && (
                      <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">
                          🇪🇹 <strong className="text-emerald-300">Ethiopian Exam Alignment:</strong>{' '}
                          {course.ethiopianEquivalent}
                        </span>
                        <button
                          onClick={() => setActiveTab('bridge')}
                          className="text-emerald-400 hover:underline font-semibold ml-2 whitespace-nowrap text-[10px]"
                        >
                          View Bridge →
                        </button>
                      </div>
                    )}

                    {/* Core Topics Covered */}
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold text-neutral-400 block mb-1.5">
                        Core Syllabus Topics:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.keyTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[11px] bg-neutral-950 text-neutral-300 border border-neutral-800"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Sections (Problem Sets & Exam Focus) */}
                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-neutral-800/80 text-xs">
                        {/* Harvard Problem Sets */}
                        {course.problemSets && course.problemSets.length > 0 && (
                          <div>
                            <span className="font-semibold text-rose-300 block mb-1">
                              📂 Official Problem Sets & Projects:
                            </span>
                            <div className="space-y-1 bg-rose-950/15 p-3 rounded-xl border border-rose-900/30">
                              {course.problemSets.map((pset, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-1.5 text-neutral-300 text-[11px]"
                                >
                                  <span className="text-rose-400 font-bold">•</span>
                                  <span>{pset}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Practical Lab Exercises */}
                        {course.practicalExercises && course.practicalExercises.length > 0 && (
                          <div>
                            <span className="font-semibold text-neutral-300 block mb-1">
                              💡 Practical Lab Challenges:
                            </span>
                            <ul className="list-disc list-inside text-neutral-400 space-y-1 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-850">
                              {course.practicalExercises.map((ex, idx) => (
                                <li key={idx} className="text-[11px] text-neutral-300">
                                  {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Ethiopian University Exam Dynamic */}
                        <div>
                          <span className="font-semibold text-amber-400 block mb-1">
                            🏛️ Ethiopian University Exam & MoE Exit Exam Dynamic:
                          </span>
                          <p className="text-neutral-300 italic bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30 text-[11px] leading-relaxed">
                            {course.ethiopianExamFocus}
                          </p>
                        </div>

                        {/* Course URL if Harvard */}
                        {course.courseUrl && (
                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[11px] text-neutral-400">
                              Official Open Courseware:
                            </span>
                            <a
                              href={course.courseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 font-mono font-semibold"
                            >
                              <span>{course.courseUrl.replace('https://', '')}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                      className="text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1 text-[11px]"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Problem Sets & Exam Focus'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onLaunchAIMode(
                            'examprep',
                            `Generate 3 high-yield university exam questions and problem set challenges for ${course.code}: ${course.title}. Include step-by-step solutions and common error traps.`
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors text-[11px]"
                      >
                        Exam Prep
                      </button>

                      <button
                        onClick={() =>
                          onLaunchAIMode(
                            'teach',
                            `Teach me ${course.title} (${course.code} from ${
                              isHarvard ? 'Harvard University' : 'Ethiopian Higher Education'
                            }). Begin with the foundational mental model, give concrete examples, and quiz me.`
                          )
                        }
                        className={`px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-sm text-[11px] flex items-center gap-1 active:scale-95 ${
                          isHarvard
                            ? 'bg-rose-600 hover:bg-rose-500 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>AI Tutor</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-3">
              <BookOpen className="w-8 h-8 text-neutral-600 mx-auto" />
              <h3 className="text-sm font-semibold text-white">No courses match your filter</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Try clearing your search query or switching between the Ethiopian Universities, Harvard University, or All Courses tabs.
              </p>
              <button
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-200 text-xs hover:bg-neutral-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
