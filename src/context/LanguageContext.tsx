import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang = "pt" | "en";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (pt: string, en: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  toggleLang: () => {},
  t: (pt) => pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "pt" ? "en" : "pt"));
  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
