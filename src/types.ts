export interface ItineraryItem {
  id: string;
  time: string;
  label: string;
  details: string;
  category: 'travel' | 'charge' | 'activity' | 'food' | 'lodging' | 'beach';
  isTeslaSupercharge?: boolean;
  isDogFriendly?: boolean;
  isKidFriendly?: boolean;
  duration?: string;
  location?: string;
  notes?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  subtitle: string;
  highlight: string;
  items: ItineraryItem[];
  stats: {
    drivingTime?: string;
    superchargeStopCount?: number;
    highlights?: string[];
  };
}

export interface PackingItem {
  id: string;
  text: string;
  category: 'General' | 'Kids (Reva & Kabir)' | 'Fitzy (Dog)' | 'Tesla' | 'Beach & Outdoors';
  checked: boolean;
}

export interface QuickNote {
  id: string;
  text: string;
  timestamp: string;
  category?: string;
}

export interface RoutePoint {
  name: string;
  coordinates: [number, number]; // custom coordinate x, y normalized on [0, 100] scale
  dayNumber: number;
  activityCount: number;
}

// A single pin on the interactive map. Each trip variant carries its own route.
export interface RouteStop {
  name: string;
  x: number; // normalized [0,100]
  y: number; // normalized [0,100]
  day: number;
  desc: string;
  type: 'origin' | 'supercharge' | 'airbnb' | 'activity' | 'stop';
}

// A reusable day template — same shape as ItineraryDay but without its position in the trip.
// buildDays() stamps the dayNumber + calendar date based on where it lands in a variant.
export type DayBlock = Omit<ItineraryDay, 'dayNumber' | 'date'>;

// One selectable "shape" of the trip (Max Chill, Keep Mackinac, etc.). The picker on the site
// toggles between these, swapping the whole day-by-day, the map, and the at-a-glance stats.
export interface TripVariant {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  chillLevel: number; // 1-5 dot meter
  adventureLevel: number; // 1-5 dot meter
  drivingLevel: number; // 1-5 dot meter
  driveHours: string; // human-readable, e.g. "~15 hrs total"
  lakeDays: number;
  bigAdventures: number;
  routeHome: string;
  sees: string[]; // headline things you DO get
  skips: string[]; // headline things you skip
  forKids: string; // a fun, kid-facing one-liner
  pros: string[];
  cons: string[];
  itinerary: ItineraryDay[];
  route: RouteStop[];
}
