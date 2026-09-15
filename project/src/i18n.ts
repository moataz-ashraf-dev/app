export type ThemeMode = 'dark' | 'light';
export type LanguageCode = 'en' | 'de' | 'ja' | 'ar' | 'fr';

export const LANGUAGES: Array<{ code: LanguageCode; label: string; locale: string }> = [
  { code: 'en', label: 'English', locale: 'en' },
  { code: 'de', label: 'Deutsch', locale: 'de' },
  { code: 'ja', label: '日本語', locale: 'ja' },
  { code: 'ar', label: 'العربية', locale: 'ar' },
  { code: 'fr', label: 'Français', locale: 'fr' },
];

export type TranslationKey =
  | 'loadingStudyQuest' | 'studyDashboard' | 'myProfile' | 'leaderboards' | 'futureSkins'
  | 'dashboard' | 'profile' | 'ranks' | 'skins' | 'selectASubject' | 'startFocus' | 'pause'
  | 'reset' | 'inFocus' | 'ready' | 'ambient' | 'dailyStudyGoals' | 'lockInActive'
  | 'studyGoal' | 'min' | 'weeklyStreak' | 'companion' | 'points' | 'gems' | 'syncing'
  | 'offline' | 'help' | 'privacy' | 'contact' | 'madeWith' | 'comingSoon'
  | 'trackStats' | 'competeHeroes' | 'customizePet' | 'keepGrinding' | 'everyMinute'
  | 'knowledgePower' | 'stayLocked' | 'petBelieves' | 'noSound' | 'quranAudio'
  | 'lofiMusic' | 'rainAmbient' | 'sunMode' | 'moonMode' | 'language'
  | 'active' | 'days' | 'levelCompanion' | 'xp' | 'daysShort' | 'selectSubjectHint'
  | 'levelPrefix' | 'studentLevel' | 'lifetimeGoldenStars' | 'resourceWealth' | 'studyHours' | 'unlockedPets' | 'equipmentApparel' | 'equipped' | 'leaderboard' | 'globalRank' | 'regionalRank' | 'internationalRanking' | 'regionalRanking'
  | 'topStudents' | 'rank' | 'level' | 'streak' | 'goldenStars' | 'lifetimeStars' | 'region'
  | 'safeStudyLounge' | 'studyRooms' | 'physicsMastermindsRoom' | 'advancedCalculusHub'
  | 'javascriptBuildersRoom' | 'englishConversationStudyRoom' | 'chemistryFocusRoom' | 'examPreparationRoom'
  | 'activeStudents' | 'secureRoom' | 'verifiedStudentsOnly' | 'wordFilterActive' | 'textModerationActive'
  | 'moderationLog' | 'reportDisruptiveBehavior' | 'report' | 'cancel' | 'submitReport' | 'joinRoom'
  | 'joinedOfflineLobby' | 'microphone' | 'speaker' | 'volume' | 'leaveRoom' | 'offlineLobby'
  | 'mockLocalStatus' | 'moderationActive' | 'automatedWordFiltering' | 'reportReason'
  | 'reportSubmitted' | 'selectReason' | 'reasonDisruption' | 'reasonHarassment' | 'reasonSpam'
  | 'localMockNotice' | 'roomDescriptionPhysics' | 'roomDescriptionCalculus' | 'roomDescriptionJavaScript'
  | 'roomDescriptionEnglish' | 'roomDescriptionChemistry' | 'roomDescriptionExam' | 'secureLocalLounge'
  | 'noRealVoiceConnection' | 'globalStudents' | 'regionalStudents'
  | 'displayName' | 'chooseAvatar'
  | 'interactiveStats' | 'studyHoursGoal' | 'studyHoursSubtitle' | 'coinsEarned' | 'coinsEarnedSubtitle' | 'gemsCollected' | 'gemsCollectedSubtitle' | 'goalProgress'
  | 'companionsTab' | 'skinsTab' | 'equip' | 'equipped' | 'rarityAll' | 'rarityMythic' | 'inventorySection' | 'skinType' | 'petType' | 'unequip';

type TranslationDictionary = Record<LanguageCode, Record<TranslationKey, string>>;

