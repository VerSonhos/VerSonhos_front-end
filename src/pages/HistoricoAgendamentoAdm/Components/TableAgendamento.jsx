import React, { useState, useEffect, useMemo, useCallback } from "react"; 
import { FaEllipsisV } from "react-icons/fa";
// Importa o serviço de Agendamento
import { buscarTodosAgendamentos } from '../../../services/agendamentoService'; 
// Importa o serviço de Usuário para buscar o nome pelo ID
import { buscarNomeUsuarioPorId } from '../../../services/usuarioService'; 


// Mapeamento de Status
const STATUS_MAP = {
    PENDENTE: { label: "Pendente", color: "bg-yellow-500" },
    CONFIRMADO: { label: "Confirmado", color: "bg-green-500" }, 
    REPROVADO: { label: "Recusado", color: "bg-red-500" }, 
    CONCLUIDO: { label: "Concluído", color: "bg-green-700" }, 
    CANCELADO: { label: "Cancelada", color: "bg-red-700" }, 
    EXPIRADO: { label: "Expirada", color: "bg-gray-400" },
    AGUARDANDO_APROVACAO: { label: "Pendente", color: "bg-yellow-500" },
};

const StatusBadge = ({ status }) => {
    const info = STATUS_MAP[status] || { label: status, color: 'bg-gray-400' };

    return (
        <span
            className={`text-white px-3 py-1 rounded-full text-xs sm:text-sm ${info.color}`}
        >
            {info.label}
        </span>
    );
};


