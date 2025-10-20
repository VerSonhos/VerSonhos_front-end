import { Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosMail } from "react-icons/io";
import LogoForm from '../../../assets/images/Logotipo.png'
import styles from '../styles.module.css'

export default function Form() {
    return (
        <>
            <section className='w-full h-screen flex flex-col items-baseline bg-gradient-to-t from-quintenary  to-tertiary'>
                <Link to={'/login'} className='flex justify-center items-center gap-2 font-inter font-bold text-lg mt-5 ms-5 text-white-custom text-shadow'>
                    <span className='text-black-custom text-xl bg-white-custom rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar
                </Link>

                <section className='shadow-custom-sm w-[90%] lg:w-[40%] m-auto px-10 py-15 rounded-lg bg-white-custom'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[65%] mx-auto mb-7' />

                    <div className='text-center font-inter mb-7'>
                        <h2 className='font-bold text-2xl mb-2'>Recupere sua senha</h2>
                        <p className='text-black-custom-400 font-medium'>Digite seu E-mail</p>
                    </div>

                    <form className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="emailForgot" className='text-black-custom-500 font-semibold'>E-mail:</label>
                            
                            <div className='w-full flex relative'>
                                <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="email" placeholder='seu@email.com' name="emailForgot" id="emailForgot" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                            </div>
                        </div>

                        <button type='button' className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[70%] py-1 mt-2 rounded-sm cursor-pointer shadow-sm'>
                            Enviar
                        </button>
                    </form>

                    <div className='text-center flex flex-col gap-5 text-black-custom-500'>
                        <p>
                            Lembrou da sua senha? <Link to={'/login'} className='text-center text-tertiary hover:text-tertiary-400 transition ease-in-out italic'>Voltar</Link>
                        </p>
                    </div>
                </section>
            </section>
        </>
    )
}