
import React, { useState, useEffect, useCallback } from 'react';
import { Clock, MapPin, RefreshCw, Volume2, Check, Settings2, Sparkles, Bell, BellOff, Timer } from 'lucide-react';
import { PrayerTimes, AthanVoice } from '../types';

const athanVoices: AthanVoice[] = [
  { id: 'abdulbasit', name: 'عبد الباسط عبد الصمد', url: 'https://www.islamcan.com/audio/adhan/basit.mp3' },
  { id: 'alafasy', name: 'مشاري العفاسي', url: 'https://www.islamcan.com/audio/adhan/afasy.mp3' },
  { id: 'qatami', name: 'ناصر القطامي', url: 'https://www.islamcan.com/audio/adhan/nasser_al_qatami.mp3' },
  { id: 'makkah', name: 'أذان مكة المكرمة', url: 'https://www.islamcan.com/audio/adhan/makkah.mp3' },
  { id: 'madinah', name: 'أذان المدينة المنورة', url: 'https://www.islamcan.com/audio/adhan/madinah.mp3' },
];

const PrayerSection: React.FC = () => {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<string>("موقعك الحالي");
  const [loading, setLoading] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<string>(athanVoices[2].id);
  const [showSettings, setShowSettings] = useState(false);
  const [testAudio, setTestAudio] = useState<HTMLAudioElement | null>(null);

  // Notification states
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notifyMinutesBefore, setNotifyMinutesBefore] = useState(5);

  const fetchTimes = useCallback(() => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`)
          .then(res => res.json())
          .then(data => {
            setTimes(data.data.timings);
            setLoading(false);
          });
      }, () => {
        fetch(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=4`)
          .then(res => res.json())
          .then(data => {
            setTimes(data.data.timings);
            setLocation("القاهرة (تلقائي)");
            setLoading(false);
          });
      });
    }
  }, []);

  useEffect(() => {
    fetchTimes();
    const savedVoice = localStorage.getItem('athanVoice');
    if (savedVoice) setSelectedVoice(savedVoice);
    
    const savedNotifs = localStorage.getItem('prayerNotifications');
    if (savedNotifs === 'true') setNotificationsEnabled(true);
    
    const savedMinutes = localStorage.getItem('notifyMinutesBefore');
    if (savedMinutes) setNotifyMinutesBefore(parseInt(savedMinutes));
  }, [fetchTimes]);

  // Notification logic
  useEffect(() => {
    if (!notificationsEnabled || !times) return;

    const checkPrayer = setInterval(() => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;

      Object.entries(times).forEach(([key, timeStr]) => {
        if (['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(key)) {
          const [h, m] = (timeStr as string).split(':').map(Number);
          const prayerTimeInMinutes = h * 60 + m;
          const targetTime = prayerTimeInMinutes - notifyMinutesBefore;

          if (currentTimeInMinutes === targetTime && now.getSeconds() < 10) {
            sendNotification(key);
          }
        }
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkPrayer);
  }, [notificationsEnabled, times, notifyMinutesBefore, selectedVoice]);

  const sendNotification = (prayerKey: string) => {
    const prayerName = prayerLabels[prayerKey as keyof PrayerTimes];
    if (Notification.permission === 'granted') {
      new Notification(`اقترب وقت صلاة ${prayerName}`, {
        body: `سيؤذن لصلاة ${prayerName} بعد ${notifyMinutesBefore} دقائق بإذن الله.`,
        icon: 'https://cdn-icons-png.flaticon.com/512/2873/2873114.png'
      });
      
      const voice = athanVoices.find(v => v.id === selectedVoice);
      if (voice) {
        const audio = new Audio(voice.url);
        audio.play();
      }
    }
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('prayerNotifications', 'true');
      } else {
        alert('يرجى السماح بالإشعارات من إعدادات المتصفح لتفعيل هذه الميزة.');
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('prayerNotifications', 'false');
    }
  };

  const playTest = (url: string) => {
    if (testAudio) {
      testAudio.pause();
    }
    const audio = new Audio(url);
    audio.play();
    setTestAudio(audio);
  };

  const saveVoice = (id: string) => {
    setSelectedVoice(id);
    localStorage.setItem('athanVoice', id);
  };

  const saveMinutes = (val: number) => {
    setNotifyMinutesBefore(val);
    localStorage.setItem('notifyMinutesBefore', val.toString());
  };

  const prayerLabels: { [key in keyof PrayerTimes]: string } = {
    Fajr: 'الفجر',
    Sunrise: 'الشروق',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء'
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-emerald-600 font-bold">جاري تحديد المواقيت...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-emerald-50 dark:border-slate-700 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-6 right-6">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-2xl transition-all ${showSettings ? 'bg-emerald-600 text-white rotate-90' : 'text-slate-400 hover:text-emerald-500 bg-slate-50 dark:bg-slate-700'}`}
          >
            <Settings2 size={24} />
          </button>
        </div>
        
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-3xl mb-4">
          <MapPin className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-1">{location}</h3>
        <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
          <Sparkles size={14} className="text-amber-500" />
          {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {showSettings && (
          <div className="w-full mt-2 p-6 bg-emerald-50 dark:bg-slate-900/50 rounded-3xl animate-in slide-in-from-top-4 duration-300 text-right">
            <h4 className="font-bold text-sm mb-5 text-emerald-800 dark:text-emerald-400">إعدادات التنبيهات</h4>
            
            <div className="space-y-6">
              {/* Notification Toggle */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${notificationsEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
                  </div>
                  <span className="text-sm font-bold">تنبيه قبل الأذان</span>
                </div>
                <button 
                  onClick={toggleNotifications}
                  className={`w-12 h-6 rounded-full transition-all relative ${notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notificationsEnabled ? 'right-7' : 'right-1'}`}></div>
                </button>
              </div>

              {/* Timing Selector */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Timer size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold">توقيت التنبيه (بالدقائق قبل الأذان)</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  {[2, 5, 10, 15].map(min => (
                    <button
                      key={min}
                      onClick={() => saveMinutes(min)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${notifyMinutesBefore === min ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50'}`}
                    >
                      {min} د
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Selector */}
              <div>
                <h4 className="font-bold text-[10px] mb-3 text-slate-400 uppercase tracking-widest">اختر صوت الأذان</h4>
                <div className="space-y-2">
                  {athanVoices.map(voice => (
                    <div key={voice.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${selectedVoice === voice.id ? 'bg-white dark:bg-slate-800 border-emerald-500' : 'bg-white/40 dark:bg-slate-800/40 border-transparent'}`}>
                      <span className="text-sm font-bold">{voice.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => playTest(voice.url)} className="p-2 text-emerald-600 bg-emerald-50 dark:bg-slate-700 rounded-xl">
                          <Volume2 size={16} />
                        </button>
                        <button 
                          onClick={() => saveVoice(voice.id)}
                          className={`p-2 rounded-xl ${selectedVoice === voice.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <button onClick={fetchTimes} className="mt-8 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-8 py-3 rounded-full font-bold hover:bg-emerald-100 hover:scale-105 transition-all shadow-sm">
          <RefreshCw size={16} /> تحديث المواقيت الآن
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {times && Object.entries(prayerLabels).map(([key, label]) => {
          const timeValue = (times as any)[key];
          return (
            <div key={key} className="flex items-center justify-between p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-emerald-50 dark:border-slate-700 shadow-sm group hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-[1.5rem] group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:scale-110">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-2xl">{label}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">تنبيه {notificationsEnabled ? 'مفعل' : 'معطل'}</p>
                </div>
              </div>
              <div className="text-4xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tighter">
                {timeValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerSection;
