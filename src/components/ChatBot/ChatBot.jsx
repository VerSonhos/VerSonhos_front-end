import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "../../assets/icons/chatbot.png";
import chatBg from "../../assets/images/will-chat.png";
import styles from "./chatbot.module.css";

function formatText(raw) {
  let text = raw.trim();
  text = text.replace(/\s+/g, " ");

  text = text
    .replace(/ - /g, "\n- ")
    .replace(/ – /g, "\n- ")
    .replace(/;\s*/g, ";\n")
    .replace(/!\s*/g, "!\n\n")
    .replace(/\?\s*/g, "?\n\n");

  let lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let formatted = [];

  for (let line of lines) {
    let lower = line.toLowerCase();

    if (lower.startsWith("missão")) {
      formatted.push("✨ Missão:\n");
      continue;
    }
    if (lower.startsWith("visão")) {
      formatted.push("🌈 Visão:\n");
      continue;
    }
    if (lower.startsWith("valores")) {
      formatted.push("💙 Valores:\n");
      continue;
    }
    if (lower.startsWith("o que fazemos")) {
      formatted.push("✨ O que fazemos:\n");
      continue;
    }

    if (line.startsWith("-") || line.startsWith("•")) {
      formatted.push("• " + line.replace(/^[-•]\s*/, ""));
      continue;
    }

    formatted.push(line);
  }

  return formatted.join("\n\n");
}



export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      const fullText = formatText(
        data.reply || "Desculpe, não consegui responder agora."
      );

      let botMessage = { role: "bot", content: "" };
      setMessages((prev) => [...prev, botMessage]);

      let index = 0;
      const interval = setInterval(() => {
        index++;

        botMessage.content = fullText.slice(0, index);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...botMessage };
          return updated;
        });

        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, 15);
    } catch (err) {
      const botMessage = {
        role: "bot",
        content: "Erro na comunicação com a IA 😢",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.chatbotContainer}>
      <AnimatePresence>
        {open && (
          <motion.img
            src={chatBg}
            alt=""
            className={styles.chatBackground}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.chatHeader}>
              <h4>Will</h4>
              <button onClick={handleClose}>×</button>
            </div>

            <div className={styles.chatBody}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Enviar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={chatbotIcon}
        alt=""
        className={styles.chatbotIcon}
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </div>
  );
}
