import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ChatProvider } from "./context/ChatContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Projetos from "./pages/Projetos";
import ProjetoDetalhe from "./pages/ProjetoDetalhe";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <LanguageProvider>
      <ChatProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F4EFE6]">
            <Nav />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/projetos/:slug" element={<ProjetoDetalhe />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <BackToTop />
            <Chat />
          </div>
        </BrowserRouter>
      </ChatProvider>
    </LanguageProvider>
  );
}
