import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Waves, Compass, Sparkles, Eye, Moon, ThumbsUp, AlertTriangle, Check } from 'lucide-react';
import { TripVariant } from '../types';

interface TripVariantPickerProps {
  variants: TripVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

// A little 1-5 dot meter (Chill / Adventure / Driving).
function Meter({ label, level, color }: { label: string; level: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono uppercase tracking-wider text-art-charcoal/60 w-20 shrink-0">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <span
            key={n}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${n <= level ? color : 'bg-art-charcoal/10'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TripVariantPicker({ variants, selectedId, onSelect }: TripVariantPickerProps) {
  const selected = variants.find(v => v.id === selectedId) ?? variants[0];

  return (
    <div className="bg-gradient-to-br from-[#EDF4EF] to-art-beige border border-art-charcoal/10 rounded-3xl p-5 sm:p-6 shadow-xs mb-8">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-[#4A5D4E] flex items-center justify-center shrink-0 shadow-xs text-lg">
          🗺️
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-serif italic font-medium text-art-charcoal tracking-tight">Choose Our Adventure</h2>
          <p className="text-xs text-art-charcoal/60 font-medium mt-0.5">
            Tap a trip style and the whole plan below updates — map, days, and all. Vote as a family! 🧒🧒🐾
          </p>
        </div>
      </div>

      {/* Toggle cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {variants.map(v => {
          const isActive = v.id === selectedId;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={`relative text-left rounded-2xl border p-3.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-art-charcoal text-art-beige border-art-charcoal scale-[1.02] shadow-sm z-10'
                  : 'bg-white/80 text-art-charcoal border-art-charcoal/15 hover:border-art-charcoal/35 hover:bg-white'
              }`}
            >
              {isActive && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-art-amber text-art-charcoal flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              )}
              <div className="text-2xl mb-1.5">{v.emoji}</div>
              <div className={`text-sm font-bold tracking-tight ${isActive ? 'font-serif italic' : ''}`}>{v.name}</div>
              <div className={`text-[10.5px] leading-snug mt-1 ${isActive ? 'text-art-beige/75' : 'text-art-charcoal/55'}`}>
                {v.tagline}
              </div>
              {/* mini chill hint */}
              <div className="flex items-center gap-1 mt-2.5">
                <span className={`text-[8px] font-mono uppercase tracking-wider ${isActive ? 'text-art-beige/60' : 'text-art-charcoal/45'}`}>chill</span>
                {[1, 2, 3, 4, 5].map(n => (
                  <span key={n} className={`w-1.5 h-1.5 rounded-full ${n <= v.chillLevel ? 'bg-emerald-400' : isActive ? 'bg-white/20' : 'bg-art-charcoal/10'}`} />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel for the selected variant */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="mt-4 bg-white border border-art-charcoal/10 rounded-2xl p-5"
        >
          {/* Title row + meters */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-serif italic text-art-charcoal flex items-center gap-2">
                <span className="text-xl">{selected.emoji}</span> {selected.name}
              </h3>
              {/* For the kids */}
              <div className="mt-2 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-art-amber" />
                <span><span className="font-bold">For Reva & Kabir:</span> {selected.forKids}</span>
              </div>
            </div>
            <div className="space-y-1.5 sm:pl-4 sm:border-l sm:border-art-charcoal/10 shrink-0">
              <Meter label="Chill" level={selected.chillLevel} color="bg-emerald-400" />
              <Meter label="Adventure" level={selected.adventureLevel} color="bg-art-amber" />
              <Meter label="Driving" level={selected.drivingLevel} color="bg-rose-400" />
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            <Fact icon={<Car className="w-4 h-4 text-rose-500" />} label="Driving" value={selected.driveHours} />
            <Fact icon={<Waves className="w-4 h-4 text-sky-500" />} label="Lake days" value={`${selected.lakeDays}`} />
            <Fact icon={<Sparkles className="w-4 h-4 text-art-amber" />} label="Big adventures" value={`${selected.bigAdventures}`} />
            <Fact icon={<Compass className="w-4 h-4 text-art-green" />} label="Route home" value={selected.routeHome} />
          </div>

          {/* See / Skip chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-art-green mb-1.5">
                <Eye className="w-3.5 h-3.5" /> You'll see
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.sees.map(s => (
                  <span key={s} className="text-[11px] bg-[#EDF4EF] text-[#2F6146] border border-[#2F6146]/15 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-art-charcoal/50 mb-1.5">
                <Moon className="w-3.5 h-3.5" /> You'll skip
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.skips.length === 0 ? (
                  <span className="text-[11px] text-art-charcoal/40 italic">Nothing — it's the full bucket list</span>
                ) : (
                  selected.skips.map(s => (
                    <span key={s} className="text-[11px] bg-art-beige text-art-charcoal/60 border border-art-charcoal/10 px-2 py-0.5 rounded-full line-through decoration-art-charcoal/30">{s}</span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Pros / Trade-offs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-art-charcoal/10">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-600 mb-2">
                <ThumbsUp className="w-3.5 h-3.5" /> Why we'd love it
              </div>
              <ul className="space-y-1.5">
                {selected.pros.map(p => (
                  <li key={p} className="text-xs text-art-charcoal/80 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-rose-500 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Trade-offs
              </div>
              <ul className="space-y-1.5">
                {selected.cons.map(c => (
                  <li key={c} className="text-xs text-art-charcoal/80 flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">!</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-art-beige/60 border border-art-charcoal/10 rounded-xl px-3 py-2">
      <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-art-charcoal/50 mb-0.5">
        {icon} {label}
      </div>
      <div className="text-[11px] font-semibold text-art-charcoal leading-tight">{value}</div>
    </div>
  );
}
