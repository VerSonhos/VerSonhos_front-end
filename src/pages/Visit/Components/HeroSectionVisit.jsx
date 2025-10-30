import ImgBackground from '../../../assets/videos/background_visit.mp4'
import { motion } from "framer-motion";

export default function HeroSectionVisit(){
    return(
        <>
        <motion.section
                className="relative w-full h-[100vh] flex items-center bg-cover bg-center"
                initial="hidden"
                animate="visible"
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
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight font-fredoka">
                    Imersão que desperta <span className='text-twelfth'>sorrisos</span>
                  </h1>
                  <p className="mt-4 text-lg md:text-xl font-inter">
                    Cada visita é um portal para a alegria e a esperança
                  </p>
                  <motion.button
                    className="mt-6 bg-[#3184EF] hover:bg-[#4391F6] text-white font-semibold py-3 px-8 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 font-fredoka"
                    whileHover={{ scale: 1.05 }}
                  >
                    Agendar visita
                  </motion.button>
                </motion.div>
              </motion.section>
        </>
    );
}