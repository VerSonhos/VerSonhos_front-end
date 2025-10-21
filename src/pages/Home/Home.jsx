import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.css";
import fundoHero from "../../assets/images/fundoHero.png"; 
import card1 from "../../assets/images/card1.png"
import card2 from "../../assets/images/card2.png"
import card3 from "../../assets/images/card3.png"
import doacaoImg from "../../assets/images/doacaoImg-home.png";
import onda from "../../assets/images/onda-home.png"
import quartoInternacao from "../../assets/images/quartos-internacao-home.png"
import salaEspera from "../../assets/images/salas-espera.png"

export default function Home() {
  return (
    <MainLayout>
      {/* Home */}
      <section
        className="relative w-full h-[90vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fundoHero})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-white max-w-xl pl-10 md:pl-24">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-fredoka">
            <span className="text-[#EB8AB4]">Sonhos</span> virtuais,
            <br /> Alegria real
          </h1>

          <p className="mt-4 text-lg md:text-xl">
            Transformando a jornada de pequenos 
            <br /> heróis com VR
          </p>

          <button className="mt-6 bg-[#3184EF] hover:bg-[#4391F6] text-white font-semibold py-3 px-8 rounded-lg transition">
            Conheça-nos
          </button>
        </div>
      </section>

      {/* seção: o que fazemos */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#03184F] mb-10 font-fredoka">
          O que <span className="text-[#3184EF]">fazemos?</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 max-w-6xl mx-auto">
          {/* card 1 */}
          <div className="rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition">
            <img
              src={card1}
              alt="img1"
              className="w-full h-56 object-cover"
            />
            <div className="bg-[#EB8AB4]  p-6 text-center">
              <h3 className="text-xl font-semibold mb-3 text-[#FFF] font-fredoka">
                A Experiência de Imersão e Evasão
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Levamos mundos inteiros para dentro dos quartos de hospital.
                Nossos óculos de Realidade Virtual transportam crianças para
                lugares mágicos e cheios de aventuras.
              </p>
            </div>
          </div>

          {/* card 2 */}
          <div className="rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition">
            <img
              src={card2}
              alt="img2"
              className="w-full h-56 object-cover"
            />
            <div className="bg-[#7EB1F3] p-6 text-center ">
              <h3 className="text-xl font-semibold mb-3 text-[#FFF] font-fredoka">
                Promovendo a Alegria e Esperança
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Nosso foco é inspirar e renovar emocionalmente. Acreditamos que
                alegria e esperança ajudam no bem-estar e na recuperação.
              </p>
            </div>
          </div>

          {/* card 3 */}
          <div className="rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition">
            <img
              src={card3}
              alt="img3"
              className="w-full h-56 object-cover"
            />
            <div className="bg-[#7DE8AD] p-6 text-center flex-1">
              <h3 className="text-xl font-semibold mb-3 text-[#FFF] font-fredoka">
                De Cuidado ao Cuidado Humanizado
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Tudo é feito para alinhar diversão com segurança. Nossas
                experiências VR são criadas junto a profissionais da saúde e
                psicólogos, planejadas com carinho.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* imagem de onda encima do banner de doação */}
        <div className="relative z-10 -mt-10 flex justify-center">
          <img
            src={onda}
            alt="imagem topo da seção de doação"
            className="w-full max-w-10xl object-contain"
          />
        </div>

      {/* seção: banner de doação */}
      <section className="relative bg-[#145A94] text-white py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
          
          <div className="flex-1 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-fredoka mb-4">
              Junte-se à nossa rede de carinho!
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-6 max-w-md mx-auto leading-relaxed">
             Compartilhe sua historia, ajude-nos a transformar a jornada de mais 
             crianças em aventuras cheia de alegria.
            </p>

            <button  className={styles.doacaoButton}>
              Faça uma doação!
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={doacaoImg}
              alt="imagem no banner de doação"
              className="absolute top-0 right-0 h-full object-cover max-w-none"
            />
          </div>
        </div>
      </section>

      {/* seção: onde levamos alegria */}
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#03184F] mb-4 font-fredoka">
        Onde levamos <span className="text-[#3184EF]">alegria</span>
      </h2>
      <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-12">
       Transformando quartos de hospitais em portais de esperança, aventura e cor.
      </p>
    </section>
    </MainLayout>
  );
}
