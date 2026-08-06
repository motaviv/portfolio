export type Bi = { pt: string; en: string };
export type OverviewField = { label: Bi; value: Bi };
export type ArchitectureItem = { title: Bi; bullets: Bi[] };

export type ProjectDetail = {
  overviewLabel: Bi;
  overview: OverviewField[];
  diagnosisLabel: Bi;
  diagnosis: Bi[];
  architectureLabel: Bi;
  architecture: ArchitectureItem[];
  impactLabel: Bi;
  impact: Bi[];
};

export type Project = {
  slug: string;
  track: "digital" | "social";
  image: string;
  gallery?: string[];
  title: Bi;
  card: Bi;
  tags: string[];
  detail: ProjectDetail;
};

// Fotos agora vivem no próprio repositório (pasta public/images), não mais no Google Drive.
// Pra trocar/adicionar uma foto: suba o arquivo em public/images/... pelo GitHub e ajuste o
// caminho aqui, se o nome do arquivo for diferente do padrão usado.
const cover = (slug: string) => `/images/projects/covers/${slug}.jpg`;

export const projects: Project[] = [
  // ══════════════════════════════════════════
  // TRILHA A — SOLUÇÕES DIGITAIS
  // ══════════════════════════════════════════
  {
    slug: "nasa-comunica",
    track: "digital",
    image: cover("nasa-comunica"),
    title: { pt: "Nasa Comunica", en: "Nasa Comunica" },
    card: { pt: "Sistema web que deu autonomia ao RH para agendar e disparar comunicados internos no Google Chat sem intermediários.", en: "A web system that gave HR full autonomy to schedule and send internal Google Chat announcements without intermediaries." },
    tags: ["Google Apps Script", "WebApp HTML/JS", "Google Sheets", "Google Drive"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da Solução", en: "Solution Name" }, value: { pt: "Automação Nasa Comunica", en: "Nasa Comunica Automation" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Centralizar, padronizar e automatizar a criação, agendamento e publicação de comunicados corporativos nos canais oficiais do Google Chat, garantindo rastreabilidade, governança e simplicidade de uso para solicitantes.", en: "Centralize, standardize, and automate the creation, scheduling, and publishing of corporate announcements on official Google Chat channels, ensuring traceability, governance, and ease of use for requesters." } },
        { label: { pt: "Stack & Tecnologias", en: "Stack & Technologies" }, value: { pt: "Google Apps Script (backend e regras de negócio), WebApp (HTML/CSS/JS), Google Sheets (banco de dados rastreável), Google Drive (repositório de mídias) e webhooks do Google Chat.", en: "Google Apps Script (backend and business rules), WebApp (HTML/CSS/JS), Google Sheets (traceable database), Google Drive (media repository), and Google Chat webhooks." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Comunicação Interna e Otimização de Processos Corporativos.", en: "Internal Communications and Corporate Process Optimization." } },
      ],
      diagnosisLabel: { pt: "Diagnóstico Operacional & a Dor Negocial", en: "Operational Diagnosis & the Business Pain Point" },
      diagnosis: [
        { pt: "Gargalo humano & ponto único de falha: o RH dependia integralmente da disponibilidade da responsável pela Comunicação Interna para qualquer disparo.", en: "Human bottleneck & single point of failure: HR was entirely dependent on the Internal Communications lead's availability for any send." },
        { pt: "Risco operacional em avisos urgentes: se a responsável estivesse indisponível, comunicados críticos ficavam represados.", en: "Operational risk on urgent notices: if the lead was unavailable, critical announcements got stuck in a backlog." },
        { pt: "Ausência de autonomia para as áreas gerenciarem prazos, revisões, cancelamentos e agendamentos de forma independente.", en: "No autonomy for teams to independently manage deadlines, revisions, cancellations, and scheduling." },
        { pt: "Inexistência de padrão e rastreabilidade: solicitações via mensagens informais no chat, sem registro auditável de quem criou, editou ou enviou.", en: "No standard or traceability: requests came through informal chat messages, with no auditable record of who created, edited, or sent what." },
      ],
      architectureLabel: { pt: "Arquitetura da Solução & Decisões de Engenharia", en: "Solution Architecture & Engineering Decisions" },
      architecture: [
        { title: { pt: "WebApp Intuitivo (Interface do Solicitante)", en: "Intuitive WebApp (Requester Interface)" }, bullets: [{ pt: "Pré-visualização em tempo real do comunicado antes da confirmação.", en: "Real-time preview of the announcement before confirmation." }, { pt: "Formulário com barra de formatação amigável e regras de validação de campos obrigatórios.", en: "Form with a friendly formatting toolbar and validation rules for required fields." }] },
        { title: { pt: "Gestão Inteligente de Mídias (Google Drive Engine)", en: "Smart Media Management (Google Drive Engine)" }, bullets: [{ pt: "Upload automatizado de imagens e documentos direto para o Drive.", en: "Automated upload of images and documents straight to Drive." }, { pt: "Estruturação automática de diretórios por Ano/Mês.", en: "Automatic folder structuring by Year/Month." }, { pt: "Nomenclatura padronizada dos arquivos via ID único do comunicado.", en: "Standardized file naming via the announcement's unique ID." }, { pt: "Geração de links seguros com permissão de visualização para renderização estável no Chat.", en: "Generation of secure view-only links for stable rendering in Chat." }] },
        { title: { pt: "Motor de Agendamento & Disparo (Apps Script + Triggers)", en: "Scheduling & Dispatch Engine (Apps Script + Triggers)" }, bullets: [{ pt: "Backend responsável pelo processamento dos status (AGENDADO, ENVIADO, CANCELADO).", en: "Backend responsible for status processing (SCHEDULED, SENT, CANCELED)." }, { pt: "Triggers temporizados que disparam automaticamente via Webhook nos espaços de destino.", en: "Time-based triggers that fire automatically via webhook to the target spaces." }, { pt: "Cards visuais com imagens como botões clicáveis, garantindo compatibilidade e estética refinada.", en: "Visual cards using images as clickable buttons, ensuring compatibility and a refined look." }] },
        { title: { pt: "Banco de Dados & Log de Auditoria (Google Sheets)", en: "Database & Audit Log (Google Sheets)" }, bullets: [{ pt: "Registros estruturados como banco de dados relacional leve.", en: "Records structured as a lightweight relational database." }, { pt: "Histórico completo: data, hora, solicitante, canal de destino, links e protocolo gerado.", en: "Full history: date, time, requester, target channel, links, and generated protocol number." }] },
      ],
      impactLabel: { pt: "Impacto de Governança & Ganhos Qualitativos", en: "Governance Impact & Qualitative Gains" },
      impact: [
        { pt: "Erro zero em formatação: padronização absoluta do tom, links e imagens corporativas.", en: "Zero formatting errors: absolute standardization of tone, links, and corporate imagery." },
        { pt: "Eliminação de processos manuais: automação ponta a ponta do agendamento.", en: "Eliminated manual processes: end-to-end scheduling automation." },
        { pt: "Governança e rastreabilidade total: cada comunicado com ID único e log auditável.", en: "Full governance and traceability: every announcement has a unique ID and an auditable log." },
        { pt: "Sustentabilidade do código: projetado com premissa de baixa/zero manutenção pós-deploy.", en: "Code sustainability: designed for low-to-zero maintenance after deployment." },
      ],
    },
  },
  {
    slug: "automacao-atas-reunioes-ia",
    track: "digital",
    image: cover("automacao-atas-reunioes-ia"),
    title: { pt: "Automação de Atas, Pautas e Resumos Executivos com IA", en: "AI-Powered Meeting Minutes, Agenda & Executive Summary Automation" },
    card: { pt: "Fluxo inteligente que transforma gravações de reuniões em atas padronizadas e agendamentos no Google Calendar em minutos.", en: "A smart workflow that turns meeting recordings into standardized minutes and Google Calendar bookings in minutes." },
    tags: ["Claude IA", "Google Apps Script", "Google Workspace", "Google Calendar"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da Solução", en: "Solution Name" }, value: { pt: "Automação de Atas e Pautas via LLM e Scripts", en: "Meeting Minutes & Agenda Automation via LLM and Scripts" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Estruturar um fluxo prático, seguro e de baixo custo para transformar transcrições brutas de reuniões (Google Meet) em atas padronizadas, resumos executivos e pautas reutilizáveis, com distribuição automatizada para Google Chat e e-mail.", en: "Build a practical, secure, low-cost workflow that turns raw Google Meet transcripts into standardized minutes, executive summaries, and reusable agendas, with automated distribution to Google Chat and email." } },
        { label: { pt: "Stack & Tecnologias", en: "Stack & Technologies" }, value: { pt: "Claude Projects (processamento e extração via prompt engineering), Google Docs (documento estruturado de origem), Google Apps Script (backend de automação), Google Sheets (configuração e logs) e webhooks do Google Chat.", en: "Claude Projects (processing and extraction via prompt engineering), Google Docs (structured source document), Google Apps Script (automation backend), Google Sheets (configuration and logs), and Google Chat webhooks." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Produtividade Operacional, Gestão do Conhecimento e Acompanhamento de Diretrizes.", en: "Operational Productivity, Knowledge Management, and Follow-Through on Decisions." } },
      ],
      diagnosisLabel: { pt: "Diagnóstico Operacional & a Dor Negocial", en: "Operational Diagnosis & the Business Pain Point" },
      diagnosis: [
        { pt: "Dependência de trabalho manual: tempo da equipe gasto lendo transcrições longas e resumindo pontos relevantes.", en: "Reliance on manual work: team time spent reading long transcripts and summarizing key points." },
        { pt: "Falta de padronização: ausência de uma estrutura única para registro de decisões, responsáveis e prazos.", en: "Lack of standardization: no single structure for recording decisions, owners, and deadlines." },
        { pt: "Perda de rastreabilidade e alinhamento: dificuldade em distribuir rapidamente os encaminhamentos logo após as reuniões.", en: "Loss of traceability and alignment: difficulty quickly distributing follow-ups right after meetings." },
        { pt: "Risco de custo alto com APIs: necessidade de uma solução eficiente sem depender de assinaturas pagas.", en: "Risk of high API costs: need for an efficient solution without paid subscriptions." },
      ],
      architectureLabel: { pt: "Arquitetura da Solução & Decisões de Engenharia", en: "Solution Architecture & Engineering Decisions" },
      architecture: [
        { title: { pt: "Processamento de Linguagem Natural (Claude Project)", en: "Natural Language Processing (Claude Project)" }, bullets: [{ pt: "Ingestão do link/arquivo da transcrição bruta do Google Meet no ambiente do Claude.", en: "Ingestion of the raw Google Meet transcript link/file into the Claude environment." }, { pt: "Prompt engineering pra sintetizar o conteúdo e gerar um Google Docs padronizado.", en: "Prompt engineering to synthesize the content and generate a standardized Google Doc." }, { pt: "Marcadores obrigatórios no documento: === RESUMO (CHAT) === e === PAUTA (CALENDAR) ===.", en: "Mandatory markers in the document: === SUMMARY (CHAT) === and === AGENDA (CALENDAR) ===." }] },
        { title: { pt: "Distribuição Automatizada (Google Apps Script)", en: "Automated Distribution (Google Apps Script)" }, bullets: [{ pt: "Leitura periódica da pasta do Drive pra identificar novos documentos prontos.", en: "Periodic scan of the Drive folder to identify newly ready documents." }, { pt: "Trava contra leitura parcial, exigindo os marcadores obrigatórios pra garantir integridade.", en: "Safeguard against partial reads, requiring the mandatory markers to ensure integrity." }, { pt: "Disparo automatizado do resumo formatado via Webhook pro Chat/e-mail.", en: "Automated dispatch of the formatted summary via webhook to Chat/email." }] },
        { title: { pt: "Governança & Log de Mitigação de Duplicidade (Google Sheets)", en: "Governance & Duplicate-Prevention Log (Google Sheets)" }, bullets: [{ pt: "Configuração centralizada em planilha-matriz com mapeamento de pastas, IDs e webhooks.", en: "Centralized configuration in a master sheet mapping folders, IDs, and webhooks." }, { pt: "Log de processamento com trava de segurança contra notificação duplicada.", en: "Processing log with a safeguard against duplicate notifications." }, { pt: "Reprocessamento automático em caso de falhas temporárias de conexão.", en: "Automatic reprocessing in case of temporary connection failures." }] },
      ],
      impactLabel: { pt: "Impacto de Governança & Ganhos Qualitativos", en: "Governance Impact & Qualitative Gains" },
      impact: [
        { pt: "Síntese rápida e acionável: reuniões longas viram planos de ação claros em poucos minutos.", en: "Fast, actionable synthesis: long meetings become clear action plans within minutes." },
        { pt: "Isenção de custos extras: arquitetura sem dependência de APIs pagas por requisição.", en: "No extra costs: architecture with no dependency on pay-per-request APIs." },
        { pt: "Rastreabilidade e mitigação de erros: log de todas as atas processadas, só distribuindo conteúdo validado.", en: "Traceability and error mitigation: a log of every processed minutes document, distributing only validated content." },
        { pt: "Operação escalável: modelo pensado como MVP pra reuniões recorrentes, pronto pra expandir entre áreas.", en: "Scalable operation: designed as an MVP for recurring meetings, ready to expand across teams." },
      ],
    },
  },
  {
    slug: "reorganizacao-intranet",
    track: "digital",
    image: cover("reorganizacao-intranet"),
    title: { pt: "Reorganização do Portal do Funcionário & FAQ RH Responde", en: "Employee Portal Reorganization & 'HR Responde' FAQ Assistant" },
    card: { pt: "Reestruturação da intranet corporativa em dois ambientes navegáveis, com assistente virtual de autoatendimento integrado.", en: "A restructuring of the corporate intranet into two navigable environments, with an integrated self-service virtual assistant." },
    tags: ["Google Apps Script", "iFrames", "LLM com Guardrails", "Employee Experience"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da Solução", en: "Solution Name" }, value: { pt: "Reorganização da Intranet Corporativa & Ecossistema do Portal do Funcionário", en: "Corporate Intranet Reorganization & Employee Portal Ecosystem" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Reorganizar a arquitetura de informação da intranet corporativa, centralizando recursos em dois ambientes estruturantes (\"Navegando pelo RH\" e \"Área da Qualidade\") navegáveis via WebApps embarcados, agregando um assistente virtual (FAQ RH Responde) como canal ativo de autoatendimento.", en: "Reorganize the corporate intranet's information architecture, centralizing resources into two core environments (\"Navigating HR\" and \"Quality Area\") navigable via embedded WebApps, adding a virtual assistant (HR Responde FAQ) as an active self-service channel." } },
        { label: { pt: "Stack & Tecnologias", en: "Stack & Technologies" }, value: { pt: "Portal do Funcionário (intranet base), Google Apps Script, HTML/CSS/JS, iFrames, LLM com guardrails, Google Docs e Drive (base de conhecimento) e Gemini Gem.", en: "Employee Portal (base intranet), Google Apps Script, HTML/CSS/JS, iFrames, an LLM with guardrails, Google Docs and Drive (knowledge base), and Gemini Gem." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Comunicação Interna, Governança da Informação e Experiência do Colaborador (Employee Experience).", en: "Internal Communications, Information Governance, and Employee Experience." } },
      ],
      diagnosisLabel: { pt: "Diagnóstico Operacional & a Dor Negocial", en: "Operational Diagnosis & the Business Pain Point" },
      diagnosis: [
        { pt: "Limitação técnica da plataforma base: sem suporte nativo a menus dinâmicos, navegação dependia de imagens estáticas linkando PDFs dispersos em várias abas.", en: "Base platform's technical limitation: no native support for dynamic menus, so navigation relied on static images linking to PDFs scattered across multiple tabs." },
        { pt: "Dificuldade crônica de acesso: colaboradores não encontravam informações relevantes pro dia a dia, gerando frustração e perda de tempo.", en: "Chronic access difficulty: employees couldn't find information relevant to their day-to-day, causing frustration and wasted time." },
        { pt: "Onboarding e acolhimento prejudicados: novos colaboradores sem um ponto único de verdade, expostos a documentos desatualizados.", en: "Impaired onboarding: new employees had no single source of truth and were exposed to outdated documents." },
        { pt: "Perda de autonomia: falta de clareza sobre onde consultar políticas, benefícios e procedimentos da Qualidade.", en: "Loss of autonomy: no clarity on where to check policies, benefits, and Quality procedures." },
        { pt: "Sobrecarga no RH/DP: tempo excessivo respondendo perguntas repetitivas por falta de canal de autoatendimento.", en: "Overload on HR/People Ops: excessive time spent answering repetitive questions due to the lack of a self-service channel." },
      ],
      architectureLabel: { pt: "Arquitetura da Solução & Decisões de Engenharia", en: "Solution Architecture & Engineering Decisions" },
      architecture: [
        { title: { pt: "Engenharia de Navegação por Contorno (iFrames + WebApps)", en: "Workaround Navigation Engineering (iFrames + WebApps)" }, bullets: [{ pt: "Aplicações web construídas em WebApps (Apps Script + HTML/CSS/JS).", en: "Web applications built as WebApps (Apps Script + HTML/CSS/JS)." }, { pt: "Hospedagem direta dentro das páginas da intranet via iframe, navegação fluida numa única tela.", en: "Hosted directly inside the intranet pages via iframe, for fluid navigation on a single screen." }] },
        { title: { pt: "Ambiente 01 — Qualidade", en: "Environment 01 — Quality" }, bullets: [{ pt: "Centralização de todos os manuais de operação da empresa.", en: "Centralization of all of the company's operating manuals." }, { pt: "Trilhas de procedimentos e glossário corporativo unificado.", en: "Procedure tracks and a unified corporate glossary." }, { pt: "Canal direto de solicitação de demandas para o DP.", en: "Direct request channel to People Operations." }] },
        { title: { pt: "Ambiente 02 — Navegando pelo RH", en: "Environment 02 — Navigating HR" }, bullets: [{ pt: "Organograma institucional e inventário de canais de comunicação oficial.", en: "Institutional org chart and an inventory of official communication channels." }, { pt: "Hubs de benefícios, políticas corporativas e guias práticos.", en: "Benefits hubs, corporate policies, and practical guides." }, { pt: "Módulo de Cultura do Reconhecimento e formulários de solicitação diversos.", en: "Recognition Culture module and various request forms." }, { pt: "Ambiente de onboarding e ponto de acesso ao assistente virtual RH Responde.", en: "Onboarding environment and access point to the HR Responde virtual assistant." }] },
        { title: { pt: "Assistente Virtual RH Responde", en: "HR Responde Virtual Assistant" }, bullets: [{ pt: "Inteligência alimentada estritamente por bases oficiais, com guardrails rígidos contra respostas sem respaldo documental.", en: "Intelligence fed strictly by official sources, with strict guardrails against answers lacking documented backing." }, { pt: "Tom objetivo, com indicação da fonte consultada e direcionamento pra atendimento humano em casos individuais.", en: "Objective tone, citing the source consulted, and routing to human support for individual cases." }] },
      ],
      impactLabel: { pt: "Impacto de Governança & Ganhos Qualitativos", en: "Governance Impact & Qualitative Gains" },
      impact: [
        { pt: "Solução de baixo custo: superação das limitações técnicas da plataforma sem reconstrução do software.", en: "Low-cost solution: overcame the platform's technical limitations without rebuilding the software." },
        { pt: "Autonomia e agilidade: colaborador encontra políticas, canais e processos em poucos cliques.", en: "Autonomy and speed: employees find policies, channels, and processes in just a few clicks." },
        { pt: "Otimização do tempo do RH/DP: resolução autônoma de dúvidas frequentes via FAQ.", en: "Optimized HR/People Ops time: autonomous resolution of frequent questions via the FAQ." },
        { pt: "Premissa zero manutenção: aplicações projetadas com alta automação.", en: "Zero-maintenance premise: applications designed with high automation." },
      ],
    },
  },
  {
    slug: "portal-gestao-canais-comunicacao",
    track: "digital",
    image: cover("portal-gestao-canais-comunicacao"),
    title: { pt: "Portal de Gestão de Canais de Comunicação (RBAC & Governança de Dados)", en: "Communication Channels Management Portal (RBAC & Data Governance)" },
    card: { pt: "Interface de gestão que protege o banco de dados oficial contra edições acidentais e garante governança de acessos.", en: "A management interface that protects the official database from accidental edits and ensures access governance." },
    tags: ["HTML/CSS/JS", "Google Apps Script", "Google Sheets", "RBAC"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da Solução", en: "Solution Name" }, value: { pt: "Portal de Gestão de Canais de Comunicação", en: "Communication Channels Management Portal" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Centralizar e proteger o inventário de canais oficiais de comunicação por meio de uma aplicação web segura, eliminando a edição direta na planilha-matriz, com controle de acessos por perfil (RBAC) e rastreabilidade total de alterações.", en: "Centralize and protect the inventory of official communication channels through a secure web app, eliminating direct edits to the master spreadsheet, with role-based access control (RBAC) and full change traceability." } },
        { label: { pt: "Stack & Tecnologias", en: "Stack & Technologies" }, value: { pt: "Google Apps Script (backend e regras de negócio), HTML/CSS/JS responsivo (frontend), Google Sheets (banco de dados relacional protegido) e controle de acesso por escopo.", en: "Google Apps Script (backend and business rules), responsive HTML/CSS/JS (frontend), Google Sheets (protected relational database), and scope-based access control." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Governança de Dados, Comunicação Corporativa e Proteção de Infraestrutura Low-Code.", en: "Data Governance, Corporate Communications, and Low-Code Infrastructure Protection." } },
      ],
      diagnosisLabel: { pt: "Diagnóstico Operacional & a Dor Negocial", en: "Operational Diagnosis & the Business Pain Point" },
      diagnosis: [
        { pt: "Desconfiguração da estrutura: exclusão acidental de fórmulas, quebra de formatações e exclusões indevidas.", en: "Structural breakage: accidental deletion of formulas, broken formatting, and wrongful deletions." },
        { pt: "Falta de padronização e inconsistências: inexistência de validação prévia dos dados cadastrados.", en: "Lack of standardization and inconsistencies: no upfront validation of entered data." },
        { pt: "Ausência de rastreabilidade (zero audit log): impossível identificar quem criou, alterou ou apagou um canal.", en: "No traceability (zero audit log): impossible to identify who created, changed, or deleted a channel." },
        { pt: "Risco à base do Portal do Funcionário: como a planilha alimentava diretamente a intranet, qualquer erro humano refletia na experiência dos colaboradores.", en: "Risk to the Employee Portal database: since the spreadsheet fed the intranet directly, any human error immediately impacted the employee experience." },
      ],
      architectureLabel: { pt: "Arquitetura da Solução & Decisões de Engenharia", en: "Solution Architecture & Engineering Decisions" },
      architecture: [
        { title: { pt: "Camada de Interface & Experiência de Uso (Portal Web Frontend)", en: "Interface Layer & User Experience (Web Portal Frontend)" }, bullets: [{ pt: "Interface dinâmica organizada na hierarquia: Área → Subárea → Frente → Canal.", en: "Dynamic interface organized in a hierarchy: Area → Sub-area → Front → Channel." }, { pt: "Formulários intuitivos que substituem a navegação por linhas/colunas, exigindo confirmação pra ações críticas.", en: "Intuitive forms replacing row/column navigation, requiring confirmation for critical actions." }, { pt: "Identificadores únicos (ID) por canal, eliminando a dependência do número de linha da planilha.", en: "Unique IDs per channel, removing dependency on the spreadsheet's row number." }] },
        { title: { pt: "Controle de Acessos por Perfil e Escopo (RBAC)", en: "Role- and Scope-Based Access Control (RBAC)" }, bullets: [{ pt: "Módulo de segurança com níveis rígidos: Administrador (gestão total), Gestor (área responsável) e Editor (subáreas autorizadas).", en: "Security module with strict tiers: Administrator (full management), Manager (their own area), and Editor (authorized sub-areas only)." }] },
        { title: { pt: "Motor de Validação & Publicação (Backend Apps Script)", en: "Validation & Publishing Engine (Apps Script Backend)" }, bullets: [{ pt: "Separação estrita entre abas de trabalho das áreas e a aba oficial BASE_CANAIS.", en: "Strict separation between teams' working sheets and the official BASE_CANAIS sheet." }, { pt: "Regra de ouro: só registros ATIVOS, PUBLICADOS e VALIDADOS são replicados pra base consumida pelo Portal do Funcionário.", en: "Golden rule: only ACTIVE, PUBLISHED, and VALIDATED records are replicated to the database consumed by the Employee Portal." }, { pt: "Bloqueio contra edição manual direta na aba principal.", en: "Block against direct manual edits to the main sheet." }] },
        { title: { pt: "Módulo de Auditoria & Trilha de Logs (LOG_ALTERACOES)", en: "Audit Module & Log Trail (LOG_ALTERACOES)" }, bullets: [{ pt: "Gravação automática e imutável de todas as transações: e-mail do usuário, data, hora, ação e valores antes/depois.", en: "Automatic, immutable logging of every transaction: user email, date, time, action, and before/after values." }] },
      ],
      impactLabel: { pt: "Impacto de Governança & Ganhos Qualitativos", en: "Governance Impact & Qualitative Gains" },
      impact: [
        { pt: "Integridade do banco de dados: eliminação de 100% dos incidentes de quebra de fórmulas ou perda de dados.", en: "Database integrity: 100% elimination of broken-formula or data-loss incidents." },
        { pt: "Governança e rastreabilidade absoluta: histórico completo de alterações com autoria formal.", en: "Absolute governance and traceability: full change history with formal authorship." },
        { pt: "Segurança da informação: garantia de que cada gestor atue estritamente no escopo da sua área.", en: "Information security: ensures each manager operates strictly within their area's scope." },
        { pt: "Maturidade arquitetural: sistema preparado pra escalabilidade e consumo seguro por outros ecossistemas.", en: "Architectural maturity: system ready for scalability and safe consumption by other internal ecosystems." },
      ],
    },
  },
  {
    slug: "galeria-digital-produtos",
    track: "digital",
    image: cover("galeria-digital-produtos"),
    gallery: [
      "/images/projects/gallery/galeria-digital-produtos/01.jpg",
      "/images/projects/gallery/galeria-digital-produtos/02.jpg",
      "/images/projects/gallery/galeria-digital-produtos/03.jpg",
      "/images/projects/gallery/galeria-digital-produtos/04.jpg",
      "/images/projects/gallery/galeria-digital-produtos/05.jpg",
     ],
    title: { pt: "Vitrine Virtual & Galeria Digital de Produtos", en: "Virtual Showcase & Digital Product Gallery" },
    card: { pt: "Vitrine interativa desenvolvida para facilitar a visualização de produtos de construção e agilizar o atendimento comercial.", en: "An interactive showcase built to make construction products easier to visualize and speed up sales support." },
    tags: ["Design de Serviços", "Catálogo Digital", "WhatsApp Business"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da Solução", en: "Solution Name" }, value: { pt: "Galeria Digital de Produtos", en: "Digital Product Gallery" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Estruturar uma plataforma visual e acessível de apresentação de produtos para destacar artefatos de cimento e revestimentos, facilitando a escolha do cliente, democratizando o acesso a especificações técnicas e otimizando o direcionamento comercial.", en: "Build an accessible, visual product-presentation platform to showcase cement products and finishes, making customer decisions easier, democratizing access to technical specs, and streamlining sales routing." } },
        { label: { pt: "Stack & Tecnologias", en: "Stack & Technologies" }, value: { pt: "Plataforma digital de apresentação (Canva Web), integração com WhatsApp Business e mapeamento de atributos de produto.", en: "Digital presentation platform (Canva Web), WhatsApp Business integration, and product attribute mapping." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Design de Serviços, Inovação no Processo de Vendas e Transformação Digital.", en: "Service Design, Sales Process Innovation, and Digital Transformation." } },
      ],
      diagnosisLabel: { pt: "Diagnóstico Operacional & a Dor Negocial", en: "Operational Diagnosis & the Business Pain Point" },
      diagnosis: [
        { pt: "Dificuldade de visualização técnica: clientes tinham dificuldade em compreender dimensões, peso, rendimento por m² e o resultado final aplicado em obra.", en: "Technical visualization difficulty: customers struggled to grasp dimensions, weight, yield per m², and the final look once installed." },
        { pt: "Fricção no atendimento inicial: equipe de vendas gastava tempo prestando informações básicas repetitivas, em vez de focar no fechamento.", en: "Friction in initial contact: sales staff spent time repeating basic specs instead of focusing on closing deals." },
        { pt: "Baixa rastreabilidade do interesse: sem ferramenta rápida pra identificar qual peça o cliente estava consultando ao entrar em contato.", en: "Low interest traceability: no quick way to identify which piece a customer was viewing when they reached out." },
      ],
      architectureLabel: { pt: "Arquitetura da Solução & Decisões de Design", en: "Solution Architecture & Design Decisions" },
      architecture: [
        { title: { pt: "Estruturação do Catálogo Interativo", en: "Interactive Catalog Structure" }, bullets: [{ pt: "Organização sistemática do portfólio por categorias (Revestimentos, Pisos, Elementos Vazados, Drenantes).", en: "Systematic portfolio organization by category (Finishes, Flooring, Openwork Elements, Drainage)." }, { pt: "Ficha técnica clara por peça: dimensões, peso aproximado, rendimento por m² e código de referência.", en: "Clear spec sheet per piece: dimensions, approximate weight, yield per m², and reference code." }] },
        { title: { pt: "Experiência de Navegação Fluida (UX/UI)", en: "Fluid Navigation Experience (UX/UI)" }, bullets: [{ pt: "Apresentação visual focada na aplicação real do produto em projetos arquitetônicos.", en: "Visual presentation focused on real-world use of the product in architectural projects." }, { pt: "Navegação intuitiva entre a visualização do produto isolado e fotos da peça instalada.", en: "Intuitive navigation between the standalone product view and photos of the installed piece." }] },
        { title: { pt: "Pontes de Conversão Direta (CTAs de Vendas)", en: "Direct Conversion Bridges (Sales CTAs)" }, bullets: [{ pt: "Botões estratégicos (\"Contate-nos\", \"Quero Conhecer o Catálogo\") direcionando ao WhatsApp.", en: "Strategic buttons (\"Contact Us\", \"View the Catalog\") routing straight to WhatsApp." }, { pt: "Pré-preenchimento das informações do produto de interesse na mensagem, agilizando o suporte.", en: "Pre-filled product info in the message, speeding up sales support." }] },
      ],
      impactLabel: { pt: "Impacto de Governança & Ganhos Qualitativos", en: "Governance Impact & Qualitative Gains" },
      impact: [
        { pt: "Valorização do portfólio: apresentação profissional que eleva a percepção de qualidade dos produtos.", en: "Elevated portfolio: professional presentation that raises the perceived quality of the products." },
        { pt: "Agilidade no atendimento comercial: menos tempo de resposta, clientes chegam mais informados.", en: "Faster sales support: shorter response times, customers arrive better informed." },
        { pt: "Ferramenta multicanal: usada tanto no site/redes sociais quanto como apoio presencial em exposições e fábrica.", en: "Multichannel tool: used on the website/social media as well as in-person at trade shows and the factory." },
      ],
    },
  },
  {
    slug: "sistema-qr-code-vendas",
    track: "digital",
    image: cover("sistema-qr-code-vendas"),
     gallery: [
      "/images/projects/gallery/sistema-qr-code-vendas/01.jpg",
      "/images/projects/gallery/sistema-qr-code-vendas/02.jpg",
      "/images/projects/gallery/sistema-qr-code-vendas/03.jpg",
     ],
    title: { pt: "Sistema Phygital de Representação, QR Code & Vendas", en: "Phygital Sales, QR Code & Rep Tracking System" },
    card: { pt: "Integração entre exposição física e catálogo digital para controle de vendas, estoque e comissionamento.", en: "Integration between physical displays and a digital catalog for sales, inventory, and commission control." },
    tags: ["QR Code", "Phygital", "Gestão Comercial"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da Solução", en: "Solution Name" }, value: { pt: "Sistema Phygital de Rastreabilidade de Vendas e Comissionamento via QR Code", en: "Phygital QR-Code Sales Tracking & Commission System" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Integrar os pontos físicos de exposição ao ecossistema digital, permitindo identificar exatamente o produto consultado e atribuir automaticamente o representante responsável pra cálculo preciso de comissão.", en: "Integrate physical display points with the digital ecosystem, enabling exact identification of the product viewed and automatic attribution of the responsible rep for accurate commission calculation." } },
        { label: { pt: "Stack & Tecnologias", en: "Stack & Technologies" }, value: { pt: "QR Codes dinâmicos, parâmetros de URL pra rastreamento de representante, integração com WhatsApp e catálogo digital interativo.", en: "Dynamic QR codes, URL parameters for rep tracking, WhatsApp integration, and an interactive digital catalog." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Estratégia Phygital (Físico + Digital), Governança Comercial e Gestão de Canais de Representação.", en: "Phygital Strategy (Physical + Digital), Commercial Governance, and Rep Channel Management." } },
      ],
      diagnosisLabel: { pt: "Diagnóstico Operacional & a Dor Negocial", en: "Operational Diagnosis & the Business Pain Point" },
      diagnosis: [
        { pt: "Limitação de mostruários físicos: painéis à beira de estrada e em lojas parceiras não transmitiam cores, aplicações e specs.", en: "Physical display limits: roadside and partner-store panels couldn't convey colors, applications, or specs." },
        { pt: "Perda de rastreabilidade e impasse em comissões: difícil saber se um cliente conheceu o produto numa loja parceira específica.", en: "Traceability loss and commission disputes: hard to tell whether a customer discovered the product at a specific partner store." },
        { pt: "Atendimento desalinhado: falta de contexto na mensagem inicial sobre localização da peça e canal de origem.", en: "Misaligned support: no context in the first message about the piece's location and origin channel." },
      ],
      architectureLabel: { pt: "Arquitetura da Solução & Decisões de Engenharia", en: "Solution Architecture & Engineering Decisions" },
      architecture: [
        { title: { pt: "Pontos de Acesso Físicos (Placas & QR Codes)", en: "Physical Access Points (Plaques & QR Codes)" }, bullets: [{ pt: "Placas com QR Codes exclusivos ao lado de cada peça exposta.", en: "Plaques with dedicated QR codes next to each displayed piece." }, { pt: "Escaneamento direciona instantaneamente à página específica do produto.", en: "Scanning routes instantly to the specific product page." }] },
        { title: { pt: "Parametrização & Rastreabilidade do Representante", en: "Parameterization & Rep Traceability" }, bullets: [{ pt: "URLs com identificadores do produto e do representante local (ex: .../peca?rep=NOME).", en: "URLs carrying product and local rep identifiers (e.g. .../piece?rep=NAME)." }, { pt: "Atribuição de origem preservada durante toda a navegação do cliente.", en: "Origin attribution preserved throughout the customer's entire browsing session." }] },
        { title: { pt: "Automação de Mensagem de Atendimento Comercial", en: "Sales Message Automation" }, bullets: [{ pt: "Botão de contato gera mensagem pré-formatada no WhatsApp com nome/código do produto e representante responsável.", en: "Contact button generates a pre-formatted WhatsApp message with the product name/code and the responsible rep." }, { pt: "Time de vendas calcula a comissão correta e alinha logística/estoque estratégico.", en: "Sales team calculates the correct commission and aligns strategic logistics/inventory." }] },
      ],
      impactLabel: { pt: "Impacto de Governança & Ganhos Qualitativos", en: "Governance Impact & Qualitative Gains" },
      impact: [
        { pt: "Justiça comercial: fim dos impasses na atribuição de vendas geradas por parceiros regionais.", en: "Commercial fairness: an end to disputes over sales attribution from regional partners." },
        { pt: "Dinamismo nos mostruários físicos: parede estática vira ponto de venda interativo ligado à galeria online.", en: "Dynamic physical displays: a static wall becomes an interactive sales point linked to the full online gallery." },
        { pt: "Estoque estratégico: dados concretos sobre demanda por região, permitindo gestão preditiva do estoque.", en: "Strategic inventory: concrete regional demand data enabling predictive stock management." },
      ],
    },
  },

  // ══════════════════════════════════════════
  // TRILHA B — PESQUISA, SOCIEDADE & IMPACTO HUMANO
  // ══════════════════════════════════════════
  {
    slug: "enfrentamento-violencia-mulher",
    track: "social",
    image: cover("enfrentamento-violencia-mulher"),
    title: { pt: "Entre a Norma e o Chão da Resistência: Enfrentamento à Violência de Gênero em Duque de Caxias", en: "Between the Norm and the Ground of Resistance: Confronting Gender-Based Violence in Duque de Caxias" },
    card: { pt: "Análise crítica das redes públicas e comunitárias de acolhimento a mulheres sob a perspectiva da interseccionalidade.", en: "A critical analysis of public and community support networks for women, through an intersectional lens." },
    tags: ["Psicologia Crítica", "Interseccionalidade", "Políticas Públicas"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Compreender dialeticamente as tensões, limites e potências do combate à violência de gênero no município, contrapondo a atuação institucional estatal no CEAM (\"a norma\") com a práxis e a crítica radicada no Movimento de Mulheres Olga Benario (\"o chão da resistência\").", en: "Dialectically understand the tensions, limits, and potential of confronting gender-based violence in the municipality, contrasting the state's institutional work at CEAM (\"the norm\") with the praxis and critique rooted in the Olga Benario Women's Movement (\"the ground of resistance\")." } },
        { label: { pt: "Eixos Teóricos", en: "Theoretical Framework" }, value: { pt: "Teoria crítica do patriarcado, lógica colonial, interseccionalidade (gênero, raça e classe), feminismo popular, psicologia social crítica e direitos humanos.", en: "Critical theory of patriarchy, colonial logic, intersectionality (gender, race, and class), popular feminism, critical social psychology, and human rights." } },
        { label: { pt: "Metodologia", en: "Methodology" }, value: { pt: "Pesquisa qualitativa de campo, escuta qualificada, cartografia territorial, análise institucional, rodas de conversa e roteiro semiestruturado.", en: "Qualitative field research, qualified listening, territorial mapping, institutional analysis, discussion circles, and a semi-structured interview guide." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Psicologia Social e Comunitária, Políticas Públicas e Direitos Humanos — Estágio Supervisionado (UNIGRANRIO).", en: "Social and Community Psychology, Public Policy, and Human Rights — Supervised Internship (UNIGRANRIO)." } },
      ],
      diagnosisLabel: { pt: "Problematização & a Dor Social", en: "Problem Statement & the Social Pain Point" },
      diagnosis: [
        { pt: "A limitação da \"norma\" (CEAM): precarização e sobrecarga na rede socioassistencial e riscos de burocratização/revitimização institucional.", en: "The limits of \"the norm\" (CEAM): understaffing and overload in the social support network, plus risks of institutional bureaucratization and revictimization." },
        { pt: "A urgência do \"chão da resistência\" (Movimento Olga Benario): denúncia da insuficiência das políticas estatais frente às urgências das mulheres periféricas.", en: "The urgency of \"the ground of resistance\" (Olga Benario Movement): a denunciation of state policies falling short of the urgent needs of women in the periphery." },
        { pt: "A necessidade do acolhimento autônomo, da organização popular e das ocupações feministas como territórios de proteção e emancipação ativa.", en: "The need for autonomous care, grassroots organizing, and feminist occupations as territories of protection and active emancipation." },
      ],
      architectureLabel: { pt: "Metodologia & Estruturação de Campo", en: "Methodology & Field Structure" },
      architecture: [
        { title: { pt: "Eixo I — O Chão da Resistência (Movimento Olga Benario)", en: "Axis I — The Ground of Resistance (Olga Benario Movement)" }, bullets: [{ pt: "Mapeamento da atuação e aproximação crítica com as militantes do movimento.", en: "Mapping of the movement's work and a critical engagement with its activists." }, { pt: "Compreensão das estratégias de acolhimento popular e articulação de rede independente.", en: "Understanding of grassroots care strategies and independent network-building." }, { pt: "Apreensão da crítica política ao aparato estatal e sua lentidão/insuficiência.", en: "Grasp of the movement's political critique of the state apparatus and its slowness/insufficiency." }] },
        { title: { pt: "Eixo II — A Norma (Diagnóstico e Escuta no CEAM)", en: "Axis II — The Norm (Diagnosis and Listening at CEAM)" }, bullets: [{ pt: "Mapeamento territorial e observação participante no Centro Especializado de Atendimento à Mulher.", en: "Territorial mapping and participant observation at the Specialized Women's Support Center." }, { pt: "Roteiro técnico semiestruturado de 23 questões à equipe multidisciplinar, investigando fluxos e articulação intersetorial (DEAM, abrigos, saúde).", en: "A 23-question semi-structured technical interview with the multidisciplinary team, investigating workflows and cross-sector coordination (DEAM, shelters, health services)." }] },
      ],
      impactLabel: { pt: "Impacto Acadêmico-Social & Contribuição Técnica", en: "Academic-Social Impact & Technical Contribution" },
      impact: [
        { pt: "Síntese crítica e não alienada: análise que não idealiza o Estado nem reduz a luta a trâmites burocráticos.", en: "A critical, non-alienated synthesis: an analysis that neither idealizes the state nor reduces the struggle to bureaucratic procedures." },
        { pt: "Aporte pra Psicologia Social e Comunitária: práxis voltada à libertação, descolonizada e antirracista.", en: "A contribution to Social and Community Psychology: a liberation-oriented, decolonized, antiracist praxis." },
        { pt: "Mapeamento de redes complementares: contraste entre o acolhimento formal institucional e o acolhimento militante/comunitário.", en: "Mapping of complementary networks: the contrast between formal institutional care and militant/community care." },
      ],
    },
  },
  {
    slug: "oficina-aproveitamento-alimentos",
    track: "social",
    image: cover("oficina-aproveitamento-alimentos"),
    gallery: [
      "/images/projects/gallery/oficina-aproveitamento-alimentos/01.jpg",
      "/images/projects/gallery/oficina-aproveitamento-alimentos/02.jpg",
      "/images/projects/gallery/oficina-aproveitamento-alimentos/03.jpg",
      "/images/projects/gallery/oficina-aproveitamento-alimentos/04.jpg",
      "/images/projects/gallery/oficina-aproveitamento-alimentos/05.jpg",
      "/images/projects/gallery/oficina-aproveitamento-alimentos/06.jpg",
      "/images/projects/gallery/oficina-aproveitamento-alimentos/07.jpg",
    ],
    title: { pt: "Aproveitamento Integral de Alimentos: Uma Intervenção sobre Hábitos Alimentares e Consumo Consciente", en: "Whole-Food Use: An Intervention on Eating Habits and Conscious Consumption" },
    card: { pt: "Intervenção comunitária na Baixada Fluminense focada em educação alimentar, sustentabilidade e redução de desperdício.", en: "A community intervention in Baixada Fluminense focused on food education, sustainability, and waste reduction." },
    tags: ["Extensão Universitária", "Segurança Alimentar", "Sustentabilidade"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Desenvolver e aplicar oficina comunitária de educação ambiental e nutricional, estimulando autonomia alimentar, redução de custos e aproveitamento de partes nutritivas frequentemente descartadas (cascas, talos e sementes).", en: "Develop and run a community workshop on environmental and nutritional education, encouraging food autonomy, cost reduction, and the use of nutritious parts often thrown away (peels, stems, and seeds)." } },
        { label: { pt: "Eixos Teóricos", en: "Theoretical Framework" }, value: { pt: "Segurança Alimentar e Nutricional (SAN), sustentabilidade socioambiental, economia doméstica e educação popular freireana.", en: "Food and Nutrition Security, socio-environmental sustainability, household economics, and Freirean popular education." } },
        { label: { pt: "Metodologia", en: "Methodology" }, value: { pt: "Pesquisa-ação, cartografia de hábitos de consumo, oficina comunitária participativa, rodas de conversa e demonstração prática de receitas.", en: "Action research, mapping of consumption habits, participatory community workshop, discussion circles, and hands-on recipe demonstrations." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Projeto de Extensão Universitária (UNIGRANRIO), realizado na Igreja AD Projeto Família (Parque Lafaiete, Duque de Caxias).", en: "University extension project (UNIGRANRIO), held at Igreja AD Projeto Família (Parque Lafaiete, Duque de Caxias)." } },
      ],
      diagnosisLabel: { pt: "Problematização & a Dor Social", en: "Problem Statement & the Social Pain Point" },
      diagnosis: [
        { pt: "Barreira de acesso ao letramento nutricional: descarte de cascas, talos e sementes por falta de informação sobre seu valor biológico.", en: "Barrier to nutritional literacy: peels, stems, and seeds thrown away due to lack of awareness of their biological value." },
        { pt: "Sobrecarga econômica familiar e custo socioambiental: ausência de técnicas de aproveitamento integral eleva custos e gera mais resíduo.", en: "Family financial burden and environmental cost: lack of whole-food techniques raises costs and generates more waste." },
        { pt: "Necessidade de práxis extensionista horizontal, onde o saber científico e a vivência comunitária se integram.", en: "Need for a horizontal extension praxis, where scientific knowledge and community experience integrate." },
      ],
      architectureLabel: { pt: "Metodologia & Desenvolvimento da Oficina", en: "Methodology & Workshop Development" },
      architecture: [
        { title: { pt: "Diagnóstico e Planejamento Participativo", en: "Diagnosis and Participatory Planning" }, bullets: [{ pt: "Mapeamento de hábitos de consumo e compras das famílias do Parque Lafaiete.", en: "Mapping of shopping and consumption habits among families in Parque Lafaiete." }, { pt: "Seleção de receitas acessíveis com insumos do cotidiano (farinha de casca, doce de talo, sucos funcionais).", en: "Selection of accessible recipes using everyday ingredients (peel flour, stem preserves, functional juices)." }] },
        { title: { pt: "Aplicação Prática da Oficina Comunitária", en: "Hands-On Community Workshop" }, bullets: [{ pt: "Rodas de discussão e demonstrações práticas sobre higienização, conservação e preparo.", en: "Discussion circles and hands-on demonstrations on cleaning, storage, and preparation." }, { pt: "Abordagem simplificada de Segurança Alimentar, Consumo Consciente e Economia Doméstica.", en: "A simplified approach to Food Security, Conscious Consumption, and Household Economics." }] },
        { title: { pt: "Alinhamento aos ODS (ONU)", en: "Alignment with UN SDGs" }, bullets: [{ pt: "Erradicação da Pobreza (ODS 1), Fome Zero e Agricultura Sustentável (ODS 2), Consumo e Produção Responsáveis (ODS 12).", en: "No Poverty (SDG 1), Zero Hunger (SDG 2), and Responsible Consumption and Production (SDG 12)." }] },
      ],
      impactLabel: { pt: "Impacto Socioambiental & Ganhos Comunitários", en: "Socio-Environmental Impact & Community Gains" },
      impact: [
        { pt: "Multiplicação dialógica de saberes: fortalecimento do protagonismo comunitário no Parque Lafaiete.", en: "Dialogic multiplication of knowledge: strengthened community leadership in Parque Lafaiete." },
        { pt: "Emancipação econômica: práticas sustentáveis que mitigam o impacto da inflação sobre o orçamento familiar.", en: "Economic empowerment: sustainable practices mitigating the impact of inflation on household budgets." },
        { pt: "Garantia do Direito Humano à Alimentação Adequada: ressignificação da relação com insumos e resíduos.", en: "Upholding the Human Right to Adequate Food: a reframing of the relationship with food and waste." },
      ],
    },
  },
  {
    slug: "inclusao-criancas-neuroatipicas",
    track: "social",
    image: cover("inclusao-criancas-neuroatipicas"),
     gallery: [
      "/images/projects/gallery/inclusao-criancas-neuroatipicas/01.jpg",
      "/images/projects/gallery/inclusao-criancas-neuroatipicas/02.jpg",
      "/images/projects/gallery/inclusao-criancas-neuroatipicas/03.jpg",
      "/images/projects/gallery/inclusao-criancas-neuroatipicas/04.jpg",
      "/images/projects/gallery/inclusao-criancas-neuroatipicas/05.jpg",
      "/images/projects/gallery/inclusao-criancas-neuroatipicas/06.jpg",
    ],
    title: { pt: "Inclusão de Crianças Neuroatípicas no Ambiente Escolar", en: "Inclusion of Neurodivergent Children in the School Environment" },
    card: { pt: "Estudo de campo sobre adaptação curricular e práticas inclusivas reais em uma instituição de ensino regional.", en: "A field study on curriculum adaptation and real inclusive practices in a regional school." },
    tags: ["Psicologia Escolar", "Neurodiversidade", "Pesquisa de Campo"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Mapear barreiras atitudinais, pedagógicas e estruturais à inclusão escolar, investigando como as adaptações curriculares impactam a participação de crianças neurodivergentes e promovendo intervenções dialógicas de acolhimento.", en: "Map attitudinal, pedagogical, and structural barriers to school inclusion, investigating how curriculum adaptations impact the participation of neurodivergent children, and promoting dialogic interventions for acceptance." } },
        { label: { pt: "Eixos Teóricos", en: "Theoretical Framework" }, value: { pt: "Psicologia Escolar e Educacional, Psicologia do Desenvolvimento, Neurodiversidade, Educação Inclusiva e Psicologia Social Crítica.", en: "School and Educational Psychology, Developmental Psychology, Neurodiversity, Inclusive Education, and Critical Social Psychology." } },
        { label: { pt: "Metodologia", en: "Methodology" }, value: { pt: "Pesquisa-ação, observação participante de campo, rodas de conversa dialógicas, análise de práticas pedagógicas e entrevistas estruturadas.", en: "Action research, participant field observation, dialogic discussion circles, analysis of pedagogical practices, and structured interviews." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Intervenção de pesquisa aplicada, realizada em uma instituição de ensino privada da Baixada Fluminense (2023).", en: "Applied research intervention, conducted at a private school in Baixada Fluminense (2023)." } },
      ],
      diagnosisLabel: { pt: "Problematização & a Dor Social", en: "Problem Statement & the Social Pain Point" },
      diagnosis: [
        { pt: "Produção escolar da inadaptação (crítica de Maria Helena Souza Patto): dificuldades não devem ser naturalizadas como \"déficits individuais\", mas compreendidas como resultado de práticas pedagógicas rígidas.", en: "School-produced maladjustment (per Maria Helena Souza Patto's critique): difficulties shouldn't be naturalized as \"individual deficits\", but understood as the result of rigid pedagogical practices." },
        { pt: "Adaptações superficiais vs. efetivas: adequações meramente burocráticas que não alteram a lógica de ensino tradicional.", en: "Superficial vs. effective adaptations: merely bureaucratic accommodations that don't change traditional teaching logic." },
        { pt: "Barreiras atitudinais e estigmatização: vieses implícitos e desinformação entre pares e corpo docente.", en: "Attitudinal barriers and stigma: implicit bias and misinformation among peers and teaching staff." },
        { pt: "Invisibilização da subjetividade e da voz do estudante: poucos canais pra escutar diretamente as crianças neurodivergentes.", en: "Invisibility of student subjectivity and voice: few channels to listen directly to neurodivergent children." },
      ],
      architectureLabel: { pt: "Metodologia & Etapas de Campo", en: "Methodology & Field Stages" },
      architecture: [
        { title: { pt: "Reestruturação e Mapeamento de Campo", en: "Restructuring and Field Mapping" }, bullets: [{ pt: "Direcionamento do estudo pra uma instituição privada reconhecida como referência regional em práticas inclusivas.", en: "Study redirected to a private school recognized as a regional benchmark for inclusive practices." }, { pt: "Coleta de dados via observação e entrevistas com alunos, docentes e equipe pedagógica.", en: "Data collection via observation and interviews with students, teachers, and pedagogical staff." }] },
        { title: { pt: "Ações de Intervenção e Sensibilização", en: "Intervention and Awareness Actions" }, bullets: [{ pt: "Rodas de conversa interativas sobre neurodiversidade, empatia e respeito às diferenças.", en: "Interactive discussion circles on neurodiversity, empathy, and respect for differences." }, { pt: "Espaço aberto de escuta pra que os próprios estudantes neurodivergentes expressassem suas percepções.", en: "Open listening space for neurodivergent students to express their own perceptions." }] },
        { title: { pt: "Análise Crítica dos Resultados", en: "Critical Analysis of Results" }, bullets: [{ pt: "Identificação das divergências entre o discurso institucional e as resistências observadas no cotidiano.", en: "Identification of gaps between institutional discourse and the resistance observed day-to-day." }] },
      ],
      impactLabel: { pt: "Impacto Acadêmico-Social & Contribuição Técnica", en: "Academic-Social Impact & Technical Contribution" },
      impact: [
        { pt: "Redução de estigmas no ambiente escolar: fortalecimento de laços comunitários entre alunos e professores.", en: "Reduced stigma in the school environment: strengthened community bonds between students and teachers." },
        { pt: "Estímulo a práticas pedagógicas humanizadas: escuta contínua como premissa pra inclusão autêntica.", en: "Encouraged humanized teaching practices: ongoing listening as a premise for authentic inclusion." },
        { pt: "Base pra formação docente: diagnósticos que fundamentam programas de capacitação em neurodiversidade.", en: "A foundation for teacher training: diagnostics that underpin neurodiversity training programs." },
      ],
    },
  },
  {
    slug: "acolhimento-ong-prj",
    track: "social",
    image: cover("acolhimento-ong-prj"),
    gallery: [
      "/images/projects/gallery/acolhimento-ong-prj/01.jpg",
      "/images/projects/gallery/acolhimento-ong-prj/02.jpg",
      "/images/projects/gallery/acolhimento-ong-prj/03.jpg",
      "/images/projects/gallery/acolhimento-ong-prj/04.jpg",
      "/images/projects/gallery/acolhimento-ong-prj/05.jpg",
      "/images/projects/gallery/acolhimento-ong-prj/06.jpg", 
    ],
    title: { pt: "Apoio Comunitário — Voluntariado (ONG PRJ Vamos Ajudar)", en: "Community Support — Volunteering (PRJ Vamos Ajudar NGO)" },
    card: { pt: "Atuação em projeto socioambiental no suporte e garantia de direitos para pessoas em situação de rua em Nova Iguaçu.", en: "Involvement in a socio-environmental project supporting and upholding rights for people experiencing homelessness in Nova Iguaçu." },
    tags: ["Ação Comunitária", "Direitos Humanos", "Economia Circular"],
    detail: {
      overviewLabel: { pt: "Visão Geral do Projeto", en: "Project Overview" },
      overview: [
        { label: { pt: "Nome da ONG", en: "NGO Name" }, value: { pt: "PRJ Vamos Ajudar", en: "PRJ Vamos Ajudar" } },
        { label: { pt: "Objetivo Principal", en: "Main Objective" }, value: { pt: "Contribuir ativamente no suporte emergencial e na articulação de ações socioambientais junto à ONG no Centro de Nova Iguaçu, apoiando o atendimento a pessoas em situação de rua, a organização de doações e o fomento a oficinas de sustentabilidade e geração de renda.", en: "Actively contribute to emergency support and socio-environmental action alongside the NGO in downtown Nova Iguaçu, supporting outreach to people experiencing homelessness, organizing donations, and fostering sustainability and income-generation workshops." } },
        { label: { pt: "Metodologia", en: "Methodology" }, value: { pt: "Atuação voluntária de campo (4 meses), suporte operacional a oficinas comunitárias, entregas de kits e recolhimento de recicláveis.", en: "Field volunteer work (4 months), operational support for community workshops, kit deliveries, and recyclables collection." } },
        { label: { pt: "Contexto", en: "Context" }, value: { pt: "Ação voluntária e responsabilidade social — suporte de campo à ONG PRJ Vamos Ajudar (4 meses, Centro de Nova Iguaçu).", en: "Volunteer action and social responsibility — field support for the PRJ Vamos Ajudar NGO (4 months, downtown Nova Iguaçu)." } },
      ],
      diagnosisLabel: { pt: "Problematização & a Dor Social do Território", en: "Problem Statement & the Territory's Social Pain Point" },
      diagnosis: [
        { pt: "Negligência e invisibilização social extrema: desassistência quanto a higiene, alimentação, vestuário e acesso a políticas públicas.", en: "Extreme neglect and social invisibility: lack of support for hygiene, food, clothing, and access to public services." },
        { pt: "Ausência de rotas de autonomia financeira: escassez de oportunidades de inclusão produtiva adaptadas à realidade vulnerabilizada.", en: "No pathways to financial autonomy: scarce productive-inclusion opportunities adapted to a vulnerable reality." },
        { pt: "Desafio da sustentabilidade financeira e ambiental: necessidade de modelos autônomos de captação que também preservem o meio ambiente.", en: "Financial and environmental sustainability challenge: need for self-sustaining fundraising models that also protect the environment." },
      ],
      architectureLabel: { pt: "Metodologia & Eixos de Atuação", en: "Methodology & Focus Areas" },
      architecture: [
        { title: { pt: "Garantia de Dignidade e Acolhimento Humanitário", en: "Dignity Assurance and Humanitarian Care" }, bullets: [{ pt: "Logística de distribuição de kits de higiene, roupas, cobertores, alimentação e insumos básicos.", en: "Logistics for distributing hygiene kits, clothing, blankets, food, and basic supplies." }, { pt: "Escuta qualificada e encaminhamento pra a rede socioassistencial e de garantia de direitos.", en: "Qualified listening and referral to the social support and rights-protection network." }] },
        { title: { pt: "Financiamento Ecológico e Economia Circular", en: "Ecological Funding and Circular Economy" }, bullets: [{ pt: "Mapeamento e coleta de materiais recicláveis no território.", en: "Mapping and collection of recyclable materials in the territory." }, { pt: "Destinação adequada pra reciclagem, revertendo a renda gerada nas ações assistenciais.", en: "Proper allocation for recycling, with proceeds reinvested in the assistance programs." }] },
        { title: { pt: "Realização de Oficinas", en: "Running Workshops" }, bullets: [{ pt: "Oficinas de arteterapia, barbearia social e rodas de conversa voltadas ao resgate da autoestima.", en: "Art therapy, social barbershop, and discussion circles aimed at restoring self-esteem." }] },
      ],
      impactLabel: { pt: "Impacto Socioambiental & Ganhos Comunitários", en: "Socio-Environmental Impact & Community Gains" },
      impact: [
        { pt: "Mitigação da vulnerabilidade extrema: restauração da dignidade de dezenas de assistidos.", en: "Mitigated extreme vulnerability: restored dignity for dozens of people supported." },
        { pt: "Impacto ecológico rastreável: destinação adequada de resíduos recicláveis, revertendo em benefício social.", en: "Traceable ecological impact: proper allocation of recyclables, reinvested for social benefit." },
      ],
    },
  },
];
