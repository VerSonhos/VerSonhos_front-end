export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { messages } = await req.json();

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
    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui responder agora.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro na API Groq:", error);
    return res.status(500).json({ reply: "Erro na comunicação com a IA 😢" });
  }
}
