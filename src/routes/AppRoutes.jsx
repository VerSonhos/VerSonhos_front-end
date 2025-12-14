import Routes from './Routes.jsx'
import { AuthProvider } from "@/context/AuthContext.jsx";

export default function Root() {
    return (
        <>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </>
    )
}