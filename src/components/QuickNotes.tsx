import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Copy, Check, Trash2, Plus, PenSquare } from 'lucide-react';
import { QuickNote } from '../types';

interface QuickNotesProps {
  notes: QuickNote[];
  onAddNote: (text: string, category: string) => void;
  onDeleteNote: (id: string) => void;
}

const NOTE_CATEGORIES = ["Lodging", "Activities", "Shopping", "General"];

export default function QuickNotes({ notes, onAddNote, onDeleteNote }: QuickNotesProps) {
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('General');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredNotes = notes.filter(note => activeCategory === 'All' || note.category === activeCategory);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText.trim(), newNoteCategory);
    setNewNoteText('');
    setShowAddForm(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  return (
    <div className="bg-white border border-art-charcoal/10 rounded-3xl p-6 shadow-sm flex flex-col h-[525px] text-art-charcoal">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F1EEE5] border border-art-charcoal/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-art-green" />
          </div>
          <div>
            <h2 className="text-base font-bold text-art-charcoal">Co-op Scratchpad</h2>
            <p className="text-xs text-art-charcoal/60 font-medium font-sans">Share reservation keys, codes & grocery lists.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-art-green hover:bg-art-green/90 active:scale-95 text-white transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Note</span>
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-art-charcoal/10 scrollbar-track-transparent">
        <button
          onClick={() => setActiveCategory('All')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-art-charcoal text-art-beige border-art-charcoal'
              : 'bg-white border-art-charcoal/10 text-art-charcoal/70 hover:border-art-charcoal/30 hover:text-art-charcoal'
          }`}
        >
          All Notes ({notes.length})
        </button>
        {NOTE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-art-charcoal text-art-beige border-art-charcoal'
                : 'bg-white border-art-charcoal/10 text-art-charcoal/70 hover:border-art-charcoal/30 hover:text-art-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expandable Add note form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="overflow-hidden bg-art-beige border border-art-charcoal/12 p-4 rounded-2xl my-3 flex flex-col gap-3"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-art-charcoal/60 mb-1 font-mono">
                Note / Reminder
              </label>
              <textarea
                placeholder="Paste code keys, hotel doors, quick groceries, parking slots..."
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                rows={2}
                className="w-full bg-white border border-art-charcoal/12 text-art-charcoal rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-art-green transition-colors placeholder:text-[#2C2A26]/30 resize-none"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-art-charcoal/60 mb-1 font-mono">
                  Topic
                </label>
                <select
                  value={newNoteCategory}
                  onChange={e => setNewNoteCategory(e.target.value)}
                  className="w-full bg-white border border-art-charcoal/12 text-art-charcoal rounded-xl px-2 py-1.5 text-xs focus:outline-none focus:border-art-green cursor-pointer"
                >
                  {NOTE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  className="w-full bg-art-green hover:bg-art-green/90 text-white text-xs font-semibold py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer font-serif italic"
                >
                  Save Note
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Notes container */}
      <div className="flex-1 overflow-y-auto pr-1 mt-4 space-y-3 scrollbar-thin scrollbar-thumb-art-charcoal/5 scrollbar-track-transparent">
        {filteredNotes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-art-charcoal/50">
            <PenSquare className="w-10 h-10 mb-2 opacity-15" />
            <p className="text-xs font-semibold">Scratchpad is empty.</p>
            <p className="text-[10px] mt-1 text-art-charcoal/60">Great for copy-pasting lodge codes, ticket numbers, or reservation hashes.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredNotes.map(note => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-art-beige/65 border border-art-charcoal/10 rounded-2xl p-4 flex flex-col justify-between hover:border-art-charcoal/20 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9px] font-mono text-art-amber uppercase font-semibold tracking-wider bg-white border border-art-charcoal/10 px-2 py-0.5 rounded-full">
                      {note.category || 'General'}
                    </span>
                    <span className="text-[9px] font-mono text-art-charcoal/50">
                      {formatDate(note.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-art-charcoal leading-relaxed font-sans whitespace-pre-wrap select-text">
                    {note.text}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-art-charcoal/5 flex justify-end gap-1.5">
                  <button
                    onClick={() => handleCopy(note.text, note.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold bg-white border border-art-charcoal/10 hover:bg-art-beige text-art-charcoal/80 transition-all cursor-pointer"
                    title="Copy note text to clipboard"
                  >
                    {copiedId === note.id ? (
                      <>
                        <Check className="w-3 h-3 text-art-green stroke-[3]" />
                        <span className="text-art-green font-mono">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-art-charcoal/60" />
                        <span className="font-mono">Copy Text</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-art-charcoal/40 hover:text-rose-500 hover:bg-white rounded-xl transition-all cursor-pointer"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Simple Footer disclaimer */}
      <div className="mt-3 pt-3 border-t border-art-charcoal/10 text-[9px] font-mono text-art-charcoal/50 text-center">
        Sharing this link with Archana shares access & notes instantly!
      </div>
    </div>
  );
}
