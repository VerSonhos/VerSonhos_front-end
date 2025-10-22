import IconCadastre from '../../../assets/images/icon_cadastre.png';
import IconLogin from '../../../assets/images/icon_login.png';
import IconVisita from '../../../assets/images/icon_visita.png';

const MvvCard = ({ item }) => (
    <div
      className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 h-110 flex flex-col items-center justify-start hover:scale-105 transition-transform duration-300 border-tertiary border-3">
      <div className="w-64 h-64 mb-4 flex items-center justify-center">
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
    <section className="bg-gradient-to-r from-[#03184F] to-blue-800 text-white py-20 font-fredoka">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-5xl font-semibold mb-12">
          Agende uma <span className="text-blue-400">Visita</span>
        </h3>

        <div className="flex flex-wrap justify-center gap-14">
          {data.map((item, i) => (
            <div
              key={i}
              className="w-full lg:w-[30%] max-w-xs"
            >
              <MvvCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}