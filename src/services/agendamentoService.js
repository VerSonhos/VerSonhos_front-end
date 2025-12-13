import api from '../../api/axiosConfig'; // Importa a instância configurada do Axios

/**
 * Envia os dados do novo agendamento para o backend.
 * @param {object} dadosAgendamento - Objeto com os dados do formulário.
 * @returns {Promise<object>} - Retorna o agendamento criado (AgendamentoResponseDTO).
 */
export const criarNovoAgendamento = async (dadosAgendamento) => {
  try {
    // Rota: POST /agendamento
    const response = await api.post('/agendamento', dadosAgendamento);
    
    // O backend retorna um 201 Created com o DTO do agendamento
    return response.data; 

  } catch (error) {
    console.error("Erro ao criar agendamento:", error.response ? error.response.data : error.message);
    // Lança o erro para ser tratado no componente que chamou
    throw error; 
  }
};