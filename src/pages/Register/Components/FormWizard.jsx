import { Link } from 'react-router-dom'
import StepWizard from './StepWizard';
import LogoForm from '../../../assets/images/Logotipo.png'
import styles from '../styles.module.css'

export default function FormWizard() {
    return (
        <>
            <section className='w-full lg:w-[50%] h-full flex flex-col items-baseline min-h-screen '>
                <section className='shadow-custom-sm w-[65%] m-auto px-10 py-5 rounded-lg'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[65%] mx-auto mb-7' />

                    <div className='text-center font-inter mb-7'>
                        <h2 className='font-bold text-2xl mb-2'>Faça seu cadastro</h2>
                        <p className='text-black-custom-400 font-medium'>Crie sua conta para continuar</p>
                    </div>

                    <StepWizard />

                    <div className='text-center flex flex-col gap-5 text-black-custom-500'>
                        <div className="flex items-center my-2">
                            <div className="flex-grow border-t border-black-custom-400"></div>
                            
                            <p className="mx-4 whitespace-nowrap">
                                Entrar na conta
                            </p>
                            
                            <div className="flex-grow border-t border-black-custom-400"></div>
                        </div>

                        <p>
                            Já tem uma conta? <Link to={'/login'} className='text-center text-tertiary hover:text-tertiary-400 transition ease-in-out italic'>Entrar na conta</Link>
                        </p>
                    </div>
                </section>
            </section>
        </>
    )
}