import api from '../../api/axiosConfig';

export async function loginAdmin(login, senha) {
    const response = await api.post('/administrador/login', {
        login,
        senha
    });

    return response.data.token;
}
