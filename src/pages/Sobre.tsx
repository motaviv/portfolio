import { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import Reveal from "../components/Reveal";

const profilePhotoUrl = "/images/profile.jpg";

type AccordionItem = { titlePT: string; titleEN: string; summaryPT: string; summaryEN: string; respPT: string; respEN: string; resultsPT: string; resultsEN: string; };

const timeline: AccordionItem[] = [
  { titlePT: "Aprendiz de Comunicação Interna | Nasajon Sistemas Ltda — mai 2026–Presente", titleEN: "Internal Communications Trainee | Nasajon Sistemas Ltda — May 2026–Present", summaryPT: "Atuação no laboratório de inovação (Nasalab) da empresa, sendo responsável pelos processos de endomarketing e comunicação interna.", summaryEN: "Working in the company's innovation lab (Nasalab), responsible for employee communication and engagement.", respPT: "Gestão da agenda de endomarketing, redação de comunicados e canais oficiais. Reestruturação do Portal do Funcionário focada em Employee Experience (EX) via Google Apps Script. Desenvolvimento de sistema web para centralização de canais de comunicação com painel administrativo. Engenharia de automações de fluxos (Google Apps Script, webhooks para Google Chat, Claude Projects para distribuição de pautas). Co-criação do assistente virtual FAQ RH Responde (Gemini) e planejamento da trilha corporativa de aculturamento em IA.", respEN: "Managed the internal communications calendar and official channels. Restructured the Employee Portal for Employee Experience (EX) via Google Apps Script. Built a web system centralizing communication channels with an admin panel. Engineered workflow automations (Apps Script, Google Chat webhooks, Claude Projects for agenda distribution). Co-created the \"HR Responde\" FAQ assistant (Gemini) and planned the corporate AI-literacy track.", resultsPT: "Descentralização e automação de fluxos sem custos adicionais de software. Estruturação e governança dos dados e canais oficiais de comunicação.", resultsEN: "Decentralized and automated workflows at no added software cost; structured governance of official communication data." },
  { titlePT: "Aprendiz de Qualidade & Processos | Nasajon Sistemas Ltda — jan 2026–mai 2026", titleEN: "Quality & Process Trainee | Nasajon Sistemas Ltda — Jan–May 2026", summaryPT: "Atuação direta no Sistema de Gestão da Qualidade (SGQ), mapeamento de processos e auditoria interna.", summaryEN: "Direct work on the Quality Management System (QMS), process mapping, and internal audit.", respPT: "Atuação como auditora interna no SGQ, participando da auditoria de mais de 300 processos em 2 meses (ISO 9001). Mapeamento, análise e redesenho de fluxos de trabalho (as-is/to-be) em reuniões com colaboradores e diretoria. Apoio e co-desenvolvimento de assistentes de IA para automação de laudos, transcrições e relatórios de auditoria. Criação da trilha de interface de processos e do glossário corporativo.", respEN: "Internal auditor on the QMS, auditing 300+ processes in 2 months (ISO 9001). Mapped and redesigned workflows (as-is/to-be) with staff and leadership. Supported AI assistants for audit reports and transcripts. Created the process-interface track and corporate glossary.", resultsPT: "Asseguração da aderência aos requisitos da ISO 9001. Redução no tempo de entrega de relatórios e identificação de gargalos para melhoria contínua.", resultsEN: "Ensured ISO 9001 adherence; reduced report turnaround and surfaced bottlenecks." },
  { titlePT: "Aprendiz de Departamento Pessoal | Nasajon Sistemas Ltda — jun 2025–jan 2026", titleEN: "HR Administration Trainee | Nasajon Sistemas Ltda — Jun 2025–Jan 2026", summaryPT: "Atendimento consultivo, operacionalização de rotinas trabalhistas e saneamento de eventos no eSocial.", summaryEN: "Consultative support and labor routine operations, including eSocial resolution.", respPT: "Operacionalização no sistema Persona (férias, desligamentos, atualizações cadastrais) e atendimento focado na experiência do cliente (benefícios, ASOs). Processamento de rescisões, emissão de kits rescisórios (FGTS, GRRF, SEFIP, FGTS Digital) e envio/tratamento de eventos do eSocial. Implementação de pesquisa de satisfação com clientes da carteira (CX).", respEN: "Operated the Persona system (leave, terminations, records). Processed terminations and eSocial events. Implemented client satisfaction surveys.", resultsPT: "Saneamento de inconsistências do eSocial e conferência documental detalhada. Estruturação de dados da pesquisa de satisfação para melhoria no atendimento.", resultsEN: "Resolved eSocial inconsistencies; structured survey data for service improvement." },
  { titlePT: "Atendente Administrativo | FMY Artefatos de Cimento — ago 2024–jun 2025", titleEN: "Administrative Assistant | FMY Artefatos de Cimento — Aug 2024–Jun 2025", summaryPT: "Atuação no controle operacional, rotinas financeiras/comerciais e inovação no atendimento.", summaryEN: "Operational control and commercial routine, plus service innovation.", respPT: "Implementação de planilhas automatizadas para controle de produção e inventário de estoque. Abertura, conciliação e fechamento de caixa, além de suporte ao cliente. Desenvolvimento de portfólio de produtos B2B com catálogo visual via QR Code.", respEN: "Built automated spreadsheets for production/inventory control. Handled cash register and customer support. Developed a B2B catalog with QR-code integration.", resultsPT: "Redução de falhas de contagem e maior previsibilidade para a fábrica. Modernização da apresentação comercial para construtoras e clientes.", resultsEN: "Reduced counting errors; modernized commercial presentation." },
  { titlePT: "Jovem Aprendiz de Comércio e Varejo / Auxiliar de Escritório | Lojas Riachuelo — mar 2022–jan 2024", titleEN: "Retail Young Apprentice / Office Assistant | Lojas Riachuelo — Mar 2022–Jan 2024", summaryPT: "Suporte administrativo ao RH, gestão documental e interface entre loja e escritório central.", summaryEN: "Administrative support to HR and store–head office liaison.", respPT: "Apoio ao RH em agendamento de entrevistas, suporte logístico no onboarding e eventos internos. Organização, digitalização e arquivamento de prontuários confidenciais e atualização de bancos de dados. Ponto de contato entre colaboradores da loja e o escritório central. Suporte à operação de e-commerce (omnichannel) e Visual Merchandising.", respEN: "Supported interview scheduling and onboarding. Digitized and filed confidential records. Supported omnichannel e-commerce and visual merchandising.", resultsPT: "Manutenção do sigilo e organização na gestão documental do setor. Agilidade na resolução de ocorrências e no alinhamento de demandas.", resultsEN: "Maintained confidentiality in document management; resolved issues quickly." },
];

function AboutPortrait({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="w-52 h-64 rounded-2xl bg-[#C8C5BF]/30 border border-[#C8C5BF]/60 flex flex-col items-center justify-center gap-2">
        <div className="w-16 h-16 rounded-full bg-[#C8C5BF]/50 flex items-center justify-center">
          <svg className="w-9 h-9 text-[#C8C5BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" className="w-52 h-64 object-cover rounded-2xl border border-[#C8C5BF]/60" onError={() => setFailed(true)} />;
}

function AccordionCard({ item, lang }: { item: AccordionItem; lang: "pt" | "en" }) {
  const [open, setOpen] = useState(false);
  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);
  return (
    <div className="border border-[#C8C5BF]/50 rounded-xl overflow-hidden">
      <button className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left bg-white/60 hover:bg-white/80 transition-colors" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="text-sm font-medium text-[#2C2C2A] leading-snug">{t(item.titlePT, item.titleEN)}</span>
        <span className={`shrink-0 w-5 h-5 border border-[#2B5545] rounded flex items-center justify-center text-[#2B5545] transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
        <div className="overflow-hidden">
          <div className="px-5 py-4 bg-white/30 border-t border-[#C8C5BF]/30 text-sm text-[#5F5E5A] space-y-4">
            <div><p className="font-semibold text-[#2C2C2A] text-xs font-mono uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Resumo Geral", "Summary")}</p><p className="leading-relaxed">{t(item.summaryPT, item.summaryEN)}</p></div>
            <div><p className="font-semibold text-[#2C2C2A] text-xs font-mono uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Principais Responsabilidades", "Responsibilities")}</p><p className="leading-relaxed">{t(item.respPT, item.respEN)}</p></div>
            <div><p className="font-semibold text-[#2C2C2A] text-xs font-mono uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Resultados & Impactos", "Impact")}</p><p className="leading-relaxed">{t(item.resultsPT, item.resultsEN)}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sobre() {
  const { lang, t } = useLang();
  useEffect(() => { document.title = t("Sobre — Vivian Mota", "About — Vivian Mota"); }, [lang]);

  return (
    <main className="pt-24 pb-20 page-fade">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 items-start">
          <div className="md:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Sobre mim", "About me")}</h1>
            {lang === "pt" ? (
              <>
                <p className="text-[#5F5E5A] leading-relaxed mb-4">Cresci na Baixada Fluminense percebendo, no dia a dia, algo que mais tarde a teoria viria a nomear: muitas das limitações e barreiras que as pessoas enfrentam no cotidiano não são falhas individuais, mas construções sociais, estruturais e históricas. Essa percepção do território e das desigualdades foi a faísca que me levou à Psicologia. Para mim, entender o ser humano exige olhar para a sua realidade, suas relações e as estruturas ao seu redor.</p>
                <p className="text-[#5F5E5A] leading-relaxed mb-4">Ao longo da minha caminhada, percebi que essa mesma postura investigativa poderia ser aplicada à forma como nos organizamos no trabalho. No ambiente corporativo, especializei-me em Gestão da Qualidade e otimização de processos, obtendo a certificação como Auditora Líder ISO 9001/19011. Foi ali que entendi que a tecnologia e a padronização não existem para engessar ou burocratizar, mas para servir e facilitar a vida das pessoas.</p>
                <p className="text-[#5F5E5A] leading-relaxed mb-4">Gosto de buscar por melhorias e soluções. Meu foco é simples: eliminar gargalos operacionais e tarefas braçais repetitivas para que as pessoas possam focar no que realmente importa.</p>
                <p className="text-[#5F5E5A] leading-relaxed">Transito entre dois universos que se complementam: de um lado, a engenharia de processos, as automações e o rigor da qualidade para gerar eficiência operacional; de outro, a investigação de uma psicologia crítica, com um olhar atento para raça, classe, gênero e interseccionalidade. Não busco conexões forçadas entre a tecnologia e a análise social — o que une os dois lados é a minha postura ética, analítica e o compromisso de resolver problemas olhando, antes de tudo, para o fator humano.</p>
              </>
            ) : (
              <>
                <p className="text-[#5F5E5A] leading-relaxed mb-4">I grew up in Baixada Fluminense noticing, in everyday life, something theory would later name: many of the limits and barriers people face daily aren't individual failures — they're social, structural, and historical constructions. That awareness of place and inequality was the spark that led me to Psychology. To me, understanding a person means looking at their reality, their relationships, and the structures around them.</p>
                <p className="text-[#5F5E5A] leading-relaxed mb-4">Along the way, I realized this same investigative posture could apply to how we organize work. In the corporate world, I specialized in Quality Management and process optimization, earning my certification as an ISO 9001/19011 Lead Auditor. That's where I understood that technology and standardization don't exist to create rigidity or bureaucracy — they exist to serve people and make their lives easier.</p>
                <p className="text-[#5F5E5A] leading-relaxed mb-4">I like searching for improvements and solutions. My focus is simple: eliminate operational bottlenecks and repetitive manual tasks so people can focus on what really matters.</p>
                <p className="text-[#5F5E5A] leading-relaxed">I move between two worlds that complement each other: on one side, process engineering, automation, and the rigor of quality management to generate operational efficiency; on the other, critical psychology research, with a close eye on race, class, gender, and intersectionality. I don't look for forced connections between technology and social analysis — what unites both sides is my ethical, analytical stance and my commitment to solving problems by looking, above all, at the human factor.</p>
              </>
            )}
          </div>
          <div className="flex justify-center md:justify-end"><AboutPortrait src={profilePhotoUrl} alt="Vivian Mota" /></div>
        </Reveal>

        <Reveal>
          <section className="mb-16">
            <h2 className="text-xl font-bold text-[#2C2C2A] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Formação Acadêmica & Certificações", "Academic Background & Certifications")}</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-mono font-medium text-[#2B5545] uppercase tracking-wider mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>{t("🎓 Formação Acadêmica", "🎓 Academic Background")}</h3>
                <ul className="space-y-3">
                  <li className="bg-white/60 border border-[#C8C5BF]/40 rounded-xl p-4"><p className="text-sm font-semibold text-[#2C2C2A]">{t("Bacharelado em Psicologia", "Bachelor's in Psychology")}</p><p className="text-xs text-[#5F5E5A] mt-0.5">Afya Unigranrio · 2025–2028</p><p className="text-xs text-[#2B5545] font-mono mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>{t("CR 9,76", "GPA 9.76")}</p></li>
                  <li className="bg-white/60 border border-[#C8C5BF]/40 rounded-xl p-4"><p className="text-sm font-semibold text-[#2C2C2A]">{t("Bacharelado em Psicologia (Histórico anterior)", "Bachelor's in Psychology, prior record")}</p><p className="text-xs text-[#5F5E5A] mt-0.5">Universidade Estácio de Sá (UNESA) · 2022–2023</p><p className="text-xs text-[#2B5545] font-mono mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>{t("CR 9,34 · Trancado para transferência", "GPA 9.34 · Paused for transfer")}</p></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono font-medium text-[#2B5545] uppercase tracking-wider mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>{t("📜 Certificações Profissionais & Cursos", "📜 Professional Certifications & Courses")}</h3>
                <ul className="space-y-2">
                  {[
                    { namePT: "ISO 9001:2015 — Gestão da Qualidade: Auditora Líder & Interna", nameEN: "ISO 9001:2015 — Quality Management: Lead & Internal Auditor", orgPT: "BSI Group (Acreditado Exemplar Global) · Março de 2026", orgEN: "BSI Group (Global Exemplar Accredited) · March 2026", descPT: "SGQ, Auditoria Interna e Auditoria Líder ISO 19011", descEN: "QMS, Internal Audit, and ISO 19011 Lead Audit" },
                    { namePT: "Human Resources Analytics", nameEN: "Human Resources Analytics", orgPT: "Coursera · Maio de 2026", orgEN: "Coursera · May 2026" },
                    { namePT: "People Analytics", nameEN: "People Analytics", orgPT: "Coursera · Maio de 2026", orgEN: "Coursera · May 2026" },
                    { namePT: "English Certificate (C1 Advanced)", nameEN: "English Certificate (C1 Advanced)", orgPT: "EF SET · Setembro de 2025", orgEN: "EF SET · September 2025" },
                    { namePT: "RH: Treinamento e Desenvolvimento (T&D e L&D Corporativo)", nameEN: "HR: Training & Development (Corporate T&D/L&D)", orgPT: "Udemy · Abril de 2024", orgEN: "Udemy · April 2024" },
                    { namePT: "Recrutamento e Seleção de Pessoas", nameEN: "Recruitment & Selection", orgPT: "Udemy · Março de 2024", orgEN: "Udemy · March 2024" },
                  ].map((cert) => (
                    <li key={cert.namePT} className="bg-white/60 border border-[#C8C5BF]/40 rounded-xl px-4 py-3">
                      <p className="text-sm font-medium text-[#2C2C2A]">{lang === "pt" ? cert.namePT : cert.nameEN}</p>
                      <p className="text-xs text-[#5F5E5A] mt-0.5">{lang === "pt" ? cert.orgPT : cert.orgEN}</p>
                      {(cert.descPT || cert.descEN) && <p className="text-xs text-[#2B5545] font-mono mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{lang === "pt" ? cert.descPT : cert.descEN}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-xl font-bold text-[#2C2C2A] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{t("Trajetória Profissional", "Professional Timeline")}</h2>
            <div className="space-y-3">{timeline.map((item, i) => <AccordionCard key={i} item={item} lang={lang} />)}</div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
