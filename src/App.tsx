import { useState, useEffect } from 'react';
import {
  ViewMode,
  StudentProfile,
  DailyFocusTask,
  KnowledgeNote,
  AILearningMode,
} from './types';
import {
  initialProfile,
  defaultDailyTasks,
  initialKnowledgeNotes,
} from './data/defaultData';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { MyCSEJourneyDashboard } from './components/MyCSEJourneyDashboard';
import { AIAssistant } from './components/AIAssistant';
import { CSLearningHub } from './components/CSLearningHub';
import { PracticeExamPrep } from './components/PracticeExamPrep';
import { ExitExamCenter } from './components/ExitExamCenter';
import { CodingLab } from './components/CodingLab';
import { ProjectLab } from './components/ProjectLab';
import { SkillsRoadmap } from './components/SkillsRoadmap';
import { StudyPlannerCalendar } from './components/StudyPlannerCalendar';
import { CareerCenter } from './components/CareerCenter';
import { FreelanceHub } from './components/FreelanceHub';
import { BuildForEthiopia } from './components/BuildForEthiopia';
import { NotesAndKnowledge } from './components/NotesAndKnowledge';
import { GamificationProgress } from './components/GamificationProgress';
import { OnboardingModal } from './components/OnboardingModal';
import { SettingsModal } from './components/SettingsModal';
import { StuckModal } from './components/StuckModal';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStuckModalOpen, setIsStuckModalOpen] = useState(false);

  // Profile with localStorage persistence
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('ethiocse_profile');
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  // Daily Tasks
  const [tasks, setTasks] = useState<DailyFocusTask[]>(() => {
    try {
      const saved = localStorage.getItem('ethiocse_tasks');
      return saved ? JSON.parse(saved) : defaultDailyTasks;
    } catch {
      return defaultDailyTasks;
    }
  });

  // Knowledge Notes
  const [notes, setNotes] = useState<KnowledgeNote[]>(() => {
    try {
      const saved = localStorage.getItem('ethiocse_notes');
      return saved ? JSON.parse(saved) : initialKnowledgeNotes;
    } catch {
      return initialKnowledgeNotes;
    }
  });

  // AI Assistant cross-view trigger state
  const [aiInitialMode, setAiInitialMode] = useState<AILearningMode>('explain');
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ethiocse_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('ethiocse_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('ethiocse_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [notes]);

  // First time prompt check
  useEffect(() => {
    if (!profile.onboardingCompleted) {
      setIsOnboardingOpen(true);
    }
  }, [profile.onboardingCompleted]);

  // Launch AI with preloaded mode & inquiry from any screen
  const handleLaunchAIMode = (mode: AILearningMode, prompt?: string) => {
    setAiInitialMode(mode);
    setAiInitialPrompt(prompt);
    setCurrentView('assistant');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            setProfile((p) => ({
              ...p,
              completedTasksCount: p.completedTasksCount + 1,
            }));
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const handleAddTask = (title: string, category: DailyFocusTask['category']) => {
    const newTask: DailyFocusTask = {
      id: `task-${Date.now()}`,
      title,
      category,
      durationMinutes: 45,
      completed: false,
      targetLevel: profile.academicLevel,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddNote = (newNote: KnowledgeNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleIncrementProblemCount = () => {
    setProfile((prev) => ({
      ...prev,
      solvedProblemsCount: prev.solvedProblemsCount + 1,
    }));
  };

  const handleResetData = () => {
    localStorage.removeItem('ethiocse_profile');
    localStorage.removeItem('ethiocse_tasks');
    localStorage.removeItem('ethiocse_notes');
    setProfile(initialProfile);
    setTasks(defaultDailyTasks);
    setNotes(initialKnowledgeNotes);
  };

  // If in landing view, render full landing page
  if (currentView === 'landing') {
    return (
      <LandingPage
        onEnterApp={() => setCurrentView('dashboard')}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => {
          setCurrentView(v);
          setIsOpenMobile(false);
        }}
        profile={profile}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleTheme={(t) => setProfile((p) => ({ ...p, theme: t }))}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <TopNavbar
          currentView={currentView}
          onSelectView={setCurrentView}
          profile={profile}
          onOpenMobileMenu={() => setIsOpenMobile(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onStuckAlert={() => setIsStuckModalOpen(true)}
        />

        {/* Dynamic View Router */}
        <main className="flex-1 pb-16">
          {currentView === 'dashboard' && (
            <MyCSEJourneyDashboard
              profile={profile}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onNavigate={setCurrentView}
              onLaunchAIMode={handleLaunchAIMode}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onStuckAlert={() => setIsStuckModalOpen(true)}
            />
          )}

          {currentView === 'assistant' && (
            <AIAssistant
              profile={profile}
              initialMode={aiInitialMode}
              initialPrompt={aiInitialPrompt}
              onClearInitialPrompt={() => setAiInitialPrompt(undefined)}
              onSaveNote={handleAddNote}
            />
          )}

          {currentView === 'learn' && (
            <CSLearningHub
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'practice' && (
            <PracticeExamPrep
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
              onNavigateToExitExam={() => setCurrentView('exitexam')}
            />
          )}

          {currentView === 'exitexam' && (
            <ExitExamCenter
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'coding' && (
            <CodingLab
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'projects' && (
            <ProjectLab
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'roadmap' && (
            <SkillsRoadmap
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'progress' && (
            <GamificationProgress
              profile={profile}
              onLaunchAIMode={handleLaunchAIMode}
              onIncrementProblemCount={handleIncrementProblemCount}
            />
          )}

          {currentView === 'planner' && (
            <StudyPlannerCalendar
              profile={profile}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'career' && (
            <CareerCenter
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'freelance' && (
            <FreelanceHub
              onAskCopilot={(prompt) => handleLaunchAIMode('career', prompt)}
            />
          )}

          {currentView === 'ethiopia' && (
            <BuildForEthiopia
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'notes' && (
            <NotesAndKnowledge
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              studentLevel={profile.academicLevel}
              onLaunchAIMode={handleLaunchAIMode}
            />
          )}

          {currentView === 'settings' && (
            <div className="max-w-4xl mx-auto px-4 py-8">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-6 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-xl shadow-lg"
              >
                Open Student Settings Modal
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        profile={profile}
        onSaveProfile={(newProfile: StudentProfile) => {
          setProfile({ ...newProfile, onboardingCompleted: true });
          setIsOnboardingOpen(false);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onUpdateProfile={(updated: StudentProfile) => setProfile(updated)}
        onResetData={handleResetData}
      />

      <StuckModal
        isOpen={isStuckModalOpen}
        onClose={() => setIsStuckModalOpen(false)}
        onSendToChat={(taskText: string) => {
          setIsStuckModalOpen(false);
          handleLaunchAIMode(
            'planner',
            `I am feeling stuck on: "${taskText}". Break this down into 4 immediate micro-steps I can do in the next 20 minutes.`
          );
        }}
      />
    </div>
  );
}
