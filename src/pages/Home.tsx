import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";

const profilePhotoUrl = "https://drive.google.com/uc?export=view&id=1Ev8wlW354XMyfs2lYccvQPRcy1xKxKTJ";

const nasaComunica = projects.find((p) => p.slug === "nasa-comunica")!;
const qrCode = projects.find((p) => p.slug === "sistema-qr-code-vendas")!;
const inclusao = projects.find((p) => p.slug === "inclusao-criancas-neuroatipicas")!;
const ong = projects.find((p) => p.slug === "acolhimento-ong-prj")!;

const digitalCount = projects.filter((p) => p.track === "digital").length;
const socialCount = projects.filter((p) => p.track === "social").length;

const testimonials = [
  {
    name: "Diana Santos",
    role: { pt: "Diretora de RH", en: "HR Director" },
    linkedin: "https://www.linkedin.com/in/diana-patricia-dos-santos/",
    photo: "https://drive.google.com/uc?export=view&id=1mhALoV-HEz5xMnSi57JrFlVxHQeyvYpb",
    quote: {
      pt: "Vivian, trabalhar com você foi uma experiência incrível. Você é muito responsável, ética e extremamente organizada. Muitas empresas precisam conhecer o seu potencial. Continue com essa força e aprendendo. Você vai longe!",
      en: "Vivian, working with you was an incredible experience. You are very responsible, ethical, and extremely organized. Many companies need to know about your potential. Keep up that strength and keep learning — you'll go far!",
    },
  },
  {
    name: "Micheli Moreira",
    role: { pt: "Gestora de Qualidade", en: "Quality Manager" },
    linkedin: "https://www.linkedin.com/in/micheli-moreira-41625735/",
    photo: "https://drive.google.com/uc?export=view&id=1HnH5Bsk-q_k9DX-pEtPkLnez-b1rDzqY",
    quote: {
      pt: "Vivian é uma profissional extremamente comprometida e dedicada, que não mede esforços para realizar suas entregas com eficiência. Cumpre prazos com consistência e demonstra uma busca contínua por evolução. Destaca-se também pela sua postura proativa: ao apresentar problemas, já traz consigo possíveis soluções, contribuindo de forma objetiva para a tomada de decisão. Trata-se de uma profissional que qualquer gestor orientado à qualidade das entregas teria grande satisfação em ter em sua equipe.",
      en: "Vivian is an extremely committed and dedicated professional who spares no effort to deliver her work efficiently. She meets deadlines consistently and shows a continuous drive to grow. She also stands out for her proactive approach: when raising a problem, she already brings possible solutions, contributing objectively to decision-making. She's the kind of professional any quality-driven manager would be glad to have on their team.",
    },
  },
];

function ProjectPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`bg-[#C8C5BF]/30 flex items-center justify-center ${className}`}>
      <svg className="w-12 h-12 text-[#C8C5BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 9 4-4 4 4 4-4 4 4" /><path d="m3 15 4 4 4-4 4 4 4-4" /></svg>
    </div>
  );
}

function ProjectImage({ image, alt, anchor }: { image?: string; alt: string; anchor?: boolean }) {
  const [failed, setFailed] = useState(false);
  const sizeClass = `w-full ${anchor ? "h-52" : "h-36"}`;
  return (
    <div className="img-zoom-wrap">
      {!image || failed ? <ProjectPlaceholder className={sizeClass} /> : <img src={image} alt={alt} loading="lazy" className={`${sizeClass} object-cover`} onError={() => setFailed(true)} />}
    </div>
  );
}

function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="w-72 h-96 rounded-2xl bg-[#C8C5BF]/30 border border-[#C8C5BF]/60 flex flex-col items-center justify-center gap-3">
        <div className="w-24 h-24 rounded-full bg-[#C8C5BF]/50 flex items-center justify-center">
          <svg className="w-12 h-12 text-[#C8C5BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" className="w-72 h-96 object-cover rounded-2xl border border-[#C8C5BF]/60" onError={() => setFailed(true)} />;
}

