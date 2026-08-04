import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import Reveal from "../components/Reveal";

const EMAIL = "motaviv@gmail.com";

export default function Contato() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  useEffect(() => { document.title = t("Contato — Vivian Mota", "Contact — Vivian Mota"); }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Falha silenciosa — se o clipboard estiver bloqueado, o link mailto abaixo ainda funciona
    }
  };

  return (
    <main className="pt-24 pb-20 px-6 page-fade">
      <div className="max-w-xl mx-auto text-center">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("Vamos conversar?", "Let's talk?")}
          </h1>
          <p className="text-[#5F5E5A] mb-10">
            {t("Prefiro trocar uma ideia diretamente — escolha o canal que for mais fácil pra você.", "I'd rather chat directly — pick whichever channel is easiest for you.")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/viv-mota/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Vivian Mota"
              className="flex items-center gap-2 bg-[#2B5545] text-[#F4EFE6] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1e3d31] transition-colors w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>

            <div className="relative w-full sm:w-auto">
              <a
                href={`mailto:${EMAIL}`}
                onClick={(e) => { e.preventDefault(); handleCopy(); }}
                aria-label={t("Copiar e-mail de Vivian Mota", "Copy Vivian Mota's email")}
                className="flex items-center gap-2 border border-[#2B5545] text-[#2B5545] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#2B5545] hover:text-[#F4EFE6] transition-all w-full sm:w-auto justify-center cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                {EMAIL}
              </a>
              <span
                className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#2C2C2A] text-[#F4EFE6] text-[11px] px-2.5 py-1.5 rounded whitespace-nowrap transition-opacity duration-200"
                style={{ opacity: copied ? 1 : 0, pointerEvents: "none" }}
              >
                {t("E-mail copiado!", "Email copied!")}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#5F5E5A]/70 mt-4">
            {t("Clicar no e-mail copia o endereço — cole no seu app de e-mail preferido.", "Clicking the email copies the address — paste it into your favorite email app.")}
          </p>
        </Reveal>
      </div>
    </main>
  );
}
