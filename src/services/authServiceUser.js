import api from '../../api/axiosConfig';

export async function loginUser(email, senha) {
    const response = await api.post('/usuario/login', {
        email,
        senha
    });

    return {
        token: response.data.token, 
        userIdentifier: email
    };
}
