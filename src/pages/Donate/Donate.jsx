import MainLayout from "../../layouts/MainLayout";
import { motion } from "framer-motion";
import fundoDonate from "../../assets/images/fundoDonate.png";
import fundoLinhas from "../../assets/images/fundo-linhas.png";
import qrcode from "../../assets/images/QrCode.png";
import logoCard from "../../assets/images/logo-donate.png";

export default function Donate() {
    return (
        <>
    <MainLayout>
      {/* Seção principal */}
      <section
        className="relative w-full h-[90vh] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${fundoDonate})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <motion.div
          className="relative z-10 text-white max-w-xl pl-10 md:pl-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight font-fredoka"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Pronto para espalhar <br /> alegria com a sua
            <span className="text-[#EB8AB4]"> contribuição?</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Levando um pouco mais de cor e alegria para <br /> quem mais precisa.
          </motion.p>
        </motion.div>
      </section>

      {/* Seção de doação */}
      <section className="py-16 bg-white text-center relative overflow-hidden">
        {/* Fundo imagem animado */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-85 z-0"
          style={{ backgroundImage: `url(${fundoLinhas})` }}
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>

        <div className="relative z-10">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-10 font-fredoka"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#3184EF]">Doe</span>{" "}
            <span className="text-[#03184F]">e receba nossa gratidão!</span>
          </motion.h2>

          <motion.div
            className="bg-[#F2F7FF] rounded-2xl shadow-lg w-[90%] md:w-[550px] mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: 0.3,
            }}
          >
            <div className="bg-[#03184F] rounded-t-2xl flex justify-center items-center py-4">
              <motion.img
                src={logoCard}
                alt="Logo VerSonhos"
                className="h-8"
                initial={{ rotate: -10, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </div>

            <div className="flex justify-between items-center p-6">
              <div className="text-left text-[#03184F] text-sm leading-relaxed">
                <h3 className="text-[#3184EF] font-semibold mb-2">
                  Doações em depósito ou pix:
                </h3>
                <p>
                  Banco Bradesco<br />
                  AG: 0000<br />
                  C/C: 00000-0<br />
                  VerSonhos<br />
                  CNPJ: 00.000.000/0000-00<br />
                  Pix:<br />
                  Escolha a opção “digitar agência e conta” e utilize os dados
                  acima.<br />
                  A sua doação será concluída sem custo.
                </p>
              </div>

              {/* QR code */}
              <motion.div
                className="ml-4 p-[2px]"
                initial={{ scale: 0, rotate: 90, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                <img src={qrcode} alt="QR Code" className="w-44 h-34" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
        </>
    )
}