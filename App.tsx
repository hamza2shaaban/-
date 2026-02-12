
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Home as HomeIcon, 
  MessageCircle, 
  Sun,
  Moon,
  Compass,
  Download,
  CircleDot,
  MoonStar
} from 'lucide-react';
import { AppSection } from './types';
import HomeSection from './components/HomeSection';
import QuranSection from './components/QuranSection';
import PrayerSection from './components/PrayerSection';
import AzkarSection from './components/AzkarSection';
import TasbihSection from './components/TasbihSection';
import SunnahSection from './components/SunnahSection';
import AIChatSection from './components/AIChatSection';
import QiblaSection from './components/QiblaSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert('لتثبيت التطبيق: اضغط على زر المشاركة في متصفحك ثم اختر "إضافة للشاشة الرئيسية" (Add to Home Screen)');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.HOME: return <HomeSection onNavigate={setActiveSection} />;
      case AppSection.QURAN: return <QuranSection />;
      case AppSection.AZKAR: return <AzkarSection />;
      case AppSection.TASBIH: return <TasbihSection />;
      case AppSection.SUNNAH: return <SunnahSection />;
      case AppSection.AI_CHAT: return <AIChatSection />;
      case AppSection.PRAYER: return <PrayerSection />;
      case AppSection.QIBLA: return <QiblaSection />;
      default: return <HomeSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 overflow-x-hidden ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-emerald-100/30 dark:border-slate-800 p-4 flex justify-between items-center px-6 transition-all duration-300">
        <div className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-2xl shadow-lg shadow-emerald-200/50 dark:shadow-none transition-transform group-hover:rotate-12 group-hover:scale-110">
            <MoonStar className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black text-emerald-900 dark:text-emerald-400 leading-none tracking-tight">نور الإيمان</h1>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Islamic Life</p>
          </div>
        </div>
        <div className="flex gap-2">
          {deferredPrompt && (
            <button onClick={installApp} className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 animate-pulse">
              <Download size={20} />
            </button>
          )}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 transition-all hover:scale-110 active:scale-95 shadow-sm"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="pb-32 pt-6 max-w-2xl mx-auto px-5">
        <div className="flex items-center justify-between mb-4">
           {activeSection !== AppSection.HOME && (
             <button 
               onClick={() => setActiveSection(AppSection.HOME)}
               className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-emerald-50 shadow-sm"
             >
               <HomeIcon size={16} /> الرئيسية
             </button>
           )}
        </div>
        {renderSection()}
      </main>

      {/* Pro Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 glass-effect border border-emerald-100/30 dark:border-slate-800 px-4 py-3 rounded-[2.5rem] safe-bottom flex justify-around items-center z-50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none">
        <NavButton 
          active={activeSection === AppSection.HOME} 
          onClick={() => setActiveSection(AppSection.HOME)}
          icon={<HomeIcon size={22} />}
          label="الرئيسية"
        />
        <NavButton 
          active={activeSection === AppSection.QURAN} 
          onClick={() => setActiveSection(AppSection.QURAN)}
          icon={<BookOpen size={22} />}
          label="القرآن"
        />
        <NavButton 
          active={activeSection === AppSection.TASBIH} 
          onClick={() => setActiveSection(AppSection.TASBIH)}
          icon={<CircleDot size={22} />}
          label="المسبحة"
        />
        <NavButton 
          active={activeSection === AppSection.AZKAR} 
          onClick={() => setActiveSection(AppSection.AZKAR)}
          icon={<Compass size={22} />}
          label="الأذكار"
        />
        <NavButton 
          active={activeSection === AppSection.AI_CHAT} 
          onClick={() => setActiveSection(AppSection.AI_CHAT)}
          icon={<MessageCircle size={22} />}
          label="نور AI"
        />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`relative flex flex-col items-center gap-1.5 px-5 py-2 rounded-2xl transition-all duration-300 ${active ? 'text-emerald-600 scale-105' : 'text-slate-400 hover:text-emerald-500'}`}
  >
    {active && (
      <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 rounded-[1.5rem] -z-10 animate-in zoom-in-50 duration-300"></div>
    )}
    <div className={`transition-transform duration-300 ${active ? 'scale-110 translate-y-[-2px]' : ''}`}>{icon}</div>
    <span className={`text-[10px] font-black transition-all ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </button>
);

export default App;
