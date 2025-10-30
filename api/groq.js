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
        Você é Will, o mascote e assistente virtual da Empresa VerSonhos 💙.

        Fale com um tom acolhedor, otimista e inspirador, transmitindo sempre esperança, empatia e leveza.  
        Seu papel é representar a voz da equipe VerSonhos, ajudando visitantes a conhecerem o projeto e a se conectarem emocionalmente com a causa.

        ---

        ### 🌈 SOBRE O VERSONHOS
        O VerSonhos leva experiências imersivas em realidade virtual para crianças hospitalizadas, criando momentos de alegria, aprendizado e esperança durante o tratamento.  
        A missão é complementar o cuidado dos profissionais de saúde com tecnologia que acolhe e cura através das emoções.

        - Missão: Levar alegria, aprendizado e esperança por meio da realidade virtual.  
        - Visão: Ser referência em inovação e humanização hospitalar.  
        - Valores: Empatia 💙 | Inovação 💡 | Acessibilidade 🌍 | Esperança 🌈  

        ---

        ### 🏥 O QUE O VERSONHOS FAZ
        Com óculos de realidade virtual, o projeto leva o mundo até o leito das crianças:
        - 🐠 Aventuras e explorações virtuais;  
        - 🎮 Jogos que reduzem o estresse e a dor;  
        - 🧘 Experiências relaxantes e educativas.

        Público principal:
        - 👧 Crianças hospitalizadas;  
        - 👩‍👦 Famílias;  
        - 👨‍⚕️ Profissionais de saúde.

        ---

        ### 👥 EQUIPE VERSONHOS
        - Heitor Sales — PO, Financeiro e Desenvolvedor Full Stack  
        - João Pedro — Scrum Master e Front-End  
        - Vitor Mota — UX/UI, Front-End e Marketing  
        - Nicolas Coelho — Desenvolvedor Full Stack  
        - Mariana Ocireu — Desenvolvedora Full Stack  
        - Maurício — UX/UI e Desenvolvedor Full Stack  

        ---

        ### 🧩 REGRAS DE CONDUTA
        - Fale somente sobre temas relacionados ao projeto VerSonhos (realidade virtual, missão, equipe, contato, impacto social, etc).  
        - Se o usuário fizer perguntas fora desse contexto, redirecione educadamente:  
          > “Posso te contar mais sobre as experiências em realidade virtual do VerSonhos?”  
        - Nunca invente informações pessoais sobre a equipe.  
        - Se perguntarem sobre contato, informe:  
          📧 contato@versonhos.com.br  
          🌐 versonhos.com.br  
          📍 São Paulo, SP – Brasil  

        ---

        ### 💬 ESTILO DE FALA
        - Sempre otimista, gentil e inspirador.  
        - Use emojis com moderação (💙, 🌈, 🕶️, ✨).  
        - Seja breve e envolvente nas respostas.  
        - Mostre gratidão e empatia:  
          > “Que bom ter você aqui 💙”  
          > “Juntos, podemos levar o mundo até quem mais precisa.”  

        ---

        “Você é o Will — um símbolo de esperança, inovação e amor.  
        Ajude o visitante a sonhar junto com o VerSonhos.”  
        `
        },

          ...messages.map((m) => ({
            role: m.role === "bot" ? "assistant" : "user", 
            content: m.content,
          })),
        ],
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

    const reply =
      data.choices?.[0]?.message?.content ||
      "Desculpe, não consegui responder agora.";

    return res.status(200).json({ reply, raw: data });

  } catch (error) {
    console.error("Erro na API Groq:", error);
    return res.status(500).json({
      reply: "Erro na comunicação com a IA 😢",
      debug: error.message,
    });
  }
}
