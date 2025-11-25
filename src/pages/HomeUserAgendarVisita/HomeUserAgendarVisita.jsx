import DashboardLayout from "../../layouts/DashboardLayout";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import iconAgendamento from "../../assets/icons/icon-agenda.png";

function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function CPFInput() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(maskCPF(e.target.value));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        CPF do responsável pelo agendamento
      </label>

      <div
        className={`
          flex items-center gap-2 border rounded-lg px-4 py-3 transition-all duration-300 group
          ${focused ? "border-tertiary ring-2 ring-tertiary/40" : "border-slate-300 hover:border-slate-400"}
        `}
      >
        <Users
          className={`w-5 h-5 transition-colors duration-300
            ${focused ? "text-tertiary" : "text-slate-400 group-focus-within:text-tertiary"}
          `}
        />

        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full outline-none bg-transparent"
          placeholder="Ex: 123.456.789-00"
        />
      </div>
    </div>
  );
}

export default function HomeUserAgendarVisita() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 mx-auto">
        <section className='w-full font-inter flex flex-col gap-5 mb-10'>
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                <h1 className="text-2xl font-semibold">Agendar nova visita</h1>

                <Link
                    to={'/statusAgendamento'}
                    className="flex items-center gap-2 bg-tertiary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                >
                    <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                    Veja seus agendamentos
                </Link>
            </div>

            <p className='text-xl text-black-custom-400 font-semibold mt-2'>Escolha a data horário e local da próxima visita para a <span className='font-bold text-quintenary'>VerSonhos</span> levar alegria e esperança às crianças hospitalizadas.</p>
        </section>

        <form className="space-y-8 p-10 shadow-custom-sm rounded-md">
          <h2 className="text-3xl text-center font-semibold text-quintenary">Preencha o formulário</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data da visita</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 
                              transition-all hover:border-slate-400 focus-within:ring-2 
                              focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <CalendarDays className="w-5 h-5 text-slate-400 transition-colors group-focus-within:text-tertiary" />
                <input type="date" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 
                              transition-all hover:border-slate-400 focus-within:ring-2 
                              focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <Clock className="w-5 h-5 text-slate-400 transition-colors group-focus-within:text-tertiary" />
                <input type="time" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local da visita (Hospital)</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 
                              transition-all hover:border-slate-400 focus-within:ring-2 
                              focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <MapPin className="w-5 h-5 text-slate-400 transition-colors group-focus-within:text-tertiary" />
                <input type="text" placeholder="Ex: Hospital Santa Luzia" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duração estimada</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 
                              transition-all hover:border-slate-400 focus-within:ring-2 
                              focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <Clock className="w-5 h-5 text-slate-400 transition-colors group-focus-within:text-tertiary" />
                <input type="text" placeholder="Ex: 1h30min" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de pacientes</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 
                              transition-all hover:border-slate-400 focus-within:ring-2 
                              focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <Users className="w-5 h-5 text-slate-400 transition-colors group-focus-within:text-tertiary" />
                <input type="number" placeholder="Ex: 10" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <CPFInput />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea
              rows="6"
              placeholder="Ex: Levar óculos extras, confirmar transporte..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none transition-all 
                         hover:border-slate-400 focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-tertiary hover:bg-[#256bd1] text-white font-semibold py-3 px-8 
                         rounded-lg shadow-md transition duration-200 cursor-pointer"
            >
              Confirmar Agendamento
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
