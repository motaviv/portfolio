import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { projects } from "../data/projects";
import { tracks } from "../data/tracks";

function TrackIcon({ icon, className }: { icon: "gear" | "leaf"; className?: string }) {
  if (icon === "gear")
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export default function Nav() {
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navRowRef = useRef<HTMLDivElement>(null);
  const sobreRef = useRef<HTMLAnchorElement>(null);
  const projetosRef = useRef<HTMLAnchorElement>(null);
  const contatoRef = useRef<HTMLAnchorElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const activeKey = location.pathname === "/sobre"
    ? "sobre"
    : location.pathname.startsWith("/projetos")
      ? "projetos"
      : location.pathname === "/contato"
        ? "contato"
        : null;

  useLayoutEffect(() => {
    const container = navRowRef.current;
    const refMap = { sobre: sobreRef.current, projetos: projetosRef.current, contato: contatoRef.current };
    const activeEl = activeKey ? refMap[activeKey] : null;
    if (!container || !activeEl) { setIndicator((p) => ({ ...p, opacity: 0 })); return; }
    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setIndicator({ left: elRect.left - containerRect.left, width: elRect.width, opacity: 1 });
  }, [activeKey, lang]);

  const handleAreas = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById("areas-de-atuacao")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => document.getElementById("areas-de-atuacao")?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const openProjectsMenu = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setProjectsMenuOpen(true); };
  const scheduleCloseProjectsMenu = () => { closeTimer.current = setTimeout(() => setProjectsMenuOpen(false), 150); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setProjectsMenuOpen(false); setMenuOpen(false); } };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Switch único PT/EN — desliza o indicador em vez de trocar dois botões
  const LangToggle = ({ size = "normal" }: { size?: "normal" | "compact" }) => {
    const w = size === "compact" ? 56 : 60;
    return (
      <button
        onClick={toggleLang}
        aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
        className="relative flex items-center rounded-full border border-[#2B5545] p-0.5 font-mono text-[10px]"
        style={{ width: w, fontFamily: "'DM Mono', monospace" }}
      >
        <span
          className="absolute top-0.5 bottom-0.5 rounded-full bg-[#2B5545] transition-all duration-300 ease-out"
          style={{ left: lang === "pt" ? "2px" : "50%", width: "calc(50% - 2px)" }}
        />
        <span className={`relative z-10 flex-1 text-center py-1 transition-colors duration-300 ${lang === "pt" ? "text-[#F4EFE6]" : "text-[#2B5545]"}`}>PT</span>
        <span className={`relative z-10 flex-1 text-center py-1 transition-colors duration-300 ${lang === "en" ? "text-[#F4EFE6]" : "text-[#2B5545]"}`}>EN</span>
      </button>
    );
  };

  // Menu suspenso "Projetos" — 2 cards minimalistas gerados a partir de tracks.ts (automático)
  const ProjectsMenu = ({ active, onLinkClick }: { active: boolean; onLinkClick: () => void }) => (
    <div className="grid grid-cols-2 gap-3">
      {tracks.map((track) => {
        const count = projects.filter((p) => p.track === track.id).length;
        return (
          <Link
            key={track.id}
            to={`/projetos?trilha=${track.id}`}
            onClick={onLinkClick}
            tabIndex={active ? undefined : -1}
            className="flex flex-col gap-2 p-4 rounded-xl border border-[#C8C5BF]/50 bg-white/60 hover:border-[#2B5545]/50 hover:bg-white transition-all group"
          >
            <TrackIcon icon={track.icon} className="w-5 h-5 text-[#2B5545]" />
            <span className="text-sm font-medium text-[#2C2C2A] group-hover:text-[#2B5545] transition-colors leading-snug">
              {track.label[lang]}
            </span>
            <span className="text-[10px] font-mono text-[#5F5E5A] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
              {count} {t("projetos", "projects")}
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F4EFE6]/95 backdrop-blur-sm border-b border-[#C8C5BF]/40">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Navegação principal">
        <Link
          to="/"
          onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-display text-lg font-semibold text-[#2B5545] tracking-wide hover:text-[#1e3d31] transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t("Portfólio", "Portfolio")}
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 relative" ref={navRowRef}>
          <Link ref={sobreRef} to="/sobre" className="text-sm font-medium text-[#5F5E5A] hover:text-[#2B5545] transition-colors">
            {t("Sobre", "About")}
          </Link>
          <button onClick={handleAreas} className="text-sm font-medium text-[#5F5E5A] hover:text-[#2B5545] transition-colors cursor-pointer">
            {t("Áreas", "Areas")}
          </button>

          {/* Projetos: agora é link direto + expande no hover */}
          <div className="relative" onMouseEnter={openProjectsMenu} onMouseLeave={scheduleCloseProjectsMenu}>
            <Link
              ref={projetosRef}
              to="/projetos"
              className="flex items-center gap-1 text-sm font-medium text-[#5F5E5A] hover:text-[#2B5545] transition-colors"
            >
              {t("Projetos", "Projects")}
              <svg className={`w-3 h-3 transition-transform ${projectsMenuOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
              style={{
                opacity: projectsMenuOpen ? 1 : 0,
                maxHeight: projectsMenuOpen ? "220px" : "0px",
                overflow: "hidden",
                pointerEvents: projectsMenuOpen ? "auto" : "none",
                transition: "opacity 0.25s ease, max-height 0.3s ease",
              }}
            >
              <div className="w-[320px] bg-[#F4EFE6] border border-[#C8C5BF]/50 rounded-2xl shadow-lg p-4">
                <ProjectsMenu active={projectsMenuOpen} onLinkClick={() => setProjectsMenuOpen(false)} />
              </div>
            </div>
          </div>

          <Link ref={contatoRef} to="/contato" className="text-sm font-medium text-[#5F5E5A] hover:text-[#2B5545] transition-colors">
            {t("Contato", "Contact")}
          </Link>

          <LangToggle />

          <div
            className="absolute -bottom-2 h-0.5 bg-[#2B5545] rounded-full pointer-events-none"
            style={{ left: `${indicator.left}px`, width: `${indicator.width}px`, opacity: indicator.opacity, transition: "left 0.3s ease, width 0.3s ease, opacity 0.2s ease" }}
          />
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <LangToggle size="compact" />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block w-5 h-0.5 bg-[#2C2C2A] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#2C2C2A] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#2C2C2A] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#F4EFE6] border-t border-[#C8C5BF]/40 px-6 py-4 flex flex-col gap-4">
          <Link to="/sobre" onClick={closeMenu} className="text-base font-medium text-[#2C2C2A] hover:text-[#2B5545] transition-colors">
            {t("Sobre", "About")}
          </Link>
          <button onClick={handleAreas} className="text-left text-base font-medium text-[#2C2C2A] hover:text-[#2B5545] transition-colors">
            {t("Áreas de Atuação", "Areas of Practice")}
          </button>

          <div>
            <Link to="/projetos" onClick={closeMenu} className="text-base font-medium text-[#2C2C2A] hover:text-[#2B5545] transition-colors">
              {t("Projetos", "Projects")}
            </Link>
            <div className="mt-3">
              <ProjectsMenu active={menuOpen} onLinkClick={closeMenu} />
            </div>
          </div>

          <Link to="/contato" onClick={closeMenu} className="text-base font-medium text-[#2C2C2A] hover:text-[#2B5545] transition-colors">
            {t("Contato", "Contact")}
          </Link>
        </div>
      )}
    </header>
  );
}
