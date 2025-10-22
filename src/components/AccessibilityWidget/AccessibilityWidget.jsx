// src/components/AccessibilityWidget.jsx
import { useEffect } from "react";

export default function AccessibilityWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"]')) {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
      s.defer = true;
      s.onload = () => {
        console.log("Sienna widget script carregado");
      };
      s.onerror = (e) => {
        console.error("Erro ao carregar Sienna widget:", e);
      };
      document.body.appendChild(s);
    }

    return () => {
    };
  }, []);
}
