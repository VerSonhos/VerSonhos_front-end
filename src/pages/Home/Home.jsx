import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.css";
import fundoHero from "../../assets/images/fundoHero.png"; 
import card1 from "../../assets/images/card1.png";
import card2 from "../../assets/images/card2.png";
import card3 from "../../assets/images/card3.png";
import doacaoImg from "../../assets/images/doacaoImg-home.png";
import quartoInternacao from "../../assets/images/quartos-internacao-home.png";
import salaEspera from "../../assets/images/salas-espera.png";
import impactoFundo from "../../assets/images/Seção-impacto.png";
import Icon1 from "../../assets/icons/Icon1-impacto.png";
import Icon2 from "../../assets/icons/icon2-impacto.png";
import Icon3 from "../../assets/icons/icon3-impacto.png";
import proa from "../../assets/icons/logo-proa.png";
import senac from "../../assets/icons/logo-senac.png";
import { motion } from "framer-motion";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8 },
    }),
  };

  return (
    <MainLayout>
      <motion.section
        className="relative w-full h-[90vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fundoHero})` }}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          className="relative z-10 text-white max-w-xl pl-10 md:pl-24"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-fredoka">
            <span className="text-[#EB8AB4]">Sonhos</span> virtuais,
            <br /> Alegria real
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Transformando a jornada de pequenos <br /> heróis com VR
          </p>
          <motion.button
            className="mt-6 bg-[#3184EF] hover:bg-[#4391F6] text-white font-semibold py-3 px-8 rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Conheça-nos
          </motion.button>
        </motion.div>
      </motion.section>

      {/* seção: o que fazemos */}
      <motion.section
        className="py-16 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-[#03184F] mb-10 font-fredoka"
          custom={0}
          variants={fadeUp}
        >
          O que <span className="text-[#3184EF]">fazemos?</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 max-w-6xl mx-auto">
          {[card1, card2, card3].map((card, i) => (
            <motion.div
              key={i}
              className="rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={card}
                alt={`card${i + 1}`}
                className="w-full h-56 object-cover"
              />
              <div className="bg-[#000F35] p-6 text-center">
                <h3 className="text-xl font-semibold mb-3 text-[#FFF] font-fredoka">
                  {i === 0
                    ? "A Experiência de Imersão e Evasão"
                    : i === 1
                    ? "Promovendo a Alegria e Esperança"
                    : "De Cuidado ao Cuidado Humanizado"}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {i === 0
                    ? "Levamos mundos inteiros para dentro dos quartos de hospital. Nossos óculos de Realidade Virtual transportam crianças para lugares mágicos e cheios de aventuras."
                    : i === 1
                    ? "Nosso foco é inspirar e renovar emocionalmente. Acreditamos que alegria e esperança ajudam no bem-estar e na recuperação."
                    : "Tudo é feito para alinhar diversão com segurança. Nossas experiências VR são criadas junto a profissionais da saúde e psicólogos, planejadas com carinho."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* seção: banner de doação */}
      <motion.section
        className="relative bg-[#145A94] text-white py-20 md:py-28 overflow-hidden min-h-[447px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 px-6 relative z-20">
          {/* Texto centralizado */}
          <motion.div
            className="flex-1 flex flex-col justify-center items-center text-center"
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-fredoka mb-4">
              Junte-se à nossa rede de carinho!
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-6 max-w-md leading-relaxed">
              Compartilhe sua história e ajude-nos a transformar a jornada de mais crianças em aventuras cheias de alegria.
            </p>
            <motion.button
              className={styles.doacaoButton}
              whileHover={{ scale: 1.05 }}
            >
              Faça uma doação!
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={doacaoImg}
            alt="Imagem no banner de doação"
            className="h-auto max-w-[500px] object-contain"
          />
        </motion.div>

        {/* onda branca acima do banner */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </motion.section>

      {/* seção: onde levamos alegria */}
      <motion.section
        className="py-20 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-[#03184F] mb-4 font-fredoka"
          custom={0}
          variants={fadeUp}
        >
          Onde levamos <span className="text-[#3184EF]">alegria</span>
        </motion.h2>
        <motion.p
          className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-12"
          custom={1}
          variants={fadeUp}
        >
          Transformando quartos de hospitais em portais de esperança, aventura e cor.
        </motion.p>

        <div className={styles.cardContainer}>
          {/* Card 1 */}
          <motion.div
            className={styles.cardRow}
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.cardItem} custom={0} variants={fadeUp}>
              <img
                src={quartoInternacao}
                alt="Quarto de Internação"
                className={`${styles.cardImage} ${styles.borderGreen}`}
              />
            </motion.div>
            <motion.div className={styles.cardItem} custom={1} variants={fadeUp}>
              <div className={styles.cardText}>
                <h3 className="text-2xl font-bold mb-4 font-fredoka">Quartos de Internação</h3>
                <p>
                  Transformando ambientes médicos em portais mágicos com óculos VR, levando esperança,
                  alegria e diversão para crianças durante o tratamento.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className={styles.cardRowReverse}
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className={styles.cardItem} custom={2} variants={fadeUp}>
              <img
                src={salaEspera}
                alt="Sala de Espera"
                className={`${styles.cardImage} ${styles.borderPink}`}
              />
            </motion.div>
            <motion.div className={styles.cardItem} custom={3} variants={fadeUp}>
              <div className={styles.cardText} style={{ backgroundColor: "#EB8AB4" }}>
                <h3 className="text-2xl font-bold mb-4 font-fredoka">Salas de Espera e Recreação</h3>
                <p>
                  Reduzimos a ansiedade e criamos experiências em espaços comuns interativos e educativos.
                  Estimulando a imaginação e renovando a esperança.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* seção: impacto do VerSonhos */}
      <motion.section
        className={`relative bg-cover bg-center text-center py-16 ${styles.impactSection}`}
        style={{ backgroundImage: `url(${impactoFundo})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-[#03184F] mb-10 font-fredoka"
          custom={0}
          variants={fadeUp}
        >
          Impacto do Ver<span className="text-[#3184EF]">Sonhos</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-6 font-fredoka">
          {[Icon1, Icon2, Icon3].map((icon, i) => (
            <motion.div
              key={i}
              className={`bg-[#8BCDCC] rounded-2xl shadow-lg w-64 h-64 flex flex-col items-center justify-center p-6 ${styles.card} ${styles.GreenBorder}`}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={icon} alt={`Icon ${i + 1}`} className="w-12 h-12 mb-3" />
              <h3 className="font-semibold text-lg text-[#03184F]">
                {i === 0 ? "Hospitais e Cidades" : i === 1 ? "Nossos Heróis" : "Horas de Magia"}
              </h3>
              <p className="text-[#03184F] text-2xl font-bold">
                {i === 0 ? "12+" : i === 1 ? "10+" : "1h"}
              </p>
              <p className="text-sm text-[#03184F]">
                {i === 0
                  ? "Em parceria com hospitais de São Paulo"
                  : i === 1
                  ? "Crianças em tratamento oncológico e internações prolongadas"
                  : "De sorrisos, redução da ansiedade e transformação da experiência"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* seção: herois que nos apoiam */}
      <motion.section
        className="py-20 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-[#03184F] mb-10 font-fredoka"
          custom={0}
          variants={fadeUp}
        >
          Heróis que nos<span className="text-[#3184EF]"> apoiam</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-20 px-6">
          <motion.img
            src={proa}
            alt="Herói 1"
            className="w-30 h-auto"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          />
          <motion.img
            src={senac}
            alt="Herói 2"
            className="w-45 h-auto"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </motion.section>
    </MainLayout>
  );
}
