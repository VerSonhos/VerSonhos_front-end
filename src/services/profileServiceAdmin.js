import api from '../../api/axiosConfig';

export async function fetchAdminProfile(valor) {
    const response = await api.get('/administrador/buscar', {
        params: { valor }
    });
    return response.data;
}
// export async function updateAdminProfile(idAdmin, fieldName, value) {
//     const emailAuth = localStorage.getItem('authEmail'); 
    
//     if (!idAdmin) {
//         throw new Error("ID do Administrador é obrigatório para atualização.");
//     }

//     if (!emailAuth) {
//         throw new Error("Administrador não autenticado. E-mail não encontrado.");
//     }

//     const payload = {}; 
    
//     switch (fieldName) {
//         case 'email':
//             payload.novoEmail = value; 
//             break;
//         case 'senha':
//             payload.novaSenha = value; 
//             break;
//         case 'usuario':
//             payload.login = value; 
//             break;
//         default:
//             console.warn(`Campo desconhecido '${fieldName}' enviado para atualização.`);
//             payload[fieldName] = value;
//             break;
//     }

//     try {
//         const response = await api.put(`/administrador/${idAdmin}`, payload); 

//         if (fieldName === 'email' && response.data?.email) {
//             localStorage.setItem("authEmail", response.data.email);
//         }
        
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response?.data?.message || "Erro ao salvar alteração do administrador.");
//     }
// }

export const deleteAdminAccount = async (idAdmin) => {
    
    if (!idAdmin) {
        throw new Error("ID do Administrador é obrigatório para exclusão.");
    }

    try {
        await api.delete(`administrador/${idAdmin}`); 

        return true; 
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Falha ao deletar a conta do administrador. Erro desconhecido.";
        throw new Error(errorMessage);
    }
};

export async function updateAdminProfile(fieldName, value) {
    const emailAuth = localStorage.getItem('authEmail');

    if (!emailAuth) {
        throw new Error("Administrador não autenticado.");
    }

    const payload = { emailAuth };

    if (fieldName === 'email') payload.email = value;
    if (fieldName === 'senha') payload.senha = value;
    if (fieldName === 'usuario') payload.usuario = value;

    const response = await api.put('/administrador/perfil', payload);

    if (fieldName === 'email') {
        localStorage.setItem('authEmail', response.data.email);
    }

    return response.data;
}