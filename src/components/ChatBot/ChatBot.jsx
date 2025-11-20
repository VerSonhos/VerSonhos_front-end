import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "../../assets/icons/chatbot.png";
import chatBg from "../../assets/images/will-chat.png";
import styles from "./chatbot.module.css";

function formatText(raw) {
  let text = raw.trim();
  let sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  let paragraphs = [];
  for (let s of sentences) {
    if (s.length > 90) {
      paragraphs.push(s);
    } else {
      if (paragraphs.length === 0) {
        paragraphs.push(s);
      } else {
        paragraphs[paragraphs.length - 1] += " " + s;
      }
    }
  }
  return paragraphs.join("\n\n");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      const fullText = formatText(data.reply || "Desculpe, não consegui responder agora.");

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
          setIsTyping(false);
        }
      }, 15);

    } catch (err) {
      const botMessage = { role: "bot", content: "Erro na comunicação com a IA 😢" };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
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
                  className={msg.role === "user" ? styles.userMessage : styles.botMessage}
                >
                  {msg.content}
                </div>
              ))}

              {isTyping && (
                <div className={styles.botMessage}>Digitando...</div>
              )}
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isTyping ? "Aguarde o Will terminar..." : "Digite sua mensagem..."}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isTyping}
              />
              <button onClick={sendMessage} disabled={isTyping}>
                Enviar
              </button>
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
