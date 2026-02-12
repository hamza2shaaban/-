
import React, { useState } from 'react';
import { Star, CheckCircle2, Quote, BookOpen, Sparkles, Heart, Coffee, Moon, Sun, Hand, UserCheck } from 'lucide-react';

interface Sunnah {
  title: string;
  desc: string;
  hadith: string;
  ref: string;
  icon: React.ReactNode;
  color: string;
}

const sunnahs: Sunnah[] = [
  { 
    title: 'السواك', 
    desc: 'استخدام السواك عند الوضوء، وعند الصلاة، وعند الاستيقاظ من النوم، وعند تغير رائحة الفم.', 
    hadith: '«السِّوَاكُ مَطْهَرَةٌ لِلْفَمِ مَرْضَاةٌ لِلرَّبِّ»',
    ref: 'رواه النسائي وأحمد',
    icon: <Sparkles size={28} />,
    color: 'from-emerald-400 to-emerald-600'
  },
  { 
    title: 'صلاة الضحى', 
    desc: 'صلاة ركعتين على الأقل في وقت الضحى، وهي تجزئ عن صدقة كل مفصل في جسم الإنسان.', 
    hadith: '«وَيُجْزِئُ مِنْ ذَلِكَ رَكْعَتَانِ يَرْكَعُهُمَا مِنَ الضُّحَى»',
    ref: 'رواه مسلم',
    icon: <Sun size={28} />,
    color: 'from-amber-400 to-orange-500'
  },
  { 
    title: 'الدعاء بين الأذان والإقامة', 
    desc: 'استغلال الوقت القصير بين سماع الأذان وإقامة الصلاة بالدعاء الصادق.', 
    hadith: '«الدُّعَاءُ لَا يُرَدُّ بَيْنَ الْأَذَانِ وَالْإِقَامَةِ»',
    ref: 'رواه الترمذي وأبو داود',
    icon: <Quote size={28} />,
    color: 'from-blue-400 to-indigo-600'
  },
  { 
    title: 'البدء باليمين', 
    desc: 'استخدام اليد اليمنى في الأكل والشرب، والبدء بالجانب الأيمن في اللباس والوضوء.', 
    hadith: '«كَانَ النَّبِيُّ ﷺ يُعْجِبُهُ التَّيَمُّنُ فِي تَنَعُّلِهِ وَتَرَجُّلِهِ وَطُهُورِهِ وَفِي شَأْنِهِ كُلِّهِ»',
    ref: 'متفق عليه',
    icon: <Hand size={28} />,
    color: 'from-teal-400 to-teal-700'
  },
  { 
    title: 'نفض الفراش قبل النوم', 
    desc: 'نفض الفراش ثلاث مرات مع التسمية قبل الاضطجاع عليه للنوم.', 
    hadith: '«إِذَا أَوَى أَحَدُكُمْ إِلَى فِرَاشِهِ فَلْيَنْفُضْ فِرَاشَهُ بِدَاخِلَةِ إِزَارِهِ، فَإِنَّهُ لَا يَدْرِي مَا خَلَفَهُ عَلَيْهِ»',
    ref: 'متفق عليه',
    icon: <Moon size={28} />,
    color: 'from-purple-500 to-indigo-800'
  },
  { 
    title: 'صيام الاثنين والخميس', 
    desc: 'الحرص على صيام يومي الاثنين والخميس من كل أسبوع لمن استطاع.', 
    hadith: '«تُعْرَضُ الْأَعْمَالُ يَوْمَ الِاثْنَيْنِ وَالْخَمِيسِ، فَأُحِبُّ أَنْ يُعْرَضَ عَمَلِي وَأَنَا صَائِمٌ»',
    ref: 'رواه الترمذي',
    icon: <Coffee size={28} />,
    color: 'from-rose-400 to-rose-600'
  },
  { 
    title: 'التبكير لصلاة الجمعة', 
    desc: 'الاغتسال والذهاب مبكراً للمسجد يوم الجمعة قبل صعود الإمام للمنبر.', 
    hadith: '«مَنِ اغْتَسَلَ يَوْمَ الْجُمُعَةِ غُسْلَ الْجَنَابَةِ ثُمَّ رَاحَ، فَكَأَنَّمَا قَرَّبَ بَدَنَةً...»',
    ref: 'متفق عليه',
    icon: <UserCheck size={28} />,
    color: 'from-cyan-500 to-blue-700'
  }
];

