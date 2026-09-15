import { useMemo, useState } from 'react';
import { Flag, Mic, MicOff, Volume2, ShieldCheck, Filter, FileCheck2, FlagTriangleRight, Users, Trophy, Globe2, MapPin, X, CheckCircle2 } from 'lucide-react';

type TranslationFn = (key: string) => string;

type LeaderboardStudent = {
  id: string;
  username: string;
  avatar: string;
  level: number;
  streak: number;
  goldenStars: number;
  rank: number;
  region: string;
};

type Room = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  subjectKey: string;
  students: number;
  avatars: string[];
};

const STUDENTS: LeaderboardStudent[] = [
  { id: 's1', username: 'NovaMind', avatar: '🧑‍🚀', level: 18, streak: 42, goldenStars: 1260, rank: 1, region: 'Egypt' },
  { id: 's2', username: 'KiraStudy', avatar: '👩‍💻', level: 16, streak: 37, goldenStars: 1125, rank: 2, region: 'Japan' },
  { id: 's3', username: 'VoltLearner', avatar: '🧑‍🔬', level: 15, streak: 34, goldenStars: 980, rank: 3, region: 'Germany' },
  { id: 's4', username: 'LumiNotes', avatar: '👩‍🎓', level: 14, streak: 31, goldenStars: 875, rank: 4, region: 'France' },
  { id: 's5', username: 'CodeSage', avatar: '🧑‍💻', level: 13, streak: 29, goldenStars: 810, rank: 5, region: 'Egypt' },
  { id: 's6', username: 'FocusFox', avatar: '🦊', level: 12, streak: 27, goldenStars: 745, rank: 6, region: 'Egypt' },
  { id: 's7', username: 'Astra', avatar: '🧑‍🚀', level: 11, streak: 24, goldenStars: 690, rank: 7, region: 'Japan' },
  { id: 's8', username: 'ChemChamp', avatar: '🧪', level: 10, streak: 22, goldenStars: 625, rank: 8, region: 'Germany' },
];

const ROOMS: Room[] = [
  { id: 'physics', nameKey: 'physicsMastermindsRoom', descriptionKey: 'roomDescriptionPhysics', subjectKey: 'physicsMastermindsRoom', students: 18, avatars: ['🧑‍🔬', '👩‍🔬', '🧑‍🎓', '👨‍💻'] },
  { id: 'calculus', nameKey: 'advancedCalculusHub', descriptionKey: 'roomDescriptionCalculus', subjectKey: 'advancedCalculusHub', students: 12, avatars: ['👩‍🎓', '🧑‍🏫', '🧑‍💻', '👩‍💻'] },
  { id: 'javascript', nameKey: 'javascriptBuildersRoom', descriptionKey: 'roomDescriptionJavaScript', subjectKey: 'javascriptBuildersRoom', students: 24, avatars: ['👨‍💻', '🧑‍💻', '👩‍💻', '🧑‍🚀'] },
  { id: 'english', nameKey: 'englishConversationStudyRoom', descriptionKey: 'roomDescriptionEnglish', subjectKey: 'englishConversationStudyRoom', students: 15, avatars: ['👩‍🎓', '🧑‍🎓', '👨‍💼', '👩‍💼'] },
  { id: 'chemistry', nameKey: 'chemistryFocusRoom', descriptionKey: 'roomDescriptionChemistry', subjectKey: 'chemistryFocusRoom', students: 10, avatars: ['🧪', '👩‍🔬', '🧑‍🔬', '👨‍🎓'] },
  { id: 'exam', nameKey: 'examPreparationRoom', descriptionKey: 'roomDescriptionExam', subjectKey: 'examPreparationRoom', students: 31, avatars: ['🧑‍🎓', '👩‍🎓', '🧑‍💻', '👨‍🎓'] },
];

const PODIUM_STYLES = {
  1: 'border-neon-amber/50 bg-neon-amber/10 shadow-[0_0_28px_rgba(255,170,0,0.16)]',
  2: 'border-slate-300/40 bg-slate-300/5 shadow-[0_0_22px_rgba(203,213,225,0.10)]',
  3: 'border-orange-500/40 bg-orange-500/5 shadow-[0_0_22px_rgba(249,115,22,0.10)]',
} as const;

