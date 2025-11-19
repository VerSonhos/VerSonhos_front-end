const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages((p) => [...p, userMessage]);
  setInput("");

  const botMessage = { role: "bot", content: "" };
  setMessages((p) => [...p, botMessage]);

  const res = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [...messages, userMessage] })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    botMessage.content += chunk;

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...botMessage };
      return updated;
    });
  }
};
