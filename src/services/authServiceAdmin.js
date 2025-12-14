import api from '../../api/axiosConfig';

export async function loginAdmin(login, senha) {
    const response = await api.post('/administrador/login', {
        login,
        senha
    });

    return {
        token: response.data.token,
        userIdentifier: login
    };
}
