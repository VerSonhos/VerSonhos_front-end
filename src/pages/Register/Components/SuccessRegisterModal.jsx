import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessRegisterModal({ onFinish }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center"
      >
        <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />

        <h2 className="text-2xl font-bold text-gray-800">
          Cadastro concluído!
        </h2>
        
        <p className="text-gray-600 mt-2">
          Seu cadastro foi realizado com sucesso.
        </p>

        <p className="text-gray-500 text-sm mt-4">
          Você será redirecionado para o login em instantes...
        </p>
      </motion.div>
    </div>
  );
}
