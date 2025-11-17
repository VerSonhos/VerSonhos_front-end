import DashboardLayout from "../../layouts/DashboardLayout";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";

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
        CPF do responsável
      </label>

      <div
        className={`
          flex items-center gap-2 border rounded-lg px-4 py-3 transition-all duration-300
          ${focused ? "border-[#3184EF] ring-2 ring-[#3184EF]/40" : "border-slate-300 hover:border-slate-400"}
        `}
      >
        <Users
          className={`w-5 h-5 transition-colors duration-300 ${
            focused ? "text-[#3184EF]" : "text-slate-400"
          }`}
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


export default function HomeUserAgendamento() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#0B2149]">Agendar nova visita</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Escolha a data horário e local da próxima visita para levar alegria e esperança às crianças hospitalizadas
          </p>
        </div>

        <form className="space-y-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data da visita</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 transition-all hover:border-slate-400 focus-within:ring-2 focus-within:ring-[#3184EF]/40 focus-within:border-[#3184EF]">
                <CalendarDays className="w-5 h-5 text-slate-400" />
                <input type="date" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 transition-all hover:border-slate-400 focus-within:ring-2 focus-within:ring-[#3184EF]/40 focus-within:border-[#3184EF]">
                <Clock className="w-5 h-5 text-slate-400" />
                <input type="time" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local da visita (Hospital)</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 transition-all hover:border-slate-400 focus-within:ring-2 focus-within:ring-[#3184EF]/40 focus-within:border-[#3184EF]">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Ex: Hospital Santa Luzia" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duração estimada</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 transition-all hover:border-slate-400 focus-within:ring-2 focus-within:ring-[#3184EF]/40 focus-within:border-[#3184EF]">
                <Clock className="w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Ex: 1h30min" className="w-full outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de pacientes</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 transition-all hover:border-slate-400 focus-within:ring-2 focus-within:ring-[#3184EF]/40 focus-within:border-[#3184EF]">
                <Users className="w-5 h-5 text-slate-400" />
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
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none transition-all hover:border-slate-400 focus:ring-2 focus:ring-[#3184EF]/40 focus:border-[#3184EF]"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#3184EF] hover:bg-[#256bd1] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 cursor-pointer"
            >
              Confirmar Agendamento
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
