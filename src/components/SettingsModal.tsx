import React, { useState } from 'react';
import {
  Settings,
  X,
  User,
  GraduationCap,
  BookOpen,
  Clock,
  Compass,
  Download,
  RotateCcw,
  Check,
  Moon,
  Sun,
  Laptop,
} from 'lucide-react';
import { StudentProfile, AcademicLevel } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetData,
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const academicLevels: AcademicLevel[] = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    '5th Year / Extended Program',
    'Recent Graduate',
    'Self-Learner',
    'Other',
  ];

  const universities = [
    'Addis Ababa Institute of Technology (AAiT)',
    'Addis Ababa Science and Technology University (AASTU)',
    'Adama Science and Technology University (ASTU)',
    'Jimma University (JiT)',
    'Hawassa University (IoT)',
    'Bahir Dar Institute of Technology (BiT)',
    'Haramaya University',
    'Mekelle Institute of Technology (MIT)',
    'Arba Minch University (IoT)',
    'University of Gondar',
    'Wollo University (Kombolcha IoT)',
    'Debre Berhan University',
    'Dilla University',
    'Wollega University',
    'Ambo University',
    'Jigjiga University',
    'Dire Dawa University',
    'Self-Taught / Online Institute',
    'Other',
  ];

  const careerOptions = [
    'Full-Stack Software Engineer',
    'Backend & Cloud Infrastructure',
    'Frontend & Web Developer',
    'Mobile Application Developer (Flutter / React Native)',
    'AI / Machine Learning Engineer',
    'Cybersecurity & Network Security',
    'DevOps & Systems Engineering',
    'Technology Entrepreneur / Founder',
    'Data Engineer / Analyst',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ethio_cse_ai_profile_${formData.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Student Profile & Settings</h2>
              <p className="text-xs text-neutral-400">
                Ethio CSE AI adapts all roadmaps, explanations, and advice to these preferences.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Academic Level - Crucial Requirement */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <label className="block text-white font-bold text-xs flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Current Student Level (Adapts AI & Curriculum)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {academicLevels.map((lvl) => {
                const isSelected = formData.academicLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, academicLevel: lvl })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & University */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Current GPA (Target or Actual)
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="e.g. 3.65 / 4.00"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                University / Institute in Ethiopia
              </label>
              <select
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {universities.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Campus Location
              </label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                placeholder="e.g. 5 Kilo Campus, Addis Ababa"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Careers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Primary Career Direction
              </label>
              <select
                value={formData.primaryCareer}
                onChange={(e) => setFormData({ ...formData, primaryCareer: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {careerOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Secondary / Backup Direction
              </label>
              <select
                value={formData.secondaryCareer}
                onChange={(e) => setFormData({ ...formData, secondaryCareer: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              >
                {careerOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Study hours & learning style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Weekly Study / Coding Hours: {formData.weeklyStudyHours} hrs
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={formData.weeklyStudyHours}
                onChange={(e) =>
                  setFormData({ ...formData, weeklyStudyHours: parseInt(e.target.value) })
                }
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Preferred Learning Style
              </label>
              <select
                value={formData.preferredLearningStyle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredLearningStyle: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Hands-on Projects">Hands-on Projects & Building</option>
                <option value="Step-by-step Tutoring">Step-by-step AI Tutoring</option>
                <option value="Active Quizzes & Recall">Active Quizzes & Recall</option>
                <option value="Visual & Diagrams">Visual & Architectural Diagrams</option>
              </select>
            </div>
          </div>

          {/* Backup / Export / Reset */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Profile JSON</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset your profile and data back to initial defaults?')) {
                    onResetData();
                    onClose();
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold flex items-center gap-1.5"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
