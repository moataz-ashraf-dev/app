import { Check, Flame } from 'lucide-react';
import { WEEKDAYS, type StreakDay } from '@/lib/supabase';
import { type LanguageCode, type TranslationKey, translateWeekday } from '@/lib/i18n';

type Props = {
  streakDays: StreakDay[];
  language: LanguageCode;
  t: (key: TranslationKey) => string;
};

export default function StreakBoard({ streakDays, language, t }: Props) {
  const today = new Date().getDay();
  const sorted = [...streakDays].sort((a, b) => a.day_of_week - b.day_of_week);
  const completedCount = sorted.filter((d) => d.completed).length;

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-700/40 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-neon-amber" />
          <h3 className="font-display font-bold text-sm text-gray-200">{t('weeklyStreak')}</h3>
        </div>
        <span className="text-xs font-mono text-gray-500">
          {completedCount}/7 {t('days')}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {sorted.map((day) => {
          const isToday = day.day_of_week === today;
          return (
            <div
              key={day.id}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border transition-all duration-300 pointer-events-none select-none ${
                day.completed
                  ? 'border-neon-green/40 bg-neon-green/10 neon-border-green'
                  : isToday
                  ? 'border-neon-cyan/30 bg-neon-cyan/5'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                day.completed ? 'text-neon-green' : isToday ? 'text-neon-cyan' : 'text-gray-500'
              }`}>
                {translateWeekday(WEEKDAYS[day.day_of_week], language)}
              </span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  day.completed
                    ? 'bg-neon-green/20 neon-border-green scale-110'
                    : 'bg-white/5'
                }`}
              >
                {day.completed && <Check className="w-4 h-4 text-neon-green" strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
