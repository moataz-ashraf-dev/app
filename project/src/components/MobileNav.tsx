import { LayoutDashboard, User, Trophy, Sparkles } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  t: (key: TranslationKey) => string;
};

const TABS = [
  { id: 'dashboard', key: 'dashboard' as TranslationKey, icon: LayoutDashboard },
  { id: 'profile', key: 'profile' as TranslationKey, icon: User },
  { id: 'leaderboards', key: 'ranks' as TranslationKey, icon: Trophy },
  { id: 'skins', key: 'skins' as TranslationKey, icon: Sparkles },
];

export default function MobileNav({ activeTab, onTabChange, t }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                isActive ? 'text-neon-cyan' : 'text-gray-500'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all duration-300 ${isActive ? 'bg-neon-cyan/10 neon-border-cyan' : 'bg-transparent'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{t(tab.key)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
