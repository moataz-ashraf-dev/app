import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
  duration_minutes: number;
  position: number;
  created_at: string;
};

export type StudySession = {
  id: string;
  subject_id: string | null;
  duration_minutes: number;
  completed: boolean;
  created_at: string;
};

export type StreakDay = {
  id: string;
  day_of_week: number;
  completed: boolean;
  updated_at: string;
};

export type AppState = {
  id: number;
  coins: number;
  gems: number;
  pet_name: string;
  pet_level: number;
  pet_xp: number;
  pet_xp_max: number;
  ambient_sound: string;
  active_subject_id: string | null;
  updated_at: string;
};

export type AmbientSound = 'none' | 'quran' | 'lofi' | 'rain';

export const AMBIENT_SOUNDS: { value: AmbientSound; label: string; icon: string }[] = [
  { value: 'none', label: 'No Sound', icon: '🔇' },
  { value: 'quran', label: 'Quran Audio', icon: '🕌' },
  { value: 'lofi', label: 'Lo-Fi Music', icon: '🎧' },
  { value: 'rain', label: 'Rain Ambient', icon: '🌧️' },
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
