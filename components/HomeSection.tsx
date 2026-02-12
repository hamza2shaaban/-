
import React from 'react';
import { AppSection } from '../types';
import { Book, CircleDot, Star, MessageSquare, Clock, Compass, Quote, Sparkles, BookOpen } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (section: AppSection) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const cards = [
    { id: AppSection.QURAN, label: 'القرآن الكريم', icon: <Book className="w-8 h-8" />, color: 'bg-emerald-500', desc: 'قراءة واستماع وتفسير' },
    { id: AppSection.AZKAR, label: 'الأذكار والسنن', icon: <Star className="w-8 h-8" />, color: 'bg-amber-500', desc: 'حصن المسلم اليومي' },
    { id: AppSection.TASBIH, label: 'المسبحة الذكية', icon: <CircleDot className="w-8 h-8" />, color: 'bg-rose-500', desc: 'عداد التسبيح المطور' },
    { id: AppSection.AI_CHAT, label: 'اسأل نور AI', icon: <MessageSquare className="w-8 h-8" />, color: 'bg-indigo-500', desc: 'تفسير وأسئلة دينية' },
    { id: AppSection.PRAYER, label: 'مواقيت الصلاة', icon: <Clock className="w-8 h-8" />, color: 'bg-blue-500', desc: 'مواعيد الأذان بدقة' },
    { id: AppSection.SUNNAH, label: 'السنن النبوية', icon: <BookOpen className="w-8 h-8" />, color: 'bg-teal-600', desc: 'إحياء السنن المهجورة' },
  ];

  return (
    <div className="space-y-8 animate-app">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-2xl shadow-emerald-500/20 group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Daily Inspiration</span>
          </div>
          <h2 className="text-3xl font-black mb-3">السلام عليكم ورحمة الله</h2>
          <p className="text-emerald-50 font-medium leading-relaxed max-w-[80%] opacity-90">
            "ألا بذكر الله تطمئن القلوب" <br />
            مرحباً بك في رحلة إيمانية جديدة اليوم.
          </p>
          
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => onNavigate(AppSection.QURAN)}
              className="px-6 py-2.5 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold border border-white/20 hover:bg-white/30 transition-all active:scale-95"
            >
              مواصلة القراءة
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute top-10 right-10 w-64 h-64 border-[20px] border-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 border-[10px] border-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="absolute top-8 left-8">
          <Sparkles className="text-emerald-300/40 w-12 h-12" />
        </div>
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="group relative p-6 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 overflow-hidden"
          >
            <div className={`relative z-10 ${card.color} p-3.5 rounded-2xl text-white shadow-lg shadow-${card.color.split('-')[1]}-200 dark:shadow-none group-hover:rotate-6 transition-transform`}>
              {card.icon}
            </div>
            <div className="relative z-10 text-right">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{card.label}</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">{card.desc}</p>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
          </button>
        ))}
      </div>

      {/* Verse of the Day */}
      <div className="relative p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-emerald-100 dark:border-slate-800 shadow-xl overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
           <Book className="w-64 h-64 text-emerald-900" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-emerald-200 dark:bg-emerald-900"></div>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Star size={14} className="animate-pulse" /> آية اليوم
            </span>
            <div className="h-[2px] w-8 bg-emerald-200 dark:bg-emerald-900"></div>
          </div>
          
          <div className="relative">
            <Quote size={40} className="absolute -top-6 -right-8 text-emerald-500/10 rotate-180" />
            <p className="font-quran text-3xl md:text-4xl leading-[2] text-center text-slate-800 dark:text-slate-100 py-4 font-bold">
              وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
            </p>
            <Quote size={40} className="absolute -bottom-6 -left-8 text-emerald-500/10" />
          </div>
          
          <div className="mt-8 px-6 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-tighter">[سورة البقرة: 155-156]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
