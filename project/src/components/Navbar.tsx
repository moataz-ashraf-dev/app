import React from 'react';
import {

  BookOpen,
  LayoutDashboard,
  User,
  Trophy,
  Sparkles,
  Globe2,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import type { LanguageCode, ThemeMode, TranslationKey } from '@/lib/i18n';

type Props = {
  coins: number;
  gems: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: LanguageCode;
  languages: Array<{ code: LanguageCode; label: string; locale: string }>;
  onLanguageChange: (language: LanguageCode) => void;
  theme: ThemeMode;
  onThemeChange: React.Dispatch<React.SetStateAction<ThemeMode>>;
  t: (key: TranslationKey) => string;
};

const TABS = [
  { id: 'dashboard', key: 'studyDashboard' as TranslationKey, icon: LayoutDashboard },
  { id: 'profile', key: 'myProfile' as TranslationKey, icon: User },
  { id: 'leaderboards', key: 'leaderboards' as TranslationKey, icon: Trophy },
  { id: 'skins', key: 'futureSkins' as TranslationKey, icon: Sparkles },
];

export default function Navbar({
  coins,
  gems,
  activeTab,
  onTabChange,
  language,
  languages,
  onLanguageChange,
  theme,
  onThemeChange,
  t,
}: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleTheme = () => onThemeChange((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 lg:px-10 h-14 md:h-16">
        <div className="flex items-center gap-2 font-display text-lg md:text-xl font-extrabold tracking-tight shrink-0">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-neon-cyan" />
          <span className="bg-gradient-to-r from-neon-cyan via-neon-emerald to-neon-cyan bg-clip-text text-transparent">
            StudyQuest
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                title={t(tab.key)}
                aria-label={t(tab.key)}
                className={`flex items-center justify-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-neon-cyan neon-text-cyan bg-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">{t(tab.key)}</span>
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <label className="studyquest-language-control h-10 rounded-xl border flex items-center px-2.5">
            <Globe2 className="w-4 h-4 mr-1.5 shrink-0" aria-hidden="true" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              aria-label={t('language')}
              className="studyquest-language-select bg-transparent border-0 outline-none text-xs font-semibold cursor-pointer pr-1"
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>{item.label}</option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-3 px-3 lg:px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🪙</span>
              <span className="font-mono text-sm font-bold text-neon-amber">{coins.toLocaleString()}</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="text-lg">💎</span>
              <span className="font-mono text-sm font-bold text-neon-cyan">{gems}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-ink-800/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <nav className="grid grid-cols-2 gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left ${
                    isActive
                      ? 'text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20'
                      : 'text-gray-400 hover:text-white bg-white/5 border border-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(tab.key)}
                </button>
              );
            })}
          </nav>

          <div className="grid grid-cols-1 gap-2">
            <label className="studyquest-language-control min-h-11 rounded-xl border flex items-center px-3">
              <Globe2 className="w-4 h-4 mr-2 shrink-0 text-neon-cyan" aria-hidden="true" />
              <span className="text-xs text-gray-500 mr-2">{t('language')}</span>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                aria-label={t('language')}
                className="studyquest-language-select flex-1 bg-transparent border-0 outline-none text-sm font-semibold cursor-pointer"
              >
                {languages.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={toggleTheme}
              className="studyquest-control min-h-11 rounded-xl border flex items-center justify-between px-3 text-sm"
              aria-label={theme === 'dark' ? t('sunMode') : t('moonMode')}
              title={theme === 'dark' ? t('sunMode') : t('moonMode')}
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-neon-amber" /> : <Moon className="w-4 h-4 text-neon-cyan" />}
                {theme === 'dark' ? t('sunMode') : t('moonMode')}
              </span>
              <span className="text-xs text-gray-500">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>

            <div className="flex items-center justify-center gap-5 py-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-mono text-sm font-bold text-neon-amber">🪙 {coins.toLocaleString()}</span>
              <span className="font-mono text-sm font-bold text-neon-cyan">💎 {gems}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
