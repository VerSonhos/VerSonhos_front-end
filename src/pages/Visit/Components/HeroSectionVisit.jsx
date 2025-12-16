import ImgBackground from '../../../assets/videos/background_visit.mp4'
import { motion } from "framer-motion";

export default function HeroSectionVisit(){
    return(
        <>
        <motion.section
            className="relative w-full h-[100vh] flex items-center bg-cover bg-center"
        >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={ImgBackground} type="video/mp4" />
            </video>

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
                Imersão que desperta <span className='text-twelfth'>sorrisos</span>
              </motion.h1>

              <motion.p
                className="mt-4 text-lg md:text-xl font-inter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Cada visita é um portal para a alegria e a esperança
              </motion.p>

              <motion.a
                href="/login" //
                className="mt-6 bg-[#3184EF] hover:bg-[#4391F6] text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 font-fredoka inline-block" // Adicionado inline-block para o 'a' se comportar como um botão
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                Agendar visita
              </motion.a>
            </motion.div>
        </motion.section>
        </>
    );
}
