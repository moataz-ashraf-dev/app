import { useState, useRef, useEffect } from 'react';
import { Volume2, ChevronDown } from 'lucide-react';
import { AMBIENT_SOUNDS, type AmbientSound } from '@/lib/supabase';
import { type LanguageCode, type TranslationKey, translateAmbientLabel } from '@/lib/i18n';

type Props = {
  value: AmbientSound;
  onChange: (sound: AmbientSound) => void;
  language: LanguageCode;
  t: (key: TranslationKey) => string;
};

export default function AmbientSoundWidget({ value, onChange, language, t }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = AMBIENT_SOUNDS.find((s) => s.value === value) ?? AMBIENT_SOUNDS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
          text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        <Volume2 className="w-4 h-4 text-neon-cyan" aria-label={t('ambient')} />
        <span className="text-lg">{current.icon}</span>
        <span className="font-medium">{translateAmbientLabel(current.label, language)}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-52 rounded-xl glass border border-white/10 shadow-2xl py-2 animate-fade-in z-50">
          {AMBIENT_SOUNDS.map((sound) => (
            <button
              key={sound.value}
              onClick={() => {
                onChange(sound.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                value === sound.value
                  ? 'text-neon-cyan bg-neon-cyan/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{sound.icon}</span>
              {translateAmbientLabel(sound.label, language)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
