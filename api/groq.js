import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const systemInstruction = {
    role: "system",
    content: "VOCÊ COLOCA SUA INSTRUÇÃO AQUI"
  };

  const { messages } = req.body;

  const finalMessages = [systemInstruction, ...messages];

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const stream = await client.chat.completions.create({
    model: "llama3-8b-8192",
    messages: finalMessages,
    stream: true
  });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  for await (const chunk of stream) {
    const text = chunk.choices?.[0]?.delta?.content || "";
    res.write(text);
  }

  res.end();
}
