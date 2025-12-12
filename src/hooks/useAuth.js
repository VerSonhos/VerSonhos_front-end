import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const token = localStorage.getItem("authToken");
    const isAuthenticated = !!token;

    let role = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role === "ROLE_ADMIN" ? "admin" : "user";
        } catch (err) {
            console.error("Token inválido:", err);
            role = null;
        }
    }

    return { isAuthenticated, role };
}
