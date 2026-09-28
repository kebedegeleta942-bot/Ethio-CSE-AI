import React, { useState } from 'react';
import {
  Compass,
  Search,
  Briefcase,
  Building2,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  CheckCircle2,
  DollarSign,
  Globe,
  Award,
} from 'lucide-react';
import { CareerPathDetail, AcademicLevel, AILearningMode } from '../types';
import { careerPaths } from '../data/defaultData';
import { searchEthiopianJobs } from '../services/api';

interface CareerCenterProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const CareerCenter: React.FC<CareerCenterProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [selectedPath, setSelectedPath] = useState<CareerPathDetail>(careerPaths[0]);
  const [searchJobQuery, setSearchJobQuery] = useState('Junior Full Stack Developer Addis Ababa');
  const [jobSearchResults, setJobSearchResults] = useState<any[]>([]);
  const [isSearchingJobs, setIsSearchingJobs] = useState(false);
  const [activeTab, setActiveTab] = useState<'paths' | 'companies' | 'search' | 'cv_guide'>('paths');

  const ethiopianEmployers = [
    {
      name: 'Ethio Telecom',
      category: 'Telecom & Enterprise',
      hq: 'Addis Ababa (Churchill Rd)',
      focus: 'Telebirr core platform, Cloud services, Network infrastructure, 5G rollouts, Microservices',
      stack: ['Java / Spring Boot', 'Python', 'Oracle / PostgreSQL', 'Kubernetes', 'High-throughput APIs'],
      hiringAdvice: 'Prioritize strong fundamentals in algorithms, database transactions, and networking protocols.',
    },
    {
      name: 'Safaricom Ethiopia',
      category: 'Telecom & FinTech',
      hq: 'Addis Ababa (Bole)',
      focus: 'M-PESA mobile money engine, GSM infrastructure, Enterprise integrations, Analytics',
      stack: ['Go', 'Node.js / TypeScript', 'PostgreSQL', 'Kafka', 'Docker'],
      hiringAdvice: 'Looking for modern software engineering practices, automated testing, and CI/CD familiarity.',
    },
    {
      name: 'Chapa Financial Technologies',
      category: 'FinTech Payment Gateway',
      hq: 'Addis Ababa (Bole Medhanialem)',
      focus: 'Online payment gateways, merchant checkout APIs, developer developer tooling, instant payouts',
      stack: ['Node.js / Express', 'TypeScript', 'React', 'PostgreSQL', 'Redis'],
      hiringAdvice: 'Showcase clean REST APIs, idempotency key handling, webhook signature validation, and live GitHub repos.',
    },
    {
      name: 'Commercial Bank of Ethiopia (CBE)',
      category: 'Banking & Financial Infrastructure',
      hq: 'Addis Ababa (Commercial Tower)',
      focus: 'Core banking systems, CBE Birr mobile app, internet banking, fraud detection, cybersecurity',
      stack: ['Java EE', 'C# / .NET', 'SQL Server / Oracle', 'Enterprise Security'],
      hiringAdvice: 'High demand for cybersecurity talent, ACID transaction integrity, and robust backend resilience.',
    },
    {
      name: 'Gebeya Inc.',
      category: 'Talent Marketplace & EdTech',
      hq: 'Addis Ababa & Regional Hubs',
      focus: 'Pan-African developer matching, client outsourcing, tech talent upskilling',
      stack: ['React', 'Python / Django', 'Node.js', 'AWS Cloud'],
      hiringAdvice: 'Great entry point for junior talent to gain real international client work experience.',
    },
    {
      name: 'SantimPay',
      category: 'FinTech & POS Solutions',
      hq: 'Addis Ababa',
      focus: 'Point of Sale (POS) Android apps, QR code payment rails, merchant invoicing',
      stack: ['Flutter', 'Android Native', 'Node.js', 'PostgreSQL'],
      hiringAdvice: 'Demonstrate mobile app performance, local database caching, and offline hardware integration.',
    },
  ];

  const handleSearchJobs = async () => {
    if (!searchJobQuery.trim()) return;
    setIsSearchingJobs(true);
    try {
      const results = await searchEthiopianJobs(searchJobQuery.trim(), studentLevel);
      setJobSearchResults(results);
    } catch (err: any) {
      alert(`Job search query error: ${err.message}`);
    } finally {
      setIsSearchingJobs(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
              {studentLevel} Career Strategist
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-400" />
            Career, Ethiopian Tech Market & Remote Work
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Grounded market intelligence on hiring companies, skill roadmaps, MoE Exit Exam preparation, and international remote readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onLaunchAIMode(
                'career',
                `As a ${studentLevel} student, evaluate my employability in Ethiopia and suggest what skills I should master over the next 6 months to land a software engineering role.`
              )
            }
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Career Consultation</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800/80 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('paths')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'paths'
              ? 'bg-neutral-800 text-emerald-400 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Specialization Tracks ({careerPaths.length})
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'companies'
              ? 'bg-neutral-800 text-emerald-400 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Top Ethiopian Employers
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'search'
              ? 'bg-neutral-800 text-emerald-400 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Live Job & Internship Radar
        </button>
        <button
          onClick={() => setActiveTab('cv_guide')}
          className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'cv_guide'
              ? 'bg-neutral-800 text-emerald-400 font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          CV, Portfolio & Exit Exam Playbook
        </button>
      </div>

      {/* Tab: Career Tracks */}
      {activeTab === 'paths' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Track Selector List */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block px-1">
              Select Career Direction
            </span>
            <div className="space-y-2">
              {careerPaths.map((p) => {
                const isSelected = selectedPath.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPath(p)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-neutral-800/90 border-emerald-500 shadow-md text-white'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm">{p.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.demandInEthiopia} Demand
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {p.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Track Deep Dive */}
          <div className="lg:col-span-8 space-y-6 bg-neutral-900/40 p-5 sm:p-6 rounded-2xl border border-neutral-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  {selectedPath.title}
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">{selectedPath.tagline}</p>
              </div>
              <button
                onClick={() =>
                  onLaunchAIMode(
                    'career',
                    `Create a personalized 30-day action plan for me (${studentLevel}) to specialize in ${selectedPath.title}, with project ideas and technical interview questions.`
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 self-start"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate 30-Day Plan</span>
              </button>
            </div>

            {/* Employers & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Typical Employers in Ethiopia
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPath.typicalEmployers.map((emp, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-medium"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Must-Have Technical Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPath.requiredSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progression Milestones */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block">
                Progression Roadmaps
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-bold text-emerald-400 block">
                    🌱 Foundation (1st & 2nd Year)
                  </span>
                  <ul className="space-y-1.5 text-neutral-300">
                    {selectedPath.beginnerRoadmap.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-bold text-amber-400 block">
                    ⚡ Production Ready (3rd & 4th Year)
                  </span>
                  <ul className="space-y-1.5 text-neutral-300">
                    {selectedPath.intermediateRoadmap.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="font-bold text-purple-400 block">
                    🚀 Senior / International Remote
                  </span>
                  <ul className="space-y-1.5 text-neutral-300">
                    {selectedPath.advancedRoadmap.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-purple-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Interview Prep Questions for this Path */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Key Interview Preparation Themes
              </span>
              <div className="space-y-1.5">
                {selectedPath.interviewPrepFocus.map((q, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800/80 flex items-center justify-between text-neutral-300"
                  >
                    <span>{q}</span>
                    <button
                      onClick={() =>
                        onLaunchAIMode(
                          'codereview',
                          `Conduct a mock technical interview question on: "${q}". Ask me a question, let me answer, then critique my answer according to software engineering hiring standards.`
                        )
                      }
                      className="text-emerald-400 hover:text-emerald-300 text-[11px] font-semibold flex items-center gap-1 shrink-0 ml-3"
                    >
                      <span>Simulate Interview</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Top Employers */}
      {activeTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ethiopianEmployers.map((emp, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{emp.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {emp.category}
                  </span>
                </div>
                <div className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                  <span>📍</span>
                  <span>{emp.hq}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {emp.focus}
                </p>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {emp.stack.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-emerald-400 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800/80">
                <div className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <strong className="block text-amber-400 mb-0.5">Hiring Insight:</strong>
                  {emp.hiringAdvice}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Live Job Radar */}
      {activeTab === 'search' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" />
              Live Ethiopian Tech Jobs & Internships Query
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={searchJobQuery}
                onChange={(e) => setSearchJobQuery(e.target.value)}
                placeholder="e.g. Junior Python Engineer Addis Ababa or Remote React Intern"
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSearchJobs}
                disabled={isSearchingJobs}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shrink-0 flex items-center justify-center gap-2"
              >
                {isSearchingJobs ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Searching Web & Portals...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search Ethiopian Roles</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400">
              Queries real-time job boards, LinkedIn Ethiopia, Ethiojobs, Dereja, and telegram channels with Gemini grounded web search.
            </p>
          </div>

          {jobSearchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobSearchResults.map((job, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">{job.title}</h4>
                      <p className="text-xs text-emerald-400 font-medium">{job.company}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {job.location}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                  {job.requirements && (
                    <div className="text-[11px] text-neutral-400">
                      <strong>Skills:</strong> {job.requirements}
                    </div>
                  )}
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold pt-1"
                    >
                      <span>View Original Posting</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl border border-neutral-800 bg-neutral-950/40 text-neutral-400 text-xs">
              <Search className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <span>Search above to query current opportunities matching your skills and location.</span>
            </div>
          )}
        </div>
      )}

      {/* Tab: CV & Exit Exam Playbook */}
      {activeTab === 'cv_guide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Ethiopian & International Developer CV Standard
            </h3>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict 1-Page Rule:</strong> As a student or recent graduate, keep your CV to exactly one concise page. Remove high school and unverified buzzwords.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Formula for Project Bullet Points:</strong> "Accomplished [X] by implementing [Y], which improved/measured [Z]." Example: <em>Built full-stack inventory sync for Merkato merchants using React and PostgreSQL, reducing duplicate stock entries by 40%.</em>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Live Deployed Links:</strong> Always include live demo URLs (Railway, Vercel, Render) and public GitHub repo links. Ethiopian recruiters test links on mobile.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tech Stack Grouping:</strong> Categorize into Languages (Python, JS, C++), Frameworks (React, Express), Databases (PostgreSQL, MongoDB), and Tools (Git, Linux, Docker).
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              MoE Computer Science Exit Exam Blueprint
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              The Ministry of Education (MoE) nationwide Computer Science exit exam tests core competency domains required for graduation across all Ethiopian public and private universities.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex justify-between items-center">
                <span className="font-bold text-neutral-200">1. Programming & Data Structures</span>
                <span className="font-mono text-emerald-400">High Weight</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex justify-between items-center">
                <span className="font-bold text-neutral-200">2. Database Systems & SQL Normalization</span>
                <span className="font-mono text-emerald-400">High Weight</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex justify-between items-center">
                <span className="font-bold text-neutral-200">3. Operating Systems & Computer Architecture</span>
                <span className="font-mono text-amber-400">Medium Weight</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex justify-between items-center">
                <span className="font-bold text-neutral-200">4. Computer Networks & Security Principles</span>
                <span className="font-mono text-amber-400">Medium Weight</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex justify-between items-center">
                <span className="font-bold text-neutral-200">5. Software Engineering Methodologies</span>
                <span className="font-mono text-cyan-400">Standard Weight</span>
              </div>
            </div>
            <button
              onClick={() =>
                onLaunchAIMode(
                  'examprep',
                  'Generate a full diagnostic MoE Exit Exam practice session covering Data Structures, SQL normalization, OS scheduling, and networking protocols.'
                )
              }
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Exit Exam Practice Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
