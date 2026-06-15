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
