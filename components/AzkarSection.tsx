
import React, { useState } from 'react';
import { ChevronLeft, Sun, Moon, Home, MapPin, CheckCircle2, RotateCcw, BookOpen, Quote, ShieldCheck, HeartPulse } from 'lucide-react';
import { ZikrCategory } from '../types';

const azkarData: ZikrCategory[] = [
  { 
    id: 1, 
    category: 'أذكار الصباح', 
    icon: 'Sun',
    items: [
      { text: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: {اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ}", count: 1, reference: "سورة البقرة: 255" },
      { text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ {قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ}", count: 3, reference: "سورة الإخلاص" },
      { text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ {قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ}", count: 3, reference: "سورة الفلق" },
      { text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ {قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ}", count: 3, reference: "سورة الناس" },
      { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا في هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.", count: 1, reference: "مسلم" },
      { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", count: 1, reference: "البخاري" },
      { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَهُ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ.", count: 4, reference: "أبو داود" },
      { text: "حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.", count: 7, reference: "أبو داود" },
      { text: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", count: 3, reference: "الترمذي" },
      { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", count: 1, reference: "الحاكم" },
      { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ.", count: 100, reference: "مسلم" },
      { text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", count: 100, reference: "البخاري" },
      { text: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ.", count: 100, reference: "البخاري" }
    ]
  },
  { 
    id: 2, 
    category: 'أذكار المساء', 
    icon: 'Moon',
    items: [
      { text: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: {اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ}", count: 1, reference: "سورة البقرة: 255" },
      { text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ {قُلْ هُوَ اللَّهُ أَحَدٌ...} و {قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...} و {قُلْ أَعُوذُ بِرَبِّ النَّاسِ...}", count: 3, reference: "سورة الإخلاص والمعوذتين" },
      { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا...", count: 1, reference: "مسلم" },
      { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", count: 1, reference: "البخاري" },
      { text: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.", count: 3, reference: "مسلم" },
      { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.", count: 10, reference: "حديث نبوي" },
      { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ.", count: 100, reference: "مسلم" },
      { text: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ.", count: 100, reference: "البخاري" }
    ]
  },
  { 
    id: 3, 
    category: 'أذكار النوم', 
    icon: 'Home',
    items: [
      { text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.", count: 1, reference: "البخاري" },
      { text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.", count: 3, reference: "أبو داود" },
      { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.", count: 1, reference: "البخاري" },
      { text: "قراءة سورة الإخلاص والمعوذتين والنفث في الكفين ومسح الجسد.", count: 3, reference: "البخاري" }
    ]
  },
  {
    id: 4,
    category: 'أذكار بعد الصلاة',
    icon: 'HeartPulse',
    items: [
      { text: "أَسْتَغْفِرُ اللهَ، أَسْتَغْفِرُ اللهَ، أَسْتَغْفِرُ اللهَ. اللَّهُمَّ أَنْتَ السَّلامُ وَمِنْكَ السَّلامُ، تَبَارَكْتَ يَا ذَا الْجَلالِ وَالإِكْرَامِ.", count: 1, reference: "مسلم" },
      { text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.", count: 1, reference: "البخاري ومسلم" },
      { text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.", count: 1, reference: "أبو داود والنسائي" },
      { text: "سُبْحَانَ اللهِ", count: 33, reference: "مسلم" },
      { text: "الْحَمْدُ لِلَّهِ", count: 33, reference: "مسلم" },
      { text: "اللهُ أَكْبَرُ", count: 33, reference: "مسلم" },
      { text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 1, reference: "مسلم" },
      { text: "قراءة آية الكرسي: {اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}", count: 1, reference: "النسائي" },
      { text: "قراءة سورة الإخلاص، وسورة الفلق، وسورة الناس (مرة واحدة بعد كل صلاة، وثلاث مرات بعد الفجر والمغرب)", count: 1, reference: "أبو داود والترمذي" }
    ]
  }
];

const IconMap: { [key: string]: any } = {
  Sun: <Sun size={28} className="text-amber-500" />,
  Moon: <Moon size={28} className="text-indigo-400" />,
  Home: <Home size={28} className="text-emerald-500" />,
  HeartPulse: <HeartPulse size={28} className="text-rose-500" />,
};

const AzkarSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const category = azkarData.find(c => c.id === selectedCategory);

  const handleIncrement = (catId: number, itemIdx: number) => {
    const key = `${catId}-${itemIdx}`;
    const current = counts[key] || 0;
    const max = category?.items[itemIdx].count || 1;
    
    if (current < max) {
      setCounts(prev => ({ ...prev, [key]: current + 1 }));
      if ('vibrate' in navigator) {
        navigator.vibrate(current + 1 === max ? [100, 50, 100] : 40);
      }
    }
  };

  const resetCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!category) return;
    const newCounts = { ...counts };
    category.items.forEach((_, idx) => {
      delete newCounts[`${category.id}-${idx}`];
    });
    setCounts(newCounts);
  };

  if (selectedCategory && category) {
    return (
      <div className="animate-app pb-24">
        <div className="flex items-center justify-between mb-8 sticky top-20 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-4 rounded-3xl">
          <button 
            onClick={() => setSelectedCategory(null)} 
            className="flex items-center gap-2 text-emerald-600 font-bold px-5 py-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-emerald-50 dark:border-slate-800"
          >
            <ChevronLeft className="rotate-180" size={20} />
            <span>{category.category}</span>
          </button>
          <button 
            onClick={resetCategory} 
            className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-400 border border-slate-100 dark:border-slate-800 hover:text-rose-500 transition-all"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {category.items.map((item, idx) => {
            const current = counts[`${category.id}-${idx}`] || 0;
            const isFinished = current >= item.count;
            const progress = (current / item.count) * 100;

            return (
              <div 
                key={idx} 
                onClick={() => handleIncrement(category.id, idx)}
                className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer select-none active:scale-[0.98] overflow-hidden ${
                  isFinished 
                    ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800 shadow-none' 
                    : 'bg-white border-white dark:bg-slate-900 dark:border-slate-800 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-xl'
                }`}
              >
                {!isFinished && (
                  <div 
                    className="absolute bottom-0 right-0 h-1.5 bg-emerald-500 transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }} 
                  />
                )}

                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-5 mb-8">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                      <Quote size={18} className="text-emerald-500/50" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-quran text-2xl md:text-3xl leading-[1.8] text-right ${isFinished ? 'text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                        {item.text}
                      </p>
                      {item.reference && (
                        <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <BookOpen size={12} />
                          {item.reference}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl">
                    <div className="flex gap-1.5">
                      {Array.from({ length: Math.min(item.count, 10) }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (current % 10 > i || (current >= 10 && i < 10) || isFinished) ? 'bg-emerald-500 scale-125' : 'bg-slate-200 dark:bg-slate-700'
                          }`} 
                        />
                      ))}
                      {item.count > 10 && <span className="text-[8px] text-slate-400 mr-1 self-center">...</span>}
                    </div>

                    <div className="relative">
                      {isFinished ? (
                        <div className="bg-emerald-500 text-white p-3 rounded-full animate-in zoom-in-50 duration-500 shadow-lg shadow-emerald-200 dark:shadow-none">
                          <CheckCircle2 size={24} />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 tracking-tighter">
                            {current}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 -mt-1 uppercase">من {item.count}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-app">
      <div className="relative h-56 rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-900 shadow-2xl mb-10 flex flex-col justify-end p-10 text-white">
        <div className="absolute top-6 right-6 bg-white/20 p-5 rounded-full backdrop-blur-xl border border-white/20">
          <ShieldCheck className="text-white" size={32} />
        </div>
        <h2 className="text-4xl font-black mb-2">حصن المسلم</h2>
        <p className="text-emerald-100/70 text-sm font-medium">الأذكار الصحيحة مرتبة من السنة النبوية</p>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-5">
        {azkarData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="group flex items-center justify-between p-7 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 active:scale-[0.96]"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                {IconMap[cat.icon]}
              </div>
              <div className="text-right">
                <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100">{cat.category}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-xs text-slate-400 font-bold font-mono">{cat.items.length} ذكراً كاملاً</p>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300">
              <ChevronLeft size={24} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AzkarSection;
