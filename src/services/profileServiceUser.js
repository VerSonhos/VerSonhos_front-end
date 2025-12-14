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