import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'vi' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (vi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('vi');

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'vi' ? 'en' : 'vi');
  }, []);

  const t = useCallback((vi: string, en: string) => {
    return lang === 'vi' ? vi : en;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
