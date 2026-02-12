
import { GoogleGenAI } from "@google/genai";

// Always use the named parameter and process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIslamicGuidance = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "أنت مساعد إسلامي ذكي ومتخصص. تقدم معلومات دقيقة من القرآن والسنة بأسلوب لطيف وميسر. لا تفتي في الأمور المعقدة بل وجه المستخدم للمصادر المعتمدة. تحدث دائماً باللغة العربية.",
        temperature: 0.7,
      }
    });
    // response.text is a property, not a method
    return response.text;
  } catch (error) {
    console.error("Error fetching guidance:", error);
    return "عذراً، حدث خطأ في الحصول على الإجابة. يرجى المحاولة لاحقاً.";
  }
};

export const getVerseTafsir = async (surah: string, ayahNumber: number) => {
  const prompt = `اشرح لي باختصار تفسير الآية رقم ${ayahNumber} من سورة ${surah}. ركز على المعنى الإجمالي والدروس المستفادة.`;
  return getIslamicGuidance(prompt);
};
