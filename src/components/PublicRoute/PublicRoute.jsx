import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function PublicRoute() {
    const { isAuthenticated, role } = useAuth();

    if (isAuthenticated) {
        let redirectPath = '/painelUsuario';
        
        if (role === 'admin') {
            redirectPath = '/painelAdmin';
        } 
        
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />; 
}