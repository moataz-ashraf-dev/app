import { useState, useEffect, useCallback } from 'react';
import { store, type LocalData } from '@/lib/store';
import type { Subject, AppState, AmbientSound } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import PomodoroTimer from '@/components/PomodoroTimer';
import SubjectGrid from '@/components/SubjectGrid';
import AmbientSoundWidget from '@/components/AmbientSound';
import StreakBoard from '@/components/StreakBoard';
import PetCard from '@/components/PetCard';
import ProfilePage from '@/components/ProfilePage';
import Leaderboard from '@/components/Leaderboard';
import { LANGUAGES, type LanguageCode, type ThemeMode, type TranslationKey, translateSubjectName, TRANSLATIONS } from '@/lib/i18n';

const MOTIVATIONAL_QUOTES = [
  'Keep grinding, hero! Your pet is proud of you!',
  'Every minute counts. You are building your future!',
  'Knowledge is power. Claim it, one session at a time!',
  'Stay locked in. The streak gods are watching!',
  'Your pet believes in you. Do not let it down!',
];

const THEME_STORAGE_KEY = 'studyquest-theme';
const LANGUAGE_STORAGE_KEY = 'studyquest-language';


/**
 * Complete offline UI dictionary.
 * The translation layer intentionally lives in App.tsx so no API, package,
 * remote font, icon, or translation service is required at runtime.
 */
const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
};

const getStoredLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return LANGUAGES.some((language) => language.code === stored) ? (stored as LanguageCode) : 'en';
};

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [streakDays, setStreakDays] = useState<LocalData['streakDays']>([]);
  const [appState, setAppState] = useState<AppState | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRunning, setIsRunning] = useState(false);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [currentDuration, setCurrentDuration] = useState(25);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const [language, setLanguage] = useState<LanguageCode>(getStoredLanguage);
  const t = useCallback((key: TranslationKey) => TRANSLATIONS[language][key], [language]);

  // Persist theme + language locally and update the document without any network dependency.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const selectedLanguage = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];
    document.documentElement.lang = selectedLanguage.locale;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  // Rotate motivational quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load from localStorage instantly, then try cloud sync
  useEffect(() => {
    const local = store.load();
    setSubjects(local.subjects);
    setStreakDays(local.streakDays);
    setAppState(local.appState);
    setActiveSubjectId(local.timerState.activeSubjectId);
    setCurrentDuration(
      local.subjects.find((s) => s.id === local.timerState.activeSubjectId)?.duration_minutes ?? 25
    );
    setLoading(false);

    // Attempt background cloud sync if online
    if (navigator.onLine) {
      setIsSyncing(true);
      store.syncFromCloud()
        .then((synced) => {
          setSubjects(synced.subjects);
          setStreakDays(synced.streakDays);
          setAppState(synced.appState);
        })
        .catch(() => {})
        .finally(() => setIsSyncing(false));
    }
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSyncing(true);
      store.syncFromCloud()
        .then((synced) => {
          setSubjects(synced.subjects);
          setStreakDays(synced.streakDays);
          setAppState(synced.appState);
        })
        .catch(() => {})
        .finally(() => setIsSyncing(false));
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const activeSubject = subjects.find((s) => s.id === activeSubjectId) ?? null;
  const displaySubjects = subjects.map((subject) => ({
    ...subject,
    name: translateSubjectName(subject.name, language),
  }));
  const displayActiveSubject = activeSubject
    ? { ...activeSubject, name: translateSubjectName(activeSubject.name, language) }
    : null;

  // Update app state locally + queue sync
  const updateAppState = useCallback((updates: Partial<AppState>) => {
    store.saveAppState(updates);
    setAppState((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  // Handle subject selection
  const handleSelectSubject = useCallback((subject: Subject) => {
    if (isRunning) return;
    setActiveSubjectId(subject.id);
    setCurrentDuration(subject.duration_minutes);
    store.saveTimerState(subject.id, subject.duration_minutes * 60, false);
    updateAppState({ active_subject_id: subject.id });
  }, [isRunning, updateAppState]);

  // Handle duration edit
  const handleEditDuration = useCallback((subjectId: string, minutes: number) => {
    const clamped = Math.max(5, Math.min(120, minutes));
    store.updateSubject(subjectId, { duration_minutes: clamped });
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, duration_minutes: clamped } : s))
    );
    if (subjectId === activeSubjectId) setCurrentDuration(clamped);
  }, [activeSubjectId]);

  // Handle subject name edit
  const handleEditName = useCallback((subjectId: string, name: string) => {
    store.updateSubject(subjectId, { name });
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, name } : s))
    );
  }, []);

  // Start focus
  const handleStart = useCallback(() => {
    if (!activeSubjectId) return;
    setIsRunning(true);
    store.saveTimerState(activeSubjectId, currentDuration * 60, true);
  }, [activeSubjectId, currentDuration]);

  // Pause focus
  const handlePause = useCallback(() => {
    setIsRunning(false);
    store.saveTimerState(activeSubjectId, currentDuration * 60, false);
  }, [activeSubjectId, currentDuration]);

  // Reset timer
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setActiveSubjectId(null);
    setCurrentDuration(activeSubject?.duration_minutes ?? 25);
    store.saveTimerState(null, (activeSubject?.duration_minutes ?? 25) * 60, false);
    updateAppState({ active_subject_id: null });
  }, [activeSubject, updateAppState]);

  // Complete session
  const handleComplete = useCallback(() => {
    setIsRunning(false);
    if (!activeSubject) return;

    // Log the session locally + queue cloud sync
    store.addSession({
      subject_id: activeSubject.id,
      duration_minutes: activeSubject.duration_minutes,
      completed: true,
    });

    // Award coins + pet XP
    const coinsEarned = activeSubject.duration_minutes * 2;
    const gemsEarned = 1;
    const xpEarned = activeSubject.duration_minutes;

    if (appState) {
      const newCoins = appState.coins + coinsEarned;
      const newGems = appState.gems + gemsEarned;
      const newXp = appState.pet_xp + xpEarned;
      const leveledUp = newXp >= appState.pet_xp_max;
      const finalXp = leveledUp ? newXp - appState.pet_xp_max : newXp;
      const finalLevel = leveledUp ? appState.pet_level + 1 : appState.pet_level;
      const finalXpMax = leveledUp ? Math.floor(appState.pet_xp_max * 1.5) : appState.pet_xp_max;

      updateAppState({
        coins: newCoins,
        gems: newGems,
        pet_xp: finalXp,
        pet_level: finalLevel,
        pet_xp_max: finalXpMax,
      });
    }

    // Mark today's streak as complete
    const today = new Date().getDay();
    const todayStreak = streakDays.find((d) => d.day_of_week === today);
    if (todayStreak && !todayStreak.completed) {
      store.markStreakComplete(todayStreak.id);
      setStreakDays((prev) =>
        prev.map((d) => (d.id === todayStreak.id ? { ...d, completed: true } : d))
      );
    }

    setActiveSubjectId(null);
    store.saveTimerState(null, 25 * 60, false);
  }, [activeSubject, appState, streakDays, updateAppState]);

  // Ambient sound change
  const handleSoundChange = useCallback((sound: AmbientSound) => {
    updateAppState({ ambient_sound: sound });
  }, [updateAppState]);

  // Timer tick — persist remaining seconds to localStorage
  const handleTick = useCallback((remainingSeconds: number) => {
    if (isRunning) {
      store.saveTimerState(activeSubjectId, remainingSeconds, true);
    }
  }, [isRunning, activeSubjectId]);




  if (loading) {
    return (
      <div className="studyquest-app min-h-screen overflow-hidden bg-ink-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan animate-spin" />
          <p className="text-sm text-gray-500 font-mono">{TRANSLATIONS[language].loadingStudyQuest}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`studyquest-app relative min-h-screen overflow-x-hidden bg-ink-800 text-gray-200 ${theme === 'light' ? 'theme-light' : 'theme-dark'}`} data-theme={theme}>
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-emerald/5 blur-[100px]" />
      </div>

      <div className="relative z-50">
        <Navbar
          coins={appState?.coins ?? 0}
          gems={appState?.gems ?? 0}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
          languages={LANGUAGES}
          onLanguageChange={setLanguage}
          theme={theme}
          onThemeChange={setTheme}
          t={t}
        />
      </div>

      <style>{`
        .studyquest-app {
          --sq-bg: #121212;
          --sq-surface: rgba(26, 26, 26, 0.72);
          --sq-surface-solid: #1a1a1a;
          --sq-text: #e5e7eb;
          --sq-muted: #9ca3af;
          --sq-border: rgba(255, 255, 255, 0.10);
          --sq-border-soft: rgba(255, 255, 255, 0.06);
          --sq-hover: rgba(255, 255, 255, 0.06);
          background-color: var(--sq-bg) !important;
          color: var(--sq-text);
          transition: background-color 420ms ease, color 300ms ease;
        }

        .studyquest-app.theme-light {
          --sq-bg: #f3f6fb;
          --sq-surface: rgba(255, 255, 255, 0.82);
          --sq-surface-solid: #ffffff;
          --sq-text: #172033;
          --sq-muted: #667085;
          --sq-border: rgba(15, 23, 42, 0.12);
          --sq-border-soft: rgba(15, 23, 42, 0.07);
          --sq-hover: rgba(15, 23, 42, 0.055);
        }

        .studyquest-app.theme-light.bg-ink-800 { background-color: var(--sq-bg) !important; }
        .studyquest-app.theme-light .bg-ink-800 { background-color: var(--sq-bg) !important; }
        .studyquest-app.theme-light .bg-ink-900 { background-color: #e9eef6 !important; }
        .studyquest-app.theme-light .bg-ink-700,
        .studyquest-app.theme-light .bg-ink-600,
        .studyquest-app.theme-light .bg-white\\/5 { background-color: var(--sq-hover) !important; }
        .studyquest-app.theme-light .glass {
          background: var(--sq-surface) !important;
          border-color: var(--sq-border-soft) !important;
          box-shadow: 0 10px 35px rgba(15, 23, 42, 0.06);
        }
        .studyquest-app.theme-light .text-gray-200,
        .studyquest-app.theme-light .text-gray-300 { color: var(--sq-text) !important; }
        .studyquest-app.theme-light .text-gray-400,
        .studyquest-app.theme-light .text-gray-500,
        .studyquest-app.theme-light .text-gray-600 { color: var(--sq-muted) !important; }
        .studyquest-app.theme-light .text-white { color: #111827 !important; }
        .studyquest-app.theme-light .border-white\\/5,
        .studyquest-app.theme-light .border-white\\/10,
        .studyquest-app.theme-light .border-white\\/20 { border-color: var(--sq-border) !important; }
        .studyquest-app.theme-light .bg-white\\/5:hover,
        .studyquest-app.theme-light button:hover { background-color: var(--sq-hover); }
        .studyquest-app.theme-light .neon-text-cyan,
        .studyquest-app.theme-light .neon-text-emerald,
        .studyquest-app.theme-light .neon-text-amber,
        .studyquest-app.theme-light .neon-text-rose,
        .studyquest-app.theme-light .neon-text-green { text-shadow: none; }

        .studyquest-control,
        .studyquest-language-control {
          background: var(--sq-surface);
          border-color: var(--sq-border);
          color: var(--sq-text);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .studyquest-control:hover,
        .studyquest-language-control:hover { background: var(--sq-hover); }
        .studyquest-language-select { color: var(--sq-text); }
        .studyquest-language-select option {
          background: var(--sq-surface-solid);
          color: var(--sq-text);
        }

        .studyquest-app,
        .studyquest-app *,
        .studyquest-app::before,
        .studyquest-app::after {
          transition-property: background-color, border-color, color, box-shadow, text-shadow, opacity;
          transition-duration: 300ms;
          transition-timing-function: ease;
        }

        .studyquest-app .animate-spin,
        .studyquest-app .animate-pulse,
        .studyquest-app .animate-fade-in,
        .studyquest-app .rotate-border,
        .studyquest-app .motivational-shift {
          transition: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .studyquest-app,
          .studyquest-app *,
          .studyquest-app::before,
          .studyquest-app::after { transition-duration: 0ms !important; }
        }
      `}</style>

      {/* Sync indicator */}
      {(isSyncing || !isOnline) && (
        <div className="fixed top-14 md:top-16 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs">
          {isSyncing ? (
            <>
              <div className="w-3 h-3 rounded-full border border-neon-cyan/40 border-t-neon-cyan animate-spin" />
              <span className="text-gray-400">{TRANSLATIONS[language].syncing}</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-neon-amber animate-pulse" />
              <span className="text-neon-amber/80">{TRANSLATIONS[language].offline}</span>
            </>
          )}
        </div>
      )}

      <main className="relative pt-20 md:pt-20 pb-24 md:pb-0 px-4 md:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard tab */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col items-center gap-8 animate-fade-in">
              {/* Timer section */}
              <section className="w-full flex flex-col items-center gap-6 py-4">
                <PomodoroTimer
              t={t}
                  durationMinutes={currentDuration}
                  isRunning={isRunning}
                  onStart={handleStart}
                  onPause={handlePause}
                  onReset={handleReset}
                  onTick={handleTick}
                  onComplete={handleComplete}
                  subjectName={displayActiveSubject?.name ?? null}
                />

                {/* Ambient sound */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{TRANSLATIONS[language].ambient}</span>
                  <AmbientSoundWidget
                    language={language}
                    t={t}
                    value={(appState?.ambient_sound as AmbientSound) ?? 'none'}
                    onChange={handleSoundChange}
                  />
                </div>
              </section>

              {/* Subject grid */}
              <section className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-lg text-gray-200">{TRANSLATIONS[language].dailyStudyGoals}</h2>
                  {isRunning && (
                    <span className="text-xs font-medium text-neon-amber px-3 py-1 rounded-full bg-neon-amber/10 border border-neon-amber/20 neon-text-amber">
                      {TRANSLATIONS[language].lockInActive}
                    </span>
                  )}
                </div>
                <SubjectGrid
              t={t}
                  subjects={displaySubjects}
                  activeSubjectId={activeSubjectId}
                  isRunning={isRunning}
                  onSelect={handleSelectSubject}
                  onEditDuration={handleEditDuration}
                  onEditName={handleEditName}
                />
              </section>

              {/* Streak + Pet */}
              <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <StreakBoard streakDays={streakDays} language={language} t={t} />
                <PetCard
                  language={language}
                  t={t}
                  petName={appState?.pet_name ?? 'Sparky'}
                  petLevel={appState?.pet_level ?? 4}
                  petXp={appState?.pet_xp ?? 0}
                  petXpMax={appState?.pet_xp_max ?? 100}
                />
              </section>
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && <ProfilePage language={language} t={t} />}

          {/* Leaderboard + Safe Study Lounge */}
          {activeTab === 'leaderboards' && <Leaderboard t={(key) => TRANSLATIONS[language][key as TranslationKey]} />}

          {/* Future skins */}
          {activeTab === 'skins' && (
            <section className="flex flex-col items-center justify-center min-h-[45vh] text-center animate-fade-in">
              <div className="w-16 h-16 rounded-2xl glass border border-neon-cyan/20 flex items-center justify-center text-3xl mb-4">✨</div>
              <h1 className="font-display text-xl font-bold text-gray-200">{t('futureSkins')}</h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md">{t('customizePet')}</p>
            </section>
          )}
        </div>
      </main>

      <Footer t={t} />
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} t={t} />

      {/* Mobile motivational quote */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pointer-events-none">
        <p className="text-center text-xs font-display font-bold text-neon-emerald/70 neon-text-emerald truncate">
          {TRANSLATIONS[language][(['keepGrinding', 'everyMinute', 'knowledgePower', 'stayLocked', 'petBelieves'] as TranslationKey[])[quoteIndex]]}
        </p>
      </div>
    </div>
  );
}
