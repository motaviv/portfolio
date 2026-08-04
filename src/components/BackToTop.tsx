import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";

/**
 * Botão "voltar ao topo" — some por padrão, aparece com fade depois que a pessoa rola
 * bastante a página. Fica ao lado do botão do chat, sem sobrepor.
 */
export default function BackToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("Voltar ao topo", "Back to top")}
      tabIndex={visible ? undefined : -1}
      className="fixed bottom-6 right-24 z-40 w-11 h-11 rounded-full bg-white/90 border border-[#C8C5BF]/60 text-[#2B5545] shadow-lg hover:bg-white transition-all flex items-center justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
