import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const dadosExemplo = [
  {
    id: "#157",
    empresa: "AACD",
    data: "20/03/25",
    status: "Expirada",
    endereco: "Av. Professor Ascendino Reis, 724",
    horario: "14:00"
  },
  {
    id: "#980",
    empresa: "Hospital do Câncer",
    data: "29/02/25",
    status: "Recusado",
    endereco: "Av. Paulista, 1000",
    horario: "10:30"
  },
  {
    id: "#444",
    empresa: "Hospital do Guilherme Amado",
    data: "14/12/25",
    status: "Cancelada",
    endereco: "Av. Paulista, 1000",
    horario: "10:30"
  },
  {
    id: "#333",
    empresa: "Casa do seu zé",
    data: "14/06/25",
    status: "Concluída",
    endereco: "Vila do talarico, 666",
    horario: "10:30"
  }
];

export default function TableAgendamento() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const abrirModal = (item) => {
    setItemSelecionado(item);
    setIsMounted(true);
    setTimeout(() => setIsVisible(true), 20);
  };

  const fecharModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      setItemSelecionado(null);
    }, 300);
  };

  const corStatus = {
    Expirada: "bg-tertiary",
    Recusado: "bg-red-500",
    Concluída: "bg-green-500",
    Cancelada: "bg-red-500"
  };

  return (
    <div className="p-4 sm:p-6 bg-transparent">

      {/* ======================= TABELA RESPONSIVA ========================== */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md font-fredoka">
          <thead className="bg-thirteenth-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm sm:text-base">ID</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Empresa</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Data</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Status</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>

          <tbody>
            {dadosExemplo.map((item, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4 text-md sm:text-base">{item.id}</td>
                <td className="py-3 px-4 text-md sm:text-base">{item.empresa}</td>
                <td className="py-3 px-4 text-md sm:text-base">{item.data}</td>

                <td className="py-3 px-4">
                  <span
                    className={`
                      text-white px-3 py-1 rounded-full text-xs sm:text-sm
                      ${corStatus[item.status]}
                    `}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => abrirModal(item)}
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    <FaEllipsisV size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======================= MODAL SUPER TRANSPARENTE ========================== */}
      {isMounted && (
        <div
          className={`
            fixed inset-0 
            bg-black/50      /* <<< ESSA É A OPACIDADE SUPER FRACA MESMO */
            flex items-center justify-center 
            z-50 transition-opacity duration-300 p-4
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className={`
              bg-white w-11/12 sm:w-96 max-h-[90vh] overflow-y-auto
              p-4 sm:p-6 rounded-xl shadow-xl relative
              transform transition-all duration-300
              ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
            `}
          >
            {/* Botão fechar */}
            <button
              onClick={fecharModal}
              className="absolute right-4 top-4 text-xl font-bold text-thirteenth-500 cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
              Solicitação {itemSelecionado?.id}
            </h2>

            <div className="mb-3 text-sm sm:text-base">
              <p className="font-semibold text-gray-700">Hospital</p>
              <p>{itemSelecionado?.empresa}</p>
            </div>

            <div className="mb-3 text-sm sm:text-base">
              <p className="font-semibold text-gray-700">Endereço</p>
              <p>{itemSelecionado?.endereco}</p>
            </div>

            <div className="mb-3 text-sm sm:text-base">
              <p className="font-semibold text-gray-700">Data e horário</p>
              <p>{itemSelecionado?.data} - {itemSelecionado?.horario}</p>
            </div>

            <div className="mt-4 text-center">
              <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2.5">Status</p>
              <span
                className={`
                  text-white px-4 py-2 rounded-full text-xs sm:text-sm
                  ${corStatus[itemSelecionado?.status]}
                `}
              >
                {itemSelecionado?.status}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
