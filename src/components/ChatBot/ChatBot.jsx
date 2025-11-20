import { useState, useEffect, useRef } from "react";
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
  let current = "";

  for (let s of sentences) {
    if ((current + " " + s).length > 250) {
      paragraphs.push(current.trim());
      current = s;
    } else {
      current += " " + s;
    }
  }

  if (current.trim()) paragraphs.push(current.trim());

  return paragraphs.join("\n\n");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatBodyRef = useRef(null);

  const scrollToBottom = (force = false) => {
    const el = chatBodyRef.current;
    if (!el) return;

    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;

    if (force || nearBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  };

  const handleToggle = () => {
    setOpen(!open);

    if (!open && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (!open && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            content:
              "Olá! Eu sou o Will 💙. Estou aqui para te ajudar a conhecer a VerSonhos."
          }
        ]);
      }, 350);
    }
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };


  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    scrollToBottom(true);

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      const fullText = formatText(
        data.reply || "Desculpe, não consegui responder agora."
      );

      let botMessage = { role: "bot", content: "" };
      setMessages((prev) => [...prev, botMessage]);
      scrollToBottom(true);

      let index = 0;

      const interval = setInterval(() => {
        index++;
        botMessage.content = fullText.slice(0, index);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...botMessage };
          return updated;
        });

        scrollToBottom(true);

        if (index >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 15);
    } catch (err) {
      const botMessage = {
        role: "bot",
        content: "Erro na comunicação com a IA 😢"
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }
  };

  return (
    <div className={`${styles.chatbotContainer} ${open ? styles.chatOpen : ""}`}>
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

            <div className={styles.chatBody} ref={chatBodyRef}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user" ? styles.userMessage : styles.botMessage
                  }
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
                disabled={isTyping}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isTyping
                    ? "Aguarde o Will terminar..."
                    : "Digite sua mensagem..."
                }
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button disabled={isTyping} onClick={sendMessage}>
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