export default function TableAgendamento() {
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

    // Função de carregamento e mapeamento de dados (Usando useCallback para estabilidade)
    const fetchAgendamentos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const agendamentos = await buscarTodosAgendamentos(); 
            
            // Cria um array de promessas para buscar os nomes dos usuários em paralelo
            const agendamentosComNomesPromise = agendamentos.map(async (item) => {
                
                // ❗ IMPORTANTE: Use o campo correto que contém o ID do Usuário Solicitante na API de agendamento
                const idUsuarioAgendamento = item.fk_idUsuario || item.idUsuario || item.usuarioId;
                
                let nomeCliente = 'Usuário Não Informado';
                
                if (idUsuarioAgendamento) {
                    try {
                        // Chama o serviço de usuário para buscar o nome pelo ID
                        nomeCliente = await buscarNomeUsuarioPorId(idUsuarioAgendamento);
                    } catch (e) {
                        console.error(`Falha ao buscar nome para ID ${idUsuarioAgendamento}:`, e);
                        nomeCliente = 'Erro na Busca'; 
                    }
                }
                
                const dataParts = item.dataAgendada.split('-'); 
                const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;

                return {
                    id: `#${item.idAgendamento}`,
                    empresa: item.nomeEmpresa || 'Empresa Não Informada', 
                    nomeCliente: nomeCliente, // ✅ Nome resolvido antes de carregar a tabela
                    data: item.dataAgendada, 
                    dataExibicao: dataFormatada, 
                    horario: item.horario,
                    status: item.status, 
                    endereco: item.localVisita || 'Não informado',
                    idAgendamento: item.idAgendamento, 
                    duracaoVisita: item.duracaoVisita,
                    qtdePacientes: item.qtdePacientes,
                    observacoes: item.observacoes,
                    cpf: item.cpf,
                };
            });
            
            // ✅ Espera que TODAS as chamadas assíncronas de nome terminem
            const mappedData = await Promise.all(agendamentosComNomesPromise);
            
            setTabelaData(mappedData);

        } catch (err) {
            console.error("Erro ao buscar agendamentos:", err);
            setError(`Falha ao carregar agendamentos: ${err.message || "Verifique a conexão com a API."}`);
            setTabelaData([]);
        } finally {
            setLoading(false);
        }
    }, []); 

    // Função para recarregar os dados, útil após interações no modal
    const refreshData = () => {
        fetchAgendamentos();
    };

    useEffect(() => { 
        fetchAgendamentos(); 
        setIsMounted(true); 
    }, [fetchAgendamentos]); // Dependência em fetchAgendamentos

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
    
    // Lógica de filtragem e ordenação memoizada
    const filteredData = useMemo(() => {
        return tabelaData.filter(item => {
            const searchLower = filterTerm.searchText.toLowerCase();
            
            // Lógica de filtro de status 
            if (filterTerm.status !== 'Todos') {
                const statusLabel = STATUS_MAP[item.status]?.label;
                
                // Lógica para agrupar PENDENTE e AGUARDANDO_APROVACAO sob o filtro "Pendente"
                const isPendingFilter = filterTerm.status === 'Pendente';
                const isPendingStatus = item.status === 'PENDENTE' || item.status === 'AGUARDANDO_APROVACAO';

                if (isPendingFilter) {
                    if (!isPendingStatus) return false;
                } else {
                    if (filterTerm.status !== statusLabel) return false;
                }
            }
            
            if (filterTerm.date && item.data !== filterTerm.date) {
                return false;
            }

            if (searchLower) {
                const matchesId = item.id.toLowerCase().includes(searchLower);
                const matchesEmpresa = item.empresa.toLowerCase().includes(searchLower);
                // Busca agora inclui o nomeCliente (nome do solicitante)
                const matchesCliente = item.nomeCliente.toLowerCase().includes(searchLower); 
                if (!matchesId && !matchesEmpresa && !matchesCliente) {
                    return false;
                }
            }

            return true;
        }).sort((a, b) => new Date(a.data) - new Date(b.data)); 
    }, [tabelaData, filterTerm]);

    return (
        <div className="p-4 sm:p-6 bg-transparent">
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 font-fredoka">
                    <strong className="font-bold">Erro de API:</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

            {loading ? (
                <p className="text-center text-blue-500 py-10 font-fredoka">Carregando todos os agendamentos para visualização...</p>
            ) : (
                <>
                    {/* --- Seção de Filtros --- */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 font-fredoka">
                        <h3 className="text-lg font-bold text-thirteenth-500 mb-4">Filtrar Agendamentos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar (ID, Empresa ou Cliente)</label>
                                <input
                                    type="text"
                                    placeholder="Buscar por ID, Empresa ou Cliente"
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
                                    <option value="Expirada">Expirada</option>
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
                    
                    {/* --- Tabela Desktop --- */}
                    <div className="hidden sm:block overflow-x-auto w-full">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md font-fredoka">
                            <thead className="bg-thirteenth-500 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left text-base">ID</th>
                                    <th className="py-3 px-4 text-left text-base">Usuário Solicitante</th> 
                                    <th className="py-3 px-4 text-left text-base">Data</th>
                                    <th className="py-3 px-4 text-left text-base">Status</th>
                                    <th className="py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-100 transition">
                                            <td className="py-3 px-4 text-base">{item.id}</td>
                                            {/* Coluna agora exibe o nome do solicitante */}
                                            <td className="py-3 px-4 text-base">{item.nomeCliente}</td> 
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
                    
                    {/* --- Tabela Mobile (Cards) --- */}
                    <div className="sm:hidden space-y-4 font-fredoka">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm xs:text-base font-bold text-thirteenth-500 break-words">
                                            {/* Exibir Usuário Solicitante na visão mobile como título */}
                                            {item.nomeCliente} 
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
                                            <span className="font-semibold text-gray-700">Empresa:</span> {item.empresa} 
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
                    
                    {/* --- Modal de Detalhes --- */}
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
                                    {/* Campo do Nome do Usuário no Modal */}
                                    <div>
                                        <p className="font-semibold text-gray-700">Cliente/Usuário</p>
                                        <p className="text-gray-900 break-words">{itemSelecionado?.nomeCliente}</p>
                                    </div>
                                    
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

                                    <div>
                                        <p className="font-semibold text-gray-700">Duração Estimada</p>
                                        <p className="text-gray-900">{itemSelecionado?.duracaoVisita} minutos</p>
                                    </div>
                                    
                                    <div>
                                        <p className="font-semibold text-gray-700">Nº de Pacientes</p>
                                        <p className="text-gray-900">{itemSelecionado?.qtdePacientes}</p>
                                    </div>
                                    
                                    {itemSelecionado?.observacoes && (
                                        <div>
                                            <p className="font-semibold text-gray-700">Observações</p>
                                            <p className="text-gray-900 break-words italic">{itemSelecionado?.observacoes}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                                    <p className="font-semibold text-gray-700 text-sm mb-2">Status Atual</p>
                                    <StatusBadge status={itemSelecionado?.status} />
                                </div>
                                
                                
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}