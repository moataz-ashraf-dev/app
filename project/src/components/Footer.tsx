import { HelpCircle, Shield, Mail, Heart } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

type Props = {
  t: (key: TranslationKey) => string;
};

const MOTIVATIONAL_KEYS: TranslationKey[] = ['keepGrinding', 'everyMinute', 'knowledgePower', 'stayLocked', 'petBelieves'];

export default function Footer({ t }: Props) {
  return (
    <footer className="hidden md:block mt-12 border-t border-white/5 bg-ink-900/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-5 text-sm text-gray-500">
            <a href="#" className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors"><HelpCircle className="w-4 h-4" /> {t('help')}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors"><Shield className="w-4 h-4" /> {t('privacy')}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors"><Mail className="w-4 h-4" /> {t('contact')}</a>
          </div>
          <div className="flex-1 text-center">
            <p className="font-display font-bold text-lg neon-text-emerald text-neon-emerald motivational-shift">
              {t(MOTIVATIONAL_KEYS[Math.floor(Date.now() / 5000) % MOTIVATIONAL_KEYS.length])}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span>{t('madeWith')}</span><Heart className="w-4 h-4 text-neon-rose fill-neon-rose" /><span>StudyQuest</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
