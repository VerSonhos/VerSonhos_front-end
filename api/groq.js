import instructions from "./instructions.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { messages } = req.body;

    const system = {
      role: "system",
      content: `
${instructions.identidadeWill}
${instructions.regrasProtecao}
${instructions.sobreVersonhos}
${instructions.oQueFazemos}
${instructions.agendamento}
${instructions.equipe}
${instructions.contato}
${instructions.estiloFala}
${instructions.redirect}
${instructions.base}
${instructions.home}
${instructions.versonhos}
${instructions.jogos}
${instructions.faq}

`
    };

    const final = [
      system,
      ...messages.map((m) => ({
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
        model: "llama-3.3-70b-versatile",
        messages: final
      })
    });

  const data = await response.json();

  console.log("🔍 RESPOSTA GROQ:", JSON.stringify(data, null, 2));

  if (data.error) {
    return res.status(500).json({ reply: "Erro interno: " + data.error.message });
  }

  return res.status(200).json({
    reply: data.choices?.[0]?.message?.content || ""
  });

  } catch (e) {
    return res.status(500).json({
      reply: "Erro interno."
    });
  }
}