function ProjectCard({ slug, image, title, card, tags, anchor, lang }: { slug: string; image?: string; title: string; card: string; tags: string[]; anchor?: boolean; lang: "pt" | "en" }) {
  return (
    <Link to={`/projetos/${slug}`} className={`group block bg-white/60 border border-[#C8C5BF]/50 rounded-2xl overflow-hidden hover:border-[#2B5545]/40 hover:shadow-lg transition-all duration-300 ${anchor ? "row-span-2" : ""}`} aria-label={title}>
      <ProjectImage image={image} alt={title} anchor={anchor} />
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 2).map((tag) => <span key={tag} className="font-mono text-[10px] text-[#8C4415] border border-[#BF5F1C]/30 px-2 py-0.5 rounded uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>{tag}</span>)}
        </div>
        <h3 className="font-display font-semibold text-[#2C2C2A] mb-2 group-hover:text-[#2B5545] transition-colors leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontSize: anchor ? "1.1rem" : "0.95rem" }}>{title}</h3>
        <p className="text-sm text-[#5F5E5A] leading-relaxed">{card}</p>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#2B5545] opacity-0 group-hover:opacity-100 transition-opacity">{lang === "pt" ? "Ver projeto" : "View project"} →</div>
      </div>
    </Link>
  );
}

