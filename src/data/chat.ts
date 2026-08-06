export type ChatQuestion = {
  id: string;
  question: string;
  answer: string;
  linkText: string;
  linkUrl: string;
};

export type ChatProfile = {
  id: string;
  label: string;
  icon: string;
  questions: ChatQuestion[];
};

export type ChatData = {
  botConfig: {
    name: string;
    welcomeMessage: string;
    emptyStateMessage: string;
    changeProfileLabel: string;
  };
  fallbacks: string[];
  profiles: ChatProfile[];
};

const resumeUrl =
  "https://1drv.ms/w/c/3d379ac6a68b9835/IQBoeygEnFfcSaRyHqUpLmsGARDyhZAeDXytB-nKn40bGiw";

export const chatDataPT: ChatData = {
  botConfig: {
    name: "Viv",
    welcomeMessage:
      "Oi! Eu sou a Viv. Criei este espaço para te mostrar como trabalho na prática — seja resolvendo gargalos de processos ou pesquisando dinâmicas sociais. Como posso te ajudar a navegar por aqui hoje?",
    emptyStateMessage: "Selecione uma opção acima para começar.",
    changeProfileLabel: "Mudar de assunto / escolher outro perfil",
  },
  fallbacks: [
    "Ainda não tenho uma resposta pronta para essa pergunta específica! Mas fique à vontade para conferir minha página 'Sobre' ou me chamar diretamente no LinkedIn.",
    "Essa pergunta está fora das minhas opções de resposta rápida! Você pode me perguntar sobre minhas automações, minhas pesquisas em Psicologia ou me enviar uma mensagem direta por e-mail.",
    "Essa passou direto pelos meus atalhos. Se quiser conversar sobre algo específico, me envie uma mensagem no LinkedIn e te respondo por lá!",
  ],
  profiles: [
    {
      id: "recruiters",
      label: "Recrutador ou gestor (Tech, Processos & RH)",
      icon: "briefcase",
      questions: [
        {
          id: "rec_1",
          question: "Quais são suas principais competências e certificações?",
          answer:
            "Sou certificada como Auditora Líder ISO 9001:2015/19011 (BSI Group) e capacitada em People Analytics, HR Analytics e Treinamento & Desenvolvimento. Minha trajetória une Gestão da Qualidade, rotinas de RH/People Ops e automação de processos. Meu foco em tecnologia é sempre humanizado: construo soluções que eliminam trabalho manual repetitivo e melhoram a experiência dos colaboradores.",
          linkText: "Ver meu currículo completo",
          linkUrl: resumeUrl,
        },
        {
          id: "rec_2",
          question: "Qual é a sua experiência com automações e processos?",
          answer:
            "Desenvolvo ferramentas práticas para eliminar retrabalho e organizar fluxos de trabalho. Trabalho com automações no Google Apps Script, interfaces web em HTML/JS, integrações com IA (Claude e Gemini) e sistemas de controle no Google Workspace — tudo focado em facilitar o dia a dia, sem custos com licenças pagas.",
          linkText: "Ver o case de automação com IA",
          linkUrl: "/projetos/automacao-atas-reunioes-ia",
        },
        {
          id: "rec_3",
          question: "Como você já resolveu um problema real de processo?",
          answer:
            "Na Nasajon, notei que o RH dependia da equipe de Comunicação Interna para publicar comunicados no Google Chat, o que gerava gargalos. Criei um sistema web (Nasa Comunica) que deu total autonomia ao RH para criar, agendar e acompanhar comunicados com histórico estruturado por protocolos.",
          linkText: "Ver detalhes do Nasa Comunica",
          linkUrl: "/projetos/nasa-comunica",
        },
        {
          id: "rec_4",
          question: "Você tem experiência na criação de soluções digitais para processos?",
          answer:
            "Sim! Já criei desde vitrines virtuais interativas até um sistema de vendas por QR Code com controle de comissão e estoque para pontos de exposição física. Faço o mapeamento da jornada do usuário e desenvolvo a solução de ponta a ponta.",
          linkText: "Ver o sistema de vendas por QR Code",
          linkUrl: "/projetos/sistema-qr-code-vendas",
        },
        {
          id: "rec_5",
          question: "Que tipo de oportunidade você está buscando?",
          answer:
            "Busco oportunidades onde eu possa aplicar meu perfil analítico para mapear gargalos, estruturar processos, organizar dados e criar ferramentas que facilitem o dia a dia das equipes e ajudem as pessoas a performarem o seu melhor.",
          linkText: "Falar comigo no LinkedIn",
          linkUrl: "https://www.linkedin.com/in/viv-mota/",
        },
      ],
    },
    {
      id: "research",
      label: "Projetos sociais, pesquisa & Psicologia",
      icon: "leaf",
      questions: [
        {
          id: "psi_1",
          question: "O que te levou a escolher a Psicologia?",
          answer:
            "Veio da percepção prática, no meu cotidiano na Baixada Fluminense, de que muitos dos limites enfrentados pelas pessoas não são falhas individuais: são barreiras sociais e estruturais. Escolhi a Psicologia para compreender essas dinâmicas e atuar na transformação dessas realidades.",
          linkText: "Ler minha história no Sobre",
          linkUrl: "/sobre",
        },
        {
          id: "psi_2",
          question: "Qual é a sua abordagem teórica na Psicologia?",
          answer:
            "Gosto bastante da Psicologia Histórico-Cultural e da Psicologia Crítica. Sempre me atentei ao contexto social, raça, classe, gênero e interseccionalidade, priorizando a escuta ética, a garantia de direitos e a compreensão do indivíduo em relação ao seu território.",
          linkText: "Ver minha perspectiva no Sobre",
          linkUrl: "/sobre",
        },
        {
          id: "psi_3",
          question: "Que tipo de pesquisa de campo você já realizou?",
          answer:
            "Pesquisei a inclusão real de crianças neurodivergentes nas instituições de ensino, realizei um estudo de campo crítico sobre a rede de enfrentamento à violência contra a mulher, visitando o CEAM Vera Lúcia Pereira e articulando com movimentos sociais.",
          linkText: "Ver a pesquisa sobre violência de gênero",
          linkUrl: "/projetos/enfrentamento-violencia-mulher",
        },
        {
          id: "psi_4",
          question: "Como foi sua experiência com projetos comunitários?",
          answer:
            "Atuei como voluntária por 4 meses no centro de Nova Iguaçu com a ONG PRJ, apoiando pessoas em situação de rua — distribuindo kits de higiene, orientando sobre direitos, realizando oficinas comunitárias e participando da geração de renda via reciclagem.",
          linkText: "Ver a atuação comunitária",
          linkUrl: "/projetos/acolhimento-ong-prj",
        },
      ],
    },
    {
      id: "curious",
      label: "Apenas curiosidade / quero conhecer seu trabalho",
      icon: "eye",
      questions: [
        {
          id: "cur_1",
          question: "Pode me dar um resumo rápido da sua trajetória?",
          answer:
            "Sou estudante de Psicologia e atuo no laboratório de inovação da Nasajon (Nasalab), desenhando soluções tecnológicas e estratégias para experiência do colaborador e comunicação interna. Uno minha certificação em auditoria ISO 9001 ao desenvolvimento de automações e uso de IA, sempre com um olhar analítico e centrado em pessoas para a eficiência de processos.",
          linkText: "Ver meu currículo completo",
          linkUrl: resumeUrl,
        },
        {
          id: "cur_2",
          question: "Como você conecta Psicologia e tecnologia?",
          answer:
            "Não tento forçar conexões entre as duas áreas. Para mim, a tecnologia é uma ferramenta a serviço das pessoas. O que unifica meu trabalho é uma postura analítica, ética e focada em resolução de problemas — seja facilitando a rotina de um colaborador ou compreendendo as barreiras sociais de um território.",
          linkText: "Leia mais na página Sobre",
          linkUrl: "/sobre",
        },
        {
          id: "cur_3",
          question: "Por onde você me recomenda começar a navegar?",
          answer:
            "Depende do seu objetivo! Dividi meu portfólio em duas trilhas independentes: Soluções Digitais reúne meus projetos de automação e tecnologia; Pesquisa & Impacto Social reúne minhas pesquisas acadêmicas, estudos de campo e atuação comunitária.",
          linkText: "Escolher uma trilha na Home",
          linkUrl: "/#destaques-solucoes-digitais",
        },
        {
          id: "cur_4",
          question: "Como posso entrar em contato direto com você?",
          answer:
            "Você pode me mandar uma mensagem direta no LinkedIn ou me enviar um e-mail — respondo assim que possível!",
          linkText: "Falar comigo no LinkedIn",
          linkUrl: "https://www.linkedin.com/in/viv-mota/",
        },
      ],
    },
  ],
};

