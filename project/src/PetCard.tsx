import { Sparkles, Star } from 'lucide-react';
import { type LanguageCode, type TranslationKey, translatePetName } from '@/lib/i18n';

type Props = {
  petName: string;
  petLevel: number;
  petXp: number;
  petXpMax: number;
  language: LanguageCode;
  t: (key: TranslationKey) => string;
};

export default function PetCard({ petName, petLevel, petXp, petXpMax, language, t }: Props) {
  const xpPercent = Math.min(100, (petXp / petXpMax) * 100);

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-ink-700/40 p-5 overflow-hidden transition-all duration-500 hover:border-neon-cyan/30 hover:scale-[1.02]">
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0, 240, 255, 0.08), transparent 70%)',
        }}
      />

      <div className="relative flex items-center gap-4">
        {/* Pet avatar placeholder */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl border-2 border-neon-cyan/20 bg-gradient-to-br from-ink-600 to-ink-800
            flex items-center justify-center text-4xl transition-all duration-500
            group-hover:scale-110 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <span className="animate-float">🐉</span>
          </div>
          <div className="absolute -top-2 -right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full
            bg-gradient-to-r from-neon-amber to-neon-rose text-ink-900 text-[10px] font-bold border border-ink-900">
            <Star className="w-2.5 h-2.5 fill-current" />
            {petLevel}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-display font-bold text-sm text-gray-200 truncate">{translatePetName(petName, language)}</h3>
            <Sparkles className="w-3.5 h-3.5 text-neon-amber shrink-0" />
          </div>
          <p className="text-xs text-gray-500 mb-2">Lv. {petLevel} {t('companion')}</p>

          {/* XP bar */}
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-mono text-gray-500">{petXp} {t('xp')}</span>
            <span className="text-[10px] font-mono text-gray-600">{petXpMax} {t('xp')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
