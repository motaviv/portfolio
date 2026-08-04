import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * O React Router não reseta a rolagem da página ao navegar (diferente de um site tradicional).
 * Esse componente força a volta ao topo sempre que a rota muda — sem isso, a pessoa continua
 * vendo o meio/fim da página anterior ao clicar num link.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
