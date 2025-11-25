import AuthLayout from '../../layouts/AuthLayout'
import SideImage from './Components/SideImage'
import FormRegister  from './Components/FormRegister'
import styles from './styles.module.css'

export default function Register() {
    return (
        <>
            <AuthLayout>
                <section className='w-full min-h-screen flex'>
                    <SideImage />
                    <FormRegister />
                </section>
            </AuthLayout>
        </>
    )
}