export const TRANSLATIONS: TranslationDictionary = {
  en: {
    loadingStudyQuest: 'Loading StudyQuest...', studyDashboard: 'Study Dashboard', myProfile: 'My Profile',
    leaderboards: 'Leaderboards', futureSkins: 'Future Skins', dashboard: 'Dashboard', profile: 'Profile',
    ranks: 'Ranks', skins: 'Skins', selectASubject: 'Select a subject', startFocus: 'Start Focus', pause: 'Pause',
    reset: 'Reset', inFocus: 'In Focus', ready: 'Ready', ambient: 'Ambient', dailyStudyGoals: 'Daily Study Goals',
    lockInActive: 'Lock-In Active', studyGoal: 'Study Goal', min: 'min', weeklyStreak: 'Weekly Streak',
    companion: 'Companion', points: 'Points', gems: 'Gems', syncing: 'Syncing...', offline: 'Offline',
    help: 'Help', privacy: 'Privacy', contact: 'Contact', madeWith: 'Made with', comingSoon: 'Coming soon',
    trackStats: 'track your stats, achievements, and rewards here.', competeHeroes: 'compete with fellow StudyQuest heroes!',
    customizePet: 'customize your pet and unlock new themes!',
    keepGrinding: 'Keep grinding, hero! Your pet is proud of you!',
    everyMinute: 'Every minute counts. You are building your future!',
    knowledgePower: 'Knowledge is power. Claim it, one session at a time!',
    stayLocked: 'Stay locked in. The streak gods are watching!',
    petBelieves: 'Your pet believes in you. Do not let it down!',
    noSound: 'No Sound', quranAudio: 'Quran Audio', lofiMusic: 'Lo-Fi Music', rainAmbient: 'Rain Ambient',
    sunMode: 'Switch to light mode', moonMode: 'Switch to dark mode', language: 'Language', active: 'ACTIVE', days: 'days', levelCompanion: 'Companion', xp: 'XP', daysShort: 'days', selectSubjectHint: 'Select a subject',
    levelPrefix: 'Lv.', studentLevel: 'Student Level', lifetimeGoldenStars: 'Lifetime Golden Stars', resourceWealth: 'Resource Wealth', studyHours: 'Study Hours', unlockedPets: 'Unlocked Pets', equipmentApparel: 'Equipment & Apparel', equipped: 'EQUIPPED', leaderboard: 'Leaderboard', globalRank: 'Global Rank', regionalRank: 'Regional Rank', internationalRanking: 'International Rankings', regionalRanking: 'Regional Ranking',
    topStudents: 'Top Students', rank: 'Rank', level: 'Level', streak: 'Streak', goldenStars: 'Golden Stars', lifetimeStars: 'Lifetime Stars', region: 'Region',
    safeStudyLounge: 'Safe Study Lounge', studyRooms: 'Study Rooms', physicsMastermindsRoom: 'Physics Masterminds Room', advancedCalculusHub: 'Advanced Calculus Hub',
    javascriptBuildersRoom: 'JavaScript Builders Room', englishConversationStudyRoom: 'English Conversation Study Room', chemistryFocusRoom: 'Chemistry Focus Room', examPreparationRoom: 'Exam Preparation Room',
    activeStudents: 'Active Students', secureRoom: 'Secure Room', verifiedStudentsOnly: 'Verified Students Only', wordFilterActive: 'Word Filter Active', textModerationActive: 'Text Moderation Active',
    moderationLog: 'Moderation Log', reportDisruptiveBehavior: 'Report Disruptive Behavior', report: 'Report', cancel: 'Cancel', submitReport: 'Submit Report', joinRoom: 'Join Room',
    joinedOfflineLobby: 'You joined the offline audio lobby', microphone: 'Microphone', speaker: 'Speaker', volume: 'Volume', leaveRoom: 'Leave Room', offlineLobby: 'Offline Lobby',
    mockLocalStatus: 'Mock / Local Status', moderationActive: 'Moderation Active', automatedWordFiltering: 'Automated Word Filtering: ACTIVE', reportReason: 'Report reason',
    reportSubmitted: 'Report submitted locally.', selectReason: 'Select a reason', reasonDisruption: 'Disruptive behavior', reasonHarassment: 'Harassment or bullying', reasonSpam: 'Spam or repeated disruption',
    localMockNotice: 'Offline mock lounge — no real voice connection is active.', roomDescriptionPhysics: 'Focused problem-solving and physics revision.', roomDescriptionCalculus: 'Advanced calculus practice and exam drills.', roomDescriptionJavaScript: 'Build and review JavaScript projects together.',
    roomDescriptionEnglish: 'Practice English conversation in a study-focused room.', roomDescriptionChemistry: 'Chemistry revision, formulas, and focused problem sets.', roomDescriptionExam: 'Quiet exam preparation and revision planning.', secureLocalLounge: 'Local safety layer',
    noRealVoiceConnection: 'No real-time voice connection', globalStudents: 'Global Students', regionalStudents: 'Regional Students',
    displayName: 'Display Name', chooseAvatar: 'Choose Your Avatar',
    interactiveStats: 'Interactive Stats', studyHoursGoal: 'Study Hours', studyHoursSubtitle: 'Hours focused this week', coinsEarned: 'Coins Earned', coinsEarnedSubtitle: 'Total currency collected', gemsCollected: 'Gems Collected', gemsCollectedSubtitle: 'Premium rewards earned', goalProgress: 'Goal progress',
    companionsTab: 'Companions', skinsTab: 'Character Skins', equip: 'Equip', unequip: 'Unequip', rarityAll: 'All', rarityMythic: 'Mythic', inventorySection: 'Inventory', skinType: 'Skin', petType: 'Pet',
  },
  de: {
    loadingStudyQuest: 'StudyQuest wird geladen...', studyDashboard: 'Lern-Dashboard', myProfile: 'Mein Profil',
    leaderboards: 'Bestenliste', futureSkins: 'Zukünftige Skins', dashboard: 'Dashboard', profile: 'Profil',
    ranks: 'Rangliste', skins: 'Skins', selectASubject: 'Fach auswählen', startFocus: 'Fokus starten', pause: 'Pause',
    reset: 'Zurücksetzen', inFocus: 'Im Fokus', ready: 'Bereit', ambient: 'Hintergrund', dailyStudyGoals: 'Tägliche Lernziele',
    lockInActive: 'Fokus aktiv', studyGoal: 'Lernziel', min: 'Min.', weeklyStreak: 'Wochenserie', companion: 'Begleiter',
    points: 'Punkte', gems: 'Edelsteine', syncing: 'Synchronisierung...', offline: 'Offline', help: 'Hilfe',
    privacy: 'Datenschutz', contact: 'Kontakt', madeWith: 'Erstellt mit', comingSoon: 'Demnächst',
    trackStats: 'Verfolge hier deine Statistiken, Erfolge und Belohnungen.', competeHeroes: 'Tritt gegen andere StudyQuest-Helden an!',
    customizePet: 'Passe dein Haustier an und schalte neue Designs frei!',
    keepGrinding: 'Weiter dranbleiben, Held! Dein Begleiter ist stolz auf dich!',
    everyMinute: 'Jede Minute zählt. Du baust deine Zukunft auf!',
    knowledgePower: 'Wissen ist Macht. Verdiene es, eine Sitzung nach der anderen!',
    stayLocked: 'Bleib fokussiert. Die Streak-Götter schauen zu!', petBelieves: 'Dein Begleiter glaubt an dich. Enttäusche ihn nicht!',
    noSound: 'Kein Ton', quranAudio: 'Koran-Audio', lofiMusic: 'Lo-Fi-Musik', rainAmbient: 'Regengeräusche',
    sunMode: 'In den hellen Modus wechseln', moonMode: 'In den dunklen Modus wechseln', language: 'Sprache', active: 'AKTIV', days: 'Tage', levelCompanion: 'Begleiter', xp: 'EP', daysShort: 'Tage', selectSubjectHint: 'Fach auswählen',
    levelPrefix: 'Lv.', studentLevel: 'Schülerlevel', lifetimeGoldenStars: 'Goldene Sterne insgesamt', resourceWealth: 'Ressourcen', studyHours: 'Lernstunden', unlockedPets: 'Freigeschaltete Begleiter', equipmentApparel: 'Ausrüstung & Kleidung', equipped: 'AUSGERÜSTET', leaderboard: 'Bestenliste', globalRank: 'Globaler Rang', regionalRank: 'Regionaler Rang', internationalRanking: 'Internationale Rangliste', regionalRanking: 'Regionale Rangliste',
    topStudents: 'Top-Schüler', rank: 'Rang', level: 'Level', streak: 'Serie', goldenStars: 'Goldene Sterne', lifetimeStars: 'Sterne insgesamt', region: 'Region',
    safeStudyLounge: 'Sichere Lernlounge', studyRooms: 'Lernräume', physicsMastermindsRoom: 'Physik-Meisterraum', advancedCalculusHub: 'Fortgeschrittene Analysis',
    javascriptBuildersRoom: 'JavaScript-Bauerraum', englishConversationStudyRoom: 'Englisch-Konversationsraum', chemistryFocusRoom: 'Chemie-Fokusraum', examPreparationRoom: 'Prüfungsvorbereitungsraum',
    activeStudents: 'Aktive Schüler', secureRoom: 'Sicherer Raum', verifiedStudentsOnly: 'Nur verifizierte Schüler', wordFilterActive: 'Wortfilter aktiv', textModerationActive: 'Textmoderation aktiv',
    moderationLog: 'Moderationsprotokoll', reportDisruptiveBehavior: 'Störendes Verhalten melden', report: 'Melden', cancel: 'Abbrechen', submitReport: 'Meldung senden', joinRoom: 'Raum beitreten',
    joinedOfflineLobby: 'Du bist der Offline-Audio-Lounge beigetreten', microphone: 'Mikrofon', speaker: 'Lautsprecher', volume: 'Lautstärke', leaveRoom: 'Raum verlassen', offlineLobby: 'Offline-Lounge',
    mockLocalStatus: 'Demo / Lokalstatus', moderationActive: 'Moderation aktiv', automatedWordFiltering: 'Automatischer Wortfilter: AKTIV', reportReason: 'Meldegrund',
    reportSubmitted: 'Meldung lokal übermittelt.', selectReason: 'Grund auswählen', reasonDisruption: 'Störendes Verhalten', reasonHarassment: 'Belästigung oder Mobbing', reasonSpam: 'Spam oder wiederholte Störung',
    localMockNotice: 'Offline-Demo-Lounge — keine echte Sprachverbindung ist aktiv.', roomDescriptionPhysics: 'Konzentriertes Problemlösen und Physik-Wiederholung.', roomDescriptionCalculus: 'Fortgeschrittene Analysis und Prüfungsübungen.', roomDescriptionJavaScript: 'JavaScript-Projekte gemeinsam bauen und wiederholen.',
    roomDescriptionEnglish: 'Englische Konversation in einem lernorientierten Raum üben.', roomDescriptionChemistry: 'Chemie-Wiederholung, Formeln und konzentrierte Aufgaben.', roomDescriptionExam: 'Ruhige Prüfungsvorbereitung und Lernplanung.', secureLocalLounge: 'Lokale Sicherheitsebene',
    noRealVoiceConnection: 'Keine Echtzeit-Sprachverbindung', globalStudents: 'Globale Schüler', regionalStudents: 'Regionale Schüler',
    displayName: 'Anzeigename', chooseAvatar: 'Wähle deinen Avatar',
    interactiveStats: 'Interaktive Statistiken', studyHoursGoal: 'Lernstunden', studyHoursSubtitle: 'Fokusstunden diese Woche', coinsEarned: 'Verdiente Münzen', coinsEarnedSubtitle: 'Gesammelte Währung', gemsCollected: 'Gesammelte Edelsteine', gemsCollectedSubtitle: 'Premium-Belohnungen', goalProgress: 'Zielfortschritt',
    companionsTab: 'Begleiter', skinsTab: 'Charakter-Skins', equip: 'Ausrüsten', unequip: 'Ablegen', rarityAll: 'Alle', rarityMythic: 'Mythisch', inventorySection: 'Inventar', skinType: 'Skin', petType: 'Haustier',
  },
  ja: {
    loadingStudyQuest: 'StudyQuestを読み込んでいます...', studyDashboard: '学習ダッシュボード', myProfile: 'マイプロフィール',
    leaderboards: 'ランキング', futureSkins: '今後のスキン', dashboard: 'ダッシュボード', profile: 'プロフィール',
    ranks: 'ランキング', skins: 'スキン', selectASubject: '科目を選択', startFocus: '集中を開始', pause: '一時停止',
    reset: 'リセット', inFocus: '集中中', ready: '準備完了', ambient: '環境音', dailyStudyGoals: '今日の学習目標',
    lockInActive: '集中モード中', studyGoal: '学習目標', min: '分', weeklyStreak: '週間ストリーク', companion: '仲間',
    points: 'ポイント', gems: 'ジェム', syncing: '同期中...', offline: 'オフライン', help: 'ヘルプ', privacy: 'プライバシー',
    contact: 'お問い合わせ', madeWith: '制作', comingSoon: '近日公開', trackStats: 'ここで統計、実績、報酬を確認できます。',
    competeHeroes: 'StudyQuestの仲間たちと競おう！', customizePet: 'ペットをカスタマイズして新しいテーマを解放しよう！',
    keepGrinding: 'その調子！あなたの仲間も誇りに思っています！', everyMinute: '一分一秒が大切。未来を築いています！',
    knowledgePower: '知識は力。一回のセッションずつ積み上げよう！', stayLocked: '集中を続けよう。ストリークの神々が見ています！',
    petBelieves: 'あなたの仲間は信じています。期待に応えよう！', noSound: '無音', quranAudio: 'クルアーン音声',
    lofiMusic: 'Lo-Fi音楽', rainAmbient: '雨の環境音', sunMode: 'ライトモードに切り替え', moonMode: 'ダークモードに切り替え', language: '言語', active: 'アクティブ', days: '日', levelCompanion: '仲間', xp: 'XP', daysShort: '日', selectSubjectHint: '科目を選択',
    levelPrefix: 'Lv.', studentLevel: '学生レベル', lifetimeGoldenStars: '累計ゴールデンスター', resourceWealth: 'リソース', studyHours: '学習時間', unlockedPets: '解放済みペット', equipmentApparel: '装備とアパレル', equipped: '装備中', leaderboard: 'ランキング', globalRank: '世界ランキング', regionalRank: '地域ランキング', internationalRanking: '国際ランキング', regionalRanking: '地域別ランキング',
    topStudents: '上位の学生', rank: '順位', level: 'レベル', streak: '連続記録', goldenStars: 'ゴールドスター', lifetimeStars: '累計スター', region: '地域',
    safeStudyLounge: '安全な学習ラウンジ', studyRooms: '学習ルーム', physicsMastermindsRoom: '物理マスターズルーム', advancedCalculusHub: '上級微積分ハブ',
    javascriptBuildersRoom: 'JavaScriptビルダーズルーム', englishConversationStudyRoom: '英会話学習ルーム', chemistryFocusRoom: '化学集中ルーム', examPreparationRoom: '試験対策ルーム',
    activeStudents: '参加中の学生', secureRoom: '安全なルーム', verifiedStudentsOnly: '認証済み学生のみ', wordFilterActive: 'ワードフィルター有効', textModerationActive: 'テキストモデレーション有効',
    moderationLog: 'モデレーションログ', reportDisruptiveBehavior: '迷惑行為を報告', report: '報告', cancel: 'キャンセル', submitReport: '報告を送信', joinRoom: 'ルームに参加',
    joinedOfflineLobby: 'オフライン音声ラウンジに参加しました', microphone: 'マイク', speaker: 'スピーカー', volume: '音量', leaveRoom: '退出', offlineLobby: 'オフラインラウンジ',
    mockLocalStatus: 'モック / ローカル状態', moderationActive: 'モデレーション有効', automatedWordFiltering: '自動ワードフィルター: 有効', reportReason: '報告理由',
    reportSubmitted: '報告をローカルで送信しました。', selectReason: '理由を選択', reasonDisruption: '迷惑行為', reasonHarassment: '嫌がらせ・いじめ', reasonSpam: 'スパム・繰り返しの迷惑行為',
    localMockNotice: 'オフラインのモックラウンジ — 実際の音声接続はありません。', roomDescriptionPhysics: '物理の問題演習と復習に集中します。', roomDescriptionCalculus: '上級微積分の練習と試験対策です。', roomDescriptionJavaScript: 'JavaScriptプロジェクトを一緒に作り、復習します。',
    roomDescriptionEnglish: '学習に集中した部屋で英会話を練習します。', roomDescriptionChemistry: '化学の復習、公式、集中問題演習です。', roomDescriptionExam: '静かな試験対策と復習計画のための部屋です。', secureLocalLounge: 'ローカル安全レイヤー',
    noRealVoiceConnection: 'リアルタイム音声接続なし', globalStudents: '世界の学生', regionalStudents: '地域の学生',
    displayName: '表示名', chooseAvatar: 'アバターを選択',
    interactiveStats: 'インタラクティブ統計', studyHoursGoal: '学習時間', studyHoursSubtitle: '今週の集中時間', coinsEarned: '獲得コイン', coinsEarnedSubtitle: '獲得した通貨', gemsCollected: '収集したジェム', gemsCollectedSubtitle: 'プレミアム報酬', goalProgress: '目標の進捗',
    companionsTab: '仲間', skinsTab: 'キャラクタースキン', equip: '装備', unequip: '装備解除', rarityAll: 'すべて', rarityMythic: '神話', inventorySection: '在庫', skinType: 'スキン', petType: 'ペット',
  },
  ar: {
    loadingStudyQuest: 'جارٍ تحميل StudyQuest...', studyDashboard: 'لوحة الدراسة', myProfile: 'ملفي الشخصي',
    leaderboards: 'لوحة المتصدرين', futureSkins: 'الأشكال المستقبلية', dashboard: 'لوحة التحكم', profile: 'الملف الشخصي',
    ranks: 'الترتيب', skins: 'الأشكال', selectASubject: 'اختر مادة', startFocus: 'ابدأ التركيز', pause: 'إيقاف مؤقت',
    reset: 'إعادة ضبط', inFocus: 'في وضع التركيز', ready: 'جاهز', ambient: 'الصوت المحيط', dailyStudyGoals: 'أهداف الدراسة اليومية',
    lockInActive: 'وضع التركيز نشط', studyGoal: 'هدف الدراسة', min: 'دقيقة', weeklyStreak: 'سلسلة الأسبوع', companion: 'الرفيق',
    points: 'النقاط', gems: 'الجواهر', syncing: 'جارٍ المزامنة...', offline: 'غير متصل', help: 'المساعدة', privacy: 'الخصوصية',
    contact: 'تواصل معنا', madeWith: 'صُنع بـ', comingSoon: 'قريبًا', trackStats: 'تابع إحصاءاتك وإنجازاتك ومكافآتك هنا.',
    competeHeroes: 'نافس أبطال StudyQuest الآخرين!', customizePet: 'خصص رفيقك وافتح أشكالًا جديدة!',
    keepGrinding: 'استمر يا بطل! رفيقك فخور بك!', everyMinute: 'كل دقيقة مهمة. أنت تبني مستقبلك!',
    knowledgePower: 'المعرفة قوة. اجمعها جلسة بعد جلسة!', stayLocked: 'حافظ على تركيزك. آلهة السلسلة تراقبك!',
    petBelieves: 'رفيقك يؤمن بك. لا تخذله!', noSound: 'بدون صوت', quranAudio: 'صوت القرآن', lofiMusic: 'موسيقى Lo-Fi',
    rainAmbient: 'صوت المطر', sunMode: 'التبديل إلى الوضع الفاتح', moonMode: 'التبديل إلى الوضع الداكن', language: 'اللغة', active: 'نشط', days: 'أيام', levelCompanion: 'الرفيق', xp: 'نقاط خبرة', daysShort: 'أيام', selectSubjectHint: 'اختر مادة',
    levelPrefix: 'المستوى', studentLevel: 'مستوى الطالب', lifetimeGoldenStars: 'النجوم الذهبية الإجمالية', resourceWealth: 'الموارد', studyHours: 'ساعات الدراسة', unlockedPets: 'الحيوانات الأليفة المفتوحة', equipmentApparel: 'المعدات والملابس', equipped: 'مجهز', leaderboard: 'لوحة المتصدرين', globalRank: 'الترتيب العالمي', regionalRank: 'الترتيب الإقليمي', internationalRanking: 'التصنيف الدولي', regionalRanking: 'التصنيف الإقليمي',
    topStudents: 'أفضل الطلاب', rank: 'الترتيب', level: 'المستوى', streak: 'السلسلة', goldenStars: 'النجوم الذهبية', lifetimeStars: 'إجمالي النجوم', region: 'المنطقة',
    safeStudyLounge: 'صالة الدراسة الآمنة', studyRooms: 'غرف الدراسة', physicsMastermindsRoom: 'غرفة عباقرة الفيزياء', advancedCalculusHub: 'مركز التفاضل والتكامل المتقدم',
    javascriptBuildersRoom: 'غرفة مطوري JavaScript', englishConversationStudyRoom: 'غرفة دراسة المحادثة الإنجليزية', chemistryFocusRoom: 'غرفة التركيز على الكيمياء', examPreparationRoom: 'غرفة الاستعداد للامتحانات',
    activeStudents: 'الطلاب النشطون', secureRoom: 'غرفة آمنة', verifiedStudentsOnly: 'للطلاب الموثقين فقط', wordFilterActive: 'فلتر الكلمات نشط', textModerationActive: 'مراجعة النصوص نشطة',
    moderationLog: 'سجل الإشراف', reportDisruptiveBehavior: 'الإبلاغ عن السلوك المزعج', report: 'إبلاغ', cancel: 'إلغاء', submitReport: 'إرسال البلاغ', joinRoom: 'انضم للغرفة',
    joinedOfflineLobby: 'انضممت إلى صالة الصوت غير المتصلة', microphone: 'الميكروفون', speaker: 'مكبر الصوت', volume: 'مستوى الصوت', leaveRoom: 'مغادرة الغرفة', offlineLobby: 'الصالة غير المتصلة',
    mockLocalStatus: 'حالة تجريبية / محلية', moderationActive: 'الإشراف نشط', automatedWordFiltering: 'فلترة الكلمات تلقائيًا: نشطة', reportReason: 'سبب البلاغ',
    reportSubmitted: 'تم إرسال البلاغ محليًا.', selectReason: 'اختر سببًا', reasonDisruption: 'سلوك مزعج', reasonHarassment: 'مضايقة أو تنمر', reasonSpam: 'رسائل مزعجة أو إزعاج متكرر',
    localMockNotice: 'صالة تجريبية غير متصلة — لا يوجد اتصال صوتي حقيقي.', roomDescriptionPhysics: 'حل مسائل الفيزياء ومراجعتها بتركيز.', roomDescriptionCalculus: 'تدريب متقدم على التفاضل والتكامل واختبارات الامتحان.', roomDescriptionJavaScript: 'ابنِ وراجع مشاريع JavaScript معًا.',
    roomDescriptionEnglish: 'تدرّب على المحادثة الإنجليزية في غرفة مخصصة للدراسة.', roomDescriptionChemistry: 'مراجعة الكيمياء والقوانين وحل المسائل بتركيز.', roomDescriptionExam: 'استعداد هادئ للامتحانات وتخطيط المراجعة.', secureLocalLounge: 'طبقة أمان محلية',
    noRealVoiceConnection: 'لا يوجد اتصال صوتي مباشر', globalStudents: 'الطلاب عالميًا', regionalStudents: 'الطلاب إقليميًا',
    displayName: 'اسم العرض', chooseAvatar: 'اختر صورتك الرمزية',
    interactiveStats: 'إحصائات تفاعلية', studyHoursGoal: 'ساعات الدراسة', studyHoursSubtitle: 'ساعات التركيز هذا الأسبوع', coinsEarned: 'العملات المكتسبة', coinsEarnedSubtitle: 'إجمالي العملات المجموعة', gemsCollected: 'الجواهر المجموعة', gemsCollectedSubtitle: 'مكافآت مميزة مكتسبة', goalProgress: 'تقدم الهدف',
    companionsTab: 'الرفقاء', skinsTab: 'أشكال الشخصية', equip: 'تجهيز', unequip: 'إزالة', rarityAll: 'الكل', rarityMythic: 'أسطوري', inventorySection: 'المخزون', skinType: 'شكل', petType: 'حيوان',
  },
  fr: {
    loadingStudyQuest: 'Chargement de StudyQuest...', studyDashboard: 'Tableau de bord', myProfile: 'Mon profil',
    leaderboards: 'Classement', futureSkins: 'Futurs skins', dashboard: 'Tableau de bord', profile: 'Profil', ranks: 'Classement',
    skins: 'Skins', selectASubject: 'Choisir une matière', startFocus: 'Commencer la concentration', pause: 'Pause', reset: 'Réinitialiser',
    inFocus: 'En concentration', ready: 'Prêt', ambient: 'Ambiance', dailyStudyGoals: 'Objectifs d’étude du jour', lockInActive: 'Concentration active',
    studyGoal: 'Objectif d’étude', min: 'min', weeklyStreak: 'Série de la semaine', companion: 'Compagnon', points: 'Points', gems: 'Gemmes',
    syncing: 'Synchronisation...', offline: 'Hors ligne', help: 'Aide', privacy: 'Confidentialité', contact: 'Contact', madeWith: 'Créé avec',
    comingSoon: 'Bientôt disponible', trackStats: 'suivez ici vos statistiques, succès et récompenses.', competeHeroes: 'affrontez les autres héros de StudyQuest !',
    customizePet: 'personnalisez votre compagnon et débloquez de nouveaux thèmes !',
    keepGrinding: 'Continue, héros ! Ton compagnon est fier de toi !', everyMinute: 'Chaque minute compte. Tu construis ton avenir !',
    knowledgePower: 'Le savoir est une force. Gagne-le session après session !', stayLocked: 'Reste concentré. Les dieux de la série te regardent !',
    petBelieves: 'Ton compagnon croit en toi. Ne le déçois pas !', noSound: 'Aucun son', quranAudio: 'Audio du Coran', lofiMusic: 'Musique Lo-Fi',
    rainAmbient: 'Ambiance pluie', sunMode: 'Passer au mode clair', moonMode: 'Passer au mode sombre', language: 'Langue', active: 'ACTIF', days: 'jours', levelCompanion: 'Compagnon', xp: 'XP', daysShort: 'jours', selectSubjectHint: 'Choisir une matière',
    levelPrefix: 'Niv.', studentLevel: 'Niveau de l’élève', lifetimeGoldenStars: 'Étoiles dorées cumulées', resourceWealth: 'Ressources', studyHours: 'Heures d’étude', unlockedPets: 'Animaux débloqués', equipmentApparel: 'Équipement et vêtements', equipped: 'ÉQUIPÉ', leaderboard: 'Classement', globalRank: 'Classement mondial', regionalRank: 'Classement régional', internationalRanking: 'Classement international', regionalRanking: 'Classement régional',
    topStudents: 'Meilleurs élèves', rank: 'Rang', level: 'Niveau', streak: 'Série', goldenStars: 'Étoiles dorées', lifetimeStars: 'Étoiles cumulées', region: 'Région',
    safeStudyLounge: 'Salon d’étude sécurisé', studyRooms: 'Salles d’étude', physicsMastermindsRoom: 'Salle des maîtres de physique', advancedCalculusHub: 'Hub de calcul avancé',
    javascriptBuildersRoom: 'Salle des builders JavaScript', englishConversationStudyRoom: 'Salle d’étude de conversation anglaise', chemistryFocusRoom: 'Salle de concentration en chimie', examPreparationRoom: 'Salle de préparation aux examens',
    activeStudents: 'Élèves actifs', secureRoom: 'Salle sécurisée', verifiedStudentsOnly: 'Élèves vérifiés uniquement', wordFilterActive: 'Filtre de mots actif', textModerationActive: 'Modération des textes active',
    moderationLog: 'Journal de modération', reportDisruptiveBehavior: 'Signaler un comportement perturbateur', report: 'Signaler', cancel: 'Annuler', submitReport: 'Envoyer le signalement', joinRoom: 'Rejoindre la salle',
    joinedOfflineLobby: 'Vous avez rejoint le salon audio hors ligne', microphone: 'Microphone', speaker: 'Haut-parleur', volume: 'Volume', leaveRoom: 'Quitter la salle', offlineLobby: 'Salon hors ligne',
    mockLocalStatus: 'État simulé / local', moderationActive: 'Modération active', automatedWordFiltering: 'Filtrage automatique des mots : ACTIF', reportReason: 'Motif du signalement',
    reportSubmitted: 'Signalement envoyé localement.', selectReason: 'Choisir un motif', reasonDisruption: 'Comportement perturbateur', reasonHarassment: 'Harcèlement ou intimidation', reasonSpam: 'Spam ou perturbations répétées',
    localMockNotice: 'Salon simulé hors ligne — aucune connexion vocale réelle.', roomDescriptionPhysics: 'Résolution de problèmes et révision de physique.', roomDescriptionCalculus: 'Pratique avancée du calcul et exercices d’examen.', roomDescriptionJavaScript: 'Construisez et révisez des projets JavaScript ensemble.',
    roomDescriptionEnglish: 'Pratiquez la conversation anglaise dans une salle axée sur les études.', roomDescriptionChemistry: 'Révision de chimie, formules et exercices ciblés.', roomDescriptionExam: 'Préparation calme aux examens et planification des révisions.', secureLocalLounge: 'Couche de sécurité locale',
    noRealVoiceConnection: 'Aucune connexion vocale en temps réel', globalStudents: 'Élèves du monde', regionalStudents: 'Élèves de la région',
    displayName: 'Nom affiché', chooseAvatar: 'Choisis ton avatar',
    interactiveStats: 'Statistiques interactives', studyHoursGoal: 'Heures d’étude', studyHoursSubtitle: 'Heures de concentration cette semaine', coinsEarned: 'Pièces gagnées', coinsEarnedSubtitle: 'Monnaie totale collectée', gemsCollected: 'Gemmes collectées', gemsCollectedSubtitle: 'Récompenses premium gagnées', goalProgress: 'Progression de l’objectif',
    companionsTab: 'Compagnons', skinsTab: 'Skins de personnage', equip: 'Équiper', unequip: 'Retirer', rarityAll: 'Tous', rarityMythic: 'Mythique', inventorySection: 'Inventaire', skinType: 'Skin', petType: 'Animal',
  },
};



