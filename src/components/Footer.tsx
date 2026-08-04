import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#2C2C2A] text-[#C8C5BF] py-10 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-base text-[#F4EFE6]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {t("Portfólio", "Portfolio")}
        </p>
        <nav aria-label={t("Links do rodapé", "Footer links")} className="flex items-center gap-6 flex-wrap justify-center">
          <FooterLink to="/sobre">{t("Sobre", "About")}</FooterLink>
          <FooterLink to="/projetos">{t("Projetos", "Projects")}</FooterLink>
          <FooterLink to="/contato">{t("Contato", "Contact")}</FooterLink>
        </nav>
        <p className="text-xs text-[#5F5E5A] font-mono" style={{ fontFamily: "'DM Mono', monospace" }}>
          © {new Date().getFullYear()} {t("Portfólio", "Portfolio")}
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm text-[#C8C5BF] hover:text-[#F4EFE6] transition-colors">
      {children}
    </Link>
  );
}
