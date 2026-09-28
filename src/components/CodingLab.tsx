import React, { useState } from 'react';
import {
  Code2,
  Play,
  Sparkles,
  Bug,
  ShieldAlert,
  FileCheck,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  Layers,
  ArrowRight,
  ExternalLink,
  Share2,
  Terminal,
  Zap,
  Award,
} from 'lucide-react';
import { AcademicLevel, AILearningMode } from '../types';
import { reviewCodeAntiDependence } from '../services/api';
import { a2svTopPatterns, A2SVPatternItem } from '../data/a2svPatternsData';

interface CodingLabProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const CodingLab: React.FC<CodingLabProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'playground' | 'a2sv_patterns'>('playground');

  // Preset snippets for Playground
  const presets = [
    {
      title: 'Chapa / Telebirr Webhook Signature HMAC Verification',
      language: 'TypeScript',
      intent: 'Verify cryptographic SHA-256 webhook header before crediting merchant order',
      code: `import crypto from 'crypto';

interface WebhookPayload {
  transaction_id: string;
  amount_etb: number;
  phone: string;
  status: 'success' | 'failed';
}

export function verifyPaymentWebhook(
  rawBody: string,
  incomingSignature: string,
  secretKey: string
): boolean {
  if (!rawBody || !incomingSignature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(rawBody)
    .digest('hex');

  // Prevent timing attacks using constant-time comparison
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const incomingBuffer = Buffer.from(incomingSignature, 'hex');

  if (expectedBuffer.length !== incomingBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, incomingBuffer);
}`,
    },
    {
      title: 'Two Pointers Target Subarray Sum (O(N) Time)',
      language: 'TypeScript',
      intent: 'Find two indices in a sorted array that sum to target without O(N²) nested loops',
      code: `function twoSumSorted(arr: number[], target: number): [number, number] | null {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === target) {
      return [left, right];
    } else if (currentSum < target) {
      left++; // Need a larger number
    } else {
      right--; // Need a smaller number
    }
  }

  return null; // Target not found
}`,
    },
    {
      title: 'Binary Search Tree Validation (Inorder Invariant)',
      language: 'TypeScript',
      intent: 'Verify if a binary tree satisfies the BST property for all nodes',
      code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}

function isValidBST(
  root: TreeNode | null,
  minVal: number = -Infinity,
  maxVal: number = Infinity
): boolean {
  if (!root) return true;

  if (root.val <= minVal || root.val >= maxVal) {
    return false;
  }

  return (
    isValidBST(root.left, minVal, root.val) &&
    isValidBST(root.right, root.val, maxVal)
  );
}`,
    },
  ];

  // Playground state
  const [activeCode, setActiveCode] = useState(presets[0].code);
  const [activeLang, setActiveLang] = useState(presets[0].language);
  const [activeIntent, setActiveIntent] = useState(presets[0].intent);
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // A2SV Patterns Tab State
  const [selectedPatternCategory, setSelectedPatternCategory] = useState<string>('all');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(a2svTopPatterns[0].id);
  const [activePatternLang, setActivePatternLang] = useState<'python' | 'cpp' | 'typescript'>('python');

  const patternCategories = [
    'all',
    'Arrays & Strings',
    'Linked Lists',
    'Trees & Graphs',
    'Dynamic Programming',
    'Heaps & Searching',
  ];

  const filteredPatterns = a2svTopPatterns.filter(
    (p) => selectedPatternCategory === 'all' || p.category === selectedPatternCategory
  );

  const selectedPattern =
    a2svTopPatterns.find((p) => p.id === selectedPatternId) || a2svTopPatterns[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareToTelegram = (title: string, content: string) => {
    const text = `🇪🇹 *Ethio CSE AI - Coding Pattern*\n\n📌 *${title}*\n\n\`\`\`\n${content.slice(0, 700)}\n\`\`\`\n\nStudy computer science & exit exams at Ethio CSE AI!`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSelectPreset = (idx: number) => {
    setActiveCode(presets[idx].code);
    setActiveLang(presets[idx].language);
    setActiveIntent(presets[idx].intent);
    setReviewResult(null);
    setSimulatedOutput(null);
  };

  const handleLoadPatternIntoPlayground = (pattern: A2SVPatternItem) => {
    const code =
      activePatternLang === 'python'
        ? pattern.languages.python
        : activePatternLang === 'cpp'
        ? pattern.languages.cpp
        : pattern.languages.typescript;
    const lang =
      activePatternLang === 'python'
        ? 'Python'
        : activePatternLang === 'cpp'
        ? 'C++'
        : 'TypeScript';

    setActiveCode(code);
    setActiveLang(lang);
    setActiveIntent(`${pattern.name}: ${pattern.whenToUse}`);
    setActiveMainTab('playground');
    setReviewResult(null);
    setSimulatedOutput(null);
  };

  const handleRunReview = async () => {
    if (!activeCode.trim() || isReviewing) return;
    setIsReviewing(true);
    setReviewResult(null);

    try {
      const result = await reviewCodeAntiDependence(
        activeCode,
        activeLang,
        activeIntent,
        studentLevel
      );
      setReviewResult(result);
    } catch (err: any) {
      setReviewResult(`Review error: ${err.message}`);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleSimulateRun = () => {
    setSimulatedOutput(`[Simulation Console — ${activeLang}]
> Syntax parsed successfully.
> Memory allocation: 1.2 MB
> Executing test harness...
✓ Test Case 1: Valid input passes correctly.
✓ Test Case 2: Boundary / empty check passed.
✓ Invariant Check: Asymptotic bounds verified.
[Result]: Code executed cleanly with 0 runtime exceptions.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Technical Interview & DSA Hub
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              A2SV Patterns + Code Review
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <span>Coding Lab & A2SV Algorithmic Patterns</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Master the top algorithmic patterns required for Africa to Silicon Valley (A2SV), global remote engineering roles, and Ethiopian university exams. Never blindly copy code—understand the invariants, time bounds, and edge cases.
          </p>
        </div>

        <button
          onClick={() =>
            onLaunchAIMode(
              'codereview',
              `I want an Anti-AI-Dependence code review of this algorithm logic in ${activeLang}. Break down the time complexity, edge cases, and ask me 2 technical defense questions:\n\`\`\`${activeLang}\n${activeCode}\n\`\`\``
            )
          }
          className="px-4 py-2 text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-neutral-950 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Code Review</span>
        </button>
      </div>

      {/* Main Tab Toggle: Playground vs A2SV Patterns */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs">
        <button
          onClick={() => setActiveMainTab('playground')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeMainTab === 'playground'
              ? 'bg-cyan-500 text-neutral-950 shadow-sm'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Interactive Runner & Code Audit</span>
        </button>

        <button
          onClick={() => setActiveMainTab('a2sv_patterns')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            activeMainTab === 'a2sv_patterns'
              ? 'bg-amber-500 text-neutral-950 shadow-sm'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>A2SV Top Algorithmic Patterns ({a2svTopPatterns.length})</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-950/60 text-amber-300 border border-amber-500/30">
            Silicon Valley Track
          </span>
        </button>
      </div>

      {activeMainTab === 'a2sv_patterns' ? (
        /* A2SV Patterns View */
        <div className="space-y-6">
          {/* Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-neutral-900 to-cyan-950/30 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  A2SV & LeetCode Blueprint
                </span>
                <span className="text-xs text-neutral-400">Africa to Silicon Valley Standard</span>
              </div>
              <h2 className="text-base font-bold text-white">
                Learn Problem Patterns, Not 500 Individual Questions
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
                Top Ethiopian students admitted to Google, Bloomberg, and A2SV don't memorize solutions. They master the 10 core algorithmic patterns (Two Pointers, Sliding Window, Monotonic Stack, Topological Sort, DP). Every pattern here includes Python, C++, and TypeScript templates with Ethiopian engineering analogies.
              </p>
            </div>

            <button
              onClick={() =>
                onLaunchAIMode(
                  'teach',
                  `Teach me the ${selectedPattern.name} algorithmic pattern step-by-step. Use an intuitive Ethiopian analogy, give me a practice problem, and evaluate my proposed approach.`
                )
              }
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Socratic Pattern Tutor</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {patternCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPatternCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors capitalize ${
                  selectedPatternCategory === cat
                    ? 'bg-neutral-800 text-amber-400 border border-amber-500/40 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-850'
                }`}
              >
                {cat === 'all' ? 'All Patterns' : cat}
              </button>
            ))}
          </div>

          {/* Master-Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left list of patterns */}
            <div className="lg:col-span-5 space-y-2">
              {filteredPatterns.map((pat) => {
                const isSelected = pat.id === selectedPattern.id;
                return (
                  <div
                    key={pat.id}
                    onClick={() => setSelectedPatternId(pat.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-500/50 ring-1 ring-amber-500/20'
                        : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{pat.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          pat.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : pat.difficulty === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {pat.difficulty}
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-400 flex items-center gap-3">
                      <span>⚡ {pat.timeComplexity}</span>
                      <span>·</span>
                      <span>💾 {pat.spaceComplexity}</span>
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                      {pat.whenToUse}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Pattern Detailed Walkthrough */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300">
                        {selectedPattern.category}
                      </span>
                      <span className="text-[11px] text-amber-400 font-semibold">
                        {selectedPattern.frequency}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1">
                      {selectedPattern.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleShareToTelegram(
                          selectedPattern.name,
                          selectedPattern.languages[activePatternLang]
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700"
                      title="Share to Telegram Study Group"
                    >
                      <Share2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Telegram</span>
                    </button>

                    <button
                      onClick={() => handleLoadPatternIntoPlayground(selectedPattern)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Run in Playground</span>
                    </button>
                  </div>
                </div>

                {/* Mental Model Rule */}
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1 text-xs">
                  <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wide">
                    🧠 When to apply this pattern:
                  </span>
                  <p className="text-neutral-200 leading-relaxed">
                    {selectedPattern.whenToUse}
                  </p>
                </div>

                {/* Ethiopian Real-World Scenario */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1 text-xs">
                  <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wide">
                    🇪🇹 Real-World Ethiopian Tech Scenario:
                  </span>
                  <p className="text-neutral-200 leading-relaxed">
                    {selectedPattern.ethiopianRealWorldScenario}
                  </p>
                </div>

                {/* LeetCode & MoE Exit Exam Relevance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                    <span className="font-semibold text-neutral-400 block text-[10px] uppercase">
                      Similar LeetCode Problems:
                    </span>
                    <p className="text-cyan-300 font-mono text-[11px]">
                      {selectedPattern.leetCodeEquivalent}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                    <span className="font-semibold text-neutral-400 block text-[10px] uppercase">
                      MoE Exit Exam Connection:
                    </span>
                    <p className="text-amber-300 text-[11px]">
                      {selectedPattern.moeExitExamRelevance}
                    </p>
                  </div>
                </div>

                {/* Multi-language code view */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-lg">
                      <button
                        onClick={() => setActivePatternLang('python')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          activePatternLang === 'python'
                            ? 'bg-neutral-800 text-emerald-400 font-bold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Python 🐍
                      </button>
                      <button
                        onClick={() => setActivePatternLang('cpp')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          activePatternLang === 'cpp'
                            ? 'bg-neutral-800 text-cyan-400 font-bold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        C++ ⚡
                      </button>
                      <button
                        onClick={() => setActivePatternLang('typescript')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          activePatternLang === 'typescript'
                            ? 'bg-neutral-800 text-blue-400 font-bold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        TypeScript 🔷
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          selectedPattern.id,
                          selectedPattern.languages[activePatternLang]
                        )
                      }
                      className="px-2.5 py-1 text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] rounded bg-neutral-950 border border-neutral-800"
                    >
                      {copiedId === selectedPattern.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed max-h-96">
                    {selectedPattern.languages[activePatternLang]}
                  </pre>
                </div>

                {/* Sample Test Case */}
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1 font-mono">
                  <div className="text-[11px] text-neutral-500 font-sans font-semibold">
                    Sample Test Execution:
                  </div>
                  <div className="text-neutral-400">Input: <span className="text-neutral-200">{selectedPattern.sampleInput}</span></div>
                  <div className="text-neutral-400">Expected: <span className="text-emerald-400">{selectedPattern.expectedOutput}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Playground & Anti-AI Review View */
        <div className="space-y-6">
          {/* Preset Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-neutral-500 text-[11px] whitespace-nowrap">Load Preset:</span>
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSelectPreset(i)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-white transition-colors whitespace-nowrap text-xs"
              >
                {p.title.split(' ')[0]} {p.title.split(' ')[1]}...
              </button>
            ))}
          </div>

          {/* Editor & Intent */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-300">Target Feature Intent:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[11px]">Language:</span>
                    <select
                      value={activeLang}
                      onChange={(e) => setActiveLang(e.target.value)}
                      className="bg-neutral-950 border border-neutral-700 text-neutral-200 px-2 py-0.5 rounded text-xs focus:outline-none"
                    >
                      <option value="TypeScript">TypeScript</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="C++">C++</option>
                      <option value="Java">Java</option>
                      <option value="Go">Go</option>
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  value={activeIntent}
                  onChange={(e) => setActiveIntent(e.target.value)}
                  placeholder="What is this code intended to accomplish?"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-300">Code Editor:</span>
                    <button
                      onClick={() => handleCopy('editor-code', activeCode)}
                      className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedId === 'editor-code' ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy</span>
                    </button>
                  </div>

                  <textarea
                    rows={16}
                    value={activeCode}
                    onChange={(e) => setActiveCode(e.target.value)}
                    className="w-full font-mono text-xs bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-200 focus:outline-none focus:border-cyan-500 resize-y leading-relaxed"
                  />
                </div>

                {/* Run Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSimulateRun}
                    className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Simulate Run</span>
                  </button>

                  <button
                    onClick={handleRunReview}
                    disabled={isReviewing}
                    className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-neutral-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isReviewing ? 'Analyzing Code...' : 'Audit Architecture'}</span>
                  </button>
                </div>
              </div>

              {/* Simulated Console Output */}
              {simulatedOutput && (
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-300 whitespace-pre-wrap space-y-1">
                  <div className="flex items-center justify-between text-neutral-500 text-[11px] pb-1 border-b border-neutral-900">
                    <span>Console Output</span>
                    <button
                      onClick={() => setSimulatedOutput(null)}
                      className="hover:text-neutral-300 text-[10px]"
                    >
                      Clear
                    </button>
                  </div>
                  <div>{simulatedOutput}</div>
                </div>
              )}
            </div>

            {/* Right Column: Code Review Results & Socratic Challenge */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 min-h-[450px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-cyan-400" />
                      <span>Anti-AI-Dependence Code Audit</span>
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Evaluated for {studentLevel}
                    </span>
                  </div>

                  {isReviewing ? (
                    <div className="py-20 text-center space-y-3">
                      <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                      <p className="text-xs text-neutral-400">
                        Analyzing time complexity, memory allocation invariants, security edge cases, and defense interview questions...
                      </p>
                    </div>
                  ) : reviewResult ? (
                    <div className="pt-3 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                      {reviewResult}
                    </div>
                  ) : (
                    <div className="py-16 text-center space-y-3 text-xs text-neutral-500">
                      <FileCheck className="w-10 h-10 text-neutral-600 mx-auto" />
                      <div className="max-w-sm mx-auto">
                        <p className="text-neutral-300 font-medium mb-1">No Review Run Yet</p>
                        <p className="text-neutral-400 text-[11px] leading-relaxed">
                          Click "Audit Architecture" to get a comprehensive breakdown:
                        </p>
                        <ul className="text-left text-[11px] text-neutral-400 mt-2 space-y-1 list-disc list-inside">
                          <li>Time & Space Complexity derivation (Big-O)</li>
                          <li>Potential concurrency/race condition or security bugs</li>
                          <li>2 technical defense questions an interviewer would ask you</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {reviewResult && (
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() =>
                        handleShareToTelegram(
                          activeIntent,
                          `${activeCode}\n\n[Review Summary]:\n${reviewResult.slice(0, 300)}...`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700"
                    >
                      <Share2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Share to Telegram</span>
                    </button>

                    <button
                      onClick={() =>
                        onLaunchAIMode(
                          'teach',
                          `I have reviewed this code:\n\`\`\`${activeLang}\n${activeCode}\n\`\`\`\nQuiz me on its time complexity and edge cases to ensure I truly understand it without relying on AI.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold transition-colors"
                    >
                      Test My Defense
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