export default function Leaderboard({ t }: { t: TranslationFn }) {
  const [rankMode, setRankMode] = useState<'global' | 'regional'>('global');
  const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [volume, setVolume] = useState(72);
  const [reportRoomId, setReportRoomId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reported, setReported] = useState(false);

  const visibleStudents = useMemo(() => {
    if (rankMode === 'global') return STUDENTS;
    return STUDENTS.filter((student) => student.region === 'Egypt').map((student, index) => ({ ...student, rank: index + 1 }));
  }, [rankMode]);

  const podium = visibleStudents.slice(0, 3);
  const rest = visibleStudents.slice(3);
  const joinedRoom = ROOMS.find((room) => room.id === joinedRoomId) ?? null;
  const reportRoom = ROOMS.find((room) => room.id === reportRoomId) ?? null;

  const joinRoom = (roomId: string) => {
    setJoinedRoomId(roomId);
    setMicEnabled(true);
    setVolume(72);
  };

  const closeReport = () => {
    setReportRoomId(null);
    setReportReason('');
    setReported(false);
  };

  const submitReport = () => {
    if (!reportReason) return;
    setReported(true);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-8">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-neon-cyan mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{t('leaderboard')}</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-200">{t('topStudents')}</h1>
            <p className="text-sm text-gray-500 mt-1">{rankMode === 'global' ? t('internationalRanking') : t('regionalRanking')}</p>
          </div>
          <div className="inline-flex p-1 rounded-xl glass border border-white/10 self-start md:self-auto">
            <button onClick={() => setRankMode('global')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${rankMode === 'global' ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-gray-500'}`}>
              <Globe2 className="w-4 h-4" /> {t('globalRank')}
            </button>
            <button onClick={() => setRankMode('regional')} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${rankMode === 'regional' ? 'bg-neon-emerald/10 text-neon-emerald' : 'text-gray-500'}`}>
              <MapPin className="w-4 h-4" /> {t('regionalRank')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          {podium.map((student) => (
            <div key={student.id} className={`rounded-2xl border p-5 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 ${PODIUM_STYLES[student.rank as 1|2|3]}`}>
              <div className="text-4xl mb-2">{student.avatar}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">#{student.rank}</div>
              <div className="font-display font-bold text-gray-200">{student.username}</div>
              <div className="text-xs text-gray-500 mt-1">{t('level')} {student.level} · {student.streak} {t('days')}</div>
              <div className="mt-3 font-mono font-bold text-neon-amber">⭐ {student.goldenStars.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl glass border border-white/10 overflow-hidden">
          <div className="grid grid-cols-[3rem_1fr_4.5rem_5.5rem_5rem] gap-2 px-4 py-3 border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-500">
            <span>{t('rank')}</span><span>{t('topStudents')}</span><span>{t('level')}</span><span>{t('streak')}</span><span>{t('goldenStars')}</span>
          </div>
          {rest.map((student) => (
            <div key={student.id} className="grid grid-cols-[3rem_1fr_4.5rem_5.5rem_5rem] gap-2 items-center px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03]">
              <span className="font-mono text-sm text-gray-500">#{student.rank}</span>
              <div className="flex items-center gap-2 min-w-0"><span className="text-xl">{student.avatar}</span><span className="font-semibold text-sm text-gray-200 truncate">{student.username}</span></div>
              <span className="text-xs text-gray-400">{student.level}</span>
              <span className="text-xs text-gray-400">{student.streak}d</span>
              <span className="text-xs font-mono font-bold text-neon-amber">⭐{student.goldenStars}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 text-neon-emerald mb-2"><Users className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-[0.2em]">{t('safeStudyLounge')}</span></div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold text-gray-200">{t('studyRooms')}</h2>
          <p className="text-xs text-gray-500 mt-1">{t('localMockNotice')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ROOMS.map((room) => (
            <article key={room.id} className="rounded-2xl glass border border-white/10 p-4 flex flex-col gap-4 hover:border-neon-emerald/25 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><h3 className="font-display font-bold text-sm text-gray-200">{t(room.nameKey)}</h3><p className="text-[11px] text-neon-cyan mt-1">{t(room.subjectKey)}</p></div>
                <span className="shrink-0 flex items-center gap-1 text-[10px] text-neon-emerald"><ShieldCheck className="w-3.5 h-3.5" /> {t('secureRoom')}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{t(room.descriptionKey)}</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2 rtl:space-x-reverse">{room.avatars.map((avatar, i) => <span key={i} className="w-7 h-7 rounded-full bg-ink-700 border-2 border-ink-800 flex items-center justify-center text-sm">{avatar}</span>)}</div>
                <span className="text-xs text-gray-500">{room.students} {t('activeStudents')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-500">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-neon-emerald" />{t('verifiedStudentsOnly')}</span>
                <span className="flex items-center gap-1"><Filter className="w-3 h-3 text-neon-cyan" />{t('wordFilterActive')}</span>
                <span className="flex items-center gap-1"><FileCheck2 className="w-3 h-3 text-neon-cyan" />{t('textModerationActive')}</span>
                <span className="flex items-center gap-1"><FlagTriangleRight className="w-3 h-3 text-neon-amber" />{t('moderationLog')}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => joinRoom(room.id)} className="flex-1 px-3 py-2.5 rounded-xl bg-neon-emerald/10 border border-neon-emerald/20 text-neon-emerald text-xs font-bold hover:bg-neon-emerald/15">{t('joinRoom')}</button>
                <button onClick={() => { setReportRoomId(room.id); setReported(false); }} className="px-3 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-neon-rose hover:border-neon-rose/30" aria-label={t('reportDisruptiveBehavior')} title={t('reportDisruptiveBehavior')}><Flag className="w-4 h-4" /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {joinedRoom && (
        <div className="fixed inset-x-3 bottom-20 md:bottom-6 md:right-6 md:left-auto z-[65] md:w-[24rem] rounded-2xl glass border border-neon-cyan/25 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4">
          <div className="flex items-start justify-between gap-3 mb-4"><div><p className="text-[10px] uppercase tracking-widest text-neon-cyan">{t('offlineLobby')}</p><h3 className="font-display font-bold text-gray-200 mt-1">{t(joinedRoom.nameKey)}</h3></div><button onClick={() => setJoinedRoomId(null)} className="text-gray-500 hover:text-gray-200" aria-label={t('leaveRoom')}><X className="w-4 h-4" /></button></div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 mb-4"><p className="text-xs text-neon-emerald">{t('joinedOfflineLobby')}</p><p className="text-[10px] text-gray-500 mt-1">{t('noRealVoiceConnection')}</p></div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3"><span>{t('activeStudents')}</span><span className="font-mono text-gray-200">{joinedRoom.students}</span></div>
          <div className="flex items-center justify-between gap-3 mb-3"><button onClick={() => setMicEnabled((v) => !v)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${micEnabled ? 'border-neon-emerald/25 text-neon-emerald' : 'border-neon-rose/25 text-neon-rose'}`}><span>{micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}</span>{t('microphone')}</button><span className="text-[10px] text-gray-500">{micEnabled ? t('active') : t('offline')}</span></div>
          <label className="flex items-center gap-2 text-xs text-gray-400"><Volume2 className="w-4 h-4 shrink-0" /><span className="w-12">{t('volume')}</span><input className="flex-1 accent-cyan-400" type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label={t('volume')} /><span className="w-8 text-right font-mono">{volume}%</span></label>
          <button onClick={() => setJoinedRoomId(null)} className="w-full mt-4 px-3 py-2.5 rounded-xl border border-neon-rose/25 text-neon-rose text-xs font-bold hover:bg-neon-rose/5">{t('leaveRoom')}</button>
        </div>
      )}

      {reportRoom && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl glass border border-white/10 p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3"><div><h3 className="font-display font-bold text-gray-200">{t('reportDisruptiveBehavior')}</h3><p className="text-xs text-gray-500 mt-1">{t(reportRoom.nameKey)}</p></div><button onClick={closeReport} className="text-gray-500 hover:text-gray-200" aria-label={t('cancel')}><X className="w-4 h-4" /></button></div>
            {!reported ? <>
              <label className="block text-xs text-gray-400 mt-5 mb-2">{t('reportReason')}</label>
              <select value={reportReason} onChange={(e) => setReportReason(e.target.value)} className="w-full rounded-xl border border-white/10 bg-ink-800 text-gray-200 px-3 py-2.5 text-sm outline-none">
                <option value="">{t('selectReason')}</option><option value="disruption">{t('reasonDisruption')}</option><option value="harassment">{t('reasonHarassment')}</option><option value="spam">{t('reasonSpam')}</option>
              </select>
              <div className="flex gap-2 mt-5"><button onClick={closeReport} className="flex-1 px-3 py-2.5 rounded-xl border border-white/10 text-gray-400">{t('cancel')}</button><button disabled={!reportReason} onClick={submitReport} className="flex-1 px-3 py-2.5 rounded-xl bg-neon-rose/10 border border-neon-rose/25 text-neon-rose font-bold disabled:opacity-40">{t('submitReport')}</button></div>
            </> : <div className="mt-6 rounded-xl border border-neon-emerald/20 bg-neon-emerald/5 p-4 flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-neon-emerald" /><p className="text-sm text-neon-emerald">{t('reportSubmitted')}</p></div>}
          </div>
        </div>
      )}
    </div>
  );
}
