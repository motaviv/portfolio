import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";
import Gallery from "../components/Gallery";

function PlaceholderIcon({ className }: { className?: string }) {
  return (
    <div className={`bg-[#C8C5BF]/25 flex items-center justify-center border border-[#C8C5BF]/40 ${className}`}>
      <svg className="w-16 h-16 text-[#C8C5BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 9 4-4 4 4 4-4 4 4" /><path d="m3 15 4 4 4-4 4 4 4-4" /></svg>
    </div>
  );
}

function HeroImage({ image, alt }: { image?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const sizeClass = "w-full h-64 sm:h-80";
  return (
    <div className="img-zoom-wrap rounded-2xl mb-8">
      {!image || failed ? <PlaceholderIcon className={sizeClass} /> : <img src={image} alt={alt} loading="lazy" className={`${sizeClass} object-cover`} onError={() => setFailed(true)} />}
    </div>
  );
}

function OverviewList({ label, items, lang }: { label: string; items: { label: { pt: string; en: string }; value: { pt: string; en: string } }[]; lang: "pt" | "en" }) {
  return (
    <div className="bg-white/60 border border-[#C8C5BF]/40 rounded-xl p-5">
      <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#2B5545] mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</p>
      <dl className="space-y-3">
        {items.map((item) => (
          <div key={item.label[lang]}>
            <dt className="text-xs font-semibold text-[#2C2C2A]">{item.label[lang]}</dt>
            <dd className="text-sm text-[#5F5E5A] leading-relaxed mt-0.5">{item.value[lang]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BulletList({ label, items, lang, dotColor }: { label: string; items: { pt: string; en: string }[]; lang: "pt" | "en"; dotColor: string }) {
  return (
    <div>
      <p className="text-[11px] font-mono font-medium uppercase tracking-widest mb-3" style={{ color: dotColor, fontFamily: "'DM Mono', monospace" }}>{label}</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-[#5F5E5A] leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
            <span>{item[lang]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureAccordion({ label, items, lang }: { label: string; items: { title: { pt: string; en: string }; bullets: { pt: string; en: string }[] }[]; lang: "pt" | "en" }) {
  return (
    <div>
      <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#2B5545] mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</p>
      <div className="space-y-2">{items.map((item, i) => <AccordionItem key={i} title={item.title[lang]} bullets={item.bullets.map((b) => b[lang])} />)}</div>
    </div>
  );
}

function AccordionItem({ title, bullets }: { title: string; bullets: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#C8C5BF]/50 rounded-xl overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left bg-white/60 hover:bg-white/80 transition-colors">
        <span className="text-sm font-medium text-[#2C2C2A]">{title}</span>
        <span className={`shrink-0 w-5 h-5 border border-[#2B5545] rounded flex items-center justify-center text-[#2B5545] transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
        <div className="overflow-hidden">
          <ul className="px-4 py-3 bg-white/30 border-t border-[#C8C5BF]/30 space-y-1.5">
            {bullets.map((b, i) => <li key={i} className="flex gap-2 text-sm text-[#5F5E5A] leading-relaxed"><span className="mt-1.5 w-1 h-1 rounded-full bg-[#2B5545] shrink-0" /><span>{b}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Botão "copiar link" com confirmação visual temporária
function CopyLinkButton({ lang }: { lang: "pt" | "en" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Falha silenciosa — clipboard pode estar bloqueado em alguns navegadores/contextos
    }
  };

  return (
    <button onClick={handleCopy} className="relative inline-flex items-center gap-1.5 text-xs font-medium text-[#5F5E5A] hover:text-[#2B5545] transition-colors">
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      {lang === "pt" ? "Copiar link" : "Copy link"}
      <span
        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2C2C2A] text-[#F4EFE6] text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200"
        style={{ opacity: copied ? 1 : 0, pointerEvents: "none" }}
      >
        {lang === "pt" ? "Copiado!" : "Copied!"}
      </span>
    </button>
  );
}

export default function ProjetoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const prevProject = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const nextProject = index < projects.length - 1 ? projects[index + 1] : projects[0];

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title[lang]} — Vivian Mota`;
    window.scrollTo({ top: 0 });
  }, [slug, lang]);

  // Barra de progresso de leitura — acompanha o quanto do conteúdo do artigo já foi rolado
  useEffect(() => {
    const handler = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(pct * 100);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [slug]);

  if (!project) {
    return (
      <main className="pt-24 pb-20 px-6 text-center page-fade">
        <h1 className="text-2xl font-bold text-[#2C2C2A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Projeto não encontrado", "Project not found")}</h1>
        <Link to="/projetos" className="text-[#2B5545] underline">{t("← Voltar para projetos", "← Back to projects")}</Link>
      </main>
    );
  }

  const d = project.detail;

  return (
    <main className="pt-24 pb-20 px-6 page-fade">
      {/* Barra de progresso de leitura — fixa, logo abaixo da nav */}
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-transparent z-40" aria-hidden="true">
        <div className="h-full bg-[#2B5545] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div ref={articleRef} className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/projetos" className="group inline-flex items-center gap-1.5 text-sm text-[#5F5E5A] hover:text-[#2B5545] transition-colors">
            <span className="transition-transform group-hover:-translate-x-0.5">←</span> {t("Voltar para todos os projetos", "Back to all projects")}
          </Link>
          <CopyLinkButton lang={lang} />
        </div>

        <Reveal><HeroImage image={project.image} alt={project.title[lang]} /></Reveal>

        {/* Tags — clicáveis, levam pra /projetos já filtrado pela trilha desse projeto */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Link
              key={tag}
              to={`/projetos?trilha=${project.track}`}
              className="font-mono text-[11px] text-[#8C4415] border border-[#BF5F1C]/30 px-2.5 py-1 rounded uppercase tracking-wider hover:bg-[#BF5F1C]/10 hover:border-[#BF5F1C]/60 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className="mb-3">
          <span className="font-mono text-[10px] text-[#5F5E5A] bg-[#C8C5BF]/30 px-2 py-0.5 rounded uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            {project.track === "digital" ? t("Soluções Digitais", "Digital Solutions") : t("Pesquisa & Impacto Social", "Research & Social Impact")}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-10 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title[lang]}</h1>

        <div className="space-y-10">
          <Reveal><OverviewList label={d.overviewLabel[lang]} items={d.overview} lang={lang} /></Reveal>
          <Reveal delay={80}><BulletList label={d.diagnosisLabel[lang]} items={d.diagnosis} lang={lang} dotColor="#BF5F1C" /></Reveal>
          <Reveal delay={160}><ArchitectureAccordion label={d.architectureLabel[lang]} items={d.architecture} lang={lang} /></Reveal>
          <Reveal delay={240}><BulletList label={d.impactLabel[lang]} items={d.impact} lang={lang} dotColor="#2B5545" /></Reveal>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <Reveal delay={320} className="mt-10">
            <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#2B5545] mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Galeria", "Gallery")}</p>
            <Gallery images={project.gallery} alt={project.title[lang]} />
          </Reveal>
        )}

        {/* Navigation — seta desliza no hover */}
        <div className="mt-16 pt-8 border-t border-[#C8C5BF]/40 grid grid-cols-2 gap-4">
          <Link to={`/projetos/${prevProject.slug}`} className="group flex flex-col gap-1 p-4 bg-white/60 border border-[#C8C5BF]/40 rounded-xl hover:border-[#2B5545]/40 transition-all">
            <span className="text-xs text-[#5F5E5A] font-mono flex items-center gap-1" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="transition-transform group-hover:-translate-x-1">←</span> {t("projeto anterior", "previous project")}
            </span>
            <span className="text-sm font-medium text-[#2C2C2A] group-hover:text-[#2B5545] transition-colors leading-snug line-clamp-2">{prevProject.title[lang]}</span>
          </Link>
          <Link to={`/projetos/${nextProject.slug}`} className="group flex flex-col gap-1 p-4 bg-white/60 border border-[#C8C5BF]/40 rounded-xl hover:border-[#2B5545]/40 transition-all text-right">
            <span className="text-xs text-[#5F5E5A] font-mono flex items-center justify-end gap-1" style={{ fontFamily: "'DM Mono', monospace" }}>
              {t("próximo projeto", "next project")} <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
            <span className="text-sm font-medium text-[#2C2C2A] group-hover:text-[#2B5545] transition-colors leading-snug line-clamp-2">{nextProject.title[lang]}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
