import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { QuizQuestion, QuizSessionResult, AcademicLevel, AILearningMode } from '../types';
import { sampleQuizQuestions, defaultFlashcards } from '../data/defaultData';
import { generateQuizWithAI } from '../services/api';

interface PracticeExamPrepProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
  onNavigateToExitExam?: () => void;
}

export const PracticeExamPrep: React.FC<PracticeExamPrepProps> = ({
  studentLevel,
  onLaunchAIMode,
  onNavigateToExitExam,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz_generator' | 'flashcards'>('quiz_generator');

  // Generator state
  const [selectedCourse, setSelectedCourse] = useState('Data Structures & Algorithms (CoSc 2031)');
  const [customTopic, setCustomTopic] = useState('Binary Trees & AVL Balancing');
  const [difficulty, setDifficulty] = useState('Exam Ready');
  const [questionCount, setQuestionCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  // Active quiz session state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(sampleQuizQuestions);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<boolean>(false);
  const [userScore, setUserScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [wrongAnswersList, setWrongAnswersList] = useState<{ question: string; studentAnswer: string; correctAnswer: string; explanation: string }[]>([]);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const activeQuestion = quizQuestions[currentQIndex];

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateQuizWithAI(
        selectedCourse,
        customTopic,
        difficulty,
        studentLevel,
        questionCount
      );
      if (generated && generated.length > 0) {
        setQuizQuestions(generated);
        setCurrentQIndex(0);
        setSelectedAnswer(null);
        setAnsweredState(false);
        setUserScore(0);
        setQuizCompleted(false);
        setWrongAnswersList([]);
      }
    } catch (err: any) {
      alert(`Could not generate quiz: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (answeredState) return;
    setSelectedAnswer(opt);
    setAnsweredState(true);

    const isCorrect = opt === activeQuestion.correctAnswer;
    if (isCorrect) {
      setUserScore((prev) => prev + 1);
    } else {
      setWrongAnswersList((prev) => [
        ...prev,
        {
          question: activeQuestion.prompt,
          studentAnswer: opt,
          correctAnswer: String(activeQuestion.correctAnswer),
          explanation: activeQuestion.explanation,
        },
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnsweredState(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setAnsweredState(false);
    setUserScore(0);
    setQuizCompleted(false);
    setWrongAnswersList([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <span>Practice & Exam Preparation</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Test and retain concepts with instant grading, mistake diagnosis, and MoE Exit Exam question formats.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('quiz_generator')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'quiz_generator'
                ? 'bg-emerald-500 text-neutral-950 font-bold'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            Interactive Quiz Simulator
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-emerald-500 text-neutral-950 font-bold'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            Spaced Recall Flashcards
          </button>
        </div>
      </div>

      {/* MoE Exit Exam Fast-Track Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-neutral-900 to-amber-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs sm:text-sm">
                MoE Computer Science Exit Exam Hub 🇪🇹
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Official Past Papers
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Practice authentic 2015, 2016, and 2017 model exit exam questions, trap analyses, and timed mock simulator.
            </p>
          </div>
        </div>

        {onNavigateToExitExam && (
          <button
            onClick={onNavigateToExitExam}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Open Exit Exam Hub</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {activeTab === 'quiz_generator' ? (
        <div className="space-y-6">
          {/* Quiz Configuration Panel */}
          <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Exam Generator</span>
              </h2>
              <span className="text-neutral-400 font-mono text-[11px]">
                Level: {studentLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-neutral-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Data Structures & Algorithms (CoSc 2031)">Data Structures & Algorithms</option>
                  <option value="Database Systems & SQL (CoSc 2042)">Database Systems & SQL</option>
                  <option value="Operating Systems (CoSc 2062)">Operating Systems</option>
                  <option value="Computer Networks (CoSc 3071)">Computer Networks</option>
                  <option value="Software Engineering & Agile (CoSc 3082)">Software Engineering</option>
                  <option value="Computer Programming I & II (C++/Java)">Programming I & II</option>
                  <option value="Ministry of Education (MoE) CS Exit Exam">MoE National Exit Exam</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Specific Topic</label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. Normalization, B-Trees, Raft, Threads..."
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-neutral-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 p-2 text-neutral-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Beginner">Beginner / Fundamentals</option>
                  <option value="Intermediate">Intermediate / Semester Midterm</option>
                  <option value="Exam Ready">Exam Ready / MoE Exit Exam</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateQuestions}
                  disabled={isGenerating}
                  className="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  {isGenerating ? (
                    <span>Generating Questions...</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Quiz</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Active Quiz Card or Score Card */}
          {!quizCompleted && activeQuestion ? (
            <div className="p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-400 font-semibold">
                    Question {currentQIndex + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400 font-mono text-[11px] uppercase">
                    {activeQuestion.difficulty}
                  </span>
                </div>
                <div className="text-neutral-400 font-mono">
                  Current Score: {userScore}
                </div>
              </div>

              {/* Question text */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {activeQuestion.prompt}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(activeQuestion.options || ['True', 'False']).map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === activeQuestion.correctAnswer;

                  let optClass = 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:border-neutral-700';

                  if (answeredState) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold';
                    } else if (isSelected) {
                      optClass = 'bg-rose-950/40 border-rose-500 text-rose-300';
                    } else {
                      optClass = 'bg-neutral-950 border-neutral-800 text-neutral-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={answeredState}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {answeredState && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {answeredState && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button if answered */}
              {answeredState && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-emerald-400 block mb-1">
                      Explanation:
                    </span>
                    <p className="text-neutral-300 leading-relaxed">
                      {activeQuestion.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>{currentQIndex === quizQuestions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Quiz Completed!</h2>
                <p className="text-xs text-neutral-400">
                  {selectedCourse} — {customTopic}
                </p>
                <div className="text-3xl font-mono font-bold text-emerald-400 my-2">
                  {userScore} / {quizQuestions.length}{' '}
                  <span className="text-sm font-sans text-neutral-400 font-normal">
                    ({Math.round((userScore / quizQuestions.length) * 100)}%)
                  </span>
                </div>
              </div>

              {/* Mistakes review */}
              {wrongAnswersList.length > 0 && (
                <div className="text-left space-y-3 pt-4 border-t border-neutral-800 text-xs">
                  <h3 className="font-semibold text-rose-400">
                    Questions Requiring Revision ({wrongAnswersList.length}):
                  </h3>
                  <div className="space-y-3">
                    {wrongAnswersList.map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                        <div className="font-semibold text-neutral-200">{item.question}</div>
                        <div className="text-rose-400 text-[11px]">Your Answer: {item.studentAnswer}</div>
                        <div className="text-emerald-400 text-[11px]">Correct: {item.correctAnswer}</div>
                        <div className="text-neutral-400 text-[11px] pt-1">{item.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-4 border-t border-neutral-800">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={() =>
                    onLaunchAIMode('examprep', `I scored ${userScore}/${quizQuestions.length} on ${selectedCourse} (${customTopic}). Explain my weak concepts in depth.`)
                  }
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold"
                >
                  Revise Weak Areas with AI Tutor
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Spaced Recall Flashcards Tab */
        <div className="space-y-4">
          <div className="p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800">
                <span className="font-mono text-emerald-400 font-semibold">
                  {defaultFlashcards[flashcardIndex].category}
                </span>
                <span className="font-mono">
                  {flashcardIndex + 1} of {defaultFlashcards.length}
                </span>
              </div>

              <div className="mt-6">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                  Active Retrieval Prompt:
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {defaultFlashcards[flashcardIndex].question}
                </h2>
              </div>

              {flashcardFlipped && (
                <div className="mt-6 pt-4 border-t border-neutral-800 space-y-3 text-xs sm:text-sm text-neutral-200">
                  <p className="leading-relaxed">
                    {defaultFlashcards[flashcardIndex].answer}
                  </p>
                  {defaultFlashcards[flashcardIndex].codeSnippet && (
                    <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                      {defaultFlashcards[flashcardIndex].codeSnippet}
                    </pre>
                  )}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs mt-6">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFlashcardFlipped(false);
                    setFlashcardIndex((prev) => (prev - 1 + defaultFlashcards.length) % defaultFlashcards.length);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => {
                    setFlashcardFlipped(false);
                    setFlashcardIndex((prev) => (prev + 1) % defaultFlashcards.length);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                >
                  Next →
                </button>
              </div>

              <button
                onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold shadow-sm"
              >
                {flashcardFlipped ? 'Hide Answer' : 'Reveal Solution'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
