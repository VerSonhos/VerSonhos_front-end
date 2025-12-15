import DashboardLayoutUser from '@/layouts/DashboardLayoutUser'
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from "react-router-dom"
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import iconLupa from "../../assets/icons/icon-lupa.png"
import { buscarAgendamentosPorUsuarioId, cancelarAgendamentoUsuario } from '../../services/agendamentoService';
import { X, Clock, Calendar, Users, Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';

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

const statusMap = {
    Confirmado: {
        style: 'text-green-700 bg-green-100',
        action: 'Ver Detalhes',
    },
    Pendente: { 
        style: 'text-gray-900 bg-yellow-500', 
        action: 'Aguardando',
    },
    Concluído: { 
        style: 'text-green-700 bg-green-100', 
        action: 'Ver Detalhes',
    },
    Cancelado: {
        style: 'text-red-700 bg-red-100',
        action: 'Ver Detalhes', // ALTERADO: Era 'Ver Motivo'
    },
    Expirado: {
        style: 'text-blue-700 bg-blue-100',
        action: 'Ver Detalhes',
    },
    Recusado: { 
        style: 'text-red-700 bg-red-100', 
        action: 'Ver Detalhes', // ALTERADO: Era 'Ver Motivo'
    },
}

const getStatusInfo = (status, isCentered = true) => {
    const info = statusMap[status] || { style: 'text-gray-500 bg-gray-100' }
    
    const alignmentClass = isCentered ? 'mx-auto' : 'mr-auto';
    
    return (
        <span className={`flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold w-fit ${alignmentClass} ${info.style}`}>
            <span>{status}</span>
        </span>
    )
}


const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancelar', isLoading = false }) => {
    
    const [animateIn, setAnimateIn] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setAnimateIn(true), 10);
        return () => clearTimeout(timer);
    }, []);
    
    const modalAnimationClass = animateIn
        ? 'scale-100 opacity-100'
        : 'scale-95 opacity-0';

    return (
        <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300 opacity-100"
            onClick={onCancel}
        > 
            <div 
                className={`bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-200 ease-out ${modalAnimationClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        {title}
                    </h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-6">
                    <p className="text-sm text-gray-700">{message}</p>
                </div>
                <footer className="p-4 border-t flex justify-end gap-3">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 text-sm font-semibold rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded transition ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {!isLoading && confirmText}
                    </button>
                </footer>
            </div>
        </div>
    );
};



const AppointmentDetailModal = ({ appointment, onClose, onCancelSuccess, isCancelLoading, setIsCancelLoading }) => {
    if (!appointment) return null;

    const [animateOut, setAnimateOut] = useState(false);
    const [animateIn, setAnimateIn] = useState(false); 
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        const timer = setTimeout(() => {
            setAnimateIn(true);
        }, 10);

        return () => {
            document.body.style.overflow = 'unset';
            clearTimeout(timer);
        };
    }, []);

    const closeWithAnimation = () => {
        setAnimateOut(true);
        setTimeout(onClose, 300); 
    };

    const appointmentDateTime = new Date(`${appointment.dataAgendada}T${appointment.horario}`);
    const minCancelTime = new Date(appointmentDateTime.getTime() - (48 * 60 * 60 * 1000));
    const now = new Date();
    const isCanceledOrFinished = appointment.status === 'Cancelado' || appointment.status === 'Recusado' || appointment.status === 'Concluído' || appointment.status === 'Expirado';
    const canCancel = !isCanceledOrFinished && now < minCancelTime;

    const executeCancel = async () => {
        setIsCancelLoading(true);
        setIsConfirmModalOpen(false);
        
        try {
            await cancelarAgendamentoUsuario(appointment.idAgendamento);
            onCancelSuccess("Agendamento cancelado com sucesso!");
            closeWithAnimation();
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Ocorreu um erro ao cancelar o agendamento.";
            alert(errorMessage); 
            closeWithAnimation();
        } finally {
            setIsCancelLoading(false);
        }
    };
    
    const handleCancelClick = () => {
        setIsConfirmModalOpen(true);
    };
    
    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false);
    };


    const overlayAnimationClass = animateOut 
        ? 'opacity-0' 
        : 'opacity-100'; 
        
    const modalAnimationClass = animateIn && !animateOut
        ? 'scale-100 opacity-100'
        : 'scale-95 opacity-0';

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300 ${overlayAnimationClass}`}
            onClick={closeWithAnimation} 
        > 
            <div 
                className={`bg-white rounded-lg shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-300 ease-out ${modalAnimationClass}`}
                onClick={(e) => e.stopPropagation()} 
            >
                <header className="p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">
                        Detalhes da Solicitação #{appointment.idAgendamento}
                    </h3>
                    <button onClick={closeWithAnimation} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        
                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Data Agendada
                            </p>
                            <p className="text-sm text-gray-800 font-medium">{appointment.data}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Horário
                            </p>
                            <p className="text-sm text-gray-800 font-medium">{appointment.horario}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        
                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Nº de Pacientes
                            </p>
                            <p className="text-sm text-gray-800 font-medium">{appointment.qtdePacientes || 'Não informado'}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Duração Estimada
                            </p>
                            <p className="text-sm text-gray-800 font-medium">{appointment.duracaoVisita ? `${appointment.duracaoVisita} minutos` : 'Não informada'}</p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                            Local de Visita
                        </p>
                        <p className="text-sm text-gray-800 font-medium">{appointment.localVisita || 'Não informado'}</p>
                    </div>

                    {appointment.observacoes && (
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Observações</p>
                            <p className="text-sm text-gray-800 font-medium">{appointment.observacoes}</p>
                        </div>
                    )}
                    
                    {(appointment.status === 'Recusado' || appointment.status === 'Cancelado') && appointment.motivoRecusa && ( // Adicionando campo para motivo de recusa/cancelamento se existir
                        <div className="pt-2 border-t mt-4">
                            <p className="text-xs font-semibold text-red-500 mb-1">Motivo do {appointment.status === 'Recusado' ? 'Recusado' : 'Cancelamento'}</p>
                            <p className="text-sm text-red-800 font-medium italic">{appointment.motivoRecusa}</p>
                        </div>
                    )}


                    <div className="pt-4 border-t text-center"> 
                        <h4 className="text-md font-semibold text-gray-700 mb-1">Status Atual:</h4>
                        {getStatusInfo(appointment.status)}
                    </div>
                </div>

                <footer className="p-4 border-t flex justify-between items-center">
                    
                    {/* REMOVIDO: O botão "Ver Motivo" foi retirado daqui */}
                    
                    {appointment.status === 'Cancelado' && (
                        <p className="text-xs text-red-600 mr-auto">
                            Agendamento já cancelado.
                        </p>
                    )}

                    {canCancel && (
                        <button
                            onClick={handleCancelClick}
                            disabled={isCancelLoading}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded transition ${isCancelLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                        >
                            {isCancelLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {!isCancelLoading && <AlertTriangle className="w-4 h-4" />}
                            {isCancelLoading ? 'Cancelando...' : 'Cancelar Agendamento'}
                        </button>
                    )}
                    
                    {!canCancel && !isCanceledOrFinished && (
                        <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded mr-auto flex items-center gap-1">
                            <Info className='w-4 h-4' />
                            Cancelamento até 48 horas antes da data.
                        </p>
                    )}
                    
                    {(!canCancel || isCanceledOrFinished) && (
                         <button onClick={closeWithAnimation} className="px-4 py-2 text-sm font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 ml-auto">
                            Fechar
                        </button>
                    )}
                </footer>
            </div>
            
            {isConfirmModalOpen && (
                <ConfirmationModal
                    title="Confirmar Cancelamento"
                    message="Tem certeza que deseja cancelar este agendamento? Esta ação é irreversível."
                    onConfirm={executeCancel}
                    onCancel={handleConfirmCancel}
                    confirmText="Confirmar Cancelamento"
                    cancelText="Manter Agendamento"
                    isLoading={isCancelLoading}
                />
            )}
        </div>
    );
};

const AppointmentCard = ({ appointment, onActionClick }) => {
    const action = statusMap[appointment.status]?.action || 'Ver Detalhes';
    const isCanceledOrRecusado = appointment.status === 'Cancelado' || appointment.status === 'Recusado'; 
    const buttonClass = isCanceledOrRecusado ? 'bg-red-500 hover:bg-red-600' : 'bg-[#3184EF] hover:bg-[#4391F6]'

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 mb-3 md:hidden">
            <div className="flex justify-between items-start mb-2">
                <p className="text-lg font-semibold text-gray-800">{appointment.data} às {appointment.horario}</p>
                {getStatusInfo(appointment.status, false)} 
            </div>
            <p className="text-gray-600 text-sm mb-3">{appointment.localVisita || 'Local não especificado'}</p>
            <button
                onClick={() => onActionClick(appointment)}
                className={`w-full px-3 py-2 text-sm font-semibold rounded text-white transition ${buttonClass}`}
            >
                {action}
            </button>
        </div>
    )
}

