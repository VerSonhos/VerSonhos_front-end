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

const router = createBrowserRouter([
    { path: "/", element: <Home />, },

    { path: "/sobre", element: <About />, },

    { path: "/contato", element: <Contact />, },

    { path: "/visita", element: <Visit />, },

    { path: "/doar", element: <Donate />, },

    { path: "/login", element: <Login />, },

    { path: "/cadastro", element: <Register />, },
    
    { path: "/loginAdmin", element: <LoginAdmin />, },

    { path: "/esqueceuSenha", element: <ForgotPassword />, },

    { path: "/senhaNova", element: <ChangePassword />, },

    { path: "/painelUsuario", element: <HomeUser />, },
]);

export default function  Routes() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}