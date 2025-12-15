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

/**
 * Solicita  a recuperação de senha
 * @param {string} email
 * @returns {{ token: string, mensagem: string }}
 */
export async function recuperarSenha(email) {
    if (!email) {
        throw new Error("Email não informado para recuperação de senha");
    }

    try {
        console.log(`[USER_SERVICE] Solicitando recuperação de senha para: ${email}`);

        const response = await api.post('/usuario/recuperar', {
            email: email
        });

        console.log(`[USER_SERVICE] Recuperação solicitada com sucesso:`, response.data);

        return response.data;

    } catch (error) {
        console.error(
            `[USER_SERVICE] Erro ao solicitar recuperação de senha:`,
            error.response?.data || error.message
        );
        throw error;
    }
}
