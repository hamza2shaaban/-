
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { getIslamicGuidance } from '../geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const AIChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'السلام عليكم ورحمة الله، أنا نور مساعدك الذكي. كيف يمكنني مساعدتك اليوم في تساؤلاتك الدينية أو تفسير القرآن؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await getIslamicGuidance(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response || "عذراً لم أستطع فهم ذلك." }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh] animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 rounded-t-3xl text-white flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-xl">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="font-bold">نور AI - المساعد الذكي</h2>
          <p className="text-[10px] opacity-80">تفسير، فقه، وسيرة نبوية</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 dark:bg-slate-800/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-700 border border-emerald-50 dark:border-slate-600 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-2xl flex gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 border-t border-emerald-100 dark:border-slate-700 rounded-b-3xl">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 p-3 bg-emerald-50 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-90 transition-all shadow-md shadow-emerald-200 dark:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">نور AI قد يخطئ، يرجى دائماً مراجعة المصادر الموثوقة.</p>
      </div>
    </div>
  );
};

export default AIChatSection;
