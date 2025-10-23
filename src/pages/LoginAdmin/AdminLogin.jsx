import AuthLayout from '../../layouts/AuthLayout'
import SideForm from './Components/SideForm'
import SideImage from './Components/SideImage'
import styles from './styles.module.css'

export default function AdminLogin() {
    return (
        <>
            <AuthLayout>
                <section className='w-full min-h-screen flex'>
                    <SideForm />

                    <SideImage />
                </section>
            </AuthLayout>
        </>
    )
}