import AuthLayout from '../../layouts/AuthLayout'
import Form from './Components/Form'
import styles from './styles.module.css'

export default function AdminLogin() {
    return (
        <>
            <AuthLayout>
                <Form />
            </AuthLayout>
        </>
    )
}