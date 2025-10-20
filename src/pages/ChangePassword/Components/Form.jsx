import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import LogoForm from '../../../assets/images/Logotipo.png'
import styles from '../styles.module.css'

export default function Form() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <section className='w-full h-screen flex flex-col items-baseline bg-gradient-to-t from-quintenary  to-tertiary'>
                <Link to={'/'} className='flex justify-center items-center gap-2 font-inter font-bold text-lg mt-5 ms-5 text-white-custom text-shadow'>
                    <span className='text-black-custom text-xl bg-white-custom rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar ao ínicio
                </Link>

                <section className='shadow-custom-sm w-[90%] lg:w-[40%] m-auto px-10 py-10 rounded-lg bg-white-custom'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[65%] mx-auto mb-7' />

                    <div className='text-center font-inter mb-7'>
                        <h2 className='font-bold text-2xl mb-2'>Sua nova senha</h2>
                        <p className='text-black-custom-400 font-medium'>Digite sua nova senha</p>
                    </div>

                    <form className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="passwordChange" className='text-black-custom-500 font-semibold'>Senha nova:</label>
                            
                            <div className="w-full flex relative">
                                <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type={showPassword ? "text" : "password"} placeholder='*********' name="passwordChange" id="passwordChange" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                                
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

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="passwordChangeConfirm" className='text-black-custom-500 font-semibold'>Confirme a senha:</label>
                            
                            <div className="w-full flex relative">
                                <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type={showConfirmPassword ? "text" : "password"} placeholder='*********' name="passwordChangeConfirm" id="passwordChangeConfirm" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                                
                                <button 
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility} 
                                    className='absolute right-2 top-2.5 cursor-pointer'
                                    aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {showConfirmPassword ? (
                                    <FaEyeSlash className='text-xl text-black-custom-400'/>
                                    ) : (
                                    <IoEyeSharp className='text-xl text-black-custom-400'/>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type='button' className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-2 rounded-sm cursor-pointer shadow-sm'>
                            Confirmar
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