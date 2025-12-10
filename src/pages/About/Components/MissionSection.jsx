import { motion } from "framer-motion";
import ImgMissao from '../../../assets/images/icone_missao.png';
import ImgVisao from '../../../assets/images/icone_visao.png';
import ImgValores from '../../../assets/images/icone_valores.png';

const MvvCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 h-64 flex flex-col items-center justify-start hover:scale-105 transition-transform duration-300 border-tertiary border-3"
  >
    <div className="w-14 h-14 mb-4 flex items-center justify-center">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-contain"
      />
    </div>

    <h4 className="text-2xl font-semibold text-blue-800 mb-2">
      {item.title}
    </h4>

    <p className="text-gray-700 text-lg leading-relaxed">
      {item.text}
    </p>
  </motion.div>
);

export default function MissionSection() {
  const data = [
    {
      title: "Missão",
      text: "Bem-estar e conforto emocional a crianças hospitalizadas.",
      img: ImgMissao,
    },
    {
      title: "Visão",
      text: "Iniciativa inovadora em humanização hospitalar.",
      img: ImgVisao,
    },
    {
      title: "Valores",
      text: "Empatia; Inovação; Cuidado; Acessibilidade; Esperança.",
      img: ImgValores,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#03184F] to-blue-800 text-white py-20 font-fredoka">
      <div className="container mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-semibold mb-12"
        >
          Nossa <span className="text-blue-400">Missão, Visão e Valores</span>
        </motion.h3>
        <div className="flex flex-wrap justify-center gap-14">
          {data.map((item, i) => (
            <div
              key={i}
              className="w-full lg:w-[30%] max-w-xs"
            >
              <MvvCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
