import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Bookmark,
  Code2,
  Tag,
  Calendar,
  Layers,
} from 'lucide-react';
import { KnowledgeNote, AcademicLevel, AILearningMode } from '../types';

interface NotesAndKnowledgeProps {
  notes: KnowledgeNote[];
  onAddNote: (note: KnowledgeNote) => void;
  onDeleteNote: (id: string) => void;
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const NotesAndKnowledge: React.FC<NotesAndKnowledgeProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  studentLevel,
  onLaunchAIMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Note Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<KnowledgeNote['category']>('Concept Explanation');
  const [newContent, setNewContent] = useState('');
  const [newCodeSnippet, setNewCodeSnippet] = useState('');
  const [newTags, setNewTags] = useState('');

  const categories = [
    'all',
    'Concept Explanation',
    'Code Snippet',
    'AI Tutoring',
    'Exam Prep',
    'Project Architecture',
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const created: KnowledgeNote = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      codeSnippet: newCodeSnippet.trim() || undefined,
      tags: tagsArray.length > 0 ? tagsArray : ['General'],
      dateCreated: new Date().toISOString().split('T')[0],
    };

    onAddNote(created);
    setNewTitle('');
    setNewContent('');
    setNewCodeSnippet('');
    setNewTags('');
    setShowAddModal(false);
  };

  const filteredNotes = notes.filter((n) => {
    const matchCat = selectedCategory === 'all' || n.category === selectedCategory;
    const matchSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wider">
              Second Brain & Archive
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            My Knowledge Base & Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Store explanations, code templates, algorithms, exam notes, and saved insights from your AI Assistant.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword, tags, or concept..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex overflow-x-auto gap-1.5 pb-1 sm:pb-0 text-xs shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-neutral-800 text-cyan-400 font-bold'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1 rounded text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                  {note.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>

                {note.codeSnippet && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                      <span>Code Snippet</span>
                      <button
                        onClick={() => handleCopy(note.id, note.codeSnippet!)}
                        className="hover:text-white flex items-center gap-1"
                      >
                        {copiedId === note.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-40">
                      {note.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-800 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 font-mono">
                  <span>{note.dateCreated}</span>
                  <button
                    onClick={() =>
                      onLaunchAIMode(
                        'explain',
                        `Can you test my understanding of this concept from my knowledge base: "${note.title}"? Give me a quick challenging question.`
                      )
                    }
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Test Recall with AI</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-950/40 text-neutral-400 space-y-2">
          <FileText className="w-8 h-8 text-neutral-600 mx-auto" />
          <p className="text-sm font-medium text-neutral-300">No notes found</p>
          <p className="text-xs">
            Save answers from your AI Assistant, or click "Create New Note" to add formulas, snippets, and concepts.
          </p>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              Add Knowledge Note
            </h3>

            <form onSubmit={handleCreateNote} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Inverting Binary Trees or Telebirr HMAC Hash"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Concept Explanation">Concept Explanation</option>
                  <option value="Code Snippet">Code Snippet</option>
                  <option value="AI Tutoring">AI Tutoring</option>
                  <option value="Exam Prep">Exam Prep</option>
                  <option value="Project Architecture">Project Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Content / Summary
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain the concept in your own words, key takeaways, or algorithmic logic..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Code Snippet (Optional)
                </label>
                <textarea
                  rows={3}
                  value={newCodeSnippet}
                  onChange={(e) => setNewCodeSnippet(e.target.value)}
                  placeholder="// Paste relevant code or SQL snippet..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-300 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. DSA, Trees, LeetCode, CoSc 2031"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
