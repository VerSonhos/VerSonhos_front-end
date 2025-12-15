import instructions from "./instructions.js";

const API_KEYS = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,

].filter(Boolean);

function validarResposta(text) {
  let resposta = text;

  resposta = resposta
    .replace(/ods\s*18(?!\s*como)/gi, "ODS 18, compromisso brasileiro de igualdade racial e diversidade")
    .replace(/ods\s*1[9-9]/gi, "ODS inexistente");

  const linksPermitidos = [
    "instagram.com/versonhos.oficial",
    "linktr.ee/versonhos",
    "linktr.ee/equipeversonhos",
    "docs.google.com/forms/d/e/1FAIpQLScBKEvOLMdb0LS9FfYCqz3dvjjbkEhpaJlgC1HexITijJF9sw/viewform"
  ];

  const linksEncontrados = resposta.match(/https?:\/\/[^\s]+/gi) || [];
  const temLinkProibido = linksEncontrados.some(link => {
    return !linksPermitidos.some(ok => link.includes(ok));
  });

  if (temLinkProibido) {
    resposta = "Desculpe, eu só posso compartilhar links oficiais da VerSonhos quando você pedir.";
  }

  const proibidos = ["diagnóstico", "medicação", "tratamento médico", "prognóstico"];
  for (const t of proibidos) {
    if (resposta.toLowerCase().includes(t)) {
      resposta = "Eu não posso comentar sobre questões médicas, mas posso explicar o trabalho da VerSonhos 💙.";
      break;
    }
  }

  if (resposta.toLowerCase().includes("ods 18 não")) {
    resposta = "A ODS 18 existe no contexto brasileiro como um compromisso social voltado para igualdade racial e diversidade, adotado pela VerSonhos.";
  }

  if (resposta.length > 1200) {
    resposta = resposta.slice(0, 1200);
  }

  return resposta;
}

function comprimirTexto(texto) {
  let t = texto;
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/\n{3,}/g, "\n\n");
  t = t.replace(/(VerSonhos)/gi, "VerSonhos");
  t = t.replace(/(\.\s+){2,}/g, ". ");
  t = t.replace(/(Nós\s+trabalhamos\s+com\s+)+/gi, "Nós trabalhamos com ");
  return t.trim();
}

async function fetchWithFailover(messages) {
  let lastError = null;

  for (const apiKey of API_KEYS) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: messages
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data;

    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Todas as chaves de API falharam.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { messages } = req.body;

    const system = {
      role: "system",
      content: `
        ${instructions.regrasProtecao}
        ${instructions.identidadeWill}
        ${instructions.estiloFala}
        ${instructions.redirect}
        ${instructions.base}
        ${instructions.sobreVersonhos}
        ${instructions.oQueFazemos}
        ${instructions.agendamento}
        ${instructions.equipe}
        ${instructions.missaoVisaoValores}
        ${instructions.monetizacao}
        ${instructions.ods3}
        ${instructions.ods10}
        ${instructions.ods18}
        ${instructions.planosFuturos}
        ${instructions.dadosEficacia}
        ${instructions.slogan}
      `
    };

    const finalMessages = [
      system,
      ...messages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content
      }))
    ];

    const data = await fetchWithFailover(finalMessages);

    const respostaBruta = data.choices?.[0]?.message?.content || "";
    const respostaValidada = validarResposta(respostaBruta);
    const respostaFinal = comprimirTexto(respostaValidada);

    return res.status(200).json({
      reply: respostaFinal
    });

  } catch (e) {
    return res.status(500).json({ reply: "Desculpe, estou com muitas conexões agora. Tente novamente em alguns segundos." });
  }
}