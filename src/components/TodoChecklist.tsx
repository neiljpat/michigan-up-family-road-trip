import { useState, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckSquare, Square, Plus, Trash2, Filter, Sparkles, Check, ClipboardList, Edit2 } from 'lucide-react';
import { PackingItem } from '../types';

interface TodoChecklistProps {
  items: PackingItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (text: string, category: PackingItem['category']) => void;
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string, text: string, category: PackingItem['category']) => void;
}

const CATEGORIES: PackingItem['category'][] = ["General", "Kids (Reva & Kabir)", "Fitzy (Dog)", "Tesla", "Beach & Outdoors"];

export default function TodoChecklist({ items, onToggleItem, onAddItem, onDeleteItem, onEditItem }: TodoChecklistProps) {
  const [activeCategory, setActiveCategory] = useState<PackingItem['category'] | 'All'>('All');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingItem['category']>('General');
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState<PackingItem['category']>('General');

  const startEditing = (item: PackingItem) => {
    setEditingId(item.id);
    setEditText(item.text);
    setEditCategory(item.category);
  };

  const handleSaveEdit = (id: string) => {
    if (!editText.trim()) return;
    onEditItem(id, editText.trim(), editCategory);
    setEditingId(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  // Statistics
  const filteredItems = items.filter(item => activeCategory === 'All' || item.category === activeCategory);
  const totalCount = filteredItems.length;
  const checkedCount = filteredItems.filter(item => item.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  // General statistics
  const grandTotal = items.length;
  const grandChecked = items.filter(item => item.checked).length;
  const grandPercent = grandTotal > 0 ? Math.round((grandChecked / grandTotal) * 100) : 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAddItem(newItemText.trim(), newItemCategory);
    setNewItemText('');
    setShowAddForm(false);
  };

  const getCategoryTheme = (category: PackingItem['category']) => {
    switch (category) {
      case 'Tesla':
        return {
          badge: 'bg-[#EDF4EF] text-[#2F6146] border-[#2F6146]/20',
          text: 'text-art-green',
          checkbox: 'text-art-green',
          accent: 'green'
        };
      case 'Fitzy (Dog)':
        return {
          badge: 'bg-indigo-50 text-indigo-800 border-indigo-250/20',
          text: 'text-indigo-800',
          checkbox: 'text-indigo-500',
          accent: 'indigo'
        };
      case 'Kids (Reva & Kabir)':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200/50',
          text: 'text-amber-800',
          checkbox: 'text-amber-500',
          accent: 'amber'
        };
      case 'Beach & Outdoors':
        return {
          badge: 'bg-blue-50 text-blue-800 border-blue-200/50',
          text: 'text-blue-800',
          checkbox: 'text-blue-500',
          accent: 'blue'
        };
      default:
        return {
          badge: 'bg-art-beige text-[#2C2A26]/70 border-art-charcoal/10',
          text: 'text-art-charcoal',
          checkbox: 'text-art-charcoal',
          accent: 'charcoal'
        };
    }
  };

  return (
    <div className="bg-white border border-art-charcoal/10 rounded-3xl p-6 shadow-sm flex flex-col h-[525px] text-art-charcoal">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F1EEE5] border border-art-charcoal/10 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-art-green" />
          </div>
          <div>
            <h2 className="text-base font-bold text-art-charcoal">Co-op Trip To-Do List</h2>
            <p className="text-xs text-art-charcoal/60 font-medium">Coordinate with Archana to check off trip to-dos!</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-art-green hover:bg-art-green/90 active:scale-95 text-white transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add To-Do</span>
        </button>
      </div>

      {/* Progress Bars */}
      <div className="bg-art-beige border border-art-charcoal/10 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-art-charcoal mb-2">
          <span>Overall To-Dos Completed</span>
          <span className="font-mono text-art-amber font-bold">{grandChecked}/{grandTotal} ({grandPercent}%)</span>
        </div>
        <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-art-charcoal/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${grandPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-art-green h-full rounded-full"
          />
        </div>
      </div>

      {/* Sub-Category Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-art-charcoal/10 scrollbar-track-transparent">
        <button
          onClick={() => setActiveCategory('All')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-art-charcoal text-art-beige border-art-charcoal'
              : 'bg-white border-art-charcoal/10 text-art-charcoal/70 hover:border-art-charcoal/30 hover:text-art-charcoal'
          }`}
        >
          All Items ({items.length})
        </button>
        {CATEGORIES.map(cat => {
          const catCount = items.filter(i => i.category === cat).length;
          const catChecked = items.filter(i => i.category === cat && i.checked).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-art-charcoal text-art-beige border-art-charcoal'
                  : 'bg-white border-art-charcoal/10 text-art-charcoal/70 hover:border-art-charcoal/30 hover:text-art-charcoal'
              }`}
            >
              {cat} ({catChecked}/{catCount})
            </button>
          );
        })}
      </div>

      {/* Add Item form */}
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
                To-Do Task Description
              </label>
              <input
                type="text"
                placeholder="e.g. Download offline maps, pack beach canopy..."
                value={newItemText}
                onChange={e => setNewItemText(e.target.value)}
                className="w-full bg-white border border-art-charcoal/12 text-art-charcoal rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-art-green transition-colors placeholder:text-art-charcoal/30"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-art-charcoal/60 mb-1 font-mono">
                  Category
                </label>
                <select
                  value={newItemCategory}
                  onChange={e => setNewItemCategory(e.target.value as PackingItem['category'])}
                  className="w-full bg-white border border-art-charcoal/12 text-art-charcoal rounded-xl px-2 py-1.5 text-xs focus:outline-none focus:border-art-green cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  className="w-full bg-art-green hover:bg-art-green/90 text-white text-xs font-semibold py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer font-serif italic"
                >
                  Create To-Do Task
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Item List Container */}
      <div className="flex-1 overflow-y-auto pr-1 mt-4 space-y-2 scrollbar-thin scrollbar-thumb-art-charcoal/5 scrollbar-track-transparent">
        {filteredItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-art-charcoal/50">
            <ClipboardList className="w-10 h-10 mb-2 opacity-15" />
            <p className="text-xs font-semibold">No to-do tasks found in this section.</p>
            <p className="text-[10px] mt-1 text-art-charcoal/60">Great! Add a custom to-do item to organize beach parking, charger adapters, or child swimwear.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredItems.map(item => {
              const theme = getCategoryTheme(item.category);
              const isEditing = editingId === item.id;

              if (isEditing) {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-art-beige/80 border border-art-green/35 p-3 rounded-2xl flex flex-col gap-2 transition-all shadow-xs"
                  >
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => handleKeyDown(e, item.id)}
                        className="flex-1 bg-white border border-art-charcoal/15 text-art-charcoal rounded-xl px-2.5 py-1 text-xs focus:outline-none focus:border-art-green transition-colors"
                        placeholder="To-Do task name..."
                        autoFocus
                      />
                      <select
                        value={editCategory}
                        onChange={e => setEditCategory(e.target.value as PackingItem['category'])}
                        className="min-w-[100px] bg-white border border-art-charcoal/15 text-art-charcoal rounded-xl px-1.5 py-1 text-[11px] focus:outline-none focus:border-art-green cursor-pointer"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white border border-art-charcoal/15 text-[#2C2A26]/70 hover:text-art-charcoal cursor-pointer active:scale-95 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item.id)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-art-green text-white hover:bg-art-green/90 cursor-pointer active:scale-95 transition-all font-serif italic"
                      >
                        Save
                      </button>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all ${
                    item.checked
                      ? 'bg-art-beige/45 border-art-charcoal/5 opacity-60'
                      : 'bg-white border-art-charcoal/10 hover:border-art-charcoal/25'
                  }`}
                >
                  <div
                    onClick={() => onToggleItem(item.id)}
                    className="flex-1 flex gap-3 cursor-pointer select-none items-start"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {item.checked ? (
                        <div className="w-4 h-4 rounded bg-art-green flex items-center justify-center text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded border border-art-charcoal/30 hover:border-art-green transition-colors" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs leading-relaxed font-medium text-left ${item.checked ? 'line-through text-art-charcoal/40' : 'text-art-charcoal'}`}>
                        {item.text}
                      </p>
                      <span className={`inline-block mt-1 text-[8.5px] font-mono border rounded px-1.5 py-0.2 ${theme.badge}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(item);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-art-charcoal/45 hover:text-art-green hover:bg-art-beige rounded-xl transition-all cursor-pointer"
                      title="Edit task text or category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-art-charcoal/45 hover:text-rose-500 hover:bg-art-beige rounded-xl transition-all cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Checklist Footer stats */}
      <div className="mt-3 pt-3 border-t border-art-charcoal/10 flex items-center justify-between text-[10px] font-mono text-art-charcoal/50">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 text-art-amber" /> Auto-saved to memory
        </span>
        <span className="bg-art-beige px-2 py-0.5 rounded-full border border-art-charcoal/10">
          All Set: {grandChecked === grandTotal ? '✨ All Tasks Done' : `${grandTotal - grandChecked} left`}
        </span>
      </div>
    </div>
  );
}
