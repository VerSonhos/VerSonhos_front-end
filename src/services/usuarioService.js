import api from '../../api/axiosConfig'; 

/**
 * @param {number} idUsuario
 * @returns {string}
 */
export async function buscarNomeUsuarioPorId(idUsuario) {
    if (!idUsuario) {
        console.log(`[USER_SERVICE] ID não fornecido.`);
        return 'ID Ausente na Solicitação';
    }

    try {
        console.log(`[USER_SERVICE] Chamando API para buscar usuário com ID: ${idUsuario}`);
        
        const response = await api.get(`/usuario/${idUsuario}`);
        
        const userData = response.data; 
        
        console.log(`[USER_SERVICE] Dados Recebidos para ID ${idUsuario}:`, userData);
        
        if (userData && userData.nomeCompleto) {
            return userData.nomeCompleto;
        }
        
        console.warn(`[USER_SERVICE] Campo 'nomeCompleto' não encontrado nos dados do usuário ID ${idUsuario}.`);
        return `Usuário ID ${idUsuario} (Nome Não Mapeado)`;
        
    } catch (error) {
        console.error(`[USER_SERVICE] Falha na API ao buscar usuário ${idUsuario}:`, error.response?.data || error.message);
        
        return `Erro ao buscar Usuário ID #${idUsuario}`; 
    }
}