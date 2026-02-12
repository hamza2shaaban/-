
import React, { useState, useEffect } from 'react';
import { Compass, MapPin, ChevronLeft, Info, AlertTriangle } from 'lucide-react';

const QiblaSection: React.FC = () => {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaDir, setQiblaDir] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Mecca Coordinates
  const meccaLat = 21.4225;
  const meccaLng = 39.8262;

  const calculateQibla = (lat: number, lng: number) => {
    const phiK = (meccaLat * Math.PI) / 180.0;
    const lambdaK = (meccaLng * Math.PI) / 180.0;
    const phi = (lat * Math.PI) / 180.0;
    const lambda = (lng * Math.PI) / 180.0;

    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
      );

    return (psi + 360) % 360;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const dir = calculateQibla(pos.coords.latitude, pos.coords.longitude);
          setQiblaDir(dir);
        },
        (err) => setError("يرجى تفعيل خدمة الموقع لتحديد اتجاه القبلة بدقة.")
      );
    }

    const handleOrientation = (event: any) => {
      let h = event.webkitCompassHeading || event.alpha;
      if (h !== undefined) {
        setHeading(h);
      }
    };

    const requestPermission = async () => {
      // @ts-ignore
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          // @ts-ignore
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            setPermissionGranted(true);
          } else {
            setError("يرجى السماح بالوصول لحساسات الحركة.");
          }
        } catch (e) {
          setError("حدث خطأ في طلب الإذن.");
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
        setPermissionGranted(true);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const relativeQibla = (qiblaDir - heading + 360) % 360;
  const isAligned = Math.abs(relativeQibla) < 5 || Math.abs(relativeQibla - 360) < 5;

  return (
    <div className="animate-app flex flex-col items-center justify-center space-y-10 py-6 max-w-sm mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50">اتجاه القبلة</h2>
        <p className="text-slate-500 text-sm">ضع هاتفك بشكل مسطح ووجهه نحو الكعبة</p>
      </div>

      {error ? (
        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800 flex flex-col items-center gap-3 text-center">
          <AlertTriangle className="text-rose-500" size={32} />
          <p className="text-rose-700 dark:text-rose-400 font-bold text-sm leading-relaxed">{error}</p>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-80 h-80">
          {/* Outer Glow */}
          <div className={`absolute inset-0 rounded-full blur-[60px] transition-colors duration-500 ${isAligned ? 'bg-emerald-500/20' : 'bg-slate-200/20 dark:bg-slate-800/20'}`}></div>

          {/* Compass Body */}
          <div className="relative w-full h-full rounded-full bg-white dark:bg-slate-900 border-[12px] border-slate-50 dark:border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
            {/* Degree Markings */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full"
                style={{ transform: `rotate(${i * 30}deg) translateY(-120px)` }}
              ></div>
            ))}

            {/* Main Compass Needle (Phone Orientation) */}
            <div 
              className="absolute inset-0 transition-transform duration-100 ease-out"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1.5 h-16 bg-rose-500 rounded-full shadow-lg shadow-rose-200"></div>
                <span className="text-[10px] font-black text-rose-600 mt-2">N</span>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
            </div>

            {/* Qibla Indicator (Kaaba) */}
            <div 
              className="absolute inset-0 transition-transform duration-300 ease-out z-20"
              style={{ transform: `rotate(${relativeQibla}deg)` }}
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 ${isAligned ? 'bg-emerald-600 scale-125' : 'bg-slate-900 text-white'}`}>
                  <MapPin size={24} className={isAligned ? 'animate-bounce' : ''} />
                </div>
                <div className={`mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors ${isAligned ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  القبلة
                </div>
              </div>
            </div>

            {/* Center Circle */}
            <div className={`z-30 w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-4 transition-all duration-500 flex items-center justify-center ${isAligned ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 scale-110' : 'border-slate-100 dark:border-slate-700'}`}>
              <Compass size={28} className={isAligned ? 'text-emerald-500' : 'text-slate-300'} />
            </div>
          </div>
        </div>
      )}

      {isAligned && !error && (
        <div className="bg-emerald-500 text-white px-8 py-4 rounded-3xl font-black text-sm shadow-xl shadow-emerald-500/30 animate-in zoom-in-50">
          أنت الآن باتجاه القبلة
        </div>
      )}

      <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-2xl text-emerald-600 dark:text-emerald-400">
          <Info size={24} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
          يرجى الابتعاد عن الأجهزة المعدنية أو الإلكترونية القوية التي قد تشوش على حساسات الهاتف لضمان دقة تحديد الاتجاه.
        </p>
      </div>
    </div>
  );
};

export default QiblaSection;
