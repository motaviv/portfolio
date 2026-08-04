import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="pt-24 pb-20 px-6 min-h-screen flex items-center justify-center text-center page-fade">
      <div>
        <p className="font-mono text-7xl text-[#C8C5BF] mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>404</p>
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-4 max-w-md"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t(
            "Essa página não foi encontrada — mas seus próximos projetos favoritos estão logo ali.",
            "This page wasn't found — but your next favorite project is right this way."
          )}
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#2B5545] text-[#F4EFE6] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#1e3d31] transition-colors mt-4"
        >
          {t("Voltar para a Home", "Back to Home")} →
        </Link>
      </div>
    </main>
  );
}