export const SUBJECT_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  Mathematics: { en: 'Mathematics', de: 'Mathematik', ja: '数学', ar: 'الرياضيات', fr: 'Mathématiques' },
  'Computer Science': { en: 'Computer Science', de: 'Informatik', ja: 'コンピューターサイエンス', ar: 'علوم الحاسوب', fr: 'Informatique' },
  Physics: { en: 'Physics', de: 'Physik', ja: '物理', ar: 'الفيزياء', fr: 'Physique' },
  Arabic: { en: 'Arabic', de: 'Arabisch', ja: 'アラビア語', ar: 'العربية', fr: 'Arabe' },
};

export const WEEKDAY_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  Sun: { en: 'Sun', de: 'So', ja: '日', ar: 'الأحد', fr: 'Dim' },
  Mon: { en: 'Mon', de: 'Mo', ja: '月', ar: 'الإثنين', fr: 'Lun' },
  Tue: { en: 'Tue', de: 'Di', ja: '火', ar: 'الثلاثاء', fr: 'Mar' },
  Wed: { en: 'Wed', de: 'Mi', ja: '水', ar: 'الأربعاء', fr: 'Mer' },
  Thu: { en: 'Thu', de: 'Do', ja: '木', ar: 'الخميس', fr: 'Jeu' },
  Fri: { en: 'Fri', de: 'Fr', ja: '金', ar: 'الجمعة', fr: 'Ven' },
  Sat: { en: 'Sat', de: 'Sa', ja: '土', ar: 'السبت', fr: 'Sam' },
};

