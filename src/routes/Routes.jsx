import { RouterProvider, createBrowserRouter} from 'react-router-dom'

import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Visit from '../pages/Visit/Visit'
import Contact from '../pages/Contact/Contact'
import Donate from '../pages/Donate/Donate'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

const router = createBrowserRouter([
    { path: "/", element: <Home />, },

    { path: "/sobre", element: <About />, },

    { path: "/contato", element: <Contact />, },

    { path: "/visita", element: <Visit />, },

    { path: "/doar", element: <Donate />, },

    { path: "/login", element: <Login />, },

    { path: "/cadastro", element: <Register />, },
]);

export default function  Routes() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}