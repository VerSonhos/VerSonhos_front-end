import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoIosMail, IoIosPaper } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { TbPencilStar, TbNumber } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaNewspaper, FaLocationDot } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi";
import { FaUser, FaCity, FaWifi } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { GoGoal } from "react-icons/go";

export default function StepWizard() {
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
            <form className='w-full mb-5'>
                <section id='firstStep' className='w-full flex flex-col justify-center items-center gap-5'>
                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
                        
                        <div className='w-full flex relative'>
                            <IoDocumentText className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='Digite a razão social...' name="razaoSocial" id="razaoSocial" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="nomeFantasia" className='text-black-custom-500 font-semibold'>Nome fantasia:</label>
                        
                        <div className='w-full flex relative'>
                            <TbPencilStar className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='Digite o nome fantasia...' name="nomeFantasia" id="nomeFantasia" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="cnpj" className='text-black-custom-500 font-semibold'>CNPJ:</label>
                        
                        <div className='w-full flex relative'>
                            <IoIosPaper className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='99.999.999/9999-99' name="cnpj" id="cnpj" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Inscrição estadual/municipal:</label>
                        
                        <div className='w-full flex relative'>
                            <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='110.042.490.114' name="razaoSocial" id="razaoSocial" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <Link to={'/painelUsuario'} className='bg-tertiary text-center hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                        Próximo
                    </Link>

                    <button type='button' className='bg-tertiary hidden hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                        Próximo
                    </button>
                </section>

                <section id='secondStep' className='w-full hidden flex-col justify-center items-center gap-5'>
                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="nomeRegister" className='text-black-custom-500 font-semibold'>Nome completo:</label>
                        
                        <div className='w-full flex relative'>
                            <FaUser className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='Digite seu nome completo...' name="nomeRegister" id="nomeRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="cargoRegister" className='text-black-custom-500 font-semibold'>Cargo/Função na empresa:</label>
                        
                        <div className='w-full flex relative'>
                            <BiTargetLock className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='Informe seu cargo/função' name="cargoRegister" id="cargoRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="cpf" className='text-black-custom-500 font-semibold'>CPF:</label>
                        
                        <div className='w-full flex relative'>
                            <FaNewspaper className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='999.999.999-9' name="cpf" id="cpf" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="phoneRegister" className='text-black-custom-500 font-semibold'>Telefone:</label>
                        
                        <div className='w-full flex relative'>
                            <FaPhoneAlt className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='(11) 99999-9999' name="phoneRegister" id="phoneRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="emailRegister" className='text-black-custom-500 font-semibold'>E-mail:</label>
                        
                        <div className='w-full flex relative'>
                            <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='seu@email.com' name="emailRegister" id="emailRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='flex w-full gap-5'>
                        <button type='button' className='bg-quintenary hover:bg-quintenary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Voltar
                        </button>

                        <button type='button' className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Próximo
                        </button>
                    </div>
                </section>

                <section id='thirdStep' className='w-full hidden flex-col justify-center items-center gap-5'>
                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="cepRegister" className='text-black-custom-500 font-semibold'>CEP:</label>
                        
                        <div className='w-full flex relative'>
                            <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='99999-999' name="cepRegister" id="cepRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="enderecoRegister" className='text-black-custom-500 font-semibold'>Endereço:</label>
                        
                        <div className='w-full flex relative'>
                            <FaLocationDot className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='rua, número, bairro e estado' name="enderecoRegister" id="enderecoRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="cidadeRegister" className='text-black-custom-500 font-semibold'>
                            Cidade:
                        </label>

                        <div className='w-full flex relative'>
                            <FaCity className='text-xl text-black-custom-400 absolute left-2 top-2.5' />
                            <select
                                name="cidadeRegister"
                                id="cidadeRegister"
                                className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4 appearance-none cursor-pointer'
                                >
                                <option value="" disabled selected>Informe a cidade</option>
                                <option value="sao-paulo">São Paulo</option>
                                <option value="rio-de-janeiro">Rio de Janeiro</option>
                                <option value="belo-horizonte">Belo Horizonte</option>
                                <option value="curitiba">Curitiba</option>
                                <option value="porto-alegre">Porto Alegre</option>
                            </select>

                            {/* Ícone da setinha do select */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-black-custom-400 absolute right-3 top-3 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="setorRegister" className='text-black-custom-500 font-semibold'>Setor de atuação:</label>
                        
                        <div className='w-full flex relative'>
                            <RiFilePaper2Line className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='Informe o setor de atuação' name="setorRegister" id="setorRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="socialRegister" className='text-black-custom-500 font-semibold'>Site ou redes sociais oficiais:</label>
                        
                        <div className='w-full flex relative'>
                            <FaWifi  className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type="text" placeholder='Informe o site ou a rede social oficial' name="socialRegister" id="socialRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                        </div>
                    </div>

                    <div className='flex w-full gap-5'>
                        <button type='button' className='bg-quintenary hover:bg-quintenary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Voltar
                        </button>

                        <button type='button' className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Próximo
                        </button>
                    </div>
                </section>

                <section id='fourthStep' className='w-full hidden flex-col justify-center items-center gap-5'>
                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="passwordRegister" className='text-black-custom-500 font-semibold'>Senha:</label>
                        
                        <div className="w-full flex relative">
                            <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type={showPassword ? "text" : "password"} placeholder='*********' name="passwordRegister" id="passwordRegister" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                            
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
                        <label htmlFor="passwordRegisterConfirm" className='text-black-custom-500 font-semibold'>Confirme a senha:</label>
                        
                        <div className="w-full flex relative">
                            <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                            <input type={showConfirmPassword ? "text" : "password"} placeholder='*********' name="passwordRegisterConfirm" id="passwordRegisterConfirm" className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                            
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

                    <div className='w-full flex flex-col items-start justify-center gap-2'>
                        <label htmlFor="objetivoRegister" className='text-black-custom-500 font-semibold'>
                            Objetivo do cadastro:
                        </label>

                        <div className='w-full flex relative'>
                            <GoGoal className='text-xl text-black-custom-400 absolute left-2 top-2.5' />
                            <select
                                name="objetivoRegister"
                                id="objetivoRegister"
                                className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4 appearance-none cursor-pointer'
                                >
                                <option value="" disabled selected>tipo: parceria ou contratante</option>
                                <option value="parceria">Parceria</option>
                                <option value="contratante">Contratante</option>
                            </select>

                            {/* Ícone da setinha do select */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-black-custom-400 absolute right-3 top-3 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <div className='flex w-full gap-5'>
                        <button type='button' className='bg-quintenary hover:bg-quintenary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Voltar
                        </button>

                        <button type='button' className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Cadastrar
                        </button>
                    </div>
                </section>
            </form>
        </>
    )
}