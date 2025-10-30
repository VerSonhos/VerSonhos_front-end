// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
// Importe o hook de localização da sua biblioteca de roteamento (ex: react-router-dom)
import { useLocation } from 'react-router-dom'; 

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Verifica se está no ambiente do navegador
    if (typeof window !== 'undefined') {
      
      // 2. Rola a janela (viewport) para o topo.
      // O 'smooth' é opcional, se quiser uma transição suave.
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' para uma transição imediata (melhor para navegação)
      });
      
      // Se houver um elemento específico que contém a rolagem (ex: div principal)
      // você precisaria de uma ref para rolar esse elemento em vez da window.
      // Mas a maioria dos casos é a rolagem da window.
    }
    
  }, [pathname]); // 🔄 Este hook roda toda vez que o 'pathname' (a rota) muda.

  // Este componente não renderiza nada no DOM
  return null;
}