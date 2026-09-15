// Profile & Monster Inventory data layer.
//
// This is intentionally a SEPARATE localStorage namespace from
// `studyquest_data_v1` (see src/lib/store.ts). It never reads from or
// writes to the core subjects / timerState / appState sync system, so the
// existing offline-first timer-locking loop and daily-goals logic are
// completely unaffected by anything in this file.

const PROFILE_STORAGE_KEY = 'studyquest_profile_v1';

export type PetRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export type SkinCategory = 'clothes' | 'glasses' | 'crown' | 'vehicle';

export type PetDefinition = {
  id: string;
  name: string;
  rarity: PetRarity;
  emoji: string;
  unlockedByDefault: boolean;
};

export type SkinDefinition = {
  id: string;
  name: string;
  category: SkinCategory;
  rarity: PetRarity;
  emoji: string;
  unlockedByDefault: boolean;
};

export type ProfileData = {
  unlockedPetIds: string[];
  unlockedSkinIds: string[];
  equippedPetId: string;
  equippedSkins: Record<SkinCategory, string | null>;
};

// --- Static catalogs (local structures, no external assets/network) ---

export const PET_CATALOG: PetDefinition[] = [
  { id: 'sparky', name: 'Sparky', rarity: 'Common', emoji: '🐉', unlockedByDefault: true },
  { id: 'volcanic-pup', name: 'Volcanic Pup', rarity: 'Rare', emoji: '🐺', unlockedByDefault: true },
  { id: 'frost-kit', name: 'Frost Kit', rarity: 'Rare', emoji: '🦊', unlockedByDefault: true },
  { id: 'aqua-turtle', name: 'Aqua Turtle', rarity: 'Common', emoji: '🐢', unlockedByDefault: true },
  { id: 'shadow-wyrm', name: 'Shadow Wyrm', rarity: 'Epic', emoji: '🐲', unlockedByDefault: false },
  { id: 'celestial-phoenix', name: 'Celestial Phoenix', rarity: 'Legendary', emoji: '🐦‍🔥', unlockedByDefault: false },
];

export const SKIN_CATALOG: SkinDefinition[] = [
  { id: 'cyber-hoodie', name: 'Cyber Hoodie', category: 'clothes', rarity: 'Rare', emoji: '🧥', unlockedByDefault: true },
  { id: 'neon-shades', name: 'Neon Shades', category: 'glasses', rarity: 'Rare', emoji: '🕶️', unlockedByDefault: true },
  { id: 'gold-crown', name: 'Golden Crown', category: 'crown', rarity: 'Legendary', emoji: '👑', unlockedByDefault: true },
  { id: 'horse', name: 'Horse', category: 'vehicle', rarity: 'Common', emoji: '🐎', unlockedByDefault: true },
  { id: 'lada', name: 'Lada', category: 'vehicle', rarity: 'Common', emoji: '🚗', unlockedByDefault: true },
  { id: 'winter-scarf', name: 'Winter Scarf', category: 'clothes', rarity: 'Epic', emoji: '🧣', unlockedByDefault: false },
  { id: 'fancy-monocle', name: 'Fancy Monocle', category: 'glasses', rarity: 'Epic', emoji: '🧐', unlockedByDefault: false },
  { id: 'wizard-hat', name: 'Wizard Hat', category: 'crown', rarity: 'Mythic', emoji: '🧙', unlockedByDefault: false },
];

export const SKIN_CATEGORIES: SkinCategory[] = ['clothes', 'glasses', 'crown', 'vehicle'];

export const SKIN_CATEGORY_LABELS: Record<SkinCategory, string> = {
  clothes: 'Clothes',
  glasses: 'Glasses',
  crown: 'Crown',
  vehicle: 'Vehicle',
};

function getDefaultProfile(): ProfileData {
  return {
    unlockedPetIds: PET_CATALOG.filter((p) => p.unlockedByDefault).map((p) => p.id),
    unlockedSkinIds: SKIN_CATALOG.filter((s) => s.unlockedByDefault).map((s) => s.id),
    equippedPetId: 'sparky',
    equippedSkins: {
      clothes: null,
      glasses: null,
      crown: null,
      vehicle: null,
    },
  };
}

function readProfile(): ProfileData {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return getDefaultProfile();
    const parsed = JSON.parse(raw) as Partial<ProfileData>;
    const defaults = getDefaultProfile();
    return {
      unlockedPetIds: parsed.unlockedPetIds ?? defaults.unlockedPetIds,
      unlockedSkinIds: parsed.unlockedSkinIds ?? defaults.unlockedSkinIds,
      equippedPetId: parsed.equippedPetId ?? defaults.equippedPetId,
      equippedSkins: { ...defaults.equippedSkins, ...parsed.equippedSkins },
    };
  } catch {
    return getDefaultProfile();
  }
}

function writeProfile(data: ProfileData): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable — silently fail, data stays in memory for this session
  }
}

export const profileStore = {
  load(): ProfileData {
    return readProfile();
  },

  setEquippedPet(petId: string): ProfileData {
    const data = readProfile();
    if (!data.unlockedPetIds.includes(petId)) return data;
    data.equippedPetId = petId;
    writeProfile(data);
    return data;
  },

  /** Equips the skin if it isn't already equipped in its slot, otherwise unequips it. */
  toggleEquipSkin(skinId: string): ProfileData {
    const data = readProfile();
    const def = SKIN_CATALOG.find((s) => s.id === skinId);
    if (!def || !data.unlockedSkinIds.includes(skinId)) return data;

    const currentlyEquipped = data.equippedSkins[def.category] === skinId;
    data.equippedSkins = {
      ...data.equippedSkins,
      [def.category]: currentlyEquipped ? null : skinId,
    };
    writeProfile(data);
    return data;
  },
};
