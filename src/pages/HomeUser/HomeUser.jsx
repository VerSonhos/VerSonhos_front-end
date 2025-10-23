import DashboardLayout from "../../layouts/DashboardLayout";
import styles from "./styles.module.css";
import iconCalendar from "../../assets/icons/icon-agenda.png";

export default function HomeUser() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl font-semibold">Home</h1>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center">
            <img
              src={iconCalendar}
              alt="Ícone de calendário"
              className="w-5 h-5"
            />
            Faça um agendamento
          </button>
        </div>

        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#03184F]">
            Que bom ter você aqui, <span>Lucas</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Que tal espalhar mais alegria hoje? Veja suas próximas visitas e
            inspire novos sorrisos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Estilos dos cards*/}
          {[
            {
              emoji: "📅",
              title: "Realizar agendamento",
              desc: "Escolha o dia e o horário desejado.",
              button: "Agendar",
            },
            {
              emoji: "🗓️",
              title: "Acompanhe seus agendamentos",
              desc: "Veja os agendamentos confirmados.",
              button: "Ver mais",
            },
            {
              emoji: "📖",
              title: "Veja o histórico",
              desc: "Veja todas as solicitações de uma visita.",
              button: "Ver mais",
            },
            {
              emoji: "⚙️",
              title: "Configurações",
              desc: "Gerencie sua conta e preferências.",
              button: "Ver mais",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`${styles.card} bg-white shadow rounded-lg border hover:shadow-md transition`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-left p-5 h-auto sm:h-40">
                <div className="text-blue-500 text-5xl flex-shrink-0">
                  {card.emoji}
                </div>
                <div className="flex flex-col justify-between text-center sm:text-left w-full">
                  <div>
                    <h3 className="font-semibold text-[#03184F] text-lg mb-1">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{card.desc}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition w-full sm:w-fit mt-3 hover:scale-105 cursor-pointer">
                    {card.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
