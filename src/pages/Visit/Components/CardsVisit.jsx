import IconCadastre from '../../../assets/images/icon_cadastre.png';
import IconLogin from '../../../assets/images/icon_login.png';
import IconVisita from '../../../assets/images/icon_visita.png';

const MvvCard = ({ item }) => (
  <div
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

    <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center">
      {item.text}
    </p>
  </div>
);

export default function CardsVisit() {
  const data = [
    {
      title: "Cadastre-se",
      text: "Crie sua conta em poucos segundos! Basta informar seus dados básicos e o local onde deseja receber nossas visitas. Assim conseguimos organizar tudo com carinho e agilidade.",
      img: IconCadastre,
    },
    {
      title: "Faça login",
      text: "Acesse sua conta para acompanhar e gerenciar seus pedidos. Com o login, você pode visualizar suas visitas anteriores, ajustar informações e seguir para o agendamento de novas experiências.",
      img: IconLogin,
    },
    {
      title: "Agende sua visita",
      text: "Escolha o tipo de atividade, a data e o horário que melhor se encaixam na sua rotina. Nossa equipe confirma a disponibilidade e envia os detalhes por e-mail. Pronto — a alegria já tem hora marcada!",
      img: IconVisita,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#03184F] to-blue-800 text-white py-16 sm:py-20 font-fredoka">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl sm:text-5xl font-semibold mb-10 sm:mb-12">
          Agende uma <span className="text-blue-400">Visita</span>
        </h3>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-14">
          {data.map((item, i) => (
            <div key={i} className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] flex justify-center">
              <MvvCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
