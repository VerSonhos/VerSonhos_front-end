import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ allowedRoles = [] }) {
    const { isAuthenticated, role } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />; 
}