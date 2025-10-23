import DashboardLayout from "../../layouts/DashboardLayout";
import styles from "./styles.module.css";
import iconCalendar from "../../assets/icons/icon-agenda.png"

export default function HomeUser() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Home</h1>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition w-fit mt-2 hover:scale-105 cursor-pointer">
            <img
              src={iconCalendar}
              alt="Ícone de calendário"
              className="w-5 h-5"
            />
            Faça um agendamento
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#03184F]">
            Que bom ter você aqui, <span>Lucas</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Que tal espalhar mais alegria hoje? Veja suas próximas visitas e
            inspire novos sorrisos.
          </p>
        </div>

        {/* seção de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div
            className={`${styles.card} bg-white shadow rounded-lg border hover:shadow-md transition`}
          >
            <div className="flex items-start gap-4 text-left h-40 p-5">
              <div className="text-blue-500 text-5xl flex-shrink-0">📅</div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#03184F] text-lg mb-1">
                    Realizar agendamento
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Escolha o dia e o horário desejado.
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition w-fit mt-2 hover:scale-105 cursor-pointer">
                  Agendar
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`${styles.card} bg-white shadow rounded-lg border hover:shadow-md transition`}
          >
            <div className="flex items-start gap-4 text-left h-40 p-5">
              <div className="text-blue-500 text-5xl flex-shrink-0">🗓️</div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#03184F] text-lg mb-1">
                    Acompanhe seus agendamentos
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Veja os agendamentos confirmados.
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition w-fit mt-2 hover:scale-105 cursor-pointer">
                  Ver mais
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={`${styles.card} bg-white shadow rounded-lg border hover:shadow-md transition`}
          >
            <div className="flex items-start gap-4 text-left h-40 p-5">
              <div className="text-blue-500 text-5xl flex-shrink-0">📖</div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#03184F] text-lg mb-1">
                    Veja o histórico
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Veja todas as solicitações de uma visita.
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition w-fit mt-2 hover:scale-105 cursor-pointer">
                  Ver mais
                </button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div
            className={`${styles.card} bg-white shadow rounded-lg border hover:shadow-md transition`}
          >
            <div className="flex items-start gap-4 text-left h-40 p-5">
              <div className="text-blue-500 text-5xl flex-shrink-0">⚙️</div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#03184F] text-lg mb-1">
                    Configurações
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Gerencie sua conta e preferências.
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition w-fit mt-2 hover:scale-105 cursor-pointer">
                  Ver mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
