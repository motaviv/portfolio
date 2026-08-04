import { useState } from "react";
import { useLang } from "../context/LanguageContext";

/**
 * E-mail clicável: clique curto copia o endereço (com confirmação "Copiado!"),
 * e ainda funciona como link mailto: normal — não perde a funcionalidade padrão,
 * só adiciona o atalho de cópia como bônus de conveniência.
 */
export default function CopyEmail({ email, className }: { email: string; className?: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Sem permissão de clipboard — deixa o link mailto: seguir normalmente
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick} className={`relative ${className ?? ""}`}>
      {copied ? t("Copiado!", "Copied!") : email}
    </a>
  );
}
