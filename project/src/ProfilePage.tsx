import { useEffect, useMemo, useState } from 'react';
import { Lock, Star, Sparkles, Coins, Gem, Clock3, Shirt, Crown, Car, Glasses } from 'lucide-react';
import { store } from '@/lib/store';
import { profileStore, PET_CATALOG, SKIN_CATALOG, SKIN_CATEGORIES, type ProfileData, type SkinCategory } from '@/lib/profileStore';
import { type LanguageCode, type TranslationKey, translatePetName, translateRarity, translateSkinName, translateSkinCategory } from '@/lib/i18n';
import MonsterViewport from '@/components/MonsterViewport';

const CATEGORY_ICONS: Record<SkinCategory, typeof Shirt> = { clothes: Shirt, glasses: Glasses, crown: Crown, vehicle: Car };
const RARITY_STYLES: Record<string, string> = {
  Common: 'text-gray-400 border-gray-400/30 bg-gray-400/5', Rare: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5',
  Epic: 'text-neon-violet border-neon-violet/30 bg-neon-violet/5', Legendary: 'text-neon-amber border-neon-amber/30 bg-neon-amber/5',
};
const STARS_PER_COMPLETED_SESSION = 5;
const STARS_PER_LEVEL = 50;

type Props = { language: LanguageCode; t: (key: TranslationKey) => string };