export const AMBIENT_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  none: { en: 'No Sound', de: 'Kein Ton', ja: '無音', ar: 'بدون صوت', fr: 'Aucun son' },
  quran: { en: 'Quran Audio', de: 'Koran-Audio', ja: 'クルアーン音声', ar: 'تلاوة القرآن', fr: 'Audio du Coran' },
  lofi: { en: 'Lo-Fi Music', de: 'Lo-Fi-Musik', ja: 'Lo-Fi音楽', ar: 'موسيقى Lo-Fi', fr: 'Musique Lo-Fi' },
  rain: { en: 'Rain Ambient', de: 'Regengeräusche', ja: '雨の環境音', ar: 'أجواء المطر', fr: 'Ambiance pluie' },
};

export const PET_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  Sparky: { en: 'Sparky', de: 'Sparky', ja: 'スパーキー', ar: 'سباركي', fr: 'Sparky' },
  'Volcanic Pup': { en: 'Volcanic Pup', de: 'Vulkanwelpe', ja: '火山の子犬', ar: 'جرو بركاني', fr: 'Chiot volcanique' },
  'Frost Kit': { en: 'Frost Kit', de: 'Frost-Kätzchen', ja: '氷の子ギツネ', ar: 'هر صغير جليدي', fr: 'Petit renard givré' },
  'Aqua Turtle': { en: 'Aqua Turtle', de: 'Wasserschildkröte', ja: 'アクアタートル', ar: 'سلحفاة مائية', fr: 'Tortue aquatique' },
  'Shadow Wyrm': { en: 'Shadow Wyrm', de: 'Schattenwyrm', ja: 'シャドウワーム', ar: 'تنين الظلال', fr: 'Wyrm de l’ombre' },
  'Celestial Phoenix': { en: 'Celestial Phoenix', de: 'Himmlischer Phönix', ja: '天上の不死鳥', ar: 'العنقاء السماوية', fr: 'Phénix céleste' },
};

