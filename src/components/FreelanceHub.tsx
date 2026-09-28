import React, { useState } from 'react';
import { FreelanceProposal } from '../types';

interface FreelanceHubProps {
  onAskCopilot: (prompt: string) => void;
}

export const FreelanceHub: React.FC<FreelanceHubProps> = ({ onAskCopilot }) => {
  const [proposals, setProposals] = useState<FreelanceProposal[]>([
    {
      id: 'prop-1',
      clientOrPlatform: 'Direct Client (Addis Logistics Startup)',
      service: 'React Admin Dashboard with Chapa Gateway',
      estimatedHours: 40,
      rateType: 'Fixed ETB',
      totalValue: 35000,
      status: 'Accepted',
      milestones: [
        'Milestone 1 (30%): Responsive UI & Auth',
        'Milestone 2 (40%): API Integration & Tables',
        'Milestone 3 (30%): Payment Webhook & Deployment',
      ],
      scopeBoundaries: 'Includes 2 rounds of revisions. Third-party SMS fees to be borne by client.',
      dateCreated: '2026-09-20',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'stages' | 'calculator' | 'scam_rules'>('stages');

  // Rate calculator state
  const [calcHours, setCalcHours] = useState(25);
  const [calcHourlyUSD, setCalcHourlyUSD] = useState(20);
  const [exchangeRateETB, setExchangeRateETB] = useState(130); // Market illustrative rate
  const [clientType, setClientType] = useState<'International' | 'Local Ethiopian'>('International');

  const totalUSD = calcHours * calcHourlyUSD;
  const totalETB = totalUSD * exchangeRateETB;

  const stages = [
    { num: 1, title: 'Learn the Skill', desc: 'Deep practical competence in React, Express, or PostgreSQL before pitching.' },
    { num: 2, title: 'Build Sample Projects', desc: 'Create 2 functioning demos hosted live with clean GitHub code.' },
    { num: 3, title: 'Create Portfolio', desc: 'Curate concise case studies emphasizing user problems solved.' },
    { num: 4, title: 'Create Service Offers', desc: 'Define fixed-scope packages: "Landing Page in 3 Days" or "API in 1 Week".' },
    { num: 5, title: 'Find Legitimate Clients', desc: 'Leverage LinkedIn outreach, Upwork, and local Addis professional networks.' },
    { num: 6, title: 'Deliver Professionally', desc: 'Over-communicate, submit PRs, Loom walkthroughs, and meet deadlines.' },
    { num: 7, title: 'Collect Testimonials', desc: 'Secure verified written reviews and LinkedIn recommendations.' },
    { num: 8, title: 'Scale Complexity & Rates', desc: 'Transition from single tasks to high-value architectural contracts.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Freelance & Client Engineering Hub</h1>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
            <span>8-Stage Progression Framework</span>
            <span aria-hidden="true">·</span>
            <span>Ethical, Anti-Scam Client Management</span>
          </div>
        </div>

        <button
          onClick={() => onAskCopilot('Help me draft a professional freelance proposal for an Ethiopian client needing a React frontend and Telebirr integration. Include milestones and scope boundaries.')}
          className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          Draft Proposal with AI
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('stages')}
          className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'stages' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          8-Stage Progression
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'calculator' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Scope & Pricing Calculator
        </button>
        <button
          onClick={() => setActiveTab('scam_rules')}
          className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'scam_rules' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Anti-Scam Protection Rules
        </button>
      </div>

      {/* 8-Stage Progression Grid */}
      {activeTab === 'stages' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stages.map((stg) => (
            <div key={stg.num} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2">
              <span className="font-mono text-xs text-emerald-400 font-semibold">Stage 0{stg.num}</span>
              <h3 className="text-sm font-semibold text-white">{stg.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{stg.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pricing Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4 text-xs">
            <h2 className="text-base font-semibold text-white">Project Scope & Pricing Estimator</h2>
            
            <div>
              <label className="block text-neutral-400 mb-1">Target Client Market</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setClientType('International')}
                  className={`flex-1 py-1.5 rounded-lg border transition-colors ${
                    clientType === 'International'
                      ? 'bg-neutral-800 border-emerald-500 text-white'
                      : 'border-neutral-700 text-neutral-400'
                  }`}
                >
                  Remote / Global (USD)
                </button>
                <button
                  onClick={() => setClientType('Local Ethiopian')}
                  className={`flex-1 py-1.5 rounded-lg border transition-colors ${
                    clientType === 'Local Ethiopian'
                      ? 'bg-neutral-800 border-emerald-500 text-white'
                      : 'border-neutral-700 text-neutral-400'
                  }`}
                >
                  Local Ethiopia (ETB)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Estimated Engineering Hours: {calcHours}h</label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={calcHours}
                onChange={(e) => setCalcHours(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Target Rate ($/hr USD): ${calcHourlyUSD}/hr</label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={calcHourlyUSD}
                onChange={(e) => setCalcHourlyUSD(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-1">
              <span className="text-neutral-400 block font-medium">Recommended Milestone Split:</span>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                <li>Deposit / Architecture & Wireframes: 30%</li>
                <li>Core Feature & API Delivery: 40%</li>
                <li>Testing, Handover & Deployment: 30%</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/60 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-neutral-400 block">Calculated Quote Value</span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400">
                ${totalUSD.toLocaleString()}{' '}
                <span className="text-base text-neutral-400 font-sans font-normal">USD</span>
              </div>
              <div className="text-xl font-mono text-neutral-300">
                ≈ {totalETB.toLocaleString()}{' '}
                <span className="text-xs text-neutral-400 font-sans font-normal">ETB</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Calculated based on {calcHours} hours at ${calcHourlyUSD}/hr. Always protect scope with signed milestones and clear deliverables.
              </p>
            </div>

            <button
              onClick={() => onAskCopilot(`Draft a fixed-price freelance agreement for a ${calcHours}-hour ${clientType} project valued at $${totalUSD} USD (${totalETB} ETB). Include 3 milestones, revision limits, and payment terms.`)}
              className="mt-6 px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg transition-colors shadow-sm"
            >
              Generate Agreement Contract
            </button>
          </div>
        </div>
      )}

      {/* Anti-Scam Protection Rules */}
      {activeTab === 'scam_rules' && (
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4 text-xs">
          <h2 className="text-base font-semibold text-white">The Ethiopian Developer Anti-Scam Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-2">
              <h3 className="font-semibold text-rose-400">❌ Red Flags (Never Accept)</h3>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside leading-relaxed">
                <li>Clients asking you to pay an "application fee" or "equipment deposit".</li>
                <li>Requests to move communication off-platform before an escrow contract is funded.</li>
                <li>Vague "we will pay you once the business makes profit" without equity or base salary.</li>
                <li>Asking for full source code before the final milestone payment is released.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800 space-y-2">
              <h3 className="font-semibold text-emerald-400">✅ Legitimate Best Practices</h3>
              <ul className="space-y-1.5 text-neutral-300 list-disc list-inside leading-relaxed">
                <li>Always use milestone-based contracts with an upfront deposit (30-50%).</li>
                <li>Host demos on your own server or staging environment until final sign-off.</li>
                <li>Define explicit scope boundaries: "2 design revisions included, extra features billed at hourly rate".</li>
                <li>Deliver code with clean documentation, tests, and a recorded walkthrough video.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Active Proposals List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Active Proposals & Contracts</h2>
        <div className="space-y-3">
          {proposals.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-semibold text-white text-sm">{p.service}</span>
                <div className="flex items-center gap-2 text-neutral-400 mt-1">
                  <span>{p.clientOrPlatform}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-emerald-400">
                    {p.totalValue.toLocaleString()} {p.rateType.includes('ETB') ? 'ETB' : 'USD'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{p.estimatedHours} hrs</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 px-2.5 py-1 rounded text-xs font-medium">
                  {p.status}
                </span>
                <button
                  onClick={() => onAskCopilot(`Help me prepare the client deliverable report and invoice for: ${p.service}`)}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  Deliverable Review →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
