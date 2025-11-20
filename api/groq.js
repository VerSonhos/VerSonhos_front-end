import instructions from "./instructions.js";

function validarResposta(text) {
  let resposta = text;

  resposta = resposta
    .replace(/ods\s*18(?!\s*como)/gi, "ODS 18 (uso interno da VerSonhos)")
    .replace(/ods\s*1[9-9]/gi, "ODS inexistente");

  const linksPermitidos = [
    "versonhos.com.br",
    "instagram.com/versonhos.oficial",
    "linktr.ee/versonhos",
    "linktr.ee/equipeversonhos",
    "docs.google.com/forms"
  ];

  const linksEncontrados = resposta.match(/https?:\/\/[^\s]+/gi) || [];
  const temLinkProibido = linksEncontrados.some(link => {
    return !linksPermitidos.some(permitido => link.includes(permitido));
  });

  if (temLinkProibido) {
    resposta = "Desculpe, eu só posso compartilhar links oficiais da VerSonhos quando você pedir.";
  }

  const proibidos = ["diagnóstico", "medicação", "tratamento médico", "prognóstico"];
  for (const termo of proibidos) {
    if (resposta.toLowerCase().includes(termo)) {
      resposta = "Eu não posso comentar sobre questões médicas, mas posso explicar o trabalho da VerSonhos 💙.";
      break;
    }
  }

  if (resposta.length > 1200) {
    resposta = resposta.slice(0, 1200);
  }

  return resposta;
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
        ${instructions.contato}
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

    const final = [
      system,
      ...messages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: final
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ reply: "Erro interno: " + data.error.message });
    }

    return res.status(200).json({
      reply: validarResposta(data.choices?.[0]?.message?.content || "")
    });

  } catch (e) {
    return res.status(500).json({ reply: "Erro interno." });
  }
}
