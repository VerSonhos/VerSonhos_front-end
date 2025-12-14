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
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 20);
  };

  const fecharModal = () => {
    setIsVisible(false);
    document.body.style.overflow = "unset";
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

  const StatusBadge = ({ status }) => (
    <span
      className={`text-white px-3 py-1 rounded-full text-xs sm:text-sm ${corStatus[status]}`}
    >
      {status}
    </span>
  );

  return (
    <div className="p-4 sm:p-6 bg-transparent">

      {/* Tabela telas grandes */}
      <div className="hidden sm:block overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md font-fredoka">
          <thead className="bg-thirteenth-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-base">ID</th>
              <th className="py-3 px-4 text-left text-base">Empresa</th>
              <th className="py-3 px-4 text-left text-base">Data</th>
              <th className="py-3 px-4 text-left text-base">Status</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>

          <tbody>
            {dadosExemplo.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4 text-base">{item.id}</td>
                <td className="py-3 px-4 text-base">{item.empresa}</td>
                <td className="py-3 px-4 text-base">{item.data}</td>

                <td className="py-3 px-4">
                  <StatusBadge status={item.status} />
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

      {/* Cards telas pequenas */}
      <div className="sm:hidden space-y-4 font-fredoka">
        {dadosExemplo.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm xs:text-base font-bold text-thirteenth-500 break-words">
                {item.empresa}
              </span>

              <button
                onClick={() => abrirModal(item)}
                className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
              >
                <FaEllipsisV size={18} />
              </button>
            </div>

            <div className="text-xs xs:text-sm space-y-1">
              <p>
                <span className="font-semibold text-gray-700">ID:</span> {item.id}
              </p>

              <p>
                <span className="font-semibold text-gray-700">Data:</span> {item.data}
              </p>
            </div>

            <div className="mt-3">
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isMounted && (
        <div
          onClick={fecharModal}
          className={`
            fixed inset-0 
            bg-black/50
            flex items-center justify-center 
            z-[9999] transition-opacity duration-300 
            p-2 sm:p-4
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              bg-white w-full max-w-xs sm:max-w-md 
              max-h-[90vh] overflow-y-auto
              p-4 sm:p-6 rounded-xl shadow-2xl relative
              transform transition-all duration-300
              ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
            `}
          >
            <button
              onClick={fecharModal}
              className="absolute right-4 top-4 text-2xl font-bold text-gray-600 hover:text-gray-900 transition"
            >
              ×
            </button>

            <h2 className="text-lg sm:text-xl font-bold text-center mb-4 text-thirteenth-500 break-words">
              Detalhes da Solicitação {itemSelecionado?.id}
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Hospital/Empresa</p>
                <p className="text-gray-900 break-words">{itemSelecionado?.empresa}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Endereço</p>
                <p className="text-gray-900 break-words">{itemSelecionado?.endereco}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Data e Horário</p>
                <p className="text-gray-900">
                  {itemSelecionado?.data} - {itemSelecionado?.horario}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 text-center">
              <p className="font-semibold text-gray-700 text-sm mb-2">Status Atual</p>
              <StatusBadge status={itemSelecionado?.status} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
