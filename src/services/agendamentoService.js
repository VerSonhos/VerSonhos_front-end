import api from '../../api/axiosConfig'; 

/**
 * Envia os dados do novo agendamento para o backend.
 * Rota: POST /agendamento
 * @param {object} dadosAgendamento - Objeto com os dados do formulário.
 * @returns {Promise<object>} - Retorna o agendamento criado (AgendamentoResponseDTO).
 */
export const criarNovoAgendamento = async (dadosAgendamento) => {
    try {
        const response = await api.post('/agendamento', dadosAgendamento);
        return response.data; 
    } catch (error) {
        console.error("Erro ao criar agendamento:", error.response ? error.response.data : error.message);
        throw error; 
    }
};

/**
 * Busca todos os agendamentos associados a um ID de usuário específico.
 * Rota: GET /agendamento/usuario/{idUsuario}
 * @param {number} userId - O ID do usuário logado.
 * @returns {Promise<object[]>} - Uma lista de AgendamentoResponseDTOs.
 */
export const buscarAgendamentosPorUsuarioId = async (userId) => {
    try {
        const response = await api.get(`/agendamento/usuario/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar agendamentos por usuário:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// =================================================================
// FUNÇÕES PARA O ADMIN (RequestsAdm.jsx)
// =================================================================

/**
 * Busca a lista completa de todos os agendamentos para o Admin.
 * Rota: GET /agendamento
 * @returns {Promise<object[]>} - Uma lista de todos os AgendamentoResponseDTOs.
 */
export const buscarTodosAgendamentos = async () => {
    try {
        // ROTA CORRIGIDA com base no AgendamentoController: GET /agendamento
        const response = await api.get('/agendamento'); 
        return response.data;
    } catch (error) {
        const status = error.response ? error.response.status : 'Sem Resposta';
        console.error(`Erro ${status} ao buscar todos os agendamentos:`, error.response ? error.response.data : error.message);
        throw new Error(`Falha ao carregar agendamentos (Status: ${status}).`);
    }
};

/**
 * Atualiza o status de um agendamento específico.
 * Rota: PATCH /agendamento/status/{idAgendamento}?status={novoStatus}
 * * @param {number} idAgendamento - O ID do agendamento a ser atualizado.
 * @param {string} status - O novo status (Ex: 'APROVADO', 'REPROVADO', 'FINALIZADO').
 * @param {string} [motivo=null] - Motivo da reprovação.
 * @returns {Promise<object>} - Retorna o agendamento atualizado.
 */
export const atualizarStatusAgendamento = async (idAgendamento, status, motivo = null) => {
    try {
        // CORREÇÃO: Usamos corpo vazio ({}) e enviamos o status via 'params' (Query Parameter)
        // para corresponder ao @RequestParam do Spring Boot Controller.
        const response = await api.patch(
            `/agendamento/status/${idAgendamento}`, 
            {}, // Corpo vazio, necessário para alguns servidores Spring Boot em PATCH
            { 
                params: {
                    status: status
                }
            }
        );
        
        // NOTA: Se o status for REPROVADO, o backend precisará implementar uma
        // lógica para buscar o motivo, pois o Controller não o recebe nesta rota.
        // O service apenas garante a chamada HTTP correta.
        
        return response.data;

    } catch (error) {
        const statusHttp = error.response ? error.response.status : 'Sem Resposta';
        console.error(`Erro ${statusHttp} ao atualizar status do agendamento ${idAgendamento}:`, error.response ? error.response.data : error.message);
        
        throw new Error(`Falha ao atualizar status (Status: ${statusHttp}). Detalhe: ${error.response?.data?.message || error.message}`);
    }
};

/**
 * Função para cancelar o agendamento do lado do usuário.
 * Rota: DELETE /agendamento/cancelar/{idAgendamento}
 * @param {number} idAgendamento - O ID do agendamento a ser cancelado.
 * @returns {Promise<void>}
 */
export const cancelarAgendamento = async (idAgendamento) => {
    try {
        await api.delete(`/agendamento/cancelar/${idAgendamento}`);
        return;
    } catch (error) {
        console.error(`Erro ao cancelar agendamento ${idAgendamento}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};