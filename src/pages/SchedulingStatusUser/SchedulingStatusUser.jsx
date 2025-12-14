import DashboardLayoutUser from '@/layouts/DashboardLayoutUser'
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from "react-router-dom"
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import iconLupa from "../../assets/icons/icon-lupa.png"
import { buscarAgendamentosPorUsuarioId } from '../../services/agendamentoService'; 

const useAuth = () => ({ userId: 1, user: { name: 'Usuário Teste' } }); 
const ErrorAlert = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Erro:</strong>
        <span className="block sm:inline ml-2">{message}</span>
    </div>
);

const formatarData = (isoDate) => {
    if (!isoDate || typeof isoDate !== 'string') return 'N/A';
    const parts = isoDate.split('-');
    if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    }
    return isoDate;
};

// ===============================================
// CORREÇÃO 1: Adicionando 'Recusado' ao statusMap
// ===============================================
const statusMap = {
    Confirmado: {
        style: 'text-green-700 bg-green-100',
        action: 'Ver Detalhes'
    },
    Pendente: { 
        style: 'text-gray-900 bg-yellow-500', 
        action: 'Aguardando' 
    },
    Concluído: { 
        style: 'text-green-700 bg-green-100', 
        action: 'Ver Detalhes'
    },
    Cancelado: {
        style: 'text-red-700 bg-red-100',
        action: 'Ver Motivo'
    },
    Expirado: {
        style: 'text-blue-700 bg-blue-100',
        action: 'Ver Detalhes'
    },
    Recusado: { // <-- Novo status
        style: 'text-red-700 bg-red-100', 
        action: 'Ver Motivo' 
    },
}

