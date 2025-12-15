import api from '../../api/axiosConfig'; 

export const criarNovoAgendamento = async (dadosAgendamento) => {
    try {
        const response = await api.post('/agendamento', dadosAgendamento);
        return response.data; 
    } catch (error) {
        console.error("Erro ao criar agendamento:", error.response ? error.response.data : error.message);
        throw error; 
    }
};

export const buscarAgendamentosPorUsuarioId = async (userId) => {
    try {
        const response = await api.get(`/agendamento/usuario/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar agendamentos por usuário:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const cancelarAgendamentoUsuario = async (idAgendamento) => {
    try {
        await api.delete(`/agendamento/cancelar/${idAgendamento}`); 
        return;
    } catch (error) {
        console.error(`Erro ao cancelar agendamento ${idAgendamento} pelo usuário:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


export const buscarTodosAgendamentos = async () => {
    try {
        const response = await api.get('/agendamento'); 
        return response.data;
    } catch (error) {
        const status = error.response ? error.response.status : 'Sem Resposta';
        console.error(`Erro ${status} ao buscar todos os agendamentos:`, error.response ? error.response.data : error.message);
        throw new Error(`Falha ao carregar agendamentos (Status: ${status}).`);
    }
};

export const atualizarStatusAgendamento = async (idAgendamento, status, motivo = null) => {
    try {
        const response = await api.patch(
            `/agendamento/status/${idAgendamento}`, 
            {}, 
            { 
                params: {
                    status: status
                }
            }
        );
        
        return response.data;

    } catch (error) {
        const statusHttp = error.response ? error.response.status : 'Sem Resposta';
        console.error(`Erro ${statusHttp} ao atualizar status do agendamento ${idAgendamento}:`, error.response ? error.response.data : error.message);
        
        throw new Error(`Falha ao atualizar status (Status: ${statusHttp}). Detalhe: ${error.response?.data?.message || error.message}`);
    }
};

export const cancelarAgendamentoAdmin = async (idAgendamento) => {
    try {
        await api.delete(`/agendamento/cancelar/admin/${idAgendamento}`);
        return;
    } catch (error) {
        console.error(`Erro ao cancelar agendamento ${idAgendamento} pelo Admin:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const alterarAgendamentoUsuario = async (idAgendamento, dto) => {
    try {
        const response = await api.put(`/agendamento/alterar/${idAgendamento}`, dto);
        return response.data;
    } catch (error) {
        console.error(`Erro ao alterar agendamento ${idAgendamento} pelo usuário:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const alterarAgendamentoAdmin = async (idAgendamento, dto) => {
    try {
        const response = await api.put(`/agendamento/alterar/admin/${idAgendamento}`, dto);
        return response.data;
    } catch (error) {
        console.error(`Erro ao alterar agendamento ${idAgendamento} pelo admin:`, error.response ? error.response.data : error.message);
        throw error;
    }
};