const AppointmentRow = ({ appointment, isUpcoming, onActionClick }) => {
    const action = statusMap[appointment.status]?.action || 'Ver Detalhes';
    const isCanceledOrRecusado = appointment.status === 'Cancelado' || appointment.status === 'Recusado';

    if (isUpcoming) {
        return (
            <>
                <AppointmentCard appointment={appointment} onActionClick={onActionClick} /> 
                <tr className="border-b hidden md:table-row hover:bg-gray-50 transition duration-100">
                    <td className="py-3 px-4 text-sm font-medium">
                        <p className="font-semibold text-gray-700">{appointment.data}</p>
                    </td>
                    <td className="py-3 px-4 text-sm">{appointment.horario}</td>
                    <td className="py-3 px-4 text-sm font-medium">
                        {getStatusInfo(appointment.status, false)}
                    </td>
                    <td className="py-3 px-4 text-sm">
                        <button
                            onClick={() => onActionClick(appointment)}
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
                {getStatusInfo(appointment.status, false)}
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
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isCancelLoading, setIsCancelLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const filterOptions = ['Todos', 'Confirmado', 'Pendente', 'Cancelado', 'Concluído', 'Expirado', 'Recusado'] 
    
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
                    case 'REPROVADO':
                        statusDisplay = 'Recusado'; 
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

            const sortedData = mappedData.sort((a, b) => {
                const dateA = new Date(a.dataAgendada + 'T' + a.horario);
                const dateB = new Date(b.dataAgendada + 'T' + b.horario);
                return dateA - dateB;
            });

            setAgendamentos(sortedData);
            setError(null);
        } catch (err) {
            const msg = err.response?.data?.message || "Falha ao carregar agendamentos. Verifique o servidor.";
            setError({ message: msg });
            setAgendamentos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, [userId]); 


    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    }

    const handleCancelSuccess = (message) => {
        setSuccessMessage(message);
        fetchAgendamentos(); 
    }
    

    const counts = useMemo(() => {
        return agendamentos.reduce((acc, app) => {
            if (app.isUpcoming) {
                acc.Todos = (acc.Todos || 0) + 1;
                if (filterOptions.includes(app.status)) {
                    acc[app.status] = (acc[app.status] || 0) + 1;
                }
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
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center" role="alert">
                    <CheckCircle className='w-5 h-5 mr-2' />
                    <strong className="font-bold">Sucesso:</strong>
                    <span className="block sm:inline ml-2">{successMessage}</span>
                </div>
            )}
            {error && (
                <ErrorAlert message={error.message} />
            )}
            
            <div className="p-4 sm:p-6 bg-gray-100"> 
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
                                    <AppointmentCard 
                                        key={app.idAgendamento} 
                                        appointment={app} 
                                        onActionClick={handleViewDetails}
                                    />
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
                                            <AppointmentRow 
                                                key={app.idAgendamento} 
                                                appointment={app} 
                                                isUpcoming={true} 
                                                onActionClick={handleViewDetails}
                                            />
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

            {isModalOpen && (
                <AppointmentDetailModal
                    appointment={selectedAppointment}
                    onClose={handleCloseModal}
                    onCancelSuccess={handleCancelSuccess}
                    isCancelLoading={isCancelLoading}
                    setIsCancelLoading={setIsCancelLoading}
                />
            )}

        </DashboardLayoutUser>
    )
}