import { useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import ModalRegister from './ModalRegister';
import { applyMask } from "@/utils/masks";

export default function FormUser() {
    const [formData, setFormData] = useState({
        nomeRegister: '',
        phoneRegister: '',
        emailRegister: '',
        passwordRegister: '',
        passwordRegisterConfirm: '',
        termosLgpd: '',
    });
    
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let maskedValue = value;

        if (name === "phoneRegister") maskedValue = applyMask(value, "phone");

        setFormData({ ...formData, [name]: maskedValue });
        setErrors({ ...errors, [name]: "" });
    };

    const validateStep = () => {
        const newErrors = {};

        if (!formData.nomeRegister.trim()) newErrors.nomeRegister = 'Campo obrigatório';
        if (!formData.phoneRegister.trim()) newErrors.phoneRegister = 'Campo obrigatório';
        if (!formData.emailRegister.trim()) newErrors.emailRegister = 'Campo obrigatório';
        if (!formData.passwordRegister.trim()) newErrors.passwordRegister = 'Campo obrigatório';
        if (!formData.passwordRegisterConfirm.trim()) newErrors.passwordRegisterConfirm = 'Campo obrigatório';
        if (
            formData.passwordRegister.trim() &&
            formData.passwordRegisterConfirm.trim() &&
            formData.passwordRegister !== formData.passwordRegisterConfirm
        ) 
        {
            newErrors.passwordRegister = 'As senhas não coincidem';
            newErrors.passwordRegisterConfirm = 'As senhas não coincidem';
        }
        if (!formData.termosLgpd) newErrors.termosLgpd = 'Campo obrigatório';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            <form className='w-full mb-5'>
                <section id='fourthStep' className='flex w-full flex-col justify-center items-center gap-5'>
                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="nomeRegister" className='text-black-custom-500 font-semibold'>Nome completo:</label>
                        
                        <div className='w-full flex relative'>
                            <FaUser className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" onChange={handleChange} value={formData.nomeRegister} placeholder='Digite seu nome completo...' name="nomeRegister" id="nomeRegister" className={`bg-gray-100 border-2 ${errors['nomeRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                        </div>

                        {errors['nomeRegister'] && <p className='text-red-500 text-sm'>{errors['nomeRegister']}</p>}
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="phoneRegister" className='text-black-custom-500 font-semibold'>Telefone:</label>
                        
                        <div className='w-full flex relative'>
                            <FaPhoneAlt className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" onChange={handleChange} value={formData.phoneRegister} placeholder='(11) 99999-9999' name="phoneRegister" id="phoneRegister" className={`bg-gray-100 border-2 ${errors['phoneRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                        </div>

                        {errors['phoneRegister'] && <p className='text-red-500 text-sm'>{errors['phoneRegister']}</p>}
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="emailRegister" className='text-black-custom-500 font-semibold'>E-mail:</label>
                        
                        <div className='w-full flex relative'>
                            <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="email" onChange={handleChange} value={formData.emailRegister} placeholder='seu@email.com' name="emailRegister" id="emailRegister" className={`bg-gray-100 border-2 ${errors['emailRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                        </div>

                        {errors['emailRegister'] && <p className='text-red-500 text-sm'>{errors['emailRegister']}</p>}
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="passwordRegister" className='text-black-custom-500 font-semibold'>Senha:</label>
                        
                        <div className="w-full flex relative">
                            <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type={showPassword ? "text" : "password"} onChange={handleChange} value={formData.passwordRegister} placeholder='*********' name="passwordRegister" id="passwordRegister" className={`bg-gray-100 border-2 ${errors['passwordRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            
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

                        {errors['passwordRegister'] && <p className='text-red-500 text-sm'>{errors['passwordRegister']}</p>}
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="passwordRegisterConfirm" className='text-black-custom-500 font-semibold'>Confirme a senha:</label>
                        
                        <div className="w-full flex relative">
                            <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type={showConfirmPassword ? "text" : "password"} onChange={handleChange} value={formData.passwordRegisterConfirm} placeholder='*********' name="passwordRegisterConfirm" id="passwordRegisterConfirm" className={`bg-gray-100 border-2 ${errors['passwordRegisterConfirm'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            
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

                        {errors['passwordRegisterConfirm'] && <p className='text-red-500 text-sm'>{errors['passwordRegisterConfirm']}</p>}
                    </div>

                    <div className='w-full flex items-start justify-center gap-2'>
                        <input type="checkbox" onChange={(e) => {setFormData({ ...formData, termosLgpd: e.target.checked }); setErrors({ ...errors, termosLgpd: '' });}} checked={formData.termosLgpd} id='termosLgpd' name='termosLgpd' className="mt-1 accent-blue-600"/>
                        
                        <label htmlFor='termosLgpd' className="flex items-center flex-wrap gap-2 select-none">                            
                            <p className={`${errors['termosLgpd'] ? 'text-red-500' : ''}`}> 
                                Li e concordo com os <ModalRegister className="contents" /> conforme a LGPD.
                            </p>
                        </label>
                    </div>

                    <div className='flex justify-center w-full'>
                        <button type='button' onClick={validateStep} className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Cadastrar
                        </button>
                    </div>
                </section>
            </form>
        </>
    )
}