// Carrossel de depoimentos: um por vez, troca automática a cada 7s, setas redondas com hover.
function TestimonialCarousel({ lang }: { lang: "pt" | "en" }) {
  const [index, setIndex] = useState(0);
  const [photoFailed, setPhotoFailed] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (newIndex: number) => {
    setIndex((newIndex + testimonials.length) % testimonials.length);
    startTimer(); // reinicia o contador quando a pessoa navega manualmente
  };

  const current = testimonials[index];

  return (
    <div className="relative max-w-lg mx-auto">
      <div key={index} className="bg-white/70 border border-[#C8C5BF]/50 rounded-2xl p-6 reveal is-visible" style={{ animation: "none" }}>
        <p className="text-[#2C2C2A] leading-relaxed mb-4 text-sm italic">"{current.quote[lang]}"</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C8C5BF]/40 flex items-center justify-center shrink-0 overflow-hidden">
            {!photoFailed[index] ? (
              <img src={current.photo} alt={current.name} className="w-full h-full object-cover" onError={() => setPhotoFailed((p) => ({ ...p, [index]: true }))} />
            ) : (
              <svg className="w-5 h-5 text-[#C8C5BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2C2C2A]">{current.name}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-[#5F5E5A]">{current.role[lang]}</p>
              <a href={current.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${current.name}`} className="text-[#2B5545] hover:opacity-70 transition-opacity">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Setas redondas + indicadores */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button onClick={() => go(index - 1)} aria-label={lang === "pt" ? "Depoimento anterior" : "Previous testimonial"} className="w-9 h-9 rounded-full border border-[#C8C5BF]/60 text-[#2B5545] flex items-center justify-center hover:scale-110 hover:border-[#2B5545] hover:bg-white transition-all">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`${lang === "pt" ? "Ir para depoimento" : "Go to testimonial"} ${i + 1}`} className="w-1.5 h-1.5 rounded-full transition-all" style={{ backgroundColor: i === index ? "#2B5545" : "#C8C5BF" }} />
          ))}
        </div>
        <button onClick={() => go(index + 1)} aria-label={lang === "pt" ? "Próximo depoimento" : "Next testimonial"} className="w-9 h-9 rounded-full border border-[#C8C5BF]/60 text-[#2B5545] flex items-center justify-center hover:scale-110 hover:border-[#2B5545] hover:bg-white transition-all">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { lang, t } = useLang();
  const navigate = useNavigate();

  useEffect(() => { document.title = "Vivian Mota — Portfólio"; }, []);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const marqueeItems = t("Psicologia · Automação · IA · Pesquisa Social · Apps Script · ISO 9001 · Escuta", "Psychology · Process Automation · AI · Social Research · Apps Script · ISO 9001 · Continuous Improvement");

  return (
    <main className="page-fade">
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 pb-12 px-6" style={{ background: "linear-gradient(160deg, #F4EFE6 60%, #e8f0ec 100%)" }}>
        <Reveal className="max-w-4xl mx-auto w-full">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-[#2B5545] border border-[#2B5545]/30 bg-[#2B5545]/8 px-3 py-1.5 rounded-full" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B5545] animate-pulse" />{t("disponível para novas oportunidades", "available for new opportunities")}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C2C2A] leading-tight mb-8 max-w-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {t("Entre a tecnologia que otimiza e a busca por impacto social: conheça minha trajetória", "Where optimizing technology meets the pursuit of social impact: get to know my journey")}
          </h1>
          <button onClick={() => scrollTo("destaques-solucoes-digitais")} className="inline-flex items-center gap-2 bg-[#2B5545] text-[#F4EFE6] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1e3d31] transition-colors">{t("Ver projetos", "View projects")} ↓</button>
        </Reveal>
        <div className="marquee-wrap mt-16 overflow-hidden border-y border-[#C8C5BF]/40 py-3">
          <div className="animate-marquee">
            {[...Array(4)].map((_, i) => <span key={i} className="font-mono text-xs text-[#5F5E5A] mr-12 shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{marqueeItems}</span>)}
          </div>
        </div>
      </section>

      <section id="destaques-solucoes-digitais" className="py-20 px-6 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Destaques — Soluções Digitais", "Featured — Digital Solutions")}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <Reveal className="md:col-span-3"><ProjectCard slug={nasaComunica.slug} image={nasaComunica.image} title={nasaComunica.title[lang]} card={nasaComunica.card[lang]} tags={["automação", "rh"]} anchor lang={lang} /></Reveal>
            <Reveal delay={120} className="md:col-span-2"><ProjectCard slug={qrCode.slug} image={qrCode.image} title={qrCode.title[lang]} card={qrCode.card[lang]} tags={["freelance", "vendas"]} lang={lang} /></Reveal>
          </div>
        </div>
      </section>

      <section id="destaques-pesquisa-impacto-social" className="py-20 px-6 bg-[#e8f0ec]/40">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Destaques — Pesquisa & Impacto Social", "Featured — Research & Social Impact")}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <Reveal className="md:col-span-3"><ProjectCard slug={inclusao.slug} image={inclusao.image} title={inclusao.title[lang]} card={inclusao.card[lang]} tags={["pesquisa de campo"]} anchor lang={lang} /></Reveal>
            <Reveal delay={120} className="md:col-span-2"><ProjectCard slug={ong.slug} image={ong.image} title={ong.title[lang]} card={ong.card[lang]} tags={["voluntariado"]} lang={lang} /></Reveal>
          </div>
        </div>
      </section>

      <section id="sobre-preview" className="py-20 px-6 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Sobre mim", "About me")}</h2>
            <p className="text-[#5F5E5A] leading-relaxed mb-4">{t("Cresci na Baixada Fluminense percebendo algo que mais tarde a teoria viria a nomear: muitas das limitações e barreiras que as pessoas enfrentam no cotidiano não são falhas individuais, mas construções sociais, estruturais e históricas.", "I grew up in Baixada Fluminense noticing something theory would later name: many of the limits and barriers people face daily aren't individual failures — they're social, structural, and historical constructions.")}</p>
            <p className="text-[#5F5E5A] leading-relaxed mb-8">{t("Transito entre dois universos que se complementam: a engenharia de processos e a automação com rigor da qualidade — e a investigação da psicologia crítica, atenta a raça, classe, gênero e interseccionalidade.", "I move between two worlds that complement each other: process engineering and automation with quality rigor — and critical psychology research, attentive to race, class, gender, and intersectionality.")}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { num: digitalCount, label: t("automações criadas", "automations built") },
                { num: socialCount, label: t("pesquisas de campo", "field research projects") },
                { num: 4, label: t("meses de voluntariado", "months volunteering") },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white/60 rounded-xl border border-[#C8C5BF]/40">
                  <p className="text-2xl font-bold text-[#2B5545]" style={{ fontFamily: "'Playfair Display', serif" }}><Counter value={stat.num} /></p>
                  <p className="text-xs text-[#5F5E5A] mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link to="/sobre" className="inline-flex items-center gap-2 border border-[#2B5545] text-[#2B5545] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#2B5545] hover:text-[#F4EFE6] transition-all">{t("Saiba mais sobre mim", "More about me")} →</Link>
          </Reveal>
          <Reveal delay={150} className="flex justify-center"><ProfilePhoto src={profilePhotoUrl} alt="Vivian Mota" /></Reveal>
        </div>
      </section>

      <section id="areas-de-atuacao" className="py-20 px-6 bg-[#2B5545]">
        <div className="max-w-6xl mx-auto">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold text-[#F4EFE6] mb-10 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Áreas de Atuação", "Areas of Practice")}</h2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "⚙️", title: t("Automação & Processos", "Process Automation"), desc: t("Google Apps Script, fluxos de trabalho e sistemas internos", "Google Apps Script, workflows and internal systems") },
              { icon: "🔬", title: t("Pesquisa & Psicologia Social", "Psychology & Social Research"), desc: t("Psicologia crítica, pesquisa de campo e escuta qualificada", "Critical psychology, field research and qualified listening") },
              { icon: "💻", title: t("Soluções Digitais", "Digital Products"), desc: t("Desenvolvimento de portais, vitrines e ferramentas web", "Portal development, showcases and web tools") },
              { icon: "🤝", title: t("Atuação Comunitária", "Community Engagement"), desc: t("Voluntariado, extensão universitária e impacto social", "Volunteering, university extension and social impact") },
              { icon: "📋", title: t("Gestão da Qualidade (ISO)", "Quality Management (ISO)"), desc: t("Auditoria ISO 9001, mapeamento de processos e SGQ", "ISO 9001 audit, process mapping and QMS") },
            ].map((area, i) => (
              <Reveal key={area.title} delay={i * 80}>
                <div className="bg-[#F4EFE6]/10 border border-[#F4EFE6]/15 rounded-2xl p-5 text-center hover:bg-[#F4EFE6]/15 transition-colors h-full">
                  <div className="text-2xl mb-3">{area.icon}</div>
                  <h3 className="text-sm font-semibold text-[#F4EFE6] mb-2 leading-snug">{area.title}</h3>
                  <p className="text-xs text-[#F4EFE6]/65 leading-relaxed">{area.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="como-trabalho" className="py-20 px-6 bg-[#F4EFE6]">
        <div className="max-w-4xl mx-auto">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Como eu trabalho", "How I work")}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: t("Mapear", "Map"), desc: t("Observo o contexto, escuto as pessoas envolvidas e identifico os reais gargalos antes de propor qualquer solução.", "I observe the context, listen to the people involved, and identify the real bottlenecks before proposing any solution.") },
              { num: "02", title: t("Construir", "Build"), desc: t("Desenvolvo a solução com os recursos disponíveis — priorizando simplicidade, governança e adoção real pela equipe.", "I build the solution with available resources — prioritizing simplicity, governance, and real team adoption.") },
              { num: "03", title: t("Entregar com impacto", "Deliver impact"), desc: t("Acompanho os resultados, documento os processos e garanto que a melhoria persista além da minha atuação.", "I track results, document the processes, and ensure the improvement persists beyond my involvement.") },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="relative pl-6 border-l-2 border-[#2B5545]/30 group">
                  <p className="font-mono text-3xl font-medium text-[#2B5545]/20 group-hover:text-[#2B5545]/60 transition-colors duration-300 mb-3 leading-none" style={{ fontFamily: "'DM Mono', monospace" }}>{step.num}</p>
                  <h3 className="text-lg font-semibold text-[#2C2C2A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5F5E5A] leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="py-20 px-6 bg-[#E8E0D3]">
        <div className="max-w-4xl mx-auto">
          <Reveal><h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-10 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Depoimentos", "Testimonials")}</h2></Reveal>
          <Reveal><TestimonialCarousel lang={lang} /></Reveal>
        </div>
      </section>

      <section id="contato-cta" className="py-20 px-6 bg-[#F4EFE6] text-center">
        <Reveal className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Vamos conversar?", "Let's talk?")}</h2>
          <p className="text-[#5F5E5A] mb-8 text-lg">{t("Entre em contato", "Get in touch")}</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a href="https://www.linkedin.com/in/viv-mota/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Vivian Mota" className="flex items-center gap-2 bg-[#2B5545] text-[#F4EFE6] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1e3d31] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
            <a href="mailto:motaviv@gmail.com" aria-label="E-mail de Vivian Mota" className="flex items-center gap-2 border border-[#2B5545] text-[#2B5545] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#2B5545] hover:text-[#F4EFE6] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              motaviv@gmail.com
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
