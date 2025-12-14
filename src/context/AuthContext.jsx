import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const initialToken = localStorage.getItem("authToken"); 
    
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(localStorage.getItem("authEmail") || null);
    const [name, setName] = useState(localStorage.getItem("authName") || null);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken); 

    useEffect(() => {
        if (!token) {
            setRole(null);
            setEmail(null);
            setName(null);
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

    const login = (receivedToken, receivedEmail, receivedName) => {
        localStorage.setItem("authToken", receivedToken);
        localStorage.setItem("authEmail", receivedEmail);
        localStorage.setItem("authName", receivedName);
        setToken(receivedToken); 
        setEmail(receivedEmail);
        setName(receivedName);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authEmail");
        localStorage.removeItem("authName");
        setToken(null);
        setEmail(null);
        setName(null);
        setRole(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                email,
                name,
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
