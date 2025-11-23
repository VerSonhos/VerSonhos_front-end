import { useState, useEffect } from 'react';
import { IoIosMail, IoIosPaper } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { TbPencilStar, TbNumber } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi";
import { FaUser, FaCity, FaWifi } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { MdWork } from "react-icons/md";
import { PiCityFill } from "react-icons/pi";
import { HiInformationCircle } from "react-icons/hi";
import ModalRegister from './ModalRegister';
import { applyMask } from "@/utils/masks";
import { getCidadesSP } from '../../../../api/ibgeCidades';

export default function FormWizard() {
    const [step, setStep] = useState(1);
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        const carregarCidades = async () => {
            const lista = await getCidadesSP();
            setCidades(lista);
        };
        carregarCidades();
    }, []);

    const [formData, setFormData] = useState({
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        numeroInscricao: '',

        nomeRegister: '',
        cargoRegister: '',
        phoneRegister: '',
        emailRegister: '',

        cepRegister: '',
        enderecoRegister: '',
        cidadeRegister: '',
        setorRegister: '',
        socialRegister: '',

        passwordRegister: '',
        passwordRegisterConfirm: '',
        objetivoRegister: '',
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

        if (name === "cnpj") maskedValue = applyMask(value, "cnpj");
        if (name === "numeroInscricao") maskedValue = applyMask(value, "inscricao");
        if (name === "phoneRegister") maskedValue = applyMask(value, "phone");
        if (name === "cepRegister") maskedValue = applyMask(value, "cep");

        setFormData({ ...formData, [name]: maskedValue });
        setErrors({ ...errors, [name]: "" });
    };

    const validateStep = () => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.razaoSocial.trim()) newErrors.razaoSocial = 'Campo obrigatório';
            if (!formData.nomeFantasia.trim()) newErrors.nomeFantasia = 'Campo obrigatório';
            if (!formData.cnpj.trim()) newErrors.cnpj = 'Campo obrigatório';
            if (!formData.numeroInscricao.trim()) newErrors.numeroInscricao = 'Campo obrigatório';
        }
        if (step === 2) {
            if (!formData.nomeRegister.trim()) newErrors.nomeRegister = 'Campo obrigatório';
            if (!formData.cargoRegister.trim()) newErrors.cargoRegister = 'Campo obrigatório';
            if (!formData.phoneRegister.trim()) newErrors.phoneRegister = 'Campo obrigatório';
            if (!formData.emailRegister.trim()) newErrors.emailRegister = 'Campo obrigatório';
        }
        if (step === 3) {
            if (!formData.cepRegister.trim()) newErrors.cepRegister = 'Campo obrigatório';
            if (!formData.enderecoRegister.trim()) newErrors.enderecoRegister = 'Campo obrigatório';
            if (!formData.cidadeRegister.trim()) newErrors.cidadeRegister = 'Campo obrigatório';
            if (!formData.setorRegister.trim()) newErrors.setorRegister = 'Campo obrigatório';
            if (!formData.socialRegister.trim()) newErrors.socialRegister = 'Campo obrigatório';
        }
        if (step === 4) {
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
            if (!formData.objetivoRegister.trim()) newErrors.objetivoRegister = 'Campo obrigatório';
            if (!formData.termosLgpd) newErrors.termosLgpd = 'Campo obrigatório';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) setStep(step + 1);
    };

    const prevStep = () => {
        setErrors({});
        setStep(step - 1);
    };

    return (
        <>
            <form className='w-full mb-5'>
                <section className='flex flex-wrap justify-center items-center gap-2 md:gap-8 mb-2'>
                    {[
                        { Icon: PiCityFill, label: "Empresa" },
                        { Icon: MdWork, label: "Representante" },
                        { Icon: FaLocationDot, label: "Localização" },
                        { Icon: HiInformationCircle, label: "Informações adicionais" },
                    ].map(({ Icon, label }, i) => (
                        <div key={i} className="flex w-24 flex-col justify-between items-center">
                            <div
                                className={`border-2 p-2 rounded-full ${
                                    i + 1 === step
                                    ? "border-blue-500 text-blue-500"
                                    : "border-gray-300 text-gray-400"
                                }`}
                            >
                                <Icon className="text-2xl" />
                            </div>

                            <p className={`h-12 text-center text-sm ${i + 1 === step ? 'text-black-custom' : 'text-black-custom-400'} mt-1`}>
                                {label}
                            </p>
                        </div>
                    ))}
                </section>

                {step === 1 && (
                    <section id='firstStep' className='w-full flex flex-col justify-center items-center gap-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="razaoSocial" className='text-black-custom-500 font-semibold'>Razão social:</label>
                            
                            <div className='w-full flex relative'>
                                <IoDocumentText className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.razaoSocial} placeholder='Digite a razão social...' name="razaoSocial" id="razaoSocial" className={`bg-gray-100 border-2 ${errors['razaoSocial'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>
                            {errors['razaoSocial'] && <p className='text-red-500 text-sm'>{errors['razaoSocial']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="nomeFantasia" className='text-black-custom-500 font-semibold'>Nome fantasia:</label>
                            
                            <div className='w-full flex relative'>
                                <TbPencilStar className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.nomeFantasia} placeholder='Digite o nome fantasia...' name="nomeFantasia" id="nomeFantasia" className={`bg-gray-100 border-2 ${errors['nomeFantasia'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>
                            {errors['nomeFantasia'] && <p className='text-red-500 text-sm'>{errors['nomeFantasia']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="cnpj" className='text-black-custom-500 font-semibold'>CNPJ:</label>
                            
                            <div className='w-full flex relative'>
                                <IoIosPaper className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.cnpj} placeholder='99.999.999/9999-99' name="cnpj" id="cnpj" className={`bg-gray-100 border-2 ${errors['cnpj'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>
                            {errors['cnpj'] && <p className='text-red-500 text-sm'>{errors['cnpj']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="numeroInscricao" className='text-black-custom-500 font-semibold'>Inscrição estadual/municipal:</label>
                            
                            <div className='w-full flex relative'>
                                <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.numeroInscricao} placeholder='110.042.490.114' name="numeroInscricao" id="numeroInscricao" className={`bg-gray-100 border-2 ${errors['numeroInscricao'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>
                            {errors['numeroInscricao'] && <p className='text-red-500 text-sm'>{errors['numeroInscricao']}</p>}
                        </div>

                        <button type='button' onClick={nextStep} className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            Próximo
                        </button>
                    </section>
                )}

                {step === 2 && (
                    <section id='secondStep' className='flex w-full flex-col justify-center items-center gap-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="nomeRegister" className='text-black-custom-500 font-semibold'>Nome completo:</label>
                            
                            <div className='w-full flex relative'>
                                <FaUser className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.nomeRegister} placeholder='Digite seu nome completo...' name="nomeRegister" id="nomeRegister" className={`bg-gray-100 border-2 ${errors['nomeRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>

                            {errors['nomeRegister'] && <p className='text-red-500 text-sm'>{errors['nomeRegister']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="cargoRegister" className='text-black-custom-500 font-semibold'>Cargo/Função na empresa:</label>
                            
                            <div className='w-full flex relative'>
                                <BiTargetLock className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.cargoRegister} placeholder='Informe seu cargo/função' name="cargoRegister" id="cargoRegister" className={`bg-gray-100 border-2 ${errors['cargoRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>

                            {errors['cargoRegister'] && <p className='text-red-500 text-sm'>{errors['cargoRegister']}</p>}
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

                        <div className='flex w-full gap-5'>
                            <button type='button' onClick={prevStep} className='bg-quintenary hover:bg-quintenary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                                Voltar
                            </button>

                            <button type='button' onClick={nextStep} className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                                Próximo
                            </button>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section id='thirdStep' className='flex w-full flex-col justify-center items-center gap-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="cepRegister" className='text-black-custom-500 font-semibold'>CEP:</label>
                            
                            <div className='w-full flex relative'>
                                <TbNumber className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.cepRegister} placeholder='99999-999' name="cepRegister" id="cepRegister" className={`bg-gray-100 border-2 ${errors['cepRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>

                            {errors['cepRegister'] && <p className='text-red-500 text-sm'>{errors['cepRegister']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="enderecoRegister" className='text-black-custom-500 font-semibold'>Endereço:</label>
                            
                            <div className='w-full flex relative'>
                                <FaLocationDot className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.enderecoRegister} placeholder='rua, número, bairro e estado' name="enderecoRegister" id="enderecoRegister" className={`bg-gray-100 border-2 ${errors['enderecoRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>

                            {errors['enderecoRegister'] && <p className='text-red-500 text-sm'>{errors['enderecoRegister']}</p>}
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
                                    value={formData.cidadeRegister}
                                    onChange={handleChange}
                                    className={`bg-gray-100 border-2 ${errors['cidadeRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4 appearance-none cursor-pointer`} 
                                    >
                                    <option value="" disabled>Informe a cidade</option>
                                    {cidades.map((cidade) => (
                                        <option key={cidade} value={cidade}>{cidade}</option>
                                    ))}
                                </select>

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

                            {errors['cidadeRegister'] && <p className='text-red-500 text-sm'>{errors['cidadeRegister']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="setorRegister" className='text-black-custom-500 font-semibold'>Setor de atuação:</label>
                            
                            <div className='w-full flex relative'>
                                <RiFilePaper2Line className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.setorRegister} placeholder='Informe o setor de atuação' name="setorRegister" id="setorRegister" className={`bg-gray-100 border-2 ${errors['setorRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>

                            {errors['setorRegister'] && <p className='text-red-500 text-sm'>{errors['setorRegister']}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="socialRegister" className='text-black-custom-500 font-semibold'>Site ou redes sociais oficiais:</label>
                            
                            <div className='w-full flex relative'>
                                <FaWifi className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="text" onChange={handleChange} value={formData.socialRegister} placeholder='Informe o site ou a rede social oficial' name="socialRegister" id="socialRegister" className={`bg-gray-100 border-2 ${errors['socialRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4`} />
                            </div>

                            {errors['socialRegister'] && <p className='text-red-500 text-sm'>{errors['socialRegister']}</p>}
                        </div>

                        <div className='flex w-full gap-5'>
                            <button type='button' onClick={prevStep} className='bg-quintenary hover:bg-quintenary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                                Voltar
                            </button>

                            <button type='button' onClick={nextStep} className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                                Próximo
                            </button>
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section id='fourthStep' className='flex w-full flex-col justify-center items-center gap-5'>
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

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="objetivoRegister" className='text-black-custom-500 font-semibold'>
                                Objetivo do cadastro:
                            </label>

                            <div className='w-full flex relative'>
                                <GoGoal className='text-xl text-black-custom-400 absolute left-2 top-2.5' />
                                <select
                                    name="objetivoRegister"
                                    id="objetivoRegister"
                                    value={formData.objetivoRegister}
                                    onChange={handleChange}
                                    className={`bg-gray-100 border-2 ${errors['objetivoRegister'] ? 'border-red-500' : 'border-gray-300 focus:border-tertiary'} outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4 appearance-none cursor-pointer`}
                                    >
                                    <option value="" disabled>tipo: parceria ou contratante</option>
                                    <option value="parceria">Parceria</option>
                                    <option value="contratante">Contratante</option>
                                </select>

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

                            {errors['objetivoRegister'] && <p className='text-red-500 text-sm'>{errors['objetivoRegister']}</p>}
                        </div>

                        <div className='w-full flex items-start justify-center gap-2'>
                            <input type="checkbox" onChange={(e) => {setFormData({ ...formData, termosLgpd: e.target.checked }); setErrors({ ...errors, termosLgpd: '' });}} checked={formData.termosLgpd} id='termosLgpd' name='termosLgpd' className="mt-1 accent-blue-600"/>
                            
                            <label htmlFor='termosLgpd' className="flex items-center flex-wrap gap-2 select-none">                            
                                <p className={`${errors['termosLgpd'] ? 'text-red-500' : ''}`}> 
                                    Li e concordo com os <ModalRegister className="contents" /> conforme a LGPD.
                                </p>
                            </label>
                        </div>

                        <div className='flex w-full gap-5'>
                            <button type='button' onClick={prevStep} className='bg-quintenary hover:bg-quintenary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                                Voltar
                            </button>

                            <button type='button' onClick={validateStep} className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                                Cadastrar
                            </button>
                        </div>
                    </section>
                )}
            </form>
        </>
    )
}