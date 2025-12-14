import DashboardLayoutAdmin from '@/layouts/DashboardLayoutAdmin'
import React, { useState, useEffect, useMemo } from "react";
import { FaEllipsisV, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import { Link } from "react-router-dom";
import { buscarTodosAgendamentos, atualizarStatusAgendamento } from '../../services/agendamentoService';


const STATUS_MAP = {
    PENDENTE: { label: "Pendente", color: "bg-yellow-500" },
    CONFIRMADO: { label: "Confirmado", color: "bg-green-500" }, 
    REPROVADO: { label: "Recusado", color: "bg-red-500" }, 
    CONCLUIDO: { label: "Concluído", color: "bg-green-700" }, 
    CANCELADO: { label: "Cancelada", color: "bg-red-700" }, 
    EXPIRADO: { label: "Expirada", color: "bg-gray-400" },
};

const corStatus = {
    "Pendente": "bg-yellow-500",
    "Confirmado": "bg-green-500",
    "Recusado": "bg-red-500",
    "Expirada": "bg-gray-400", 
    "Concluído": "bg-green-700",
    "Cancelada": "bg-red-700",
};

const StatusBadge = ({ status }) => {
    const info = STATUS_MAP[status] || { label: status, color: corStatus[status] || 'bg-gray-400' };

    return (
        <span
            className={`text-white px-3 py-1 rounded-full text-xs sm:text-sm ${info.color}`}
        >
            {info.label}
        </span>
    );
};

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    solicitacaoId,
    statusNovo
}) => {
    if (!isOpen) return null;

    const statusLabel = STATUS_MAP[statusNovo]?.label || statusNovo;
    const corConfirmar = statusNovo === 'CONFIRMADO' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';
    const textoConfirmar = statusNovo === 'CONFIRMADO' ? 'Confirmar' : 'Recusar';

    return (
        <div 
            onClick={onClose} 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 transition-opacity duration-300"
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 font-inter"
            >
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Confirmação de Status
                </h3>
                
                <p className="text-gray-700 mb-6 text-center">
                    Tem certeza que deseja mudar o status da solicitação {solicitacaoId} para {statusLabel}?
                </p>

                <div className="flex justify-end gap-3">
                    
                    <button 
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white font-semibold rounded-lg transition ${corConfirmar}`}
                    >
                        {textoConfirmar}
                    </button>

                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg transition hover:bg-gray-300 font-semibold"
                    >
                        Cancelar
                    </button>
                    
                </div>
            </div>
        </div>
    );
};


const ResultModal = ({ isOpen, onClose, message, status, isError = false }) => {
    if (!isOpen) return null;

    const isSuccess = status === 'CONFIRMADO' || status === 'CONCLUIDO';
    const bgColor = isError ? 'bg-red-500' : (isSuccess ? 'bg-green-500' : 'bg-blue-500'); 
    const title = isError ? 'Erro' : (isSuccess ? 'Sucesso!' : 'Atenção!');
    const icon = isError ? (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    ) : (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    );

    return (
        <div 
            onClick={onClose} 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 transition-opacity duration-300"
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 font-inter text-center"
            >
                <div className={`p-4 rounded-full w-20 h-20 mx-auto mb-4 ${bgColor} flex items-center justify-center`}>
                    {icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {title}
                </h3>
                
                <p className="text-gray-700 mb-6">
                    {message}
                </p>

                <button 
                    onClick={onClose}
                    className="w-full px-4 py-2 text-white font-semibold rounded-lg transition bg-blue-500 hover:bg-blue-600"
                >
                    OK
                </button>
            </div>
        </div>
    );
};


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
            d.data === dataString && (d.status === "PENDENTE" || d.status === "CONFIRMADO" || d.status === "AGUARDANDO_APROVACAO")
        );

        if (eventosVisiveis.length === 0) {
            return null;
        }

        const isConfirmado = eventosVisiveis.some(d => d.status === "CONFIRMADO"); 
        
        const confirmedColor = STATUS_MAP["CONFIRMADO"]?.color || corStatus["Confirmado"];
        const pendingColor = STATUS_MAP["PENDENTE"]?.color || corStatus["Pendente"]; 

        return isConfirmado ? confirmedColor : pendingColor;
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
    
    const [tabelaData, setTabelaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [filterTerm, setFilterTerm] = useState({
        searchText: '',
        status: 'Todos',
        date: '',
    });

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [acaoPendente, setAcaoPendente] = useState(null);

    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [resultModalMessage, setResultModalMessage] = useState('');
    const [resultModalStatus, setResultModalStatus] = useState('');
    const [resultModalIsError, setResultModalIsError] = useState(false);


    const fetchAgendamentos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await buscarTodosAgendamentos();
            
            const mappedData = data.map(item => {
                const dataParts = item.dataAgendada.split('-'); 
                const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;

                return {
                    id: `#${item.idAgendamento}`,
                    empresa: item.nomeEmpresa || 'Empresa Não Informada', 
                    data: item.dataAgendada, 
                    dataExibicao: dataFormatada, 
                    horario: item.horario,
                    status: item.status, 
                    endereco: item.localVisita || 'Não informado',
                    idAgendamento: item.idAgendamento, 
                };
            });
            
            setTabelaData(mappedData);

        } catch (err) {
            console.error("Erro ao buscar agendamentos:", err);
            setError("Falha ao carregar agendamentos. Verifique o serviço de API.");
            setTabelaData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchAgendamentos(); 
        setIsMounted(true); 
    }, []); 

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
    
    const abrirConfirmacao = (statusNovo) => {
        if (!itemSelecionado) return;
        
        setAcaoPendente({ 
            statusNovo: statusNovo, 
            idNumerico: itemSelecionado.idAgendamento,
            idExibicao: itemSelecionado.id
        });
        
        fecharModal(); 
        
        setIsConfirmationOpen(true);
    };

    const executarStatusChange = async () => {
        if (!acaoPendente) return;
        
        const { idNumerico, statusNovo, idExibicao } = acaoPendente;
        
        setIsConfirmationOpen(false); 
        setAcaoPendente(null);

        const statusLabel = STATUS_MAP[statusNovo]?.label || statusNovo;

        try {
            await atualizarStatusAgendamento(idNumerico, statusNovo, null); 
            
            await fetchAgendamentos(); 

            setResultModalMessage(`Status do agendamento ${idExibicao} atualizado para ${statusLabel} com sucesso.`);
            setResultModalStatus(statusNovo);
            setResultModalIsError(false);
            setIsResultModalOpen(true);

        } catch (error) {
            console.error("Erro na atualização de status:", error);
            
            setResultModalMessage(`Falha ao atualizar o status do agendamento ${idExibicao}. Tente novamente.`);
            setResultModalStatus(statusNovo); 
            setResultModalIsError(true);
            setIsResultModalOpen(true);
        }
    };


    const handleStatusChange = (newStatus) => {
          if (!itemSelecionado) return;
          
          abrirConfirmacao(newStatus);
    };


    const filteredData = useMemo(() => {
        return tabelaData.filter(item => {
            const searchLower = filterTerm.searchText.toLowerCase();
            
            const filterStatusBackend = Object.keys(STATUS_MAP).find(key => STATUS_MAP[key].label === filterTerm.status) || filterTerm.status;

            if (filterTerm.status !== 'Todos') {
                 if (filterTerm.status === 'Pendente' && item.status !== 'PENDENTE' && item.status !== 'AGUARDANDO_APROVACAO') return false;
                 if (filterTerm.status === 'Confirmado' && item.status !== 'CONFIRMADO') return false; 
                 if (filterTerm.status === 'Recusado' && item.status !== 'REPROVADO') return false; 
                 if (filterTerm.status === 'Concluído' && item.status !== 'CONCLUIDO') return false; 
                 if (filterTerm.status === 'Cancelada' && item.status !== 'CANCELADO') return false;
            }

            if (filterTerm.date && item.data !== filterTerm.date) {
                return false;
            }

            if (searchLower) {
                const matchesId = item.id.toLowerCase().includes(searchLower);
                const matchesEmpresa = item.empresa.toLowerCase().includes(searchLower);
                if (!matchesId && !matchesEmpresa) {
                    return false;
                }
            }

            return true;
        }).sort((a, b) => new Date(a.data) - new Date(b.data)); 
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
                

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Erro de API:</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-blue-500 py-10">Carregando solicitações...</p>
                ) : (
                    <>
                        <SimpleCalendar dadosEventos={tabelaData} />
                        
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 font-fredoka">
                            <h3 className="text-lg font-bold text-thirteenth-500 mb-4">Filtrar Agendamentos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                
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
                                        <option value="Concluído">Concluído</option>
                                        <option value="Cancelada">Cancelada</option>
                                    </select>
                                </div>
                                
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
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, i) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-100 transition">
                                                <td className="py-3 px-4 text-base">{item.id}</td>
                                                <td className="py-3 px-4 text-base">{item.empresa}</td>
                                                <td className="py-3 px-4 text-base">{item.dataExibicao}</td> 
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
                        
                        <div className="sm:hidden space-y-4 font-fredoka">
                            {filteredData.length > 0 ? (
                                filteredData.map((item, i) => (
                                    <div
                                        key={item.id}
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
                                                <span className="font-semibold text-gray-700">Data:</span> {item.dataExibicao}
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
                                                {itemSelecionado?.dataExibicao} - {itemSelecionado?.horario}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                                        <p className="font-semibold text-gray-700 text-sm mb-2">Status Atual</p>
                                        <StatusBadge status={itemSelecionado?.status} />
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                                        <p className="font-semibold text-gray-700 text-sm sm:text-base mb-3">Mudar status para:</p>
                                        <div className="flex justify-center space-x-2 sm:space-x-4">
                                            <button 
                                                onClick={() => handleStatusChange("CONFIRMADO")} 
                                                className="py-2 px-3 sm:px-4 rounded-lg text-white font-bold transition-colors duration-200 bg-green-500 hover:bg-green-600 text-xs sm:text-sm"
                                            >
                                                Confirmar
                                            </button>
                                            <button 
                                                onClick={() => handleStatusChange("REPROVADO")} 
                                                className="py-2 px-3 sm:px-4 rounded-lg text-white font-bold transition-colors duration-200 bg-red-500 hover:bg-red-600 text-xs sm:text-sm"
                                            >
                                                Recusar
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {isConfirmationOpen && acaoPendente && (
                <ConfirmationModal 
                    isOpen={isConfirmationOpen}
                    onClose={() => setIsConfirmationOpen(false)}
                    onConfirm={executarStatusChange}
                    solicitacaoId={acaoPendente.idExibicao}
                    statusNovo={acaoPendente.statusNovo}
                />
            )}

            {isResultModalOpen && (
                <ResultModal
                    isOpen={isResultModalOpen}
                    onClose={() => setIsResultModalOpen(false)}
                    message={resultModalMessage}
                    status={resultModalStatus}
                    isError={resultModalIsError}
                />
            )}
        </DashboardLayoutAdmin>
    );
}