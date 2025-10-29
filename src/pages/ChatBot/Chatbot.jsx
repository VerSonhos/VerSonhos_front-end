import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "../../assets/icons/chatbot.png";
import styles from "./chatbot.module.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([]);
    setInput("");
  };

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
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
              <h4>Chatbot</h4>
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

      <img
        src={chatbotIcon}
        alt="Chatbot"
        className={styles.chatbotIcon}
        onClick={handleToggle}
      />
    </div>
  );
}
