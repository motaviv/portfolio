import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import { useLang } from "../context/LanguageContext";
import { chatDataPT, chatDataEN, type ChatProfile, type ChatQuestion } from "../data/chat";

type Message = { role: "bot" | "user"; text: string; linkText?: string; linkUrl?: string };

const TRANSITION_MS = 220;
const REMOVE_MS = 280;
const TYPING_MS = 550;

function ProfileIcon({ icon, className }: { icon: string; className?: string }) {
  if (icon === "briefcase")
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>;
  if (icon === "leaf")
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>;
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
}

function ChatAvatar({ size = 32 }: { size?: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="rounded-full bg-[#F4EFE6]/20 flex items-center justify-center overflow-hidden shrink-0" style={{ width: size, height: size }}>
      {!imgFailed ? (
        <img src="/assets/avatar-viv.jpg" alt="Viv" className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
      ) : (
        <span className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>V</span>
      )}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/80 border border-[#C8C5BF]/30 rounded-2xl rounded-tl-sm px-3.5 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#5F5E5A]/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
        ))}
      </div>
    </div>
  );
}

// Botão de pergunta que desaparece com animação de altura/opacidade ao ser respondido.
// "removing" fica true por REMOVE_MS antes de a pergunta sumir de vez da lista (ver askQuestion).
function QuestionButton({ q, removing, onClick }: { q: ChatQuestion; removing: boolean; onClick: () => void }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: removing ? "0fr" : "1fr", opacity: removing ? 0 : 1, transition: `grid-template-rows ${REMOVE_MS}ms ease, opacity ${REMOVE_MS}ms ease` }}>
      <div className="overflow-hidden">
        <button
          onClick={onClick}
          className="w-full text-left text-sm px-3 py-2 mb-1.5 rounded-lg border border-[#C8C5BF]/60 bg-white/60 hover:bg-[#2B5545] hover:text-[#F4EFE6] hover:border-[#2B5545] text-[#2C2C2A] transition-colors"
        >
          {q.question}
        </button>
      </div>
    </div>
  );
}

