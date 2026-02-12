
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Fingerprint, History, Award, Sparkles, ChevronRight, ChevronLeft, Zap } from 'lucide-react';

interface DhikrType {
  id: string;
  text: string;
  goal: number;
}

const commonDhikrs: DhikrType[] = [
  { id: 'subhanallah', text: 'سُبْحَانَ اللهِ', goal: 33 },
  { id: 'alhamdulillah', text: 'الْحَمْدُ لِلَّهِ', goal: 33 },
  { id: 'allahuakbar', text: 'اللهُ أَكْبَرُ', goal: 33 },
  { id: 'lailahaillallah', text: 'لَا إِلَهَ إِلَّا اللهُ', goal: 100 },
  { id: 'astaghfirullah', text: 'أَسْتَغْفِرُ اللهَ', goal: 100 },
];

const TasbihSection: React.FC = () => {
  const [activeDhikrIdx, setActiveDhikrIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(true); // الوضع التلقائي ينتقل للذكر التالي

  const currentDhikr = commonDhikrs[activeDhikrIdx];

  const increment = () => {
    if ('vibrate' in navigator) navigator.vibrate(40);
    setSessionTotal(s => s + 1);
    
    if (count + 1 >= currentDhikr.goal) {
      if (isAutoMode && activeDhikrIdx < 2) { // تسلسل أذكار الصلاة (سبحان الله، الحمد لله، الله أكبر)
        setActiveDhikrIdx(prev => prev + 1);
        setCount(0);
        if ('vibrate' in navigator) navigator.vibrate([100, 50, 150]);
      } else {
        setCount(0);
        if ('vibrate' in navigator) navigator.vibrate([100, 50, 150]);
      }
    } else {
      setCount(c => c + 1);
    }
  };

  const reset = () => {
    if (confirm('هل تريد تصفير العداد الحالي؟')) {
      setCount(0);
    }
  };

  const changeDhikr = (idx: number) => {
    setActiveDhikrIdx(idx);
    setCount(0);
  };

  const progress = (count / currentDhikr.goal) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-app py-4 max-w-sm mx-auto">
      {/* Header Info */}
      <div className="text-center space-y-4 w-full px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50">المسبحة الذكية</h2>
          <button 
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
              isAutoMode 
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' 
                : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700'
            }`}
          >
            <Zap size={12} />
            {isAutoMode ? 'الوضع التلقائي' : 'الوضع الحر'}
          </button>
        </div>

        {/* Dhikr Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar rtl justify-start">
          {commonDhikrs.map((d, i) => (
            <button
              key={d.id}
              onClick={() => changeDhikr(i)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border-2 ${
                activeDhikrIdx === i 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800 text-slate-400'
              }`}
            >
              {d.text}
            </button>
          ))}
        </div>
      </div>

      {/* Main Counter Hub */}
      <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center group">
        {/* Floating Text Indicator */}
        <div className="absolute -top-6 bg-white dark:bg-slate-900 px-6 py-2 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-800 z-20 animate-bounce">
          <p className="font-quran text-2xl text-emerald-600 dark:text-emerald-400 font-bold">{currentDhikr.text}</p>
        </div>

        {/* Visual Rings */}
        <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        <div 
          onClick={increment}
          className="absolute inset-0 rounded-full bg-white dark:bg-slate-900 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] dark:shadow-none border-[12px] border-slate-50 dark:border-slate-800 cursor-pointer active:scale-95 transition-all duration-300"
        ></div>

        {/* Circular Progress */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none p-6">
          <circle
            cx="160"
            cy="160"
            r="135"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800/40"
          />
          <circle
            cx="160"
            cy="160"
            r="135"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={848}
            strokeDashoffset={848 - (848 * count) / currentDhikr.goal}
            strokeLinecap="round"
            className="text-emerald-500 transition-all duration-500 ease-out drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
        </svg>

        {/* Counter Content */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
           <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-1">
             <Sparkles size={10} />
             <span>كرر الذكر</span>
           </div>
           <span className="text-[12rem] font-black font-mono text-slate-800 dark:text-white leading-none tracking-tighter transition-all duration-200 group-active:scale-110">
            {count}
          </span>
          <div className="mt-2 text-slate-400 font-bold flex items-center gap-2">
            <span className="text-[10px] uppercase opacity-50">الهدف</span>
            <span className="text-2xl tracking-tighter text-emerald-600">{currentDhikr.goal}</span>
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="w-full px-4 space-y-6">
        <div className="flex items-center justify-between gap-6">
          <button 
            onClick={reset}
            className="w-16 h-16 bg-white dark:bg-slate-900 text-slate-400 rounded-[2rem] flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 hover:text-rose-500 transition-all active:scale-90 shadow-sm"
          >
            <RefreshCcw size={24} />
          </button>

          <button 
            onClick={increment}
            className="flex-1 h-20 bg-emerald-600 text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 transform active:scale-95 transition-all border-b-8 border-emerald-700"
          >
            <Fingerprint size={32} />
            <span className="text-xl font-black">اضغط للتسبيح</span>
          </button>

          <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center border-2 border-slate-100 dark:border-slate-800">
            <History size={20} className="text-emerald-500/50 mb-1" />
            <span className="text-[10px] font-black text-slate-700 dark:text-slate-300">{sessionTotal}</span>
          </div>
        </div>
      </div>

      {/* Modern Card Tip */}
      <div className="w-full bg-gradient-to-br from-white to-emerald-50 dark:from-slate-900 dark:to-slate-950 p-6 rounded-[2.5rem] border border-emerald-100/50 dark:border-slate-800 shadow-xl flex items-center gap-4">
        <div className="bg-emerald-600 p-3 rounded-2xl text-white">
          <Award size={24} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">نصيحة نبوية</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            قال ﷺ: "مُعَقِّباتٌ لا يَخيبُ قائِلُهنَّ... ثلاثٌ وثلاثون تسبيحةً، وثلاثٌ وثلاثون تحميدةً، وأربعٌ وثلاثون تكبيرةً"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TasbihSection;
