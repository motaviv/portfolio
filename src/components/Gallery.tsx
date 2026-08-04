import { useState } from "react";
import Lightbox from "./Lightbox";

/**
 * Galeria de fotos de projeto.
 * Desktop (lg+): fileira horizontal, miniaturas se expandem suavemente no hover (efeito "acordeão").
 * Mobile/tablet: grade simples 2 colunas, sem efeito de hover (não existe em telas de toque).
 * Clique em qualquer imagem abre o Lightbox em tela cheia.
 */
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Desktop: fileira com expansão no hover */}
      <div className="hidden lg:flex items-stretch gap-2 h-72 w-full">
        {images.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setOpenIndex(idx)}
            aria-label={`${alt} — ${idx + 1}/${images.length}`}
            className="relative flex-grow w-40 rounded-xl overflow-hidden transition-all duration-500 hover:flex-grow-[3] focus-visible:flex-grow-[3]"
          >
            <img
              src={src}
              alt={`${alt} — ${idx + 1}`}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Mobile/tablet: grade 2 colunas, sem efeito de hover */}
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        {images.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setOpenIndex(idx)}
            aria-label={`${alt} — ${idx + 1}/${images.length}`}
            className="relative rounded-xl overflow-hidden aspect-square"
          >
            <img
              src={src}
              alt={`${alt} — ${idx + 1}`}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        alt={alt}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
