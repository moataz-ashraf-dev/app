import { supabase, type Subject, type StreakDay, type AppState, type StudySession } from './supabase';

const STORAGE_KEY = 'studyquest_data_v1';
const SYNC_QUEUE_KEY = 'studyquest_sync_queue_v1';

type LocalData = {
  subjects: Subject[];
  streakDays: StreakDay[];
  appState: AppState;
  sessions: StudySession[];
  timerState: {
    activeSubjectId: string | null;
    remainingSeconds: number;
    isRunning: boolean;
  };
};

type SyncQueueEntry = {
  id: string;
  table: 'subjects' | 'streak_days' | 'app_state' | 'study_sessions';
  operation: 'update' | 'insert';
  record: Record<string, unknown>;
  matchId?: string;
  createdAt: string;
};

const DEFAULT_SUBJECTS: Subject[] = [
  { id: 'local-subject-1', name: 'Mathematics', icon: '', color: 'cyan', duration_minutes: 25, position: 0, created_at: new Date().toISOString() },
  { id: 'local-subject-2', name: 'Computer Science', icon: '', color: 'emerald', duration_minutes: 30, position: 1, created_at: new Date().toISOString() },
  { id: 'local-subject-3', name: 'Physics', icon: '', color: 'amber', duration_minutes: 20, position: 2, created_at: new Date().toISOString() },
  { id: 'local-subject-4', name: 'Arabic', icon: '', color: 'rose', duration_minutes: 15, position: 3, created_at: new Date().toISOString() },
];

const DEFAULT_STREAK_DAYS: StreakDay[] = Array.from({ length: 7 }, (_, i) => ({
  id: `local-streak-${i}`,
  day_of_week: i,
  completed: false,
  updated_at: new Date().toISOString(),
}));

const DEFAULT_APP_STATE: AppState = {
  id: 1,
  coins: 1200,
  gems: 5,
  pet_name: 'Sparky',
  pet_level: 4,
  pet_xp: 65,
  pet_xp_max: 100,
  ambient_sound: 'none',
  active_subject_id: null,
  updated_at: new Date().toISOString(),
};

function getDefaultData(): LocalData {
  return {
    subjects: DEFAULT_SUBJECTS,
    streakDays: DEFAULT_STREAK_DAYS,
    appState: DEFAULT_APP_STATE,
    sessions: [],
    timerState: { activeSubjectId: null, remainingSeconds: 25 * 60, isRunning: false },
  };
}

// --- localStorage read/write ---

function readLocal(): LocalData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw) as Partial<LocalData>;
    const defaults = getDefaultData();
    return {
      subjects: parsed.subjects ?? defaults.subjects,
      streakDays: parsed.streakDays ?? defaults.streakDays,
      appState: { ...defaults.appState, ...parsed.appState },
      sessions: parsed.sessions ?? defaults.sessions,
      timerState: { ...defaults.timerState, ...parsed.timerState },
    };
  } catch {
    return getDefaultData();
  }
}

function writeLocal(data: LocalData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable — silently fail, data stays in memory
  }
}

// --- Sync queue ---

function readSyncQueue(): SyncQueueEntry[] {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? (JSON.parse(raw) as SyncQueueEntry[]) : [];
  } catch {
    return [];
  }
}

function writeSyncQueue(queue: SyncQueueEntry[]): void {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore
  }
}

function enqueueSync(entry: Omit<SyncQueueEntry, 'id' | 'createdAt'>): void {
  const queue = readSyncQueue();
  queue.push({ ...entry, id: `sync-${Date.now()}-${Math.random()}`, createdAt: new Date().toISOString() });
  writeSyncQueue(queue);
}

async function flushSyncQueue(): Promise<void> {
  const queue = readSyncQueue();
  if (queue.length === 0) return;

  const remaining: SyncQueueEntry[] = [];

  for (const entry of queue) {
    try {
      if (entry.operation === 'update' && entry.matchId) {
        const { error } = await supabase
          .from(entry.table)
          .update(entry.record)
          .eq('id', entry.matchId);
        if (error) throw error;
      } else if (entry.operation === 'insert') {
        const { error } = await supabase.from(entry.table).insert(entry.record);
        if (error) throw error;
      }
    } catch {
      remaining.push(entry);
    }
  }

  writeSyncQueue(remaining);
}

