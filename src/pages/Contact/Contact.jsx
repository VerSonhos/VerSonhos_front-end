import MainLayout from "../../layouts/MainLayout";
import ImgEmail from '../../assets/images/img_email.png';
import ImgTelefone from '../../assets/images/img_telefone.png';
import ImgPing from '../../assets/images/img_ping.png';
import styles from './styles.module.css';

export default function Contact() {
  return (
    <MainLayout>
      {/* Onda decorativa superior */}
      <div className="relative top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(145%+1.3px)] h-[200px] transform rotate-y-180"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#7DE8AD]"
          ></path>
        </svg>
      </div>

      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="text-5xl font-bold mb-4 font-fredoka">
            Fale <span className="text-tertiary">Conosco!</span>
          </h1>
          <p className="text-gray-700 mb-8 leading-relaxed font-inter">
            Levar alegria e esperança é a nossa missão. Se você tem dúvidas,
            sugestões ou quer fazer parte dessa jornada mágica, entre em contato!
            Juntos, transformamos realidades.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3">
              <img src={ImgTelefone} alt="Telefone" className="w-8 h-8" />
              <p className="text-gray-800 text-inter">
                <strong>Telefone:</strong> 11 99999-0000
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src={ImgEmail} alt="E-mail" className="w-8 h-8" />
              <p className="text-gray-800 text-inter">
                <strong>E-mail:</strong> contato@versonhos.com.br
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src={ImgPing} alt="Endereço" className="w-8 h-8" />
              <p className="text-gray-800 text-inter">
                <strong>Endereço:</strong> Rua XXXXXXXX
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 font-fredoka">FAQ</h2>

            <details open className="mb-3 border-b border-gray-200 pb-2">
              <summary className="cursor-pointer font-medium text-gray-800 font-fredoka">
                Quem pode participar?
              </summary>
              <p className="mt-2 text-gray-600 font-inter">
                O projeto é voltado principalmente para crianças em tratamento hospitalar.
              </p>
            </details>

            <details className="mb-3 border-b border-gray-200 pb-2">
              <summary className="cursor-pointer font-medium text-gray-800 font-fredoka">
                Como funciona a experiência de realidade virtual?
              </summary>
              <p className="mt-2 text-gray-600 font-inter">
                A criança escolhe um sonho e, através da realidade virtual, vive uma experiência imersiva e personalizada.
              </p>
            </details>

            <details className="mb-3 border-b border-gray-200 pb-2">
              <summary className="cursor-pointer font-medium text-gray-800 font-fredoka">
                Como os hospitais podem participar?
              </summary>
              <p className="mt-2 text-gray-600 font-inter">
                Hospitais podem entrar em contato conosco para firmar parcerias e trazer o projeto às suas unidades.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6 font-fredoka">Envie uma mensagem:</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-inter"
            />
            <input
              type="tel"
              placeholder="Telefone"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-inter"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-inter"
            />
            <textarea
              rows="4"
              placeholder="Escreva aqui"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none font-inter"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 transition font-fredoka"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>

      

      
    </MainLayout>
  );
}
