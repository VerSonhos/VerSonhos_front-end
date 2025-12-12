import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const initialToken = localStorage.getItem("authToken"); 
    
    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken); 

    useEffect(() => {
        if (!token) {
            setRole(null);
            setIsAuthenticated(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            
            if (decoded.exp * 1000 < Date.now()) {
                console.warn("Token expirado. Fazendo logout.");
                logout();
                return;
            }

            const extractedRole = decoded.role === "ROLE_ADMIN" ? "admin" : "user";

            setRole(extractedRole);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Token inválido:", error);
            logout();
        }
    }, [token]);

    const login = (receivedToken) => {
        localStorage.setItem("authToken", receivedToken);
        setToken(receivedToken); 
    };


    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        setRole(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
