import React, { useState } from 'react';
import { breakDownStuckTask } from '../services/api';

interface StuckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat?: (taskText: string) => void;
}

export const StuckModal: React.FC<StuckModalProps> = ({ isOpen, onClose, onSendToChat }) => {
  const [taskName, setTaskName] = useState('');
  const [obstacle, setObstacle] = useState('Feeling overwhelmed and unsure where the first line of code goes');
  const [breakdown, setBreakdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemystify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim() || isLoading) return;
    setIsLoading(true);
    setBreakdown(null);

    try {
      const result = await breakDownStuckTask(taskName, obstacle);
      setBreakdown(result);
    } catch (err: any) {
      setBreakdown(`Error breaking down task: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div>
            <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider">
              Rule 25: Anti-Procrastination Protocol
            </span>
            <h2 className="text-base font-bold text-white mt-0.5">
              Emergency Task Demystifier ("I'm Stuck")
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200 text-sm font-semibold"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          No lectures or motivational pep talks. What specific engineering task or academic milestone are you avoiding right now?
        </p>

        <form onSubmit={handleDemystify} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-400 mb-1 font-medium">The Intimidating Task</label>
            <input
              type="text"
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g. Implement the payment verification webhook and database update"
              className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-medium">What is the exact friction / feeling?</label>
            <select
              value={obstacle}
              onChange={(e) => setObstacle(e.target.value)}
              className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2.5 text-neutral-100 focus:outline-none focus:border-amber-500"
            >
              <option value="Feeling overwhelmed and unsure where the first line of code goes">
                Overwhelmed: The scope feels too huge; don't know where to start
              </option>
              <option value="Fear of getting stuck on obscure runtime bugs or compiler errors">
                Fear of bugs: Worried about debugging cryptic errors or failing
              </option>
              <option value="Low physical energy and mental distraction">
                Low energy: Sluggish, easily distracted by phone / social media
              </option>
              <option value="Unclear requirements: Waiting for advisor or client to clarify">
                Ambiguity: Unsure what the exact expected output is
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !taskName.trim()}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-semibold shadow-sm"
            >
              {isLoading ? 'Deconstructing Friction...' : 'Give Me 4 Micro-Steps'}
            </button>
          </div>
        </form>

        {breakdown && (
          <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-amber-900/60 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
            {breakdown}
          </div>
        )}
      </div>
    </div>
  );
};
