import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowBack, IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import LogoForm from '../../../assets/images/Logotipo.png'
import styles from '../styles.module.css'

export default function SideForm() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <section className='w-full lg:w-[50%] min-h-screen flex flex-col items-baseline'>
                <Link to={'/'} className='flex justify-center items-center gap-2 font-inter font-bold text-lg mt-5 ms-5'>
                    <span className='text-white-custom text-xl bg-black-custom rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar ao ínicio
                </Link>

                <section className='shadow-custom-sm w-[65%] m-auto px-10 py-5 rounded-lg'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[65%] mx-auto mb-7' />

                    <div className='text-center font-inter mb-7'>
                        <h2 className='font-bold text-2xl mb-2'>Bem-vindo</h2>
                        <p className='text-black-custom-400 font-medium'>Entre na sua conta para continuar</p>
                    </div>

                    <form className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="emailLoginAdmin" className='text-black-custom-500 font-semibold'>E-mail:</label>
                            
                            <div className='w-full flex relative'>
                                <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="email" placeholder='seu@email.com' name="emailLoginAdmin" id="emailLoginAdmin" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="passwordLoginAdmin" className='text-black-custom-500 font-semibold'>Senha:</label>
                            
                            <div className="w-full flex relative">
                                <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type={showPassword ? "text" : "password"} placeholder='*********' name="passwordLoginAdmin" id="passwordLoginAdmin" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                                
                                <button 
                                    type="button"
                                    onClick={togglePasswordVisibility} 
                                    className='absolute right-2 top-2.5 cursor-pointer'
                                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {showPassword ? (
                                    <FaEyeSlash className='text-xl text-black-custom-400'/>
                                    ) : (
                                    <IoEyeSharp className='text-xl text-black-custom-400'/>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type='button' className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Entrar
                        </button>
                    </form>

                    <div className='text-center flex flex-col gap-5 text-black-custom-500'>
                        <div className="flex items-center my-2">
                            <div className="flex-grow border-t border-black-custom-400"></div>
                            
                            <p className="mx-4 whitespace-nowrap">
                                Esqueceu sua senha?
                            </p>
                            
                            <div className="flex-grow border-t border-black-custom-400"></div>
                        </div>

                        <p>
                            Entre em contato com administrador!
                        </p>
                    </div>
                </section>
            </section>
        </>
    )
}