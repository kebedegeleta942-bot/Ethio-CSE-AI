export type AcademicLevel =
  | '1st Year'
  | '2nd Year'
  | '3rd Year'
  | '4th Year'
  | '5th Year / Extended Program'
  | 'Recent Graduate'
  | 'Self-Learner'
  | 'Other';

export type ViewMode =
  | 'dashboard'
  | 'assistant'
  | 'learn'
  | 'practice'
  | 'exitexam'
  | 'coding'
  | 'projects'
  | 'roadmap'
  | 'progress'
  | 'planner'
  | 'career'
  | 'freelance'
  | 'ethiopia'
  | 'notes'
  | 'settings'
  | 'landing';

export type AILearningMode =
  | 'explain'
  | 'teach'
  | 'practice'
  | 'quiz'
  | 'debug'
  | 'codereview'
  | 'project'
  | 'examprep'
  | 'career'
  | 'planner'
  | 'research';

export interface StudentProfile {
  name: string;
  email?: string;
  university: string;
  campus: string;
  academicLevel: AcademicLevel;
  gpa: string;
  graduationYear: string;
  primaryCareer: string;
  secondaryCareer: string;
  interests: string[];
  preferredLanguages: string[];
  currentTechLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  weeklyStudyHours: number;
  mainChallenges: string[];
  preferredLearningStyle: 'Hands-on Projects' | 'Step-by-step Tutoring' | 'Active Quizzes & Recall' | 'Visual & Diagrams';
  helpGoals: string[];
  skills: Record<string, number>; // 1-5 scale
  onboardingCompleted: boolean;
  theme: 'light' | 'dark' | 'system';
  streakDays: number;
  completedTasksCount: number;
  solvedProblemsCount: number;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  mode?: AILearningMode;
  timestamp: string;
  codeSnippet?: string;
  savedToNotes?: boolean;
}

export interface DailyFocusTask {
  id: string;
  title: string;
  category: 'academic' | 'coding' | 'project' | 'career' | 'review' | 'ai';
  durationMinutes: number;
  completed: boolean;
  targetLevel?: AcademicLevel;
}

export type CurriculumSource = 'ethiopian_university' | 'harvard_university';

export interface CSCourseModule {
  id: string;
  code: string;
  title: string;
  curriculumSource?: CurriculumSource;
  institution?: string;
  instructor?: string;
  recommendedYear: AcademicLevel | 'All Years';
  semester?: string;
  creditHours?: string;
  category: 'Fundamentals' | 'Core CS' | 'Systems & Architecture' | 'Software Engineering' | 'Advanced & AI';
  description: string;
  keyTopics: string[];
  practicalExercises: string[];
  problemSets?: string[];
  ethiopianExamFocus: string;
  harvardEquivalent?: string;
  ethiopianEquivalent?: string;
  courseUrl?: string;
  status?: 'not_started' | 'in_progress' | 'completed';
}

export type SkillCategory = 'programming' | 'web' | 'backend' | 'devops' | 'ai';
export type SkillStatus = 'not_started' | 'learning' | 'practicing' | 'comfortable' | 'advanced';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  recommendedFor: AcademicLevel[];
  description: string;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'coding' | 'true_false' | 'short_answer';
  prompt: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  courseCode?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Exam Ready';
}

export interface QuizSessionResult {
  courseTitle: string;
  totalQuestions: number;
  score: number;
  wrongAnswers: { question: string; studentAnswer: string; correctAnswer: string; explanation: string }[];
  recommendedRevision: string[];
  date: string;
}

export interface StudyCalendarEvent {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'project_milestone' | 'study_session' | 'deadline';
  course: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  completed: boolean;
  notes?: string;
}

export interface ProjectLabItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced' | 'Graduation Project' | 'Build for Ethiopia 🇪🇹';
  techStack: string[];
  problemStatement: string;
  targetUsers: string;
  features: string[];
  dbArchitecture: string;
  ethiopianContext?: string;
  status: 'idea' | 'planning' | 'building' | 'deployed' | 'completed';
}

export interface CareerPathDetail {
  id: string;
  title: string;
  tagline: string;
  demandInEthiopia: 'High' | 'Very High' | 'Growing' | 'Emerging';
  typicalEmployers: string[];
  requiredSkills: string[];
  beginnerRoadmap: string[];
  intermediateRoadmap: string[];
  advancedRoadmap: string[];
  portfolioMilestones: string[];
  interviewPrepFocus: string[];
}

export interface KnowledgeNote {
  id: string;
  title: string;
  category: 'Concept Explanation' | 'Code Snippet' | 'AI Tutoring' | 'Exam Prep' | 'Project Architecture';
  content: string;
  codeSnippet?: string;
  tags: string[];
  dateCreated: string;
}

export interface GamificationBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'Projects' | 'Problems' | 'Streak' | 'AI' | 'Community';
}

export interface ScorecardMetric {
  monthName: string;
  codingHours: number;
  universityGradeAvg: number;
  projectsCompleted: number;
  githubContributions: number;
  skillsMasteredCount: number;
  jobApplicationsSent: number;
  interviewsCount: number;
  freelanceProposalsSent: number;
  incomeETB: number;
  incomeUSD: number;
  exerciseDaysPerWeek: number;
  sleepHoursAvg: number;
  englishSpeakingMinsPerDay: number;
}

export interface FreelanceProposal {
  id: string;
  clientOrPlatform: string;
  service: string;
  estimatedHours: number;
  rateType: string;
  totalValue: number;
  status: string;
  milestones: string[];
  scopeBoundaries: string;
  dateCreated: string;
}

export interface Flashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  codeSnippet?: string;
}

export type ExitExamDomain =
  | 'Programming & Data Structures'
  | 'Database Systems'
  | 'Operating Systems & Architecture'
  | 'Computer Networks & Security'
  | 'Software Engineering & Design';

export interface ExitExamQuestion {
  id: string;
  examPaperId: string; // e.g. "moe-2016-ec" or "moe-2015-ec" or "moe-model-2017"
  yearEC: string; // e.g. "2016 E.C. (2024 G.C.)"
  domain: ExitExamDomain;
  courseCode: string; // e.g. "CoSc 2031", "CoSc 2042", "CoSc 2062", "CoSc 3071", "CoSc 3082"
  courseName: string;
  difficulty: 'Standard' | 'Tricky' | 'High Frequency';
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  trapAnalysis?: string; // Why students often fail this question
  tags: string[];
}

export interface PastExitExamPaper {
  id: string;
  yearEC: string;
  title: string;
  administeredBy: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScorePercent: number; // 50
  description: string;
  domainsCovered: ExitExamDomain[];
  questions: ExitExamQuestion[];
}

export interface ExitExamDomainBlueprint {
  domain: ExitExamDomain;
  weightPercentage: number;
  officialCourses: { code: string; name: string; weight: number }[];
  keyTopics: string[];
  recommendedStrategy: string;
  commonPitfalls: string[];
}

