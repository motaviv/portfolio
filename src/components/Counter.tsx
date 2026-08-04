import { useEffect, useRef, useState } from "react";

/**
 * Número que sobe de 0 até o valor final quando entra na tela.
 * Respeita prefers-reduced-motion (mostra o valor final direto, sem contar).
 */
export default function Counter({ value, durationMs = 900 }: { value: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            if (prefersReduced) {
              setDisplay(value);
              return;
            }
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / durationMs, 1);
              setDisplay(Math.round(progress * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
