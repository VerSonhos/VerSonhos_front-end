import DashboardLayout from "../../layouts/DashboardLayout";
import styles from "./styles.module.css";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

export default function HomeUserAgendamento() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-4 text-center">
          <h2 className={styles.welcomeTitle}>Agendar nova visita</h2>
          <p className={styles.welcomeDesc}>
            Escolha a data, horário e local da próxima visita para levar alegria e esperança às crianças hospitalizadas.
          </p>
        </div>

        <div className="flex justify-center items-start bg-gray-100 py-6">
          <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-6 border border-[#3184EF]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-2">
                <CalendarDays className="w-6 h-6 text-[#3184EF]" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Data da visita</label>
                  <input
                    type="date"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3184EF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Clock className="w-6 h-6 text-[#3184EF]" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Horário</label>
                  <input
                    type="time"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3184EF] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-2">
                <Users className="w-6 h-6 text-[#3184EF]" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Quantidade de pacientes</label>
                  <input
                    type="number"
                    placeholder="Ex: 10"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3184EF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Clock className="w-6 h-6 text-[#3184EF]" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Duração estimada</label>
                  <input
                    type="text"
                    placeholder="Ex: 1h30min"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3184EF] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <MapPin className="w-6 h-6 text-[#3184EF]" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Local da visita (Hospital)</label>
                <input
                  type="text"
                  placeholder="Ex: Hospital Santa Luzia"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3184EF] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Observações</label>
              <textarea
                rows="6"
                placeholder="Ex: Levar óculos extras, confirmar transporte..."
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3184EF] focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3184EF] hover:bg-[#256bd1] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 cursor-pointer"
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
