import React, { useState } from 'react';
import { ScorecardMetric } from '../types';

interface MonthlyScorecardProps {
  scorecard: ScorecardMetric;
  onUpdateScorecard: (metric: ScorecardMetric) => void;
  onAskCopilot: (prompt: string) => void;
  allAppData: any;
  onImportData: (data: any) => void;
}

export const MonthlyScorecard: React.FC<MonthlyScorecardProps> = ({
  scorecard,
  onUpdateScorecard,
  onAskCopilot,
  allAppData,
  onImportData,
}) => {
  const [data, setData] = useState<ScorecardMetric>(scorecard);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Student monthly budget state
  const [budgetETB, setBudgetETB] = useState({
    dormOrRent: 3000,
    food: 4500,
    mobileDataInternet: 900,
    transport: 1200,
    learningTools: 500,
    savings: 2000,
  });

  const totalMonthlyExpenseETB =
    budgetETB.dormOrRent +
    budgetETB.food +
    budgetETB.mobileDataInternet +
    budgetETB.transport +
    budgetETB.learningTools;

  const handleSave = () => {
    onUpdateScorecard(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(allAppData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ethiocse-copilot-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onImportData(parsed);
        alert('Data successfully imported!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Monthly Measurable Scorecard & Budget</h1>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
            <span>15 Tracked Quantitative Indicators</span>
            <span aria-hidden="true">·</span>
            <span>Financial Discipline for Ethiopian Students</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors"
          >
            Export Backup
          </button>
          <label className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors cursor-pointer">
            Import Backup
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-colors shadow-sm"
          >
            Save Metrics
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300">
          Scorecard metrics updated successfully!
        </div>
      )}

      {/* 15 Measurable Indicators Grid */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider text-xs">
            15 Measurable Progress Indicators
          </h2>
          <span className="text-xs text-neutral-400 font-mono">{data.monthName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-xs">
          {/* Coding Hours */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">💻 Dedicated Coding Hours</label>
            <input
              type="number"
              value={data.codingHours}
              onChange={(e) => setData({ ...data, codingHours: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Target: 40-60 hrs / month outside class</span>
          </div>

          {/* GitHub Contributions */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🌿 GitHub Public Commits</label>
            <input
              type="number"
              value={data.githubContributions}
              onChange={(e) => setData({ ...data, githubContributions: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Demonstrates consistent shipping</span>
          </div>

          {/* Projects Completed */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🚀 Projects Completed / Shipped</label>
            <input
              type="number"
              value={data.projectsCompleted}
              onChange={(e) => setData({ ...data, projectsCompleted: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Target: 5 core portfolio deliverables</span>
          </div>

          {/* University Average GPA */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🎓 Academic Semester Standing</label>
            <input
              type="number"
              step="0.01"
              value={data.universityGradeAvg}
              onChange={(e) => setData({ ...data, universityGradeAvg: parseFloat(e.target.value) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Cumulative / Current semester GPA</span>
          </div>

          {/* Job Applications */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">💼 Job Applications Submitted</label>
            <input
              type="number"
              value={data.jobApplicationsSent}
              onChange={(e) => setData({ ...data, jobApplicationsSent: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Target: 5 tailored apps/week in M9</span>
          </div>

          {/* Technical Interviews */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🎯 Technical Interviews Attended</label>
            <input
              type="number"
              value={data.interviewsCount}
              onChange={(e) => setData({ ...data, interviewsCount: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Screening calls and coding rounds</span>
          </div>

          {/* Freelance Proposals */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">📝 Freelance Proposals Sent</label>
            <input
              type="number"
              value={data.freelanceProposalsSent}
              onChange={(e) => setData({ ...data, freelanceProposalsSent: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">High-signal, customized proposals</span>
          </div>

          {/* Income ETB */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">💰 Tech Income (ETB)</label>
            <input
              type="number"
              value={data.incomeETB}
              onChange={(e) => setData({ ...data, incomeETB: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Freelance, local consulting, contracts</span>
          </div>

          {/* Income USD */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">💵 Remote Income (USD)</label>
            <input
              type="number"
              value={data.incomeUSD}
              onChange={(e) => setData({ ...data, incomeUSD: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">International gigs via Payoneer / Wise</span>
          </div>

          {/* Exercise consistency */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🏃 Exercise Days / Week</label>
            <input
              type="number"
              min="0"
              max="7"
              value={data.exerciseDaysPerWeek}
              onChange={(e) => setData({ ...data, exerciseDaysPerWeek: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Walks, running, stretching, sports</span>
          </div>

          {/* Sleep hours */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🌙 Average Sleep Hours</label>
            <input
              type="number"
              step="0.1"
              value={data.sleepHoursAvg}
              onChange={(e) => setData({ ...data, sleepHoursAvg: parseFloat(e.target.value) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Target: 7.0 - 8.0 hrs for cognitive recovery</span>
          </div>

          {/* English communication */}
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-1.5">
            <label className="text-neutral-400 block font-medium">🗣️ Professional English Mins / Day</label>
            <input
              type="number"
              value={data.englishSpeakingMinsPerDay}
              onChange={(e) => setData({ ...data, englishSpeakingMinsPerDay: parseInt(e.target.value, 10) || 0 })}
              className="w-full rounded bg-neutral-900 border border-neutral-700 p-2 font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-[11px] text-neutral-400">Speaking, technical writing, mock calls</span>
          </div>
        </div>
      </div>

      {/* Student Financial Planning System */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-white">Student Financial Management & Discipline</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Rule 23: Build realistic student financial discipline. Never risk funds on scams, gambling, or get-rich schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="space-y-3">
            <h3 className="font-semibold text-neutral-200">Monthly Budget Allocations (ETB)</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Dorm / Room rent:</span>
                <input
                  type="number"
                  value={budgetETB.dormOrRent}
                  onChange={(e) => setBudgetETB({ ...budgetETB, dormOrRent: parseInt(e.target.value, 10) || 0 })}
                  className="w-28 rounded bg-neutral-950 border border-neutral-700 p-1.5 font-mono text-right text-neutral-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Food & basic groceries:</span>
                <input
                  type="number"
                  value={budgetETB.food}
                  onChange={(e) => setBudgetETB({ ...budgetETB, food: parseInt(e.target.value, 10) || 0 })}
                  className="w-28 rounded bg-neutral-950 border border-neutral-700 p-1.5 font-mono text-right text-neutral-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Internet / Ethio Telecom mobile package:</span>
                <input
                  type="number"
                  value={budgetETB.mobileDataInternet}
                  onChange={(e) => setBudgetETB({ ...budgetETB, mobileDataInternet: parseInt(e.target.value, 10) || 0 })}
                  className="w-28 rounded bg-neutral-950 border border-neutral-700 p-1.5 font-mono text-right text-neutral-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Campus local transport:</span>
                <input
                  type="number"
                  value={budgetETB.transport}
                  onChange={(e) => setBudgetETB({ ...budgetETB, transport: parseInt(e.target.value, 10) || 0 })}
                  className="w-28 rounded bg-neutral-950 border border-neutral-700 p-1.5 font-mono text-right text-neutral-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Learning investments (books, dev tools):</span>
                <input
                  type="number"
                  value={budgetETB.learningTools}
                  onChange={(e) => setBudgetETB({ ...budgetETB, learningTools: parseInt(e.target.value, 10) || 0 })}
                  className="w-28 rounded bg-neutral-950 border border-neutral-700 p-1.5 font-mono text-right text-neutral-200"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Monthly Burn Rate</span>
              <div className="text-3xl font-mono font-bold text-white">
                {totalMonthlyExpenseETB.toLocaleString()}{' '}
                <span className="text-sm text-neutral-400 font-sans font-normal">ETB / month</span>
              </div>
              <p className="text-neutral-400 leading-relaxed text-xs">
                A lean student lifestyle allows maximum mental focus on software engineering and university exams without financial panic. Keep 2-3 months of living expenses in reserve in your bank account.
              </p>
            </div>

            <button
              onClick={() => onAskCopilot(`Perform a monthly review of my progress: ${data.codingHours} coding hours, ${data.githubContributions} GitHub commits, ${data.projectsCompleted} projects completed, and ETB ${data.incomeETB} earned. What should change for next month?`)}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg transition-colors shadow-sm"
            >
              Generate Monthly Strategic Review with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
