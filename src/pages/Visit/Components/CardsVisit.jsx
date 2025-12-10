import IconCadastre from '../../../assets/images/icon_cadastre.png';
import IconLogin from '../../../assets/images/icon_login.png';
import IconVisita from '../../../assets/images/icon_visita.png';
import IconHospital from '../../../assets/images/icon01.svg';
import IconPresente from '../../../assets/images/icon02.svg';

import { motion } from "framer-motion";
import { fadeUp } from "../../../motion/animations";

const MvvCard = ({ item, index }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="
      bg-white text-gray-800 rounded-2xl shadow-lg 
      p-6 flex flex-col items-center justify-start 
      hover:scale-105 transition-transform duration-300 
      border-4 border-tertiary 
      w-full max-w-sm min-h-[420px] sm:min-h-[460px] md:min-h-[480px]
    "
  >
    <div className="w-50 h-50 sm:w-70 sm:h-44 mb-5 flex items-center justify-center">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-contain"
      />
    </div>

    <h4 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-3 text-center">
      {item.title}
    </h4>

    <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-4">
      {item.text}
    </p>

    {index === 0 && (
      <a
        href="/login"
        className="w-full py-3 px-6 text-center text-white font-bold rounded-md bg-tertiary hover:bg-blue-700 transition-colors duration-200 mt-auto"
      >
        Agendar Visita
      </a>
    )}

    {index === 1 && (
      <>
        <a
          href="/login"
          className="w-full py-3 px-6 text-center text-white font-bold rounded-md bg-eleventh hover:bg-rose-400 transition-colors duration-200 mt-auto"
        >
          Apadrinhar Visita
        </a>
      </>
    )}
  </motion.div>
);

export default function CardsVisit() {
  const data = [
    {
      title: "Visitas para Hospitais e Clínicas",
      text: "Leva a VerSonhos para seus pacientes! Agende uma visita com nossa equipe para proporcionar momentos de alegria e bem-estar atráves da Realidade Virtual",
      img: IconHospital,
    },
    {
      title: "Apadrinhamento de visita VerSonhos",
      text: "Seja a pessoa que ilumina um sonho! Apadrinhe uma visita de Realidade Virtual e proporcione um momento de mágia para a criança hospitalizada.",
      img: IconPresente,
    },
  ];

  return (
    <section className="bg-gradient-to-r bg-thirteenth to-blue-800 text-white py-16 sm:py-20 font-fredoka mt-14">
      <div className="container mx-auto px-6 text-center">

        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-semibold mb-10 sm:mb-12"
        >
          Escolha sua forma de transformar a <span className="text-blue-400">realidade!</span>
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-14">
          {data.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] flex justify-center"
            >
              <MvvCard item={item} index={i} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
