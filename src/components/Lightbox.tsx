import { useState, useEffect } from "react";

const TRANSITION_MS = 220;

/**
 * Visualizador de imagem em tela cheia (lightbox).
 * Fecha com Esc, clique fora da imagem, ou no botão redondo "X".
 * Fica montado alguns ms a mais ao fechar, só pra permitir a animação de saída
 * (mesmo princípio usado no Chat.tsx) — sem deixar botões "fantasmas" navegáveis por teclado.
 */
export default function Lightbox({
  images,
  alt,
  openIndex,
  onClose,
  onNavigate,
}: {
  images: string[];
  alt: string;
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isOpen = openIndex !== null;
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    let raf1: number, raf2: number;
    if (isOpen) {
      setMounted(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setAnimateIn(true));
      });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setMounted(false), TRANSITION_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && openIndex !== null) onNavigate((openIndex + 1) % images.length);
      if (e.key === "ArrowLeft" && openIndex !== null) onNavigate((openIndex - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handler);
    // Trava a rolagem do fundo enquanto o lightbox está aberto
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, openIndex, images.length, onClose, onNavigate]);

  if (!mounted || openIndex === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(23,22,20,0.92)",
        opacity: animateIn ? 1 : 0,
        transition: `opacity ${TRANSITION_MS}ms ease`,
      }}
    >
      <img
        src={images[openIndex]}
        alt={`${alt} — ${openIndex + 1}/${images.length}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg"
        style={{
          transform: animateIn ? "scale(1)" : "scale(0.94)",
          transition: `transform ${TRANSITION_MS}ms ease`,
        }}
      />

      {/* Botão redondo de fechar */}
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="fixed top-5 right-5 w-11 h-11 rounded-full bg-[#F4EFE6] text-[#2C2C2A] flex items-center justify-center hover:bg-white transition-colors shadow-lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Setas de navegação — só aparecem se houver mais de 1 imagem */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((openIndex - 1 + images.length) % images.length); }}
            aria-label="Imagem anterior"
            className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F4EFE6]/90 text-[#2C2C2A] flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((openIndex + 1) % images.length); }}
            aria-label="Próxima imagem"
            className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F4EFE6]/90 text-[#2C2C2A] flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
