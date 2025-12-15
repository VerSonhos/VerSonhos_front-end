// services/profileServiceUser.js
import api from '../../api/axiosConfig';

export async function fetchUserProfileByEmail(email) {
    const response = await api.get('/usuario/profile', {
        params: {
            email: email
        }
    });
    
    return response.data;
}

export async function updateProfileField(fieldName, value) {
    const emailAuth = localStorage.getItem('authEmail');
    
    if (!emailAuth) {
        throw new Error("Usuário não autenticado. E-mail não encontrado.");
    }

    const payload = {
        emailAuth: emailAuth,
    };
    
    if (fieldName === 'email') {
        payload.novoEmail = value;
    } else {
        payload[fieldName] = value;
    }

    try {
        const response = await api.put('/usuario/atualizar', payload); 
        if (fieldName === 'email' && response.data?.email) {
            localStorage.setItem("authEmail", response.data.email);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao salvar alteração.");
    }
}

export async function updateCompanyField(idEmpresa, fieldName, value) {
    if (!idEmpresa) {
        throw new Error("ID da Empresa é obrigatório para atualização.");
    }
    
    const payload = {
        [fieldName]: value
    };

    try {
        const response = await api.put(`empresa/${idEmpresa}`, payload); 
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao salvar alteração da empresa.");
    }
}

export const deleteUserProfile = async (idUsuario) => {  
    if (!idUsuario) {
        throw new Error("ID do usuário é obrigatório para exclusão.");
    }

    try {
        const response = await api.delete(`usuario/${idUsuario}`);

        return true; 
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Falha ao deletar a conta. Erro desconhecido.";
        throw new Error(errorMessage);
    }
};