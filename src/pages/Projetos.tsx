import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { projects } from "../data/projects";
import { tracks } from "../data/tracks";
import Reveal from "../components/Reveal";

type Filter = "all" | string;

function GridImage({ image, alt }: { image?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="img-zoom-wrap">
      {!image || failed ? (
        <div className="h-40 bg-[#C8C5BF]/25 flex items-center justify-center">
          <svg className="w-10 h-10 text-[#C8C5BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="m3 9 4-4 4 4 4-4 4 4" />
            <path d="m3 15 4 4 4-4 4 4 4-4" />
          </svg>
        </div>
      ) : (
        <img src={image} alt={alt} loading="lazy" className="h-40 w-full object-cover" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export default function Projetos() {
  const { lang, t } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();

  // Lê o filtro direto da URL (?trilha=digital) — é assim que o menu suspenso do Nav direciona
  const trilhaParam = searchParams.get("trilha");
  const initialFilter: Filter = tracks.some((tr) => tr.id === trilhaParam) ? trilhaParam! : "all";
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    document.title = t("Projetos — Vivian Mota", "Projects — Vivian Mota");
  }, [lang]);

  // Se o parâmetro da URL mudar (ex: clicar de novo no menu vindo de outro filtro), acompanha
  useEffect(() => {
    if (trilhaParam && tracks.some((tr) => tr.id === trilhaParam)) {
      setFilter(trilhaParam);
    } else if (!trilhaParam) {
      setFilter("all");
    }
  }, [trilhaParam]);

  const handleFilterClick = (id: Filter) => {
    setFilter(id);
    if (id === "all") setSearchParams({});
    else setSearchParams({ trilha: id });
  };

  const filtered = projects.filter((p) => (filter === "all" ? true : p.track === filter));

  return (
    <main className="pt-24 pb-20 px-6 page-fade">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("Projetos", "Projects")}
          </h1>
          <p className="text-[#5F5E5A] mb-8">
            {t(`${projects.length} projetos em ${tracks.length} trilhas.`, `${projects.length} projects across ${tracks.length} tracks.`)}
          </p>
        </Reveal>

        {/* Filtros — "Todos" + uma entrada por trilha, geradas automaticamente a partir de tracks.ts */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={t("Filtrar projetos", "Filter projects")}>
            <button
              onClick={() => handleFilterClick("all")}
              aria-pressed={filter === "all"}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === "all" ? "bg-[#2B5545] text-[#F4EFE6] border-[#2B5545]" : "bg-white/60 text-[#5F5E5A] border-[#C8C5BF]/50 hover:border-[#2B5545]/40 hover:text-[#2C2C2A]"
              }`}
            >
              {t("Todos", "All")}
            </button>
            {tracks.map((tr) => (
              <button
                key={tr.id}
                onClick={() => handleFilterClick(tr.id)}
                aria-pressed={filter === tr.id}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  filter === tr.id ? "bg-[#2B5545] text-[#F4EFE6] border-[#2B5545]" : "bg-white/60 text-[#5F5E5A] border-[#C8C5BF]/50 hover:border-[#2B5545]/40 hover:text-[#2C2C2A]"
                }`}
              >
                {tr.label[lang]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const trackMeta = tracks.find((tr) => tr.id === project.track);
            return (
              <Reveal key={project.slug} delay={(i % 6) * 60}>
                <Link
                  to={`/projetos/${project.slug}`}
                  className="group block bg-white/60 border border-[#C8C5BF]/50 rounded-2xl overflow-hidden hover:border-[#2B5545]/40 hover:shadow-lg transition-all duration-300"
                  aria-label={project.title[lang]}
                >
                  <GridImage image={project.image} alt={project.title[lang]} />
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="font-mono text-[10px] text-[#5F5E5A] bg-[#C8C5BF]/30 px-2 py-0.5 rounded uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {trackMeta?.label[lang]}
                      </span>
                    </div>
                    <h2 className="font-semibold text-[#2C2C2A] text-sm mb-2 leading-snug group-hover:text-[#2B5545] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {project.title[lang]}
                    </h2>
                    <p className="text-xs text-[#5F5E5A] leading-relaxed mb-3">{project.card[lang]}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] text-[#8C4415] border border-[#BF5F1C]/25 px-1.5 py-0.5 rounded" style={{ fontFamily: "'DM Mono', monospace" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Estado vazio — caso um filtro futuro não tenha nenhum projeto */}
        {filtered.length === 0 && (
          <p className="text-center text-[#5F5E5A] py-16">
            {t("Nenhum projeto encontrado nessa trilha ainda.", "No projects found in this track yet.")}
          </p>
        )}
      </div>
    </main>
  );
}
