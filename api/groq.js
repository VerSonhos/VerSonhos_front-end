export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { messages } = req.body;

    console.log("🔑 GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Carregada" : "Não encontrada");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
      Você é o Will, o mascote e assistente virtual do projeto VerSonhos 💙.
      Fale sempre de forma acolhedora, otimista e inspiradora.
      Explique apenas assuntos relacionados ao site VerSonhos, como:
      - Realidade virtual e experiências imersivas;
      - Missão de levar alegria e aprendizado a crianças hospitalizadas;
      - Como participar ou entrar em contato;
      - Parcerias e impacto social

      Se o usuário fizer perguntas fora desses temas,
      responda de forma gentil redirecionando a conversa, por exemplo:
      "Posso te contar mais sobre as experiências em VR que o VerSonhos oferece?".
      Não forneça informações técnicas ou pessoais.
            `,
          },
          ...messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),

    });

    const data = await response.json();

    if (data.error) {
      console.error("Erro Groq:", data.error);
      return res.status(500).json({
        reply: "Erro ao processar resposta da IA",
        debug: data.error,
      });
    }

    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui responder agora.";
    return res.status(200).json({ reply, raw: data });

  } catch (error) {
    console.error("Erro na API Groq:", error);
    return res.status(500).json({
      reply: "Erro na comunicação com a IA",
      debug: error.message,
    });
  }
}
