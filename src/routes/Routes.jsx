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

    { path: "/about", element: <About />, },

    { path: "/contact", element: <Contact />, },

    { path: "/visit", element: <Visit />, },

    { path: "/donate", element: <Donate />, },

    { path: "/login", element: <Login />, },

    { path: "/register", element: <Register />, },
]);

export default function  Routes() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}