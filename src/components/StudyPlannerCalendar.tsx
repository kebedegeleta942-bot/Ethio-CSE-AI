import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  Sparkles,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { StudyCalendarEvent, StudentProfile, AILearningMode } from '../types';
import { initialStudyCalendar } from '../data/defaultData';
import { generateStudyPlanWithAI } from '../services/api';

interface StudyPlannerCalendarProps {
  profile: StudentProfile;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const StudyPlannerCalendar: React.FC<StudyPlannerCalendarProps> = ({
  profile,
  onLaunchAIMode,
}) => {
  const [events, setEvents] = useState<StudyCalendarEvent[]>(initialStudyCalendar);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<StudyCalendarEvent['type']>('assignment');
  const [newCourse, setNewCourse] = useState('Computer Science');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<StudyCalendarEvent['priority']>('medium');

  // AI Daily Plan state
  const [availableHours, setAvailableHours] = useState(3);
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState<string | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  const toggleEventComplete = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEv: StudyCalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      course: newCourse,
      dueDate: newDueDate || new Date().toISOString().split('T')[0],
      priority: newPriority,
      completed: false,
    };

    setEvents([...events, newEv]);
    setNewTitle('');
    setShowAddModal(false);
  };

  const handleGenerateDailyPlan = async () => {
    setIsGeneratingPlan(true);
    setAiGeneratedPlan(null);

    const upcomingSummary = events
      .filter((e) => !e.completed)
      .map((e) => `${e.title} (${e.course}) due on ${e.dueDate}`)
      .join('; ');

    try {
      const plan = await generateStudyPlanWithAI(
        profile,
        availableHours,
        upcomingSummary || 'Regular semester coursework'
      );
      setAiGeneratedPlan(plan);
    } catch (err: any) {
      setAiGeneratedPlan(`Could not generate plan: ${err.message}`);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span>Study Planner & University Timetable</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Organize university assignments, exams, and projects into realistic, non-overwhelming daily focus blocks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Deadline / Exam</span>
        </button>
      </div>

      {/* Main Grid: AI Daily Coach Planner + Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Daily AI Coach Generator */}
        <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Daily CSE Coach</span>
            </h2>
            <span className="font-mono text-emerald-400 text-[11px]">
              {profile.academicLevel}
            </span>
          </div>

          <p className="text-neutral-300 leading-relaxed">
            Generate an executable daily plan based on your university deadlines and available hours today.
          </p>

          <div>
            <label className="block text-neutral-300 mb-1 font-medium">
              Available Focus Hours Today: <span className="text-emerald-400 font-mono font-bold">{availableHours} hrs</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={availableHours}
              onChange={(e) => setAvailableHours(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
              <span>1 hr (Exams / heavy classes)</span>
              <span>4 hrs (Balanced)</span>
              <span>8 hrs (Weekend sprint)</span>
            </div>
          </div>

          <button
            onClick={handleGenerateDailyPlan}
            disabled={isGeneratingPlan}
            className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGeneratingPlan ? 'Synthesizing Realistic Plan...' : 'Generate Today’s Custom Plan'}</span>
          </button>

          {aiGeneratedPlan && (
            <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto font-sans">
              {aiGeneratedPlan}
            </div>
          )}
        </div>

        {/* Right Col: Academic Deadlines & Milestones */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Upcoming Deadlines & Exam Dates</span>
            </h2>
            <span className="text-neutral-400 text-[11px]">
              {events.filter((e) => !e.completed).length} Pending
            </span>
          </div>

          <div className="space-y-2.5">
            {events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => toggleEventComplete(ev.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  ev.completed
                    ? 'bg-neutral-950/40 border-neutral-800/60 opacity-60'
                    : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button type="button" className="mt-0.5 text-neutral-500">
                    {ev.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div>
                    <h3
                      className={`font-semibold ${
                        ev.completed ? 'line-through text-neutral-500' : 'text-neutral-100'
                      }`}
                    >
                      {ev.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                      <span>{ev.course}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-neutral-300">Due: {ev.dueDate}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                    ev.priority === 'critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : ev.priority === 'high'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {ev.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Add Deadline or Exam</h3>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Systems Lab 2 Submission"
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Course</label>
                <input
                  type="text"
                  required
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="e.g. CoSc 2031 (DSA)"
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Due Date</label>
                <input
                  type="date"
                  required
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 text-neutral-950 font-bold rounded-lg hover:bg-emerald-400"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
