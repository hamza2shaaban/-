
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Book, Info, Play, Pause, Headphones, User } from 'lucide-react';
import { Surah, Ayah } from '../types';
import { getVerseTafsir } from '../geminiService';

interface Reciter {
  id: string;
  name: string;
}

const reciters: Reciter[] = [
  { id: 'ar.alafasy', name: 'مشاري العفاسي' },
  { id: 'ar.husary', name: 'محمود خليل الحصري' },
  { id: 'ar.minshawi', name: 'محمد صديق المنشاوي' },
  { id: 'ar.abdulbasitmurattal', name: 'عبد الباسط عبد الصمد' },
  { id: 'ar.nasser_alqatami', name: 'ناصر القطامي' },
];

const QuranSection: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<string>('ar.alafasy');
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [tafsir, setTafsir] = useState<{ [key: number]: string }>({});
  const [activeAyahForTafsir, setActiveAyahForTafsir] = useState<number | null>(null);
  const [showReciters, setShowReciters] = useState(false);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [playingAyahIdx, setPlayingAyahIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      });
    
    const savedReciter = localStorage.getItem('quranReciter');
    if (savedReciter) setSelectedReciter(savedReciter);
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      loadSurahAudio(selectedSurah, selectedReciter);
    }
  }, [selectedReciter]);

  const loadSurahAudio = (surah: Surah, reciterId: string) => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/${reciterId}`)
      .then(res => res.json())
      .then(data => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      });
  };

  const loadSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    loadSurahAudio(surah, selectedReciter);
    window.scrollTo(0, 0);
  };

  const changeReciter = (id: string) => {
    setSelectedReciter(id);
    localStorage.setItem('quranReciter', id);
    setShowReciters(false);
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const handleShowTafsir = async (ayahNumberInSurah: number) => {
    if (tafsir[ayahNumberInSurah]) {
      setActiveAyahForTafsir(activeAyahForTafsir === ayahNumberInSurah ? null : ayahNumberInSurah);
      return;
    }
    
    if (selectedSurah) {
      setActiveAyahForTafsir(ayahNumberInSurah);
      const res = await getVerseTafsir(selectedSurah.name, ayahNumberInSurah);
      setTafsir(prev => ({ ...prev, [ayahNumberInSurah]: res }));
    }
  };

  const toggleAudio = (url: string, idx: number) => {
    if (currentAudioUrl === url) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentAudioUrl(url);
      setPlayingAyahIdx(idx);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    }
  };

  const handleAudioEnd = () => {
    if (playingAyahIdx !== null && playingAyahIdx < ayahs.length - 1) {
      const nextIdx = playingAyahIdx + 1;
      const nextAyah = ayahs[nextIdx];
      toggleAudio(nextAyah.audio!, nextIdx);
    } else {
      setIsPlaying(false);
      setPlayingAyahIdx(null);
    }
  };

  if (loading && surahs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-emerald-600 font-bold">جاري تحميل السور...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <audio ref={audioRef} onEnded={handleAudioEnd} />
      
      {selectedSurah ? (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300 pb-20">
          <div className="flex items-center justify-between mb-6 sticky top-20 z-40 bg-emerald-50/90 dark:bg-slate-900/90 backdrop-blur-md py-4 px-2 rounded-2xl border border-white/20">
            <button onClick={() => { setSelectedSurah(null); setIsPlaying(false); audioRef.current?.pause(); }} className="flex items-center gap-1 text-emerald-600 font-bold">
              <ChevronLeft className="rotate-180" /> القائمة
            </button>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold font-quran">{selectedSurah.name}</h2>
              <button 
                onClick={() => setShowReciters(!showReciters)}
                className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full mt-1 flex items-center gap-1 mx-auto"
              >
                <User size={10} /> {reciters.find(r => r.id === selectedReciter)?.name}
              </button>
            </div>
            <button 
              onClick={() => ayahs.length > 0 && toggleAudio(ayahs[0].audio!, 0)}
              className="p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>

          {showReciters && (
            <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-100 dark:border-slate-700 animate-in zoom-in-95">
              <h3 className="text-sm font-bold mb-3 text-slate-500">اختر القارئ:</h3>
              <div className="grid grid-cols-2 gap-2">
                {reciters.map(reciter => (
                  <button
                    key={reciter.id}
                    onClick={() => changeReciter(reciter.id)}
                    className={`p-3 text-xs rounded-xl font-bold transition-all ${selectedReciter === reciter.id ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'}`}
                  >
                    {reciter.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
            <div className="text-center py-6 font-quran text-4xl text-emerald-700 dark:text-emerald-400">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          )}

          <div className="space-y-6">
            {ayahs.length === 0 && loading ? (
              <div className="text-center py-12 text-slate-400">جاري تحميل الصوتيات...</div>
            ) : (
              ayahs.map((ayah, idx) => (
                <div 
                  key={ayah.number} 
                  className={`p-8 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border transition-all ${playingAyahIdx === idx ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/30' : 'border-emerald-50 dark:border-slate-700'}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-center rounded-full font-bold">
                        {ayah.numberInSurah}
                      </div>
                      <button 
                        onClick={() => toggleAudio(ayah.audio!, idx)}
                        className={`p-2.5 rounded-full transition-all ${playingAyahIdx === idx && isPlaying ? 'bg-emerald-500 text-white scale-110' : 'bg-emerald-50 dark:bg-slate-700 text-emerald-600 hover:bg-emerald-100'}`}
                      >
                        {playingAyahIdx === idx && isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                    </div>
                    <button 
                      onClick={() => handleShowTafsir(ayah.numberInSurah)}
                      className="text-slate-400 hover:text-emerald-600 p-2 flex items-center gap-1.5 text-xs bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                    >
                      <Info size={14} /> التفسير
                    </button>
                  </div>
                  <p className="font-quran text-4xl leading-[2.5] text-right mb-2">
                    {ayah.text}
                  </p>
                  
                  {activeAyahForTafsir === ayah.numberInSurah && (
                    <div className="mt-6 p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-r-4 border-emerald-500 animate-in slide-in-from-top-2 duration-300">
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-3">تفسير نور AI:</h4>
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {tafsir[ayah.numberInSurah] || "جاري جلب التفسير باستخدام الذكاء الاصطناعي..."}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">القرآن الكريم</h2>
            <button 
              onClick={() => setShowReciters(!showReciters)}
              className="flex items-center gap-2 text-xs bg-white dark:bg-slate-800 p-3 rounded-2xl border border-emerald-100 dark:border-slate-700 shadow-sm text-emerald-600 font-bold"
            >
              <Headphones size={16} /> القارئ: {reciters.find(r => r.id === selectedReciter)?.name}
            </button>
          </div>

          {showReciters && (
            <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-3xl border border-emerald-100 dark:border-slate-700 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-3">
                {reciters.map(reciter => (
                  <button
                    key={reciter.id}
                    onClick={() => changeReciter(reciter.id)}
                    className={`p-4 text-sm rounded-2xl font-bold transition-all ${selectedReciter === reciter.id ? 'bg-emerald-600 text-white' : 'bg-slate-50 dark:bg-slate-700 hover:bg-emerald-50'}`}
                  >
                    {reciter.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="ابحث عن اسم السورة..." 
              className="w-full p-5 pl-12 bg-white dark:bg-slate-800 rounded-[2rem] border border-emerald-100 dark:border-slate-700 shadow-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            />
            <Book className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {surahs.map(surah => (
              <button
                key={surah.number}
                onClick={() => loadSurah(surah)}
                className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-emerald-50 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-slate-600 transition-all hover:shadow-xl group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-2xl font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                    {surah.number}
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-2xl font-quran">{surah.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{surah.englishName} • {surah.numberOfAyahs} آية</p>
                  </div>
                </div>
                <div className="text-emerald-500 bg-emerald-50 dark:bg-slate-700 p-2.5 rounded-2xl">
                  <ChevronLeft size={20} />
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuranSection;
