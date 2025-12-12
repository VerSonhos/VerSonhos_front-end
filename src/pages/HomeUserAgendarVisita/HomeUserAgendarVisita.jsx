import DashboardLayoutUser from "../../layouts/DashboardLayoutUser";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import iconAgendamento from "../../assets/icons/icon-agenda.png";

// =======================================================
// CPFInput Componente de Máscara
// =======================================================
function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function CPFInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  function handleChange(e) {
    onChange(maskCPF(e.target.value));
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
          required
        />
      </div>
    </div>
  );
}

// =======================================================
// COMPONENTE PRINCIPAL
// =======================================================
export default function HomeUserAgendarVisita() {
  const [formData, setFormData] = useState({
    data: "",
    horario: "",
    local: "",
    pacientes: "",
    cpfResponsavel: "",
    observacoes: "",
  });

  const [duracaoEstimada, setDuracaoEstimada] = useState("");

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [successModal, setSuccessModal] = useState(false); // MODAL DE SUCESSO

  const multaPercentual = "30%";
  const prazoCancelamento = "48 horas";

  const openTermsModal = () => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 20);
  };

  const closeTermsModal = () => {
    setIsVisible(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setIsMounted(false), 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDuracaoChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    if (valor.length > 4) valor = valor.slice(0, 4);

    const h = valor.slice(0, 2);
    const m = valor.slice(2, 4);

    if (valor.length <= 2) {
      setDuracaoEstimada(`${h}h`);
    } else {
      setDuracaoEstimada(`${h}h${m}`);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    openTermsModal();
  };

  const handleConfirmAndAccept = () => {
    const dataToSend = { ...formData, duracao: duracaoEstimada };

    console.log("Enviando agendamento:", dataToSend);

    closeTermsModal();

    // 🔥 RESET COMPLETO DO FORMULÁRIO 🔥
    setFormData({
      data: "",
      horario: "",
      local: "",
      pacientes: "",
      cpfResponsavel: "",
      observacoes: "",
    });

    setDuracaoEstimada("");

    // Abrir modal de sucesso
    setSuccessModal(true);
  };

  // =======================================================
  // MODAL DE TERMOS
  // =======================================================
  const TermsModal = () =>
    isMounted && (
      <div
        onClick={closeTermsModal}
        className={`
          fixed inset-0 bg-black/50 flex items-center justify-center 
          z-[9999] transition-opacity duration-300 p-2 sm:p-4
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl relative
            transform transition-all duration-300
            ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          `}
        >
          <button
            onClick={closeTermsModal}
            className="absolute right-4 top-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
          >
            ×
          </button>

          <h2 className="text-xl font-bold text-center mb-4 text-red-600">
            Atenção: Termos de Cancelamento
          </h2>

          <div className="space-y-4 text-sm sm:text-base">
            <p className="text-gray-700">
              Ao confirmar esta solicitação, você concorda com a política de cancelamento da{" "}
              <span className="font-bold text-quintenary">VerSonhos</span>.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="font-semibold text-red-700 mb-2">Multa por cancelamento:</p>
              <p className="text-red-800">
                Cancelamentos com menos de <b>{prazoCancelamento}</b> terão multa de <b>{multaPercentual}</b>.
              </p>
            </div>

            <p className="font-semibold text-gray-700">
              Ao confirmar, você declara estar ciente e de acordo.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t flex justify-end gap-3">
            <button
              onClick={closeTermsModal}
              className="py-2 px-4 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400"
            >
              Voltar
            </button>
            <button
              onClick={handleConfirmAndAccept}
              className="py-2 px-4 rounded-lg text-white font-bold bg-tertiary hover:bg-[#256bd1]"
            >
              Confirmar e Aceitar Termos
            </button>
          </div>
        </div>
      </div>
    );

  // =======================================================
  // MODAL DE SUCESSO
  // =======================================================
  const SuccessModal = () =>
    successModal && (
      <div
        onClick={() => setSuccessModal(false)}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white px-8 py-6 w-full max-w-sm rounded-xl shadow-xl text-center animate-[fadeIn_0.3s_ease-out]"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Agendamento realizado!
          </h2>

          <p className="text-gray-700 mb-6">
            Sua solicitação foi enviada com sucesso.
          </p>

          <button
            onClick={() => setSuccessModal(false)}
            className="bg-tertiary text-white py-2 px-6 rounded-lg hover:bg-[#256bd1] transition"
          >
            Fechar
          </button>
        </div>
      </div>
    );

  // =======================================================
  // RENDER
  // =======================================================
  return (
    <DashboardLayoutUser>
      <div className="p-4 sm:p-6 mx-auto">
        <section className="w-full font-inter flex flex-col gap-5 mb-10">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            <h1 className="text-2xl font-semibold">Agendar nova visita</h1>

            <Link
              to="/statusAgendamento"
              className="flex items-center gap-2 bg-tertiary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer justify-center"
            >
              <img src={iconAgendamento} className="w-5 h-5" />
              Veja seus agendamentos
            </Link>
          </div>

          <p className="text-xl text-black-custom-400 font-semibold mt-2">
            Escolha a data, horário e local da próxima visita.
          </p>
        </section>

        <form onSubmit={handleSubmitForm} className="space-y-8 p-10 shadow-custom-sm rounded-md">
          <h2 className="text-3xl text-center font-semibold text-quintenary">
            Preencha o formulário
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data da visita
              </label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 focus-within:ring-2 focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <CalendarDays className="w-5 h-5 text-slate-400 group-focus-within:text-tertiary" />
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Horário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 focus-within:ring-2 focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <Clock className="w-5 h-5 text-slate-400 group-focus-within:text-tertiary" />
                <input
                  type="time"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Local */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local da visita (Hospital)
              </label>

              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 focus-within:ring-2 focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <MapPin className="w-5 h-5 text-slate-400 group-focus-within:text-tertiary" />
                <input
                  type="text"
                  name="local"
                  value={formData.local}
                  onChange={handleInputChange}
                  placeholder="Ex: Hospital Santa Luzia"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Duração estimada
  </label>

  <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 focus-within:ring-2 focus-within:ring-tertiary/40 focus-within:border-tertiary group">
    <Clock className="w-5 h-5 text-slate-400 group-focus-within:text-tertiary" />

    <input
      type="time"
      name="duracao"
      value={duracaoEstimada}
      onChange={(e) => setDuracaoEstimada(e.target.value)}
      className="w-full outline-none bg-transparent"
      required
    />
  </div>
            </div>

            {/* Pacientes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade de pacientes
              </label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-3 hover:border-slate-400 focus-within:ring-2 focus-within:ring-tertiary/40 focus-within:border-tertiary group">
                <Users className="w-5 h-5 text-slate-400 group-focus-within:text-tertiary" />
                <input
                  type="number"
                  name="pacientes"
                  value={formData.pacientes}
                  onChange={handleInputChange}
                  placeholder="Ex: 10"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* CPF */}
            <CPFInput
              value={formData.cpfResponsavel}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, cpfResponsavel: value }))
              }
            />
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea
              rows="6"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              placeholder="Ex: Levar óculos extras, confirmar transporte..."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none hover:border-slate-400 focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-tertiary hover:bg-[#256bd1] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
            >
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>

      {/* Modais */}
      <TermsModal />
      <SuccessModal />
    </DashboardLayoutUser>
  );
}
