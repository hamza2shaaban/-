
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  audio?: string;
}

export interface ZikrItem {
  text: string;
  count: number;
  reference?: string;
}

export interface ZikrCategory {
  id: number;
  category: string;
  icon: string;
  items: ZikrItem[];
}

export enum AppSection {
  HOME = 'HOME',
  QURAN = 'QURAN',
  PRAYER = 'PRAYER',
  AZKAR = 'AZKAR',
  TASBIH = 'TASBIH',
  SUNNAH = 'SUNNAH',
  AI_CHAT = 'AI_CHAT',
  QIBLA = 'QIBLA'
}

export interface AthanVoice {
  id: string;
  name: string;
  url: string;
}
