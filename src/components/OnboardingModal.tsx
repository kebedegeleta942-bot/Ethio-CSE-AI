import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Code2,
  Target,
  Clock,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { StudentProfile, AcademicLevel } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<StudentProfile>(profile);

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

  const universityList = [
    'Addis Ababa Institute of Technology (AAiT)',
    'Addis Ababa Science and Technology University (AASTU)',
    'Adama Science and Technology University (ASTU)',
    'Jimma University Institute of Technology (JiT)',
    'Hawassa University (IoT)',
    'Bahir Dar Institute of Technology (BiT)',
    'Haramaya University',
    'University of Gondar',
    'Mekelle University',
    'Arba Minch University',
    'Dilla University',
    'Debre Berhan University',
    'Wollo University (KIOT)',
    'Dire Dawa University',
    'Other Ethiopian University',
    'Self-Taught / Independent Learner',
  ];

  const interestOptions = [
    'Web Development',
    'Data Structures & Algorithms',
    'Backend & APIs',
    'Artificial Intelligence & ML',
    'Mobile Apps (Flutter / React Native)',
    'Cybersecurity & Network Defense',
    'Cloud & DevOps',
    'Systems Programming & OS',
    'Tech Entrepreneurship & Startups',
    'FinTech & Payments (Telebirr/Chapa)',
  ];

  const languageOptions = [
    'Python',
    'JavaScript',
    'TypeScript',
    'C / C++',
    'Java',
    'Go',
    'C#',
    'PHP',
    'SQL',
    'Rust',
  ];

  const careerOptions = [
    'Full-Stack Software Engineer',
    'Backend & Cloud Engineer',
    'Frontend Engineer',
    'AI / Machine Learning Engineer',
    'Mobile Application Developer',
    'Cybersecurity Specialist',
    'DevOps / SRE Engineer',
    'Data Analyst / Data Scientist',
    'Technology Entrepreneur',
    'Freelance Consultant',
  ];

  const challengeOptions = [
    'Balancing university exams with practical coding',
    'Frequent power fluctuations and power outages',
    'Unreliable or expensive internet / mobile data',
    'Overwhelmed by too many tools & tutorial hell',
    'Struggling with advanced math / DSA logic',
    'Lack of real-world project mentorship',
  ];

  const helpGoalOptions = [
    'Academic help & course study',
    'Programming fundamentals & debugging',
    'Real-world project building',
    'Career guidance & roadmaps',
    'AI & modern tools mastery',
    'Freelancing & client contracts',
    'Job & technical interview preparation',
  ];

  const handleToggleArrayItem = (key: 'interests' | 'preferredLanguages' | 'mainChallenges' | 'helpGoals', item: string) => {
    const list = data[key] || [];
    const updated = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setData({ ...data, [key]: updated });
  };

  const handleFinish = () => {
    const updated: StudentProfile = {
      ...data,
      onboardingCompleted: true,
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-neutral-800 p-6 md:p-8 space-y-6 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
        {/* Progress Bar & Header */}
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span className="font-mono text-emerald-400 font-semibold">
              Step {step} of 4: {step === 1 ? 'Academic Level' : step === 2 ? 'Technical Interests' : step === 3 ? 'Career & Goals' : 'Study Preferences'}
            </span>
            <button
              onClick={handleFinish}
              className="text-neutral-400 hover:text-neutral-200 text-xs font-medium"
            >
              Skip & Start Exploring
            </button>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basics, University & Academic Level */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Welcome to Ethio CSE AI! 👋
              </h2>
              <p className="text-neutral-400 mt-1">
                Tell us about your university journey so we can tailor our AI curriculum, code reviews, and roadmaps to your level.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="e.g. Dawit, Bethlehem, Nahom..."
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2.5 text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">University / Institution</label>
                <select
                  value={data.university}
                  onChange={(e) => setData({ ...data, university: e.target.value })}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2.5 text-neutral-100 focus:outline-none focus:border-emerald-500"
                >
                  {universityList.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1.5 font-medium">
                  What is your current academic level? (We adapt recommendations to you)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {academicLevels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setData({ ...data, academicLevel: lvl })}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        data.academicLevel === lvl
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span className="truncate">{lvl}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Programming Interests & Skills */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Your Technical Interests & Stack 💻
              </h2>
              <p className="text-neutral-400 mt-1">
                Select the areas and programming languages you currently know or want to master.
              </p>
            </div>

            <div>
              <label className="block text-neutral-300 mb-2 font-medium">
                Main Computing Interests (Select 2-4)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((item) => {
                  const isSelected = data.interests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleArrayItem('interests', item)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-medium'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 mb-2 font-medium">
                Preferred Programming Languages
              </label>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((lang) => {
                  const isSelected = data.preferredLanguages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleToggleArrayItem('preferredLanguages', lang)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 mb-1.5 font-medium">
                How would you evaluate your current technical level?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setData({ ...data, currentTechLevel: lvl })}
                    className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                      data.currentTechLevel === lvl
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Career Goal & Help Focus */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Career Vision & Target Role 🎯
              </h2>
              <p className="text-neutral-400 mt-1">
                Whether you aspire to work at Chapa/CBE, win remote USD contracts, or launch a tech startup in Ethiopia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Primary Career Goal</label>
                <select
                  value={data.primaryCareer}
                  onChange={(e) => setData({ ...data, primaryCareer: e.target.value })}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2.5 text-neutral-100 focus:outline-none focus:border-emerald-500"
                >
                  {careerOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Secondary Backup Path</label>
                <select
                  value={data.secondaryCareer}
                  onChange={(e) => setData({ ...data, secondaryCareer: e.target.value })}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2.5 text-neutral-100 focus:outline-none focus:border-emerald-500"
                >
                  {careerOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 mb-2 font-medium">
                What do you want Ethio CSE AI to help you with most?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {helpGoalOptions.map((goal) => {
                  const isChecked = (data.helpGoals || []).includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleToggleArrayItem('helpGoals', goal)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                        isChecked
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isChecked ? 'text-emerald-400' : 'text-neutral-600'
                        }`}
                      />
                      <span>{goal}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Study Time, Challenges & Style */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Study Habits & Real-World Realities 📚
              </h2>
              <p className="text-neutral-400 mt-1">
                We design daily plans that work with your actual university schedule, power situations, and learning style.
              </p>
            </div>

            <div>
              <label className="block text-neutral-300 mb-1 font-medium">
                Available Study & Coding Time Outside Classes: {data.weeklyStudyHours} hours / week
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={data.weeklyStudyHours}
                onChange={(e) => setData({ ...data, weeklyStudyHours: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>5 hrs (Busy semester)</span>
                <span>20 hrs (Recommended)</span>
                <span>40+ hrs (Intensive)</span>
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 mb-2 font-medium">
                Your Biggest Obstacles Right Now
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {challengeOptions.map((ch) => {
                  const isChecked = (data.mainChallenges || []).includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleToggleArrayItem('mainChallenges', ch)}
                      className={`p-2.5 rounded-lg border text-left flex items-start gap-2 transition-all ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isChecked ? 'text-amber-400' : 'text-neutral-600'
                        }`}
                      />
                      <span>{ch}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 mb-1 font-medium">
                Preferred Learning Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Hands-on Projects',
                  'Step-by-step Tutoring',
                  'Active Quizzes & Recall',
                  'Visual & Diagrams',
                ].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setData({ ...data, preferredLearningStyle: style as any })}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      data.preferredLearningStyle === style
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-medium'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buttons / Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-xs font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Launch My CSE Journey
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
