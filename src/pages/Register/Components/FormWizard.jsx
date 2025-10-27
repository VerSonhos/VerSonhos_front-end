import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import StepWizard from './StepWizard';
import LogoForm from '../../../assets/images/Logotipo.png'

export default function FormWizard() {
    return (
        <>
            <section className='w-full lg:w-[50%] h-full flex flex-col gap-10 pb-10 lg:pt-10 items-baseline min-h-screen'>
                <Link to={'/login'} className='flex lg:hidden justify-center items-center gap-2 font-inter font-bold text-lg mt-5 ms-5 py-0.5 px-3 rounded-lg bg-tertiary text-white-custom'>
                    <span className='text-tertiary text-xl bg-white-custom rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar
                </Link>

                <section className='shadow-custom-sm w-[90%] md:w-[65%] m-auto px-10 py-5 rounded-lg'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[80%] md:w-[65%] mx-auto mb-7' />

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