export const SKIN_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Cyber Hoodie': { en: 'Cyber Hoodie', de: 'Cyber-Hoodie', ja: 'サイバーパーカー', ar: 'هودي سايبر', fr: 'Sweat cyber' },
  'Neon Shades': { en: 'Neon Shades', de: 'Neon-Brille', ja: 'ネオンシェード', ar: 'نظارة نيون', fr: 'Lunettes néon' },
  'Golden Crown': { en: 'Golden Crown', de: 'Goldene Krone', ja: '黄金の王冠', ar: 'تاج ذهبي', fr: 'Couronne dorée' },
  Horse: { en: 'Horse', de: 'Pferd', ja: '馬', ar: 'حصان', fr: 'Cheval' },
  Lada: { en: 'Lada', de: 'Lada', ja: 'ラーダ', ar: 'لادا', fr: 'Lada' },
  'Winter Scarf': { en: 'Winter Scarf', de: 'Winterschal', ja: '冬のマフラー', ar: 'وشاح شتوي', fr: 'Écharpe d’hiver' },
  'Fancy Monocle': { en: 'Fancy Monocle', de: 'Edler Monokel', ja: 'おしゃれなモノクル', ar: 'عدسة أحادية أنيقة', fr: 'Monocle élégant' },
  'Wizard Hat': { en: 'Wizard Hat', de: 'Zauberhut', ja: '魔法使いの帽子', ar: 'قبعة ساحر', fr: 'Chapeau de sorcier' },
};

