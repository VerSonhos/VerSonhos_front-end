import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Visit from '../pages/Visit/Visit'
import Contact from '../pages/Contact/Contact'
import Donate from '../pages/Donate/Donate'
import Login from '../pages/Login/Login'
import LoginAdmin from '../pages/LoginAdmin/AdminLogin'
import Register from '../pages/Register/Register'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import ChangePassword from '../pages/ChangePassword/ChangePassword'
import HomeUser from '../pages/HomeUser/HomeUser'
import HistoricoAgendamentoAdm from '../pages/HistoricoAgendamentoAdm/HistoricoAgendamentoAdm'
import HomeUserAgendarVisita from '../pages/HomeUserAgendarVisita/HomeUserAgendarVisita'
import RequestsAdm from '@/pages/RequestsAdm/RequestsAdm'
import HomeAdmin from '@/pages/HomeAdmin/HomeAdmin'
import SettingsAdmin from '@/pages/SettingsAdmin/SettingsAdmin'
import SettingsUser from '@/pages/SettingsUser/SettingsUser'

const router = createBrowserRouter([
    // Páginas principais
    { path: "/", element: <Home />, },

    { path: "/sobre", element: <About />, },

    { path: "/contato", element: <Contact />, },

    { path: "/visita", element: <Visit />, },

    { path: "/doar", element: <Donate />, },

    // Páginas de autenticação
    { path: "/login", element: <Login />, },

    { path: "/cadastro", element: <Register />, },
    
    { path: "/loginAdmin", element: <LoginAdmin />, },

    { path: "/esqueceuSenha", element: <ForgotPassword />, },

    { path: "/senhaNova", element: <ChangePassword />, },

    // Dashboard do usuário
    { path: "/painelUsuario", element: <HomeUser />, },

    { path: "/historicoAgendamentoAdm", element: <HistoricoAgendamentoAdm/>, },

    { path: "/painelUsuarioAgendarVisita", element: <HomeUserAgendarVisita />, },

    { path: "/configuracoesUsuario", element: <SettingsUser />, },
    
    // Dashboard do administrador
    { path: "/painelAdmin", element: <HomeAdmin />, },

    { path: "/painelAdminSolicitacao", element: <RequestsAdm />, },
    
    { path: "/configuracoesAdmin", element: <SettingsAdmin />, },
]);

export default function  Routes() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}