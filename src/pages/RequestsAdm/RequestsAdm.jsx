import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 


const dadosExemplo = [
    { id: 1, empresa: "Hospital Central", data: "2025-11-20", status: "Pendente", endereco: "Rua A, 123", horario: "10:00" },
    { id: 2, empresa: "Clínica Saúde Já", data: "2025-11-19", status: "Pendente", endereco: "Av. B, 456", horario: "14:30" },
    { id: 3, empresa: "Posto de Atendimento", data: "2025-11-18", status: "Pendente", endereco: "Praça C, 789", horario: "08:00" },
];

const corStatus = {
    "Pendente": "bg-yellow-500",
    "Confirmado": "bg-green-500",
    "Recusado": "bg-red-500",
};

const SimpleCalendar = ({ dadosEventos }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); 

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const temEvento = (dia) => {
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const mesFormatado = (month + 1) < 10 ? `0${month + 1}` : month + 1;
    const dataString = `${year}-${mesFormatado}-${diaFormatado}`;
    const eventosDoDia = dadosEventos.filter(d => d.data === dataString);
    return eventosDoDia.length > 0 ? "bg-thirteenth-500" : null;
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-14"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const marcadorClass = temEvento(d);
      days.push(
        <div key={d} className={`relative flex flex-col items-center justify-center h-10 sm:h-14 rounded-lg cursor-pointer hover:bg-gray-100 transition ${isToday ? 'bg-blue-50 border border-blue-200 font-bold text-blue-600' : 'text-gray-700'}`}>
          <span className="text-sm sm:text-base">{d}</span>
          {marcadorClass && <span className={`absolute bottom-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${marcadorClass}`}></span>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 font-fredoka">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-thirteenth-500 capitalize">{meses[month]} {year}</h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><FaChevronLeft /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><FaChevronRight /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center mb-2">
        {diasSemana.map(dia => <div key={dia} className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">{dia}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};


export default function RequestsAdm() {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [tabelaData, setTabelaData] = useState(dadosExemplo);

    useEffect(() => { setIsMounted(true); }, []);

    const abrirModal = (item) => {
        setItemSelecionado(item);
        setIsVisible(true);
    };

    const fecharModal = () => {
        setIsVisible(false);
        setTimeout(() => setItemSelecionado(null), 300); 
    };

    const handleStatusChange = (newStatus) => {
        if (!itemSelecionado) return;
        const itemIndex = tabelaData.findIndex(item => item.id === itemSelecionado.id);
        if (itemIndex > -1) {
            const novaTabelaData = [...tabelaData];
            novaTabelaData[itemIndex] = { ...novaTabelaData[itemIndex], status: newStatus };
            setTabelaData(novaTabelaData);
            setItemSelecionado(novaTabelaData[itemIndex]);
        }
        fecharModal();
    };

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6 bg-transparent">

               
                <SimpleCalendar dadosEventos={tabelaData} />

                
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
                            {tabelaData.map((item, i) => (
                                <tr key={i} className="border-b hover:bg-gray-100 transition">
                                    <td className="py-3 px-4 text-md sm:text-base">{item.id}</td>
                                    <td className="py-3 px-4 text-md sm:text-base">{item.empresa}</td>
                                    <td className="py-3 px-4 text-md sm:text-base">{item.data}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-white px-3 py-1 rounded-full text-xs sm:text-sm ${corStatus[item.status] || 'bg-gray-400'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button onClick={() => abrirModal(item)} className="p-2 hover:bg-gray-200 rounded-full">
                                            <FaEllipsisV size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                {isMounted && itemSelecionado && (
                    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 p-4 ${isVisible ? "opacity-100" : "opacity-0"}`} onClick={fecharModal}>
                        <div className={`bg-white w-11/12 sm:w-96 max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-xl shadow-xl relative transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
                            <button onClick={fecharModal} className="absolute right-4 top-4 text-xl font-bold text-thirteenth-500 hover:text-gray-700 cursor-pointer">×</button>
                            <h2 className="text-lg sm:text-xl font-bold text-center mb-4 text-thirteenth-500">Solicitação {itemSelecionado.id}</h2>
                            <div className="mb-3 text-sm sm:text-base">
                                <p className="font-semibold text-gray-700">Hospital</p><p>{itemSelecionado.empresa}</p>
                            </div>
                            <div className="mb-3 text-sm sm:text-base">
                                <p className="font-semibold text-gray-700">Endereço</p><p>{itemSelecionado.endereco}</p>
                            </div>
                            <div className="mb-3 text-sm sm:text-base">
                                <p className="font-semibold text-gray-700">Data e horário</p><p>{itemSelecionado.data} - {itemSelecionado.horario}</p>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2.5">Status Atual</p>
                                <span className={`text-white px-4 py-2 rounded-full text-xs sm:text-sm ${corStatus[itemSelecionado.status] || 'bg-gray-400'}`}>{itemSelecionado.status}</span>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                                <p className="font-semibold text-gray-700 text-sm sm:text-base mb-3">Mudar status:</p>
                                <div className="flex justify-center space-x-4">
                                    <button onClick={() => handleStatusChange("Confirmado")} className="py-2 px-4 rounded-lg text-white font-bold transition-colors duration-200 bg-green-500 hover:bg-green-600">Confirmar</button>
                                    <button onClick={() => handleStatusChange("Recusado")} className="py-2 px-4 rounded-lg text-white font-bold transition-colors duration-200 bg-red-500 hover:bg-red-600">Recusar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}