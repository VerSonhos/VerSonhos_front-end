import AuthLayout from '../../layouts/AuthLayout'
import SideForm from './Components/sideForm'
import SideImage from './Components/sideImage'
import styles from './styles.module.css'

export default function Login() {
    return (
        <>
            <AuthLayout>
                <SideForm />

                <SideImage />
            </AuthLayout>
        </>
    )
}