const SunnahSection: React.FC = () => {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggleComplete = (idx: number) => {
    const next = new Set(completed);
    if (next.has(idx)) next.delete(idx);
    else {
      next.add(idx);
      if ('vibrate' in navigator) navigator.vibrate([50, 30, 50]);
    }
    setCompleted(next);
  };

  return (
    <div className="space-y-8 animate-app pb-24">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 mb-2">
          <Sparkles size={12} />
          <span>Revive the Sunnah</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">سنن نبوية مهجورة</h2>
        <p className="text-slate-500 text-sm font-medium">أحيِ سنة نبيك محمد ﷺ وكن له رفيقاً في الجنة</p>
      </div>

      <div className="space-y-6">
        {sunnahs.map((sunnah, idx) => {
          const isDone = completed.has(idx);
          return (
            <div 
              key={idx} 
              onClick={() => toggleComplete(idx)}
              className={`group relative p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden active:scale-[0.98] ${
                isDone 
                  ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-900/10' 
                  : 'border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:shadow-2xl shadow-sm'
              }`}
            >
              {/* Image-like Icon Container */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`shrink-0 w-24 h-24 rounded-3xl bg-gradient-to-br ${sunnah.color} flex items-center justify-center text-white shadow-xl shadow-emerald-500/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {sunnah.icon}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-black text-2xl ${isDone ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-60' : 'text-slate-800 dark:text-slate-100'}`}>
                      {sunnah.title}
                    </h4>
                    <div className={`p-2 rounded-xl transition-all ${isDone ? 'bg-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-300 group-hover:text-emerald-500'}`}>
                      <CheckCircle2 size={24} />
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {sunnah.desc}
                  </p>
                </div>
              </div>

              {/* Hadith Detail Box */}
              <div className={`mt-6 p-6 rounded-[1.5rem] transition-all duration-500 ${
                isDone 
                  ? 'bg-emerald-500/10 border-emerald-500/20' 
                  : 'bg-slate-50 dark:bg-slate-800/50 border-transparent'
              } border`}>
                <div className="flex gap-3">
                  <Quote size={20} className="text-emerald-500 shrink-0 mt-1 opacity-50" />
                  <div className="space-y-3">
                    <p className="font-quran text-xl leading-relaxed text-slate-800 dark:text-slate-200 font-bold">
                      {sunnah.hadith}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">
                      <BookOpen size={12} />
                      {sunnah.ref}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl transition-opacity duration-500 ${isDone ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-500/30">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white/20 p-4 rounded-3xl mb-4 backdrop-blur-md border border-white/20">
            <Heart size={32} className="text-emerald-200 fill-emerald-200" />
          </div>
          <h3 className="text-2xl font-black mb-4">أجر إحياء السنة</h3>
          <p className="italic text-lg leading-[1.8] font-medium max-w-[90%] font-quran">
            "مَنْ أَحْيَا سُنَّةً مِنْ سُنَّتِي قَدْ أُمِيتَتْ بَعْدِي ، فَإِنَّ لَهُ مِنَ الأَجْرِ مِثْلَ مَنْ عَمِلَ بِهَا، لَا يَنْقُصُ ذَلِكَ مِنْ أُجُورِهِمْ شَيْئًا"
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold opacity-70 uppercase tracking-widest">
            <BookOpen size={14} />
            رواه الترمذي
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute -top-10 -right-10 w-48 h-48 border-[15px] border-white rounded-full"></div>
           <div className="absolute -bottom-10 -left-10 w-64 h-64 border-[15px] border-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SunnahSection;
