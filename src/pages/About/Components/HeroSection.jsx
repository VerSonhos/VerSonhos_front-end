import ImgHero from '../../../assets/images/background_rapaziada.png'
import { motion } from "framer-motion";
import { fadeUp } from "../../../motion/animations";

export default function HeroSection() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat h-[90vh] flex flex-col justify-center items-center text-center text-white px-6"
      style={{ backgroundImage: `url(${ImgHero})` }}
    >
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-fredoka"
      >
        Quem <span className="text-blue-400">Somos?</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto font-inter text-xl sm:text-2xl md:text-3xl"
      >
        Somos um grupo de alunos do Instituto PROA, movidos pelo propósito de transformar momentos difíceis em experiências de esperança. Nosso projeto nasceu com a ideia de utilizar a tecnologia do óculos de realidade virtual (VR) para levar alegria, distração e novas vivências a crianças internadas em hospitais, principalmente aquelas em tratamento contra o câncer.
      </motion.p>
    </section>
  )
}
