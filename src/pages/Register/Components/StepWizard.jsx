import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function StepWizard() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <>
            <form className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="emailLogin" className='text-black-custom-500 font-semibold'>E-mail:</label>
                    
                    <div className='w-full flex relative'>
                        <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type="email" placeholder='seu@email.com' name="emailLogin" id="emailLogin" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                    </div>
                </div>

                <div className='w-full flex flex-col items-start justify-center gap-2'>
                    <label htmlFor="passwordLogin" className='text-black-custom-500 font-semibold'>Senha:</label>
                    
                    <div className="w-full flex relative">
                        <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                        <input type={showPassword ? "text" : "password"} placeholder='*********' name="passwordLogin" id="passwordLogin" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        
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
        </>
    )
}