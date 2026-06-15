import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Compass,
  BatteryCharging,
  Flame,
  Home,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MapPin,
  Smile,
  Navigation,
  Sparkles,
  ClipboardList,
  Coffee,
  Trees,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Heart
} from 'lucide-react';

import { ItineraryDay, ItineraryItem, PackingItem, QuickNote } from './types';
import { INITIAL_ITINERARY, INITIAL_PACKING_LIST, INITIAL_NOTES } from './data';
import TripMap from './components/TripMap';
import TodoChecklist from './components/TodoChecklist';
import QuickNotes from './components/QuickNotes';

export default function App() {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(() => {
    const saved = localStorage.getItem('family_trip_itinerary');
    return saved ? JSON.parse(saved) : INITIAL_ITINERARY;
  });

  const [todoList, setTodoList] = useState<PackingItem[]>(() => {
    const saved = localStorage.getItem('family_trip_todos') || localStorage.getItem('family_trip_packing');
    return saved ? JSON.parse(saved) : INITIAL_PACKING_LIST;
  });

  const [notes, setNotes] = useState<QuickNote[]>(() => {
    const saved = localStorage.getItem('family_trip_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'charge' | 'dog' | 'kids' | 'nature'>('all');
  const [leftTab, setLeftTab] = useState<'todo' | 'notes'>('todo');

  // Track completed stops (checked-off itinerary stop IDs)
  const [completedStops, setCompletedStops] = useState<string[]>(() => {
    const saved = localStorage.getItem('family_trip_completed_stops');
    return saved ? JSON.parse(saved) : [];
  });

  // Track item-specific notes custom inputs
  const [itemCustomNotes, setItemCustomNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('family_trip_item_custom_notes');
    return saved ? JSON.parse(saved) : {};
  });

  // Persist States
  useEffect(() => {
    localStorage.setItem('family_trip_itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem('family_trip_todos', JSON.stringify(todoList));
    localStorage.setItem('family_trip_packing', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('family_trip_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('family_trip_completed_stops', JSON.stringify(completedStops));
  }, [completedStops]);

  useEffect(() => {
    localStorage.setItem('family_trip_item_custom_notes', JSON.stringify(itemCustomNotes));
  }, [itemCustomNotes]);

  // Auto-migration for existing localStorage user sessions to display new lodging to-dos and placeholders
  useEffect(() => {
    let hasChanged = false;
    let updatedNotes = [...notes];
    let updatedPacking = [...todoList];

    const oldAirbnbNoteText = "Airbnb reservation: Confirmation code HMSTAY12UP - Keypad code 8008. Dog friendly deposit for Fitzy completed.";
    const oldHotelNoteText = "Green Bay Hotel reservation: Confirmation 65543DOG - check in 3:00 PM. Indoor pool has an amazing water slide for Reva & Kabir!";

    // replace old Airbnb note
    const airbnbIdx = updatedNotes.findIndex(n => n.text === oldAirbnbNoteText);
    if (airbnbIdx !== -1) {
      updatedNotes[airbnbIdx] = {
        ...updatedNotes[airbnbIdx],
        text: "🏡 Au Train Lake Cabin (Days 2-7): [NOT BOOKED YET] - Edit this note to add your Airbnb/cabin confirmation code, keypad, and address when booked."
      };
      hasChanged = true;
    }

    // replace old Hotel note
    const hotelIdx = updatedNotes.findIndex(n => n.text === oldHotelNoteText);
    if (hotelIdx !== -1) {
      updatedNotes[hotelIdx] = {
        ...updatedNotes[hotelIdx],
        text: "🏨 Green Bay Hotel (Day 1): [NOT BOOKED YET] - Edit this note to add your hotel confirmation code, check-in, and address when booked."
      };
      hasChanged = true;
    }

    // add Day 8 hotel placeholder note if not exists
    if (!updatedNotes.some(n => n.text.includes("Gaylord / Grand Rapids Hotel (Day 8)"))) {
      updatedNotes.push({
        id: "n1.5-migrated",
        text: "🏨 Gaylord / Grand Rapids Hotel (Day 8): [NOT BOOKED YET] - Edit this note to add your hotel confirmation, check-in, and address when booked.",
        timestamp: "2026-06-14T15:50:00-07:00",
        category: "Lodging"
      });
      hasChanged = true;
    }

    // Migrate packing items
    const lodgingToDos: PackingItem[] = [
      { id: "p-lodging-1", text: "🏨 Book dog-friendly hotel in Green Bay, WI (Day 1 check-in)", category: "General", checked: false },
      { id: "p-lodging-2", text: "🏡 Book dog-friendly Au Train Airbnb/lake cabin (Days 2-7 check-in)", category: "General", checked: false },
      { id: "p-lodging-3", text: "🏨 Book dog-friendly hotel/lodge near Gaylord/Traverse City (Day 8 check-in)", category: "General", checked: false }
    ];

    lodgingToDos.forEach(todo => {
      // check if a todo with matching text or ID already exists in the packing list
      const existsId = updatedPacking.some(p => p.id === todo.id);
      const existsText = updatedPacking.some(p => p.text.toLowerCase().includes("book dog-friendly hotel") || p.text.toLowerCase().includes("book dog-friendly au train"));
      
      if (!existsId && !existsText) {
        updatedPacking.splice(4, 0, todo);
        hasChanged = true;
      }
    });

    if (hasChanged) {
      setNotes(updatedNotes);
      setTodoList(updatedPacking);
    }
  }, []);

  // Current active day data
  const currentDay = itinerary.find(d => d.dayNumber === activeDayNumber) || itinerary[0];

  // Global Quick Trip Stats
  const totalTeslaSCStops = itinerary.reduce((acc, d) => acc + (d.items.filter(i => i.isTeslaSupercharge).length), 0);
  const totalDogFriendlyPoints = itinerary.reduce((acc, d) => acc + (d.items.filter(i => i.isDogFriendly).length), 0);
  const totalKidFriendlyPoints = itinerary.reduce((acc, d) => acc + (d.items.filter(i => i.isKidFriendly).length), 0);
  const completedStopsCount = completedStops.length;
  const totalStopsCount = itinerary.reduce((acc, d) => acc + d.items.length, 0);
  const totalCompletionPercent = Math.round((completedStopsCount / totalStopsCount) * 100);

  // Handlers for Todo list
  const handleToggleTodoItem = (id: string) => {
    setTodoList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleAddTodoItem = (text: string, category: PackingItem['category']) => {
    const newItem: PackingItem = {
      id: `p-custom-${Date.now()}`,
      text,
      category,
      checked: false
    };
    setTodoList(prev => [...prev, newItem]);
  };

  const handleDeleteTodoItem = (id: string) => {
    setTodoList(prev => prev.filter(item => item.id !== id));
  };

  const handleEditTodoItem = (id: string, text: string, category: PackingItem['category']) => {
    setTodoList(prev => prev.map(item => item.id === id ? { ...item, text, category } : item));
  };

  // Handlers for Notes
  const handleAddQuickNote = (text: string, category: string) => {
    const newNote: QuickNote = {
      id: `note-${Date.now()}`,
      text,
      category,
      timestamp: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteQuickNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Toggle stop complete status
  const handleToggleStopCompleted = (itemId: string) => {
    setCompletedStops(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Update item-specific custom text
  const handleSaveItemNote = (itemId: string, text: string) => {
    setItemCustomNotes(prev => ({
      ...prev,
      [itemId]: text
    }));
  };

  // Reset all to defaults (with confirm safety window)
  const handleResetAllData = () => {
    if (window.confirm("Are you sure you want to reset the trip planner? This will revert to-do tasks, custom notes and itinerary milestones to their pristine default settings.")) {
      localStorage.removeItem('family_trip_itinerary');
      localStorage.removeItem('family_trip_todos');
      localStorage.removeItem('family_trip_packing');
      localStorage.removeItem('family_trip_notes');
      localStorage.removeItem('family_trip_completed_stops');
      localStorage.removeItem('family_trip_item_custom_notes');
      setItinerary(INITIAL_ITINERARY);
      setTodoList(INITIAL_PACKING_LIST);
      setNotes(INITIAL_NOTES);
      setCompletedStops([]);
      setItemCustomNotes({});
      setActiveDayNumber(1);
    }
  };

  // Icon mapping helper
  const getEventIcon = (category: ItineraryItem['category']) => {
    switch (category) {
      case 'travel':
        return <Navigation className="w-4 h-4 text-sky-400" />;
      case 'charge':
        return <BatteryCharging className="w-4 h-4 text-emerald-400" />;
      case 'activity':
        return <Compass className="w-4 h-4 text-amber-400" />;
      case 'food':
        return <Coffee className="w-4 h-4 text-orange-400" />;
      case 'lodging':
        return <Home className="w-4 h-4 text-violet-400" />;
      case 'beach':
        return <Trees className="w-4 h-4 text-teal-400" />;
      default:
        return <Smile className="w-4 h-4 text-slate-400" />;
    }
  };

  const getCategoryColor = (category: ItineraryItem['category']) => {
    switch (category) {
      case 'travel': return 'bg-blue-50 text-blue-800 border-blue-200/50';
      case 'charge': return 'bg-[#EDF4EF] text-[#2F6146] border-[#2F6146]/20';
      case 'activity': return 'bg-amber-50 text-amber-800 border-amber-200/50';
      case 'food': return 'bg-orange-50 text-orange-850 border-orange-200/50';
      case 'lodging': return 'bg-purple-50 text-purple-800 border-purple-200/50';
      case 'beach': return 'bg-indigo-50 text-indigo-800 border-indigo-200/50';
    }
  };

  return (
    <div className="min-h-screen bg-art-beige text-art-charcoal font-sans selection:bg-art-green/20 selection:text-art-charcoal pb-16">
      {/* Decorative fine-line border for artistic paper look */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="border border-art-charcoal/10 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xs shadow-xs">
          
          {/* Main Header Space */}
          <header className="border-b border-art-charcoal/10 bg-white/80 backdrop-blur-md sticky top-0 z-40">
            <div className="px-6 py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4A5D4E] flex items-center justify-center shadow-xs">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#4A5D4E]">Neil & Archana • Aug 1 – Aug 9</span>
                    <span className="w-1 h-1 rounded-full bg-art-charcoal/30" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-art-charcoal/60 font-mono">Fitzy (Dog), Reva & Kabir Approved</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif italic font-medium text-art-charcoal tracking-tight">
                    Michigan & UP road trip
                  </h1>
                </div>
              </div>

              {/* Interactive Stat Metrics Pill Grid */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="bg-[#EDF4EF] border border-[#2F6146]/10 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-[#2F6146]">
                  <span className="font-mono">⚡ {totalTeslaSCStops}</span>
                  <span>Tesla Stops</span>
                </div>
                <div className="bg-indigo-50 border border-indigo-200/40 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-indigo-800">
                  <span className="font-mono">🐾 {totalDogFriendlyPoints}</span>
                  <span>Fitzy Friendly</span>
                </div>
                <div className="bg-amber-50 border border-amber-200/40 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-amber-800">
                  <span className="font-mono">🧒 {totalKidFriendlyPoints}</span>
                  <span>Reva & Kabir Spots</span>
                </div>
                <button
                  onClick={handleResetAllData}
                  className="p-1.5 rounded-xl bg-white border border-art-charcoal/15 hover:border-art-charcoal/30 active:scale-95 text-art-charcoal/60 hover:text-art-charcoal transition-all cursor-pointer"
                  title="Reset Trip Progress to Defaults"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Structural Layout Grid */}
          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT WING - MAP & COLLABORATIVE CHECKS (SPAN 5) */}
              <section className="lg:col-span-5 space-y-8">
                {/* Interactive geographic route map */}
                <TripMap activeDay={activeDayNumber} onSelectDay={setActiveDayNumber} />

                {/* Widgets Toggling Bar */}
                <div className="bg-[#F1EEE5] border border-art-charcoal/10 p-1.5 rounded-2xl flex gap-1 shadow-xs">
                  <button
                    onClick={() => setLeftTab('todo')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      leftTab === 'todo'
                        ? 'bg-[#4A5D4E] text-white font-serif italic shadow-xs'
                        : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/40'
                    }`}
                  >
                    <ClipboardList className="w-4 h-4" />
                    <span>Trip To-Dos</span>
                  </button>
                  <button
                    onClick={() => setLeftTab('notes')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      leftTab === 'notes'
                        ? 'bg-[#4A5D4E] text-white font-serif italic shadow-xs'
                        : 'text-art-charcoal/65 hover:text-art-charcoal hover:bg-white/40'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Scratchpad Codes</span>
                  </button>
                </div>

                {/* Left Column Dynamic Widgets */}
                <div>
                  <AnimatePresence mode="wait">
                    {leftTab === 'todo' ? (
                      <motion.div
                        key="tab-todos"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <TodoChecklist
                          items={todoList}
                          onToggleItem={handleToggleTodoItem}
                          onAddItem={handleAddTodoItem}
                          onDeleteItem={handleDeleteTodoItem}
                          onEditItem={handleEditTodoItem}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tab-notes"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <QuickNotes
                          notes={notes}
                          onAddNote={handleAddQuickNote}
                          onDeleteNote={handleDeleteQuickNote}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* RIGHT WING - MASTER DAY SCHEDULE & TIMELINE (SPAN 7) */}
              <section className="lg:col-span-7 bg-white border border-art-charcoal/10 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                
                {/* Day horizontal step selector */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26]/50 font-mono">Select active driving day:</h3>
                  <div className="grid grid-cols-9 gap-1.5 pb-2">
                    {itinerary.map(day => {
                      const isActive = day.dayNumber === activeDayNumber;
                      const dayStops = day.items.map(i => i.id);
                      const activeDayCompletedCount = dayStops.filter(id => completedStops.includes(id)).length;
                      const isDayFullyChecked = activeDayCompletedCount === day.items.length;

                      return (
                        <button
                          key={`pill-${day.dayNumber}`}
                          onClick={() => setActiveDayNumber(day.dayNumber)}
                          className={`relative flex flex-col items-center justify-center py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isActive
                              ? 'bg-art-charcoal text-art-beige border-art-charcoal font-bold scale-[1.04] shadow-xs z-10'
                              : 'bg-white text-art-charcoal/60 border-art-charcoal/15 hover:bg-art-beige hover:border-art-charcoal/30'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono tracking-tight font-black">D{day.dayNumber}</span>
                          <span className="text-[8px] opacity-70 font-mono">{day.date.split(',')[1].trim().split(' ')[0]} {day.date.split(',')[1].trim().split(' ')[1]}</span>

                          {/* Small tick index overlay */}
                          {isDayFullyChecked && (
                            <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black ${isActive ? 'bg-white text-art-green' : 'bg-art-green text-white'}`}>
                              ✓
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Day Meta Card */}
                <div className="bg-art-beige border border-art-charcoal/10 rounded-2xl p-5 relative overflow-hidden">
                  {/* Highlight ribbon accent */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#4A5D4E]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-bold font-mono tracking-wider text-[#4A5D4E] uppercase bg-white border border-art-charcoal/10 px-2.5 py-0.5 rounded-full">
                        Active Day {currentDay.dayNumber}
                      </span>
                      <h2 className="text-xl font-serif italic text-art-charcoal mt-2 tracking-tight">
                        {currentDay.title}
                      </h2>
                      <p className="text-xs text-art-charcoal/60 font-medium mt-0.5">{currentDay.subtitle} ({currentDay.date})</p>
                    </div>

                    {/* Day level stats box */}
                    <div className="text-right sm:border-l sm:border-art-charcoal/10 sm:pl-4">
                      {currentDay.stats.drivingTime && (
                        <div className="text-[11px] text-art-charcoal/70 font-mono flex items-center sm:justify-end gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-art-charcoal/50" />
                          <span>{currentDay.stats.drivingTime}</span>
                        </div>
                      )}
                      <div className="text-[10px] text-art-charcoal/50 font-mono mt-1">
                        {currentDay.items.length} schedule marks 
                      </div>
                    </div>
                  </div>

                  {/* Day Level highlights bullet summary */}
                  <div className="bg-white border border-art-charcoal/10 px-4 py-3 rounded-xl mt-3 text-xs leading-relaxed text-[#2C2A26] flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-art-amber mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-serif italic font-bold text-art-charcoal">Highlight of Day:</span> {currentDay.highlight}
                    </div>
                  </div>
                </div>

                {/* Schedule Segment List (Timeline) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2C2A26]/50 uppercase tracking-widest font-mono">
                    <span>Expedition Hour Timeline</span>
                    <span className="text-art-amber bg-art-beige border border-art-charcoal/10 px-2.5 py-0.5 rounded-full">
                      Day Progress: {currentDay.items.filter(i => completedStops.includes(i.id)).length} / {currentDay.items.length} done
                    </span>
                  </div>

                  <div className="relative border-l border-art-charcoal/15 ml-4 pl-6 space-y-6">
                    
                    {currentDay.items.map((event, idx) => {
                      const isDone = completedStops.includes(event.id);
                      const isTesla = event.isTeslaSupercharge;
                      const isDog = event.isDogFriendly;
                      const isKid = event.isKidFriendly;
                      
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className={`relative bg-art-beige/40 border rounded-2xl p-4 transition-all hover:bg-white hover:border-art-charcoal/30 ${
                            isDone 
                              ? 'border-art-charcoal/5 opacity-55 saturate-50 bg-[#FDFDFB]' 
                              : 'border-art-charcoal/10 shadow-xs bg-white'
                          }`}
                        >
                          {/* Timeline dot anchor index */}
                          <div className={`absolute -left-[31px] top-4.5 w-[11px] h-[11px] rounded-full border-2 transition-transform duration-300 ${
                            isDone 
                              ? 'bg-white border-[#4A5D4E] scale-95' 
                              : 'bg-white border-art-charcoal scale-100 group-hover:scale-110'
                          }`} />

                          {/* Header row: Time, Stop Label, and Complete Tick */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-black font-mono bg-[#F1EEE5] border border-art-charcoal/10 p-1 rounded text-art-charcoal">
                                  {event.time}
                                </span>
                                
                                {event.duration && (
                                  <span className="text-[9px] font-mono text-art-charcoal/70 bg-[#F1EEE5]/70 border border-art-charcoal/10 px-1.5 py-0.5 rounded">
                                    {event.duration}
                                  </span>
                                )}

                                <span className={`text-[8.5px] uppercase font-bold tracking-wider px-2 py-0.5 border rounded-full ${getCategoryColor(event.category)}`}>
                                  {event.category}
                                </span>
                              </div>

                              <h4 className={`text-sm font-bold tracking-tight ${isDone ? 'line-through text-art-charcoal/40 font-normal' : 'text-art-charcoal font-semibold'}`}>
                                {event.label}
                              </h4>
                            </div>

                            {/* Event Check Mark Trigger */}
                            <button
                              onClick={() => handleToggleStopCompleted(event.id)}
                              className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                                isDone 
                                  ? 'bg-art-green border-art-green text-white' 
                                  : 'border-art-charcoal/20 hover:border-art-green hover:bg-[#EDF4EF] text-transparent hover:text-art-green'
                              }`}
                            >
                              <span className="text-xs font-black">✓</span>
                            </button>
                          </div>

                          {/* Details row Text */}
                          <p className={`text-xs leading-relaxed mt-2.5 font-medium ${isDone ? 'text-art-charcoal/40' : 'text-art-charcoal/80'}`}>
                            {event.details}
                          </p>

                          {/* Meta Tags list row (Dog, Kids, Tesla) */}
                          {(isTesla || isDog || isKid || event.location) && (
                            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-art-charcoal/5">
                              {event.location && (
                                <span className="text-[9px] font-mono text-indigo-800 bg-indigo-50 border border-indigo-200/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <MapPin className="w-3" /> {event.location}
                                </span>
                              )}

                              {isTesla && (
                                <span className="text-[9px] font-mono text-[#2F6146] bg-[#EDF4EF] border border-[#2F6146]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <BatteryCharging className="w-3" /> Tesla Supercharger
                                </span>
                              )}

                              {isDog && (
                                <span className="text-[9px] font-mono text-purple-800 bg-purple-50 border border-purple-200/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  🐾 Fitzy Welcomed
                                </span>
                              )}

                              {isKid && (
                                <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-[#b2a182]/50 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                                  🧒 Reva & Kabir Approved
                                </span>
                              )}
                            </div>
                          )}

                          {/* Collaborative text segment memo note directly attached to this item */}
                          <div className="mt-3.5">
                            {itemCustomNotes[event.id] !== undefined ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={itemCustomNotes[event.id]}
                                  onChange={e => handleSaveItemNote(event.id, e.target.value)}
                                  placeholder="Write custom note for Archana..."
                                  className="w-full bg-art-beige border border-art-charcoal/10 hover:border-art-charcoal/25 text-art-charcoal rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-art-green transition-colors placeholder:text-art-charcoal/30 font-sans"
                                />
                                {itemCustomNotes[event.id] && (
                                  <button
                                    onClick={() => handleSaveItemNote(event.id, '')}
                                    className="text-[10px] text-art-charcoal/60 hover:text-art-charcoal bg-white border border-art-charcoal/10 px-2 py-1.5 rounded-xl cursor-pointer"
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSaveItemNote(event.id, '')}
                                className="inline-flex items-center gap-1 text-[10px] text-art-charcoal/50 hover:text-art-green font-bold uppercase tracking-wider font-mono cursor-pointer"
                              >
                                ➕ Add custom collaboration note for Archana
                              </button>
                            )}
                          </div>

                        </motion.div>
                      );
                    })}

                  </div>
                </div>

                {/* Dynamic visual celebratory box if all items checked for active day */}
                {currentDay.items.filter(i => completedStops.includes(i.id)).length === currentDay.items.length && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#EDF4EF] border border-[#2F6146]/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2"
                  >
                    <Heart className="w-8 h-8 text-[#2F6146] fill-[#2F6146]/10 animate-pulse" />
                    <h4 className="text-sm font-bold font-serif italic text-[#2F6146]">Day {currentDay.dayNumber} Expedition Milestones Met!</h4>
                    <p className="text-[11px] text-[#2C2A26]/80 max-w-sm">
                      Amazing! You checked off every single milestone on today's road trip journey. Settle back, relax, and make some lifetime family memories with Reva, Kabir, and Fitzy!
                    </p>
                  </motion.div>
                )}

              </section>

            </div>
          </main>
          
        </div>
      </div>

      {/* Persistent custom footer */}
      <footer className="mt-16 pt-8 border-t border-art-charcoal/10 text-center text-art-charcoal/50 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2 pb-8">
          <p className="font-serif italic text-art-charcoal/70 flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-650 fill-rose-650/10" /> for the Great Lakes Road Trip Adventure
          </p>
          <p className="text-[10px] text-art-charcoal/40 font-mono uppercase tracking-widest">
            All trip metrics and checklist edits autosaved securely to your local device slots.
          </p>
        </div>
      </footer>
    </div>
  );
}