export default function ProfilePage({ language, t }: Props) {
  const [coins, setCoins] = useState(0);
  const [gems, setGems] = useState(0);
  const [studyMinutes, setStudyMinutes] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [petName, setPetName] = useState('Sparky');
  const [petLevel, setPetLevel] = useState(4);
  const [profile, setProfile] = useState<ProfileData>(() => profileStore.load());

  useEffect(() => {
    const local = store.load();
    setCoins(local.appState.coins); setGems(local.appState.gems); setPetName(local.appState.pet_name); setPetLevel(local.appState.pet_level);
    const completed = local.sessions.filter((s) => s.completed);
    setCompletedSessions(completed.length); setStudyMinutes(completed.reduce((sum, s) => sum + s.duration_minutes, 0));
  }, []);

  const studyHours = useMemo(() => Math.round((studyMinutes / 60) * 10) / 10, [studyMinutes]);
  const lifetimeStars = completedSessions * STARS_PER_COMPLETED_SESSION;
  const studentLevel = 1 + Math.floor(lifetimeStars / STARS_PER_LEVEL);
  const activePet = PET_CATALOG.find((p) => p.id === profile.equippedPetId) ?? PET_CATALOG[0];
  const activePetDisplayName = activePet.id === 'sparky' ? petName : activePet.name;
  const equippedSkinDefs = SKIN_CATEGORIES.map((cat) => SKIN_CATALOG.find((s) => s.id === profile.equippedSkins[cat]) ?? null);

  return (
    <div className="flex flex-col items-center gap-10 animate-fade-in pb-8">
      <section className="w-full flex flex-col items-center gap-5">
        <MonsterViewport pet={{ ...activePet, name: activePetDisplayName }} petLevel={petLevel} equippedSkins={equippedSkinDefs} language={language} t={t} />
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10"><Sparkles className="w-4 h-4 text-neon-cyan" /><span className="text-xs text-gray-500">{t('studentLevel')}</span><span className="font-mono font-bold text-sm text-neon-cyan neon-text-cyan">{studentLevel}</span></div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10"><Star className="w-4 h-4 text-neon-amber fill-neon-amber" /><span className="text-xs text-gray-500">{t('lifetimeGoldenStars')}</span><span className="font-mono font-bold text-sm text-neon-amber neon-text-amber">{lifetimeStars.toLocaleString()}</span></div>
        </div>
      </section>

      <section className="w-full">
        <h2 className="font-display font-bold text-lg text-gray-200 mb-4">{t('resourceWealth')}</h2>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="rounded-2xl border border-white/10 bg-ink-700/40 p-4 md:p-5 flex flex-col items-center gap-1.5 text-center"><Coins className="w-5 h-5 text-neon-amber mb-1" /><span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{t('points')}</span><span className="font-mono font-bold text-lg md:text-xl text-neon-amber neon-text-amber">🪙 {coins.toLocaleString()}</span></div>
          <div className="rounded-2xl border border-white/10 bg-ink-700/40 p-4 md:p-5 flex flex-col items-center gap-1.5 text-center"><Gem className="w-5 h-5 text-neon-cyan mb-1" /><span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{t('gems')}</span><span className="font-mono font-bold text-lg md:text-xl text-neon-cyan neon-text-cyan">💎 {gems.toLocaleString()}</span></div>
          <div className="rounded-2xl border border-white/10 bg-ink-700/40 p-4 md:p-5 flex flex-col items-center gap-1.5 text-center"><Clock3 className="w-5 h-5 text-neon-emerald mb-1" /><span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{t('studyHours')}</span><span className="font-mono font-bold text-lg md:text-xl text-neon-emerald neon-text-emerald">{studyHours.toLocaleString()}h</span></div>
        </div>
      </section>

      <section className="w-full flex flex-col gap-8">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-200 mb-4">{t('unlockedPets')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PET_CATALOG.map((pet) => {
              const unlocked = profile.unlockedPetIds.includes(pet.id); const isEquipped = profile.equippedPetId === pet.id;
              const rarityStyle = RARITY_STYLES[pet.rarity] ?? RARITY_STYLES.Common;
              return <button key={pet.id} type="button" disabled={!unlocked} onClick={() => setProfile(profileStore.setEquippedPet(pet.id))} className={`relative rounded-2xl border p-4 flex flex-col items-center gap-2 transition-all duration-300 ${!unlocked ? 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed' : isEquipped ? 'border-neon-cyan/50 bg-neon-cyan/5 neon-border-cyan cursor-pointer' : 'border-white/10 bg-ink-700/40 hover:border-white/20 hover:bg-white/[0.04] cursor-pointer'}`}>
                {!unlocked && <div className="absolute top-2 right-2 text-gray-500"><Lock className="w-3.5 h-3.5" /></div>}
                {isEquipped && <div className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">{t('active')}</div>}
                <div className={`text-4xl mt-2 ${!unlocked ? 'grayscale' : ''}`}>{pet.emoji}</div><span className="text-xs font-medium text-gray-200 text-center">{translatePetName(pet.name, language)}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rarityStyle}`}>{translateRarity(pet.rarity, language)}</span>
              </button>;
            })}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-lg text-gray-200 mb-4">{t('equipmentApparel')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SKIN_CATALOG.map((skin) => {
              const unlocked = profile.unlockedSkinIds.includes(skin.id); const isEquipped = profile.equippedSkins[skin.category] === skin.id; const CategoryIcon = CATEGORY_ICONS[skin.category];
              return <button key={skin.id} type="button" disabled={!unlocked} onClick={() => setProfile(profileStore.toggleEquipSkin(skin.id))} className={`relative rounded-2xl border p-4 flex flex-col items-center gap-2 transition-all duration-300 ${!unlocked ? 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed' : isEquipped ? 'border-neon-emerald/50 bg-neon-emerald/5 neon-border-emerald cursor-pointer' : 'border-white/10 bg-ink-700/40 hover:border-white/20 hover:bg-white/[0.04] cursor-pointer'}`}>
                {!unlocked && <div className="absolute top-2 right-2 text-gray-500"><Lock className="w-3.5 h-3.5" /></div>}
                {isEquipped && <div className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/30">{t('equipped')}</div>}
                <div className={`text-4xl mt-2 ${!unlocked ? 'grayscale' : ''}`}>{skin.emoji}</div><span className="text-xs font-medium text-gray-200 text-center">{translateSkinName(skin.name, language)}</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-500 uppercase tracking-wider"><CategoryIcon className="w-3 h-3" />{translateSkinCategory(skin.category, language)}</span>
              </button>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
