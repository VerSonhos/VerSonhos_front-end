import DashboardLayoutAdmin from '@/layouts/DashboardLayoutAdmin'
import React, { useState, useEffect, useMemo } from "react";
import { FaEllipsisV, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import { Link } from "react-router-dom";

// Dados de Exemplo
const dadosExemplo = [
    { id: "#101", empresa: "Hospital Central", data: "2025-12-15", status: "Pendente", endereco: "Rua A, 123", horario: "10:00" },
    { id: "#102", empresa: "Clínica Saúde Já", data: "2025-12-16", status: "Pendente", endereco: "Av. B, 456", horario: "14:30" },
    { id: "#103", empresa: "Posto de Atendimento", data: "2025-12-17", status: "Confirmado", endereco: "Praça C, 789", horario: "08:00" },
    { id: "#104", empresa: "Clínica Visão Clara", data: "2025-12-18", status: "Recusado", endereco: "Rua D, 500", horario: "11:00" },
    { id: "#105", empresa: "Hospital Regional", data: "2025-12-20", status: "Pendente", endereco: "Av. Principal, 10", horario: "15:00" },
];

const corStatus = {
    "Pendente": "bg-yellow-500",
    "Confirmado": "bg-green-500",
    "Recusado": "bg-red-500",
    "Expirada": "bg-tertiary", 
    "Concluída": "bg-green-500",
    "Cancelada": "bg-red-500",
};

const StatusBadge = ({ status }) => (
    <span
        className={`text-white px-3 py-1 rounded-full text-xs sm:text-sm ${corStatus[status] || 'bg-gray-400'}`}
    >
        {status}
    </span>
);

const SimpleCalendar = ({ dadosEventos }) => {
    const [currentDate, setCurrentDate] = useState(new Date()); 

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
        
        const eventosVisiveis = dadosEventos.filter(d => 
            d.data === dataString && (d.status === "Pendente" || d.status === "Confirmado")
        );

        if (eventosVisiveis.length === 0) {
            return null;
        }

        const isConfirmado = eventosVisiveis.some(d => d.status === "Confirmado");

        return isConfirmado ? corStatus["Confirmado"] : corStatus["Pendente"];
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
    
    // Novo estado para os filtros
    const [filterTerm, setFilterTerm] = useState({
        searchText: '',
        status: 'Todos',
        date: '',
    });

    useEffect(() => { setIsMounted(true); }, []);

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

    // Função principal de filtragem
    const filteredData = useMemo(() => {
        return tabelaData.filter(item => {
            const searchLower = filterTerm.searchText.toLowerCase();
            
            // 1. Filtrar por Status
            if (filterTerm.status !== 'Todos' && item.status !== filterTerm.status) {
                return false;
            }

            // 2. Filtrar por Data
            // Assumimos que a data na tabela é 'YYYY-MM-DD' para corresponder ao input type="date"
            if (filterTerm.date && item.data !== filterTerm.date) {
                return false;
            }

            // 3. Filtrar por Texto (ID ou Empresa)
            if (searchLower) {
                const matchesId = item.id.toLowerCase().includes(searchLower);
                const matchesEmpresa = item.empresa.toLowerCase().includes(searchLower);
                if (!matchesId && !matchesEmpresa) {
                    return false;
                }
            }

            return true;
        });
    }, [tabelaData, filterTerm]);


    return (
        <DashboardLayoutAdmin>
            <div className="p-4 sm:p-6 bg-transparent">
                <section className='w-full font-inter flex flex-col gap-5 mb-10'>
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                        <h1 className="text-2xl font-semibold">Situação de solicitações de agendamento</h1>

                        <Link
                            to={'/historicoAgendamentoAdm'}
                            className="flex items-center gap-2 bg-quintenary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                        >
                            <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                            Veja o histórico de agendamentos
                        </Link>
                    </div>

                    <p className='text-xl text-black-custom-400 font-semibold mt-2'>Gerencie as solicitações de agendamento da <span className='font-bold text-quintenary'>VerSonhos</span>.</p>
                </section>
                
                <SimpleCalendar dadosEventos={tabelaData} />
                
                {/* --- Seção de Filtros Adicionada --- */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 font-fredoka">
                    <h3 className="text-lg font-bold text-thirteenth-500 mb-4">Filtrar Agendamentos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* 1. Filtro por ID / Empresa */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar (ID ou Empresa)</label>
                            <input
                                type="text"
                                placeholder="Buscar por ID ou Empresa"
                                value={filterTerm.searchText}
                                onChange={(e) => setFilterTerm({...filterTerm, searchText: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-thirteenth-500 focus:border-thirteenth-500"
                            />
                        </div>

                        {/* 2. Filtro por Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filterTerm.status}
                                onChange={(e) => setFilterTerm({...filterTerm, status: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-thirteenth-500 focus:border-thirteenth-500 bg-white"
                            >
                                <option value="Todos">Todos</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Confirmado">Confirmado</option>
                                <option value="Recusado">Recusado</option>
                            </select>
                        </div>
                        
                        {/* 3. Filtro por Data */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <input
                                type="date"
                                value={filterTerm.date}
                                onChange={(e) => setFilterTerm({...filterTerm, date: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-thirteenth-500 focus:border-thirteenth-500"
                            />
                        </div>
                    </div>
                </div>
                {/* --- Fim da Seção de Filtros --- */}


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
                            {/* Usa dados filtrados */}
                            {filteredData.length > 0 ? (
                                filteredData.map((item, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-100 transition">
                                        <td className="py-3 px-4 text-base">{item.id}</td>
                                        <td className="py-3 px-4 text-base">{item.empresa}</td>
                                        <td className="py-3 px-4 text-base">{item.data}</td>
                                        <td className="py-3 px-4">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <button onClick={() => abrirModal(item)} className="p-2 hover:bg-gray-200 rounded-full">
                                                <FaEllipsisV size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">
                                        Nenhum agendamento encontrado com os filtros selecionados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Cards telas pequenas */}
                <div className="sm:hidden space-y-4 font-fredoka">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, i) => (
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
                        ))
                    ) : (
                        <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
                            Nenhum agendamento encontrado com os filtros selecionados.
                        </div>
                    )}
                </div>

                
                {/* Modal (Mantém funcionalidade de alteração de status) */}
                {isMounted && itemSelecionado && (
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
                            
                            {/* Botões de Ação */}
                            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                                <p className="font-semibold text-gray-700 text-sm sm:text-base mb-3">Mudar status para:</p>
                                <div className="flex justify-center space-x-2 sm:space-x-4">
                                    <button 
                                        onClick={() => handleStatusChange("Confirmado")} 
                                        className="py-2 px-3 sm:px-4 rounded-lg text-white font-bold transition-colors duration-200 bg-green-500 hover:bg-green-600 text-xs sm:text-sm"
                                    >
                                        Confirmar
                                    </button>
                                    <button 
                                        onClick={() => handleStatusChange("Recusado")} 
                                        className="py-2 px-3 sm:px-4 rounded-lg text-white font-bold transition-colors duration-200 bg-red-500 hover:bg-red-600 text-xs sm:text-sm"
                                    >
                                        Recusar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </DashboardLayoutAdmin>
    );
}