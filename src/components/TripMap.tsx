import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, BatteryCharging, Home, Compass, Eye, Map as MapIcon, Calendar } from 'lucide-react';
import { RouteStop } from '../types';

interface TripMapProps {
  activeDay: number;
  onSelectDay: (day: number) => void;
  route: RouteStop[];
}

export default function TripMap({ activeDay, onSelectDay, route }: TripMapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<RouteStop | null>(null);

  // Group coordinates to draw the path
  const pathData = route.map(p => `${p.x},${p.y}`).join(' ');

  // Get active point coordinates to draw a special active marker
  const activeDayCoordinates = route.filter(p => p.day === activeDay);

  const getMarkerColor = (point: RouteStop) => {
    if (point.day === activeDay) return 'stroke-amber-500 fill-amber-500 shadow-lg';
    if (point.type === 'supercharge') return 'stroke-emerald-500 fill-emerald-500';
    if (point.type === 'airbnb') return 'stroke-blue-500 fill-blue-500';
    if (point.type === 'origin') return 'stroke-indigo-500 fill-indigo-500';
    return 'stroke-sky-500 fill-sky-500';
  };

  const getReactIcon = (type: string) => {
    switch (type) {
      case 'supercharge':
        return <BatteryCharging className="w-4 h-4 text-emerald-500" />;
      case 'airbnb':
        return <Home className="w-4 h-4 text-blue-500" />;
      case 'origin':
        return <MapPin className="w-4 h-4 text-indigo-500" />;
      default:
        return <Compass className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="relative bg-white border border-art-charcoal/10 text-art-charcoal rounded-3xl p-6 shadow-sm overflow-hidden h-[420px] sm:h-[480px]">
      {/* Compass grid background & water effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#4d4c4a_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Decorative Compass Rose */}
      <div className="absolute bottom-6 right-6 opacity-15 pointer-events-none flex flex-col items-center">
        <Compass className="w-16 h-16 text-art-green animate-[spin_120s_linear_infinite]" />
        <span className="text-[10px] uppercase tracking-widest text-[#2C2A26] mt-1 font-mono">True North</span>
      </div>

      {/* Map Header */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-art-charcoal/10 shadow-sm">
        <MapIcon className="w-5 h-5 text-art-amber" />
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-art-charcoal">Interactive Expedition Route</h2>
          <p className="text-[10px] text-art-charcoal/60 font-mono">Chicago ⇄ Upper Peninsula (Lake Michigan Loop)</p>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 z-10 hidden sm:flex flex-wrap gap-x-4 gap-y-1.5 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-art-charcoal/10 text-[10px] font-mono shadow-sm text-art-charcoal/80">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
          <span>Chicago Base</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4A5D4E] block"></span>
          <span>Superchargers (Tesla)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
          <span>Cottage Airbnb</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
          <span>Adventure Activity</span>
        </div>
      </div>

      {/* The Master SVG Map View */}
      <div className="w-full h-full flex items-center justify-center pt-8">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-lg aspect-square select-none pointer-events-auto"
        >
          {/* DEFINITIONS for gradient lines, glow filters */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="active-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="35%" stopColor="#0ea5e9" />
              <stop offset="70%" stopColor="#4A5D4E" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* BACKGROUND LAND & LAKES SCHEMATIC OUTLINES */}
          {/* Lake Michigan Abstract Blue Silhouette */}
          <path
            d="M 44,52 C 45,55 49,65 48,78 C 47,82 46,88 47,91 C 48,92 51,92 52,90 C 51,84 57,75 58,68 C 59,62 61,54 58,45 C 57,43 51,46 48,47 Z"
            fill="#E0ECEE"
            stroke="#A3C6CD"
            strokeWidth="0.5"
            opacity="0.85"
          />

          {/* Lake Superior Abstract Silhouette at Top */}
          <path
            d="M 28,10 C 35,11 44,14 55,14 C 65,14 74,12 80,11 C 77,15 74,18 69,20 C 60,20 54,18 42,18 C 32,18 30,14 28,10 Z"
            fill="#E0ECEE"
            stroke="#A3C6CD"
            strokeWidth="0.5"
            opacity="0.85"
          />

          {/* State Boundary Reference Dotty Line (Wisconsin / Upper Peninsula / Lower Peninsula) */}
          {/* WI - IL line */}
          <line x1="15" y1="84" x2="45" y2="84" stroke="#A7A294" strokeDasharray="1 1" strokeWidth="0.3" />
          {/* UP - WI land line */}
          <path d="M 25,32 L 30,36 L 40,36" stroke="#A7A294" strokeDasharray="1 1" strokeWidth="0.3" fill="none" />
          {/* Mackinac Bridge Span link */}
          <line x1="80" y1="28" x2="80" y2="32" stroke="#D97706" strokeWidth="0.8" strokeDasharray="1 0.5" filter="url(#glow)" />
          {/* Label for Mackinac Bridge */}
          <text x="83" y="31.5" fill="#2C2A26" opacity="0.75" fontSize="1.8" fontFamily="monospace" textAnchor="start">Mackinac Bridge</text>

          {/* GLOWING TRAIL LINE (Whole route shape) */}
          <path
            d={`M ${pathData}`}
            fill="none"
            stroke="#EAE6DB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M ${pathData}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="animate-[dash_60s_linear_infinite]"
          />

          {/* Pulsating glow beneath coordinates belonging to the ACTIVE DAY */}
          {activeDayCoordinates.map((actPt, pathIdx) => (
            <circle
              key={`active-pulse-${actPt.name}-${pathIdx}`}
              cx={actPt.x}
              cy={actPt.y}
              r="2.8"
              fill="none"
              stroke="#D97706"
              strokeWidth="0.4"
              className="animate-ping"
              opacity="0.75"
            />
          ))}

          {/* INTERACTIVE COORDINATES (PIN POINTS) */}
          {route.map((point, index) => {
            const isActive = point.day === activeDay;
            const isHovered = hoveredPoint?.name === point.name;
            const rVal = isActive ? 2.2 : isHovered ? 2.0 : 1.4;

            return (
              <g
                key={`point-${point.name}-${index}`}
                className="cursor-pointer"
                onClick={() => onSelectDay(point.day)}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Hit target for easier clicking */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="transparent"
                />

                {/* Outer colored border */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={rVal}
                  className={`transition-all duration-300 ${point.day === activeDay ? 'stroke-[#D97706] fill-[#D97706]' : point.type === 'supercharge' ? 'stroke-[#4A5D4E] fill-[#4A5D4E]' : point.type === 'airbnb' ? 'stroke-blue-600 fill-blue-600' : 'stroke-indigo-600 fill-indigo-600'}`}
                  strokeWidth={isActive ? 0.8 : 0.4}
                />

                {/* Inner white core */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={rVal * 0.4}
                  fill="#ffffff"
                  className="transition-all duration-300"
                />

                {/* Very tiny subtle labels for key points */}
                {(point.type === 'origin' || point.type === 'airbnb' || isActive || isHovered) && (
                  <text
                    x={point.x}
                    y={point.y - 3.5}
                    textAnchor="middle"
                    fill={isActive ? "#D97706" : "#2C2A26"}
                    fontSize={isActive ? "2.2" : "1.8"}
                    fontWeight={isActive ? "bold" : "normal"}
                    fontFamily="sans-serif"
                    className="drop-shadow-sm pointer-events-none"
                  >
                    {point.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* FLYOUT OVERLAY CARD ON HOVER */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-20 right-6 left-6 sm:left-auto sm:w-72 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-art-charcoal/15 text-art-charcoal shadow-lg z-20 flex gap-3 cursor-pointer"
            onClick={() => onSelectDay(hoveredPoint.day)}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-art-beige border border-art-charcoal/10 flex items-center justify-center">
              {getReactIcon(hoveredPoint.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[10px] text-art-amber font-bold uppercase tracking-wider flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" /> Day {hoveredPoint.day}
                </span>
                <span className="text-[9px] text-[#2C2A26]/70 capitalize bg-art-beige border border-art-charcoal/10 px-1.5 py-0.5 rounded-full font-mono">
                  {hoveredPoint.type}
                </span>
              </div>
              <h3 className="text-xs font-semibold text-art-charcoal truncate">{hoveredPoint.name}</h3>
              <p className="text-[11px] text-[#2C2A26]/80 mt-1 line-clamp-2 leading-relaxed">
                {hoveredPoint.desc}
              </p>
              <div className="text-[9px] text-art-green mt-1.5 font-sans font-medium">
                Click map marker to view Day {hoveredPoint.day} schedule ➔
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
