import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.css";
import fundoHero from "../../assets/images/fundoHero.png"; 

export default function Home() {
  return (
    <MainLayout>
      {/* Home */}
      <section
        className="relative w-full h-[90vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fundoHero})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
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
          <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition">
            <img
              src="/images/vr-experience.jpg"
              alt="A Experiência de Imersão e Evasão"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                A Experiência de Imersão e Evasão
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Levamos mundos inteiros para dentro dos quartos de hospital.
                Nossos óculos de Realidade Virtual transportam crianças para
                lugares mágicos e cheios de aventuras.
              </p>
            </div>
          </div>

          {/* card 2 */}
          <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition">
            <img
              src="/images/family-smile.jpg"
              alt="Promovendo a Alegria e Esperança"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Promovendo a Alegria e Esperança
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nosso foco é inspirar e renovar emocionalmente. Acreditamos que
                alegria e esperança ajudam no bem-estar e na recuperação.
              </p>
            </div>
          </div>

          {/* card 3 */}
          <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden w-full md:w-1/3 hover:shadow-lg transition">
            <img
              src="/images/doctors-team.jpg"
              alt="De Cuidado ao Cuidado Humanizado"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                De Cuidado ao Cuidado Humanizado
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tudo é feito para alinhar diversão com segurança. Nossas
                experiências VR são criadas junto a profissionais da saúde e
                psicólogos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
