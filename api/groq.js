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
        messages: messages.map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content,
        })),
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erro Groq:", data.error);
      return res.status(500).json({
        reply: "Erro ao processar resposta da IA 😢",
        debug: data.error,
      });
    }

    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui responder agora.";
    return res.status(200).json({ reply, raw: data });

  } catch (error) {
    console.error("Erro na API Groq:", error);
    return res.status(500).json({
      reply: "Erro na comunicação com a IA 😢",
      debug: error.message,
    });
  }
}