// --- Public API ---

export const store = {
  load(): LocalData {
    return readLocal();
  },

  save(data: LocalData): void {
    writeLocal(data);
  },

  saveSubjects(subjects: Subject[]): void {
    const data = readLocal();
    data.subjects = subjects;
    writeLocal(data);
  },

  updateSubject(subjectId: string, updates: Partial<Subject>): void {
    const data = readLocal();
    data.subjects = data.subjects.map((s) =>
      s.id === subjectId ? { ...s, ...updates } : s
    );
    writeLocal(data);
    enqueueSync({
      table: 'subjects',
      operation: 'update',
      record: updates,
      matchId: subjectId,
    });
  },

  saveAppState(updates: Partial<AppState>): void {
    const data = readLocal();
    data.appState = { ...data.appState, ...updates, updated_at: new Date().toISOString() };
    writeLocal(data);
    enqueueSync({
      table: 'app_state',
      operation: 'update',
      record: data.appState,
      matchId: '1',
    });
  },

  saveTimerState(activeSubjectId: string | null, remainingSeconds: number, isRunning: boolean): void {
    const data = readLocal();
    data.timerState = { activeSubjectId, remainingSeconds, isRunning };
    writeLocal(data);
  },

  addSession(session: Omit<StudySession, 'id' | 'created_at'>): void {
    const data = readLocal();
    const fullSession: StudySession = {
      ...session,
      id: `local-session-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    data.sessions.push(fullSession);
    writeLocal(data);
    enqueueSync({
      table: 'study_sessions',
      operation: 'insert',
      record: fullSession,
    });
  },

  markStreakComplete(dayId: string): void {
    const data = readLocal();
    data.streakDays = data.streakDays.map((d) =>
      d.id === dayId ? { ...d, completed: true, updated_at: new Date().toISOString() } : d
    );
    writeLocal(data);
    enqueueSync({
      table: 'streak_days',
      operation: 'update',
      record: { completed: true, updated_at: new Date().toISOString() },
      matchId: dayId,
    });
  },

  isOnline(): boolean {
    return navigator.onLine;
  },

  async syncFromCloud(): Promise<LocalData> {
    const [subjectsRes, streaksRes, stateRes] = await Promise.all([
      supabase.from('subjects').select('*').order('position'),
      supabase.from('streak_days').select('*').order('day_of_week'),
      supabase.from('app_state').select('*').eq('id', 1).maybeSingle(),
    ]);

    const local = readLocal();
    const cloudData: LocalData = {
      subjects: (subjectsRes.data as Subject[]) ?? local.subjects,
      streakDays: (streaksRes.data as StreakDay[]) ?? local.streakDays,
      appState: (stateRes.data as AppState) ?? local.appState,
      sessions: local.sessions,
      timerState: local.timerState,
    };

    // Merge: cloud wins for subjects/streaks/appState if cloud has data, but preserve local timer state
    if (cloudData.subjects.length > 0) local.subjects = cloudData.subjects;
    if (cloudData.streakDays.length > 0) local.streakDays = cloudData.streakDays;
    if (cloudData.appState) {
      // Keep local currency if higher (user may have earned coins offline)
      local.appState = {
        ...cloudData.appState,
        coins: Math.max(cloudData.appState.coins, local.appState.coins),
        gems: Math.max(cloudData.appState.gems, local.appState.gems),
        pet_xp: Math.max(cloudData.appState.pet_xp, local.appState.pet_xp),
        pet_level: Math.max(cloudData.appState.pet_level, local.appState.pet_level),
      };
    }
    writeLocal(local);

    // Now push any queued local changes
    await flushSyncQueue();

    return local;
  },

  async trySync(): Promise<void> {
    if (!navigator.onLine) return;
    try {
      await this.syncFromCloud();
    } catch {
      // network failed, stay offline — will retry next time
    }
  },

  onOnline(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener('online', handler);
    return () => window.removeEventListener('online', handler);
  },
};

export type { LocalData };
