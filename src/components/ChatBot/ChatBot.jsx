import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "../../assets/icons/chatbot.png";
import chatBg from "../../assets/images/will-chat.png"; 
import styles from "./chatbot.module.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  useEffect(() => {
    console.log("Chave carregada:", import.meta.env.VITE_GROQ_API_KEY);
  }, []);

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
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    });


    const data = await response.json();

    if (data.error) {
      console.error("Erro da Groq:", data.error);
      throw new Error(data.error.message);
    }

    const botMessage = {
      role: "bot",
      content: data.choices?.[0]?.message?.content || "Desculpe, não consegui responder agora.",
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    const botMessage = { role: "bot", content: "Erro na comunicação com a IA 😢" };
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
            alt="Fundo do chat"
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
        alt="Chatbot"
        className={styles.chatbotIcon}
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }} 
        transition={{ type: "spring", stiffness: 300 }}
      />
    </div>
  );
}