export const RARITY_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  Common: { en: 'Common', de: 'Gewöhnlich', ja: 'コモン', ar: 'عادي', fr: 'Commun' },
  Rare: { en: 'Rare', de: 'Selten', ja: 'レア', ar: 'نادر', fr: 'Rare' },
  Epic: { en: 'Epic', de: 'Episch', ja: 'エピック', ar: 'ملحمي', fr: 'Épique' },
  Legendary: { en: 'Legendary', de: 'Legendär', ja: 'レジェンド', ar: 'أسطوري', fr: 'Légendaire' },
  Mythic: { en: 'Mythic', de: 'Mythisch', ja: '神話', ar: 'خرافي', fr: 'Mythique' },
};

export const SKIN_CATEGORY_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  clothes: { en: 'Clothes', de: 'Kleidung', ja: '服', ar: 'ملابس', fr: 'Vêtements' },
  glasses: { en: 'Glasses', de: 'Brille', ja: 'メガネ', ar: 'نظارات', fr: 'Lunettes' },
  crown: { en: 'Crown', de: 'Krone', ja: '王冠', ar: 'تاج', fr: 'Couronne' },
  vehicle: { en: 'Vehicle', de: 'Fahrzeug', ja: '乗り物', ar: 'مركبة', fr: 'Véhicule' },
};

