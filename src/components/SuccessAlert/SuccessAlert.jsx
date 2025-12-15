import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // Usamos CheckCircle para sucesso

export default function SuccessAlert({ message }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-1000 
                bg-green-500 text-white font-semibold 
                px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
    >
      <CheckCircle size={22} />
      <span>{message}</span>
    </motion.div>
  );
}