export default function Chat() {
  const { isOpen, toggleChat, closeChat } = useChat();
  const { lang, t } = useLang();
  const data = lang === "pt" ? chatDataPT : chatDataEN;
  const navigate = useNavigate();

  const [selectedProfile, setSelectedProfile] = useState<ChatProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    let raf1: number, raf2: number;
    if (isOpen) {
      setMounted(true);
      raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setAnimateIn(true)); });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setMounted(false), TRANSITION_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedProfile(null);
    setMessages([{ role: "bot", text: data.botConfig.welcomeMessage }]);
    setAnswered(new Set());
    setRemovingIds(new Set());
  }, [lang]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeChat(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeChat]);

  const selectProfile = (profile: ChatProfile) => {
    setSelectedProfile(profile);
    setMessages((prev) => [...prev, { role: "user", text: profile.label }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: data.botConfig.emptyStateMessage }]);
    }, TYPING_MS);
  };

  const askQuestion = (q: ChatQuestion) => {
    // 1) marca como "saindo" (dispara a animação de colapso do QuestionButton)
    setRemovingIds((prev) => new Set([...prev, q.id]));
    setMessages((prev) => [...prev, { role: "user", text: q.question }]);
    // 2) só depois da animação acabar, remove de vez da lista de opções (marcando como respondida)
    setTimeout(() => setAnswered((prev) => new Set([...prev, q.id])), REMOVE_MS);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: q.answer, linkText: q.linkText, linkUrl: q.linkUrl }]);
    }, TYPING_MS);
  };

  const resetProfile = () => {
    setSelectedProfile(null);
    setAnswered(new Set());
    setRemovingIds(new Set());
    setMessages((prev) => [...prev, { role: "bot", text: data.botConfig.welcomeMessage }]);
  };

  const handleLink = (url: string) => {
    if (url.startsWith("/") || url.startsWith("#")) {
      if (url.startsWith("/#")) {
        const anchor = url.slice(2);
        navigate("/");
        setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 300);
      } else navigate(url);
      closeChat();
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  // Pergunta some da lista assim que "answered"; durante o intervalo de REMOVE_MS ela ainda
  // aparece aqui (só com removing=true), o que é o que permite a animação de saída tocar.
  const visibleQuestions = selectedProfile?.questions.filter((q) => !answered.has(q.id)) ?? [];

  return (
    <>
      {/* Botão flutuante — pequeno por padrão, expande no hover revelando "Fale com a Viv" */}
      <button
        onClick={toggleChat}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        aria-label={t("Abrir chat com a Viv", "Open chat with Viv")}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 h-12 rounded-full bg-[#2B5545] text-[#F4EFE6] shadow-lg hover:bg-[#1e3d31] transition-all duration-300 flex items-center justify-start overflow-hidden"
        style={{
          width: buttonHover && !isOpen ? 168 : 48,
          paddingLeft: buttonHover && !isOpen ? 14 : 12,
          boxShadow: "0 4px 24px rgba(43,85,69,0.35)",
        }}
      >
        <span className="shrink-0 flex items-center justify-center w-6 h-6">
          {isOpen ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          )}
        </span>
        <span className="text-sm font-medium whitespace-nowrap ml-2 transition-opacity duration-200" style={{ opacity: buttonHover && !isOpen ? 1 : 0 }}>
          {t("Fale com a Viv", "Talk to Viv")}
        </span>
      </button>

      {mounted && (
        <div
          role="dialog"
          aria-label={t("Chat — Fale com a Viv", "Chat — Talk to Viv")}
          className={`fixed z-50 flex flex-col bg-[#F4EFE6] border border-[#C8C5BF]/60 shadow-2xl overflow-hidden
            ${isMobile ? "inset-0" : "bottom-24 right-6 w-[340px] max-w-[92vw] h-[480px] max-h-[75vh] rounded-2xl"}`}
          style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
            transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
          }}
        >
          <div className="bg-[#2B5545] text-[#F4EFE6] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ChatAvatar />
              <div>
                <p className="text-sm font-semibold leading-none">Viv</p>
                <p className="text-[10px] text-[#F4EFE6]/70 font-mono mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Fale com a Viv", "Talk to Viv")}</p>
              </div>
            </div>
            <button onClick={closeChat} aria-label={t("Fechar chat", "Close chat")} className="p-1 hover:opacity-70 transition-opacity">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-[#2B5545] text-[#F4EFE6] rounded-tr-sm" : "bg-white/80 text-[#2C2C2A] border border-[#C8C5BF]/30 rounded-tl-sm"}`}>
                  <p>{msg.text}</p>
                  {msg.linkText && msg.linkUrl && (
                    <button onClick={() => handleLink(msg.linkUrl!)} className="mt-2 text-xs text-[#2B5545] font-medium underline underline-offset-2 hover:text-[#1e3d31] transition-colors text-left">{msg.linkText} →</button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <TypingBubble />}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#C8C5BF]/40 px-4 py-3 shrink-0 bg-[#F4EFE6]">
            {!selectedProfile ? (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-[#5F5E5A] font-mono uppercase tracking-wider mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Quem é você?", "Who are you?")}</p>
                {data.profiles.map((profile) => (
                  <button key={profile.id} onClick={() => selectProfile(profile)} className="flex items-center gap-2.5 text-left px-3 py-2 rounded-xl border border-[#C8C5BF]/60 bg-white/60 hover:bg-[#2B5545] hover:text-[#F4EFE6] hover:border-[#2B5545] transition-all text-sm text-[#2C2C2A] group">
                    <ProfileIcon icon={profile.icon} className="w-4 h-4 shrink-0 text-[#2B5545] group-hover:text-[#F4EFE6] transition-colors" />
                    <span>{profile.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] text-[#5F5E5A] font-mono uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>{t("Perguntas", "Questions")}</p>
                  <button onClick={resetProfile} className="text-[10px] text-[#2B5545] hover:underline font-mono" style={{ fontFamily: "'DM Mono', monospace" }}>← {data.botConfig.changeProfileLabel}</button>
                </div>
                <div className="flex flex-col max-h-36 overflow-y-auto">
                  {visibleQuestions.length > 0 ? (
                    visibleQuestions.map((q) => (
                      <QuestionButton key={q.id} q={q} removing={removingIds.has(q.id)} onClick={() => askQuestion(q)} />
                    ))
                  ) : (
                    <p className="text-xs text-[#5F5E5A] italic py-2">{t("Todas as perguntas desse perfil já foram respondidas.", "All questions for this profile have been answered.")}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