const SUBJECT_CANONICAL_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(SUBJECT_TRANSLATIONS).flatMap(([canonical, translations]) =>
    Object.values(translations).map((name) => [name, canonical])
  )
);

const WEEKDAY_CANONICAL_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(WEEKDAY_TRANSLATIONS).flatMap(([canonical, translations]) =>
    Object.values(translations).map((name) => [name, canonical])
  )
);

const AMBIENT_CANONICAL_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(AMBIENT_TRANSLATIONS).flatMap(([canonical, translations]) =>
    Object.values(translations).map((name) => [name, canonical])
  )
);

const PET_CANONICAL_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(PET_TRANSLATIONS).flatMap(([canonical, translations]) =>
    Object.values(translations).map((name) => [name, canonical])
  )
);

const SKIN_CANONICAL_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(SKIN_TRANSLATIONS).flatMap(([canonical, translations]) =>
    Object.values(translations).map((name) => [name, canonical])
  )
);

export function translateSubjectName(name: string, target: LanguageCode): string {
  const canonical = SUBJECT_CANONICAL_NAMES[name] ?? name;
  return SUBJECT_TRANSLATIONS[canonical]?.[target] ?? name;
}

export function translateWeekday(day: string, target: LanguageCode): string {
  const canonical = WEEKDAY_CANONICAL_NAMES[day] ?? day;
  return WEEKDAY_TRANSLATIONS[canonical]?.[target] ?? day;
}

export function translateAmbientLabel(labelOrValue: string, target: LanguageCode): string {
  const canonical = AMBIENT_CANONICAL_NAMES[labelOrValue] ?? labelOrValue;
  return AMBIENT_TRANSLATIONS[canonical]?.[target] ?? labelOrValue;
}

export function translatePetName(name: string, target: LanguageCode): string {
  const canonical = PET_CANONICAL_NAMES[name] ?? name;
  return PET_TRANSLATIONS[canonical]?.[target] ?? name;
}

export function translateSkinName(name: string, target: LanguageCode): string {
  const canonical = SKIN_CANONICAL_NAMES[name] ?? name;
  return SKIN_TRANSLATIONS[canonical]?.[target] ?? name;
}

export function translateRarity(rarity: string, target: LanguageCode): string {
  return RARITY_TRANSLATIONS[rarity]?.[target] ?? rarity;
}

export function translateSkinCategory(category: string, target: LanguageCode): string {
  return SKIN_CATEGORY_TRANSLATIONS[category]?.[target] ?? category;
}

export type Translate = (key: TranslationKey) => string;
