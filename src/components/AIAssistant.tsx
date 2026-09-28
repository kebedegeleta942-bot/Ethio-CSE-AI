import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
  Bookmark,
  Trash2,
  Code2,
  Lightbulb,
  FileQuestion,
  Bug,
  Compass,
  Calendar,
  Layers,
  Search,
} from 'lucide-react';
import { StudentProfile, AILearningMode, ChatMessage, KnowledgeNote } from '../types';
import { sendCopilotChat } from '../services/api';

interface AIAssistantProps {
  profile: StudentProfile;
  initialMode?: AILearningMode;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onSaveNote: (note: KnowledgeNote) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  profile,
  initialMode = 'explain',
  initialPrompt,
  onClearInitialPrompt,
  onSaveNote,
}) => {
  const [selectedMode, setSelectedMode] = useState<AILearningMode>(initialMode);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      content: `Hello ${profile.name || 'Engineer'}! I am **Ethio CSE AI Assistant**, your academic, coding, and career companion.

I adapt to your **${profile.academicLevel}** journey at **${profile.university}**.

### How would you like to learn today?
Select one of my 11 specialized learning modes above or try a starter question below. I use a **teaching-first approach**: I explain the "why", provide structured hints, and help you build real engineering comprehension rather than blind copy-pasting.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedNotesIds, setSavedNotesIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const learningModes: { id: AILearningMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'explain', label: 'Explain', icon: <Lightbulb className="w-3.5 h-3.5" />, desc: 'Simple breakdowns with intuitive analogies' },
    { id: 'teach', label: 'Teach Me', icon: <BookOpen className="w-3.5 h-3.5" />, desc: 'Step-by-step interactive tutor with hints' },
    { id: 'practice', label: 'Practice', icon: <Code2 className="w-3.5 h-3.5" />, desc: 'Progressive problem exercises' },
    { id: 'quiz', label: 'Quiz Me', icon: <FileQuestion className="w-3.5 h-3.5" />, desc: 'Concept tests & instant evaluation' },
    { id: 'debug', label: 'Debug', icon: <Bug className="w-3.5 h-3.5" />, desc: 'Analyze errors & pinpoint bugs' },
    { id: 'codereview', label: 'Code Review', icon: <Check className="w-3.5 h-3.5" />, desc: 'Anti-AI-dependence code audit' },
    { id: 'project', label: 'Project Mentor', icon: <Layers className="w-3.5 h-3.5" />, desc: 'Architecture, schema & API guidance' },
    { id: 'examprep', label: 'Exam Prep', icon: <GraduationCap className="w-3.5 h-3.5" />, desc: 'University & MoE Exit Exam review' },
    { id: 'career', label: 'Career Coach', icon: <Compass className="w-3.5 h-3.5" />, desc: 'Ethiopian tech market & remote jobs' },
    { id: 'planner', label: 'Study Planner', icon: <Calendar className="w-3.5 h-3.5" />, desc: 'Realistic schedule & focus blocks' },
    { id: 'research', label: 'Research Assistant', icon: <Sparkles className="w-3.5 h-3.5" />, desc: 'Technical papers & emerging CS' },
  ];

  const starterPrompts = [
    { label: '🇪🇹 Pre Help Me for Exit Exam', text: 'Pre help me for the Ethiopian MoE Computer Science exit exam: diagnose my readiness across the 5 clusters (Programming, DBMS, OS, Networks, Software Eng), explain the most common traps, and build my revision plan.' },
    { label: '👶 Explain recursion simply', text: 'Explain recursion like I am a first-year Computer Science student, using an Ethiopian coffee ceremony or postal mail analogy.' },
    { label: '🌳 Understand Data Structures', text: 'Help me understand the fundamental trade-offs between Arrays, Linked Lists, and Hash Maps in memory and time.' },
    { label: '🐍 30-Day Python Roadmap', text: `Create a progressive 30-day Python learning plan suitable for a ${profile.academicLevel} student balancing university courses.` },
    { label: '🛡️ Anti-AI Code Review', text: 'Review this architecture logic: I want to understand what it does, why it works, and how to defend it in an interview.' },
    { label: '🇪🇹 Project idea for Ethiopia', text: 'Give me a real-world software project idea for Ethiopia addressing a tangible problem in local business, payments, or education.' },
    { label: '📝 Database Exam Preparation', text: 'Prepare me for my university Database exam: Ask me 3 high-yield questions on Normalization (1NF to 3NF) and SQL transactions.' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      mode: selectedMode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const payload = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const replyText = await sendCopilotChat(
        payload,
        profile,
        `Current Mode: ${selectedMode}. Student Academic Level: ${profile.academicLevel}. University: ${profile.university}`,
        selectedMode
      );

      const aiMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: replyText,
        mode: selectedMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([...newHistory, aiMessage]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Error connecting to Ethio CSE AI: ${err.message || 'Please check your connection and try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...newHistory, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToNotes = (msg: ChatMessage) => {
    const newNote: KnowledgeNote = {
      id: `note-${Date.now()}`,
      title: `${selectedMode.toUpperCase()}: ${msg.content.slice(0, 45).replace(/[#*`]/g, '')}...`,
      category: 'AI Tutoring',
      content: msg.content,
      tags: [selectedMode, profile.academicLevel, 'AI Explanation'],
      dateCreated: new Date().toISOString().split('T')[0],
    };
    onSaveNote(newNote);
    setSavedNotesIds([...savedNotesIds, msg.id]);
  };

  const handleResetChat = () => {
    if (confirm('Start a fresh conversation?')) {
      setMessages([
        {
          id: 'msg-reset',
          role: 'model',
          content: `Conversation reset! Selected mode: **${selectedMode}**. What shall we explore?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 h-[calc(100vh-5rem)] flex flex-col">
      {/* Top Controls: Mode Selector */}
      <div className="pb-3 border-b border-neutral-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Ethio CSE AI Assistant</span>
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-emerald-400 font-mono text-[11px] font-medium">
              Calibrated for {profile.academicLevel}
            </span>
          </div>

          <button
            onClick={handleResetChat}
            className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>
        </div>

        {/* 11 Selectable Mode Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {learningModes.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs ${
                  isSelected
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800'
                }`}
                title={mode.desc}
              >
                <span>{mode.icon}</span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Starter Prompts chips if chat has <= 2 messages */}
      {messages.length <= 2 && (
        <div className="py-2 flex gap-2 overflow-x-auto scrollbar-none text-xs">
          {starterPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors whitespace-nowrap shrink-0 text-[11px]"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1 scrollbar-thin">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isNoteSaved = savedNotesIds.includes(msg.id);

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[11px] text-neutral-400">
                <span>{isUser ? profile.name : 'Ethio CSE AI'}</span>
                {msg.mode && (
                  <span className="font-mono text-emerald-400 uppercase text-[10px]">
                    [{msg.mode}]
                  </span>
                )}
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-3xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-neutral-800 text-neutral-100 border border-neutral-700/80 rounded-tr-none'
                    : 'bg-neutral-900/85 text-neutral-200 border border-neutral-800/90 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.content}

                {/* Actions for Assistant responses */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="text-[10px] text-neutral-500">
                      Teaching-first approach · Verify understanding
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCode(msg.content, msg.id)}
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSaveToNotes(msg)}
                        className={`flex items-center gap-1 transition-colors ${
                          isNoteSaved ? 'text-amber-400' : 'hover:text-amber-400'
                        }`}
                        title="Save response to My Knowledge"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isNoteSaved ? 'Saved' : 'Save Note'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Formulating {selectedMode} guidance for {profile.academicLevel}...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="pt-3 border-t border-neutral-800/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Ask in [${selectedMode.toUpperCase()}] mode (e.g. "Explain B-Trees", "Review my SQL query", "What should I build?")...`}
              rows={2}
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 p-3 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 resize-none pr-10"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 rounded-xl transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1">
          <span>Enter to send · Shift+Enter for new line</span>
          <span>Adaptive AI for Ethiopian computing students</span>
        </div>
      </div>
    </div>
  );
};