const getStatusInfo = (status) => {
    const info = statusMap[status] || { style: 'text-gray-500 bg-gray-100' }
    return (
        <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold w-fit ${info.style}`}>
            <span>{status}</span>
        </span>
    )
}

const AppointmentCard = ({ appointment }) => {
    const action = statusMap[appointment.status]?.action || 'Ver Detalhes';
    const isCanceledOrRecusado = appointment.status === 'Cancelado' || appointment.status === 'Recusado'; 
    const buttonClass = isCanceledOrRecusado ? 'bg-red-500 hover:bg-red-600' : 'bg-[#3184EF] hover:bg-[#4391F6]'

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 mb-3 md:hidden">
            <div className="flex justify-between items-start mb-2">
                <p className="text-lg font-semibold text-gray-800">{appointment.data} às {appointment.horario}</p>
                {getStatusInfo(appointment.status)}
            </div>
            <p className="text-gray-600 text-sm mb-3">{appointment.localVisita || 'Local não especificado'}</p>
            <button
                className={`w-full px-3 py-2 text-sm font-semibold rounded text-white transition ${buttonClass}`}
            >
                {action}
            </button>
        </div>
    )
}

const AppointmentRow = ({ appointment, isUpcoming }) => {
    const action = statusMap[appointment.status]?.action || 'Ver Detalhes';
    const isCanceledOrRecusado = appointment.status === 'Cancelado' || appointment.status === 'Recusado';

    if (isUpcoming) {
        return (
            <>
                <AppointmentCard appointment={appointment} />
                <tr className="border-b hidden md:table-row">
                    <td className="py-3 px-4 text-sm font-medium">
                        <p className="font-semibold text-gray-700">{appointment.data}</p>
                    </td>
                    <td className="py-3 px-4 text-sm">{appointment.horario}</td>
                    <td className="py-3 px-4 text-sm font-medium">
                        {getStatusInfo(appointment.status)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                        <button
                            className={`px-3 py-1 text-sm font-semibold rounded ${isCanceledOrRecusado ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-tertiary text-white hover:bg-[#4391F6]'}`}
                        >
                            {action}
                        </button>
                    </td>
                </tr>
            </>
        )
    }
    
    return (
        <tr className="border-b">
            <td className="py-3 px-4 text-xs font-medium text-gray-700">{appointment.data}</td>
            <td className="py-3 px-4 text-xs font-medium">
                {getStatusInfo(appointment.status)}
            </td>
        </tr>
    )
}


export default function SchedulingStatusUser() {
    const { userId } = useAuth();
    
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('Todos')
    const [searchTerm, setSearchTerm] = useState('')
    // Incluindo 'Recusado' nos filtros se necessário, mas não é obrigatório para exibir
    const filterOptions = ['Todos', 'Confirmado', 'Pendente', 'Cancelado', 'Concluído', 'Expirado', 'Recusado'] 
    
    
    useEffect(() => {
        const fetchAgendamentos = async () => {
            if (!userId) {
                setLoading(false);
                setError({ message: "ID do usuário não encontrado. Faça login novamente." });
                return;
            }

            try {
                setLoading(true);
                const data = await buscarAgendamentosPorUsuarioId(userId);

                const mappedData = data.map(item => {
                    const dataAgendada = formatarData(item.dataAgendada);
                    
                    const isUpcoming = new Date(item.dataAgendada) >= new Date(new Date().setHours(0, 0, 0, 0)); 
                    
                    let statusDisplay;
                    switch(item.status) {
                        case 'CONFIRMADO':
                            statusDisplay = 'Confirmado';
                            break;
                        case 'PENDENTE':
                            statusDisplay = 'Pendente';
                            break;
                        case 'CANCELADO':
                            statusDisplay = 'Cancelado'; 
                            break;
                        case 'CONCLUIDO':
                            statusDisplay = 'Concluído';
                            break;
                        case 'EXPIRADO':
                            statusDisplay = 'Expirado';
                            break;
                        case 'REPROVADO': // <--- CORREÇÃO AQUI
                            statusDisplay = 'Recusado'; // <--- Agora será exibido como "Recusado"
                            break;
                        default:
                            statusDisplay = item.status;
                    }

                    return {
                        ...item,
                        data: dataAgendada,
                        status: statusDisplay, 
                        isUpcoming: isUpcoming,
                    }
                });

                setAgendamentos(mappedData);
                setError(null);
            } catch (err) {
                const msg = err.response?.data?.message || "Falha ao carregar agendamentos. Verifique o servidor.";
                setError({ message: msg });
                setAgendamentos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendamentos();
    }, [userId]); 

    
    const counts = useMemo(() => {
        return agendamentos.reduce((acc, app) => {
            if (app.isUpcoming) {
                acc.Todos = (acc.Todos || 0) + 1;
                if (app.status === 'Confirmado') acc.Confirmado = (acc.Confirmado || 0) + 1;
                if (app.status === 'Pendente') acc.Pendente = (acc.Pendente || 0) + 1;
                if (app.status === 'Cancelado') acc.Cancelado = (acc.Cancelado || 0) + 1;
                if (app.status === 'Concluído') acc.Concluído = (acc.Concluído || 0) + 1;
                if (app.status === 'Expirado') acc.Expirado = (acc.Expirado || 0) + 1;
                if (app.status === 'Recusado') acc.Recusado = (acc.Recusado || 0) + 1; // <--- CORREÇÃO DE CONTAGEM AQUI
            }
        return acc;
        }, {});
    }, [agendamentos]);


    const filteredUpcomingAppointments = useMemo(() => {
        const upcoming = agendamentos.filter(app => app.isUpcoming)
        return upcoming.filter(app => {
            const matchStatus =
                activeFilter === 'Todos' ||
                app.status === activeFilter; 
            
            const matchSearch =
                (app.localVisita?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.data.includes(searchTerm));

            return matchStatus && matchSearch;
        })
    }, [activeFilter, searchTerm, agendamentos])


    const previousAppointments = agendamentos.filter(app => !app.isUpcoming)

    
    return (
        <DashboardLayoutUser>
            {error && (
                <ErrorAlert message={error.message} />
            )}
            
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen"> 
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Agendamentos</h1> 
                        <p className="text-gray-500 mt-1 text-sm sm:text-base">
                            Aqui você encontra todos os seus compromissos, confirmados e pendentes.
                        </p>
                    </div>
                    <Link
                        to="/painelUsuarioAgendarVisita"
                        className="flex items-center gap-2 bg-tertiary hover:bg-[#4391F6] text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                    >
                        <img
                            src={iconAgendamento}
                            alt="Ícone de calendário"
                            className="w-5 h-5"
                        />
                        Faça um agendamento
                    </Link>
                </header>

                <hr className="mb-6 border-t border-gray-200" />
                
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div className="flex flex-wrap gap-2 text-sm font-medium w-full lg:w-auto">
                        <span className="text-gray-700 font-bold mr-2 hidden sm:block">Filtros:</span>
                        {filterOptions.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-3 py-1 text-xs sm:text-sm rounded-full transition duration-150 ${
                                    activeFilter === filter
                                        ? 'bg-blue-100 text-blue-800 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-100'
                                } w-fit`}
                            >
                                {filter}
                                {counts[filter] !== undefined && <span className="ml-1 text-xs">({counts[filter]})</span>}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-64"> 
                        <input
                            type="text"
                            placeholder="Buscar por data ou local"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <img 
                                src={iconLupa} 
                                alt="Ícone de busca" 
                                className="w-5 h-7 opacity-70" 
                            />
                        </span>
                    </div>
                </div>

                <section className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Seus Próximos Agendamentos</h2>

                    {loading && <p className="text-center text-blue-500">Carregando agendamentos...</p>}

                    {!loading && filteredUpcomingAppointments.length === 0 ? (
                        <p className="text-gray-500 italic">Nenhum agendamento futuro encontrado com o filtro atual.</p>
                    ) : (
                        <>
                            <div className="md:hidden">
                                {filteredUpcomingAppointments.map(app => (
                                    <AppointmentCard key={app.idAgendamento} appointment={app} />
                                ))}
                            </div>

                            <div className="overflow-x-auto hidden md:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Data
                                            </th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Horário
                                            </th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUpcomingAppointments.map(app => (
                                            <AppointmentRow key={app.idAgendamento} appointment={app} isUpcoming={true} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </section>
                <section className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                        <h2 className="text-xl font-semibold text-gray-800">Histórico de Agendamentos Anteriores</h2>
                        <button className="flex items-center gap-2 bg-tertiary hover:bg-[#4391F6] text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center">
                            Ver Histórico Completo
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Data
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {previousAppointments.map(app => (
                                    <AppointmentRow
                                        key={app.idAgendamento}
                                        appointment={app}
                                        isUpcoming={false}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </DashboardLayoutUser>
    )
}