export const chatDataEN: ChatData = {
  botConfig: {
    name: "Viv",
    welcomeMessage:
      "Hi! I'm Viv. I built this space to show you how I work in practice — whether solving process bottlenecks or researching social dynamics. How can I help you navigate this site today?",
    emptyStateMessage: "Select an option above to get started.",
    changeProfileLabel: "Switch topic / choose another profile",
  },
  fallbacks: [
    "I don't have a ready answer for that specific question yet! But feel free to check out my 'About' page, or reach out directly on LinkedIn.",
    "That one's outside my quick-reply options! You can ask me about my automations, my research in Psychology, or send me a direct message by email.",
    "That question slipped past my shortcuts. If you'd like to talk about something specific, message me on LinkedIn and I'll get back to you directly!",
  ],
  profiles: [
    {
      id: "recruiters",
      label: "Recruiter or hiring manager (Tech, Process & HR)",
      icon: "briefcase",
      questions: [
        {
          id: "rec_1",
          question: "What are your main skills and certifications?",
          answer:
            "I'm a certified ISO 9001:2015/19011 Lead Auditor (BSI Group) and trained in People Analytics, HR Analytics, and Training & Development. My background blends Quality Management, HR/People Ops routines, and process automation. My focus in technology is always people-first: I build solutions that remove manual busywork and improve the employee experience.",
          linkText: "View my full résumé",
          linkUrl: resumeUrl,
        },
        {
          id: "rec_2",
          question: "What's your background with automations and processes?",
          answer:
            "I build practical tools to eliminate rework and organize workflows. I work with Google Apps Script automations, HTML/JS web interfaces, AI integrations (Claude and Gemini), and Google Workspace control systems — all focused on making daily work easier, without paid licensing costs.",
          linkText: "See the AI automation case",
          linkUrl: "/projetos/automacao-atas-reunioes-ia",
        },
        {
          id: "rec_3",
          question: "How have you solved a real process problem?",
          answer:
            "At Nasajon, I noticed HR depended on the Internal Communications team to post Google Chat announcements, causing delays. I built a web system (Nasa Comunica) that gave HR full autonomy to create, schedule, and track announcements with protocol-based history.",
          linkText: "See Nasa Comunica details",
          linkUrl: "/projetos/nasa-comunica",
        },
        {
          id: "rec_4",
          question: "Do you have experience creating digital solutions for processes?",
          answer:
            "Yes! I've built everything from interactive virtual showcases to a QR-code sales system with commission and inventory control for physical display points. I map the user journey and build the solution end to end.",
          linkText: "See the QR-code sales system",
          linkUrl: "/projetos/sistema-qr-code-vendas",
        },
        {
          id: "rec_5",
          question: "What kind of role are you looking for?",
          answer:
            "I'm looking for opportunities where I can apply my analytical mindset to map bottlenecks, structure processes, organize data, and build tools that make teams' day-to-day easier and help people do their best work.",
          linkText: "Message me on LinkedIn",
          linkUrl: "https://www.linkedin.com/in/viv-mota/",
        },
      ],
    },
    {
      id: "research",
      label: "Social projects, research & Psychology",
      icon: "leaf",
      questions: [
        {
          id: "psi_1",
          question: "What led you to choose Psychology?",
          answer:
            "It came from noticing, firsthand and in my everyday life in Baixada Fluminense, that many of the limits people face aren't individual failures — they're social and structural barriers. I chose Psychology to understand those dynamics and work toward transforming those realities.",
          linkText: "Read my story in About",
          linkUrl: "/sobre",
        },
        {
          id: "psi_2",
          question: "What's your theoretical approach in Psychology?",
          answer:
            "I move between Historical-Cultural Psychology and Critical Psychology. I pay close attention to social context, race, class, gender, and intersectionality — prioritizing ethical listening, upholding rights, and understanding the person in relation to their territory.",
          linkText: "See my perspective in About",
          linkUrl: "/sobre",
        },
        {
          id: "psi_3",
          question: "What kind of field research have you done?",
          answer:
            "I've researched real inclusion for neurodivergent children in schools, and led a critical field study on the support network for women facing gender-based violence, visiting CEAM Vera Lúcia Pereira and engaging with social movements.",
          linkText: "See the gender-violence research",
          linkUrl: "/projetos/enfrentamento-violencia-mulher",
        },
        {
          id: "psi_4",
          question: "What was your experience with community projects?",
          answer:
            "I volunteered for 4 months in downtown Nova Iguaçu with ONG PRJ, supporting people experiencing homelessness — distributing hygiene kits, sharing rights guidance, running community workshops, and supporting income generation through recycling.",
          linkText: "See the community outreach work",
          linkUrl: "/projetos/acolhimento-ong-prj",
        },
      ],
    },
    {
      id: "curious",
      label: "Just curious / want to know your work",
      icon: "eye",
      questions: [
        {
          id: "cur_1",
          question: "Can you give me a quick summary of your background?",
          answer:
            "I'm a Psychology student working in Nasajon's innovation lab (Nasalab), where I design tech solutions and strategy for employee experience and internal communication. I combine my ISO 9001 audit certification with building automations and using AI, always with an analytical, people-centered lens for process efficiency.",
          linkText: "View my full résumé",
          linkUrl: resumeUrl,
        },
        {
          id: "cur_2",
          question: "How do you connect Psychology and technology?",
          answer:
            "I don't try to force connections between the two. To me, technology is a tool to serve people. What unites my work is an analytical, ethical, problem-solving posture — whether I'm easing an employee's daily routine or understanding a territory's social barriers.",
          linkText: "Read more in About",
          linkUrl: "/sobre",
        },
        {
          id: "cur_3",
          question: "Where do you recommend I start browsing?",
          answer:
            "Depends on what you're after! I've split my portfolio into two independent tracks: Digital Solutions covers my automation and tech projects; Research & Social Impact covers my academic research, field studies, and community work.",
          linkText: "Choose a track on the Home page",
          linkUrl: "/#destaques-solucoes-digitais",
        },
        {
          id: "cur_4",
          question: "How can I get in touch with you directly?",
          answer:
            "You can message me directly on LinkedIn, or send me an email — I'll get back to you as soon as I can!",
          linkText: "Message me on LinkedIn",
          linkUrl: "https://www.linkedin.com/in/viv-mota/",
        },
      ],
    },
  ],
};
