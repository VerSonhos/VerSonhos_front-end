import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowBack, IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import LogoForm from '../../../assets/images/Logotipo.png'
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert";
import { loginUser} from '@/services/authServiceUser';
import { fetchUserProfileByEmail } from '@/services/profileServiceUser';
import { useAuth } from '@/context/AuthContext';
import styles from '../styles.module.css'

export default function SideForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !senha) {
            setErrorMessage("Preencha todos os campos!");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        try {
            setLoading(true);

            const { token, userIdentifier } = await loginUser(email, senha);
            const profileData = await fetchUserProfileByEmail(userIdentifier); 
            const nomeCompleto = profileData.nomeCompleto;
            
            login(token, userIdentifier, nomeCompleto);

            setTimeout(() => navigate("/painelUsuario"), 100);

        } catch (error) {
            console.error("Erro ao logar:", error);

            setErrorMessage(
                error.response?.data?.message ||
                "E-mail ou senha inválidos"
            );

            setTimeout(() => setErrorMessage(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {errorMessage && <ErrorAlert message={errorMessage} />}

            <section className='w-full lg:w-[50%] min-h-screen flex flex-col items-baseline'>
                <Link to={'/'} className='flex justify-center items-center gap-2 font-inter font-bold text-lg mt-5 ms-5'>
                    <span className='text-white-custom text-xl bg-black-custom rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar ao ínicio
                </Link>

                <section className='shadow-custom-sm w-[90%] md:w-[65%] m-auto px-10 py-5 my-10 rounded-lg'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[80%] md:w-[65%] mx-auto mb-7' />

                    <div className='text-center font-inter mb-7'>
                        <h2 className='font-bold text-2xl mb-2'>Bem-vindo</h2>
                        <p className='text-black-custom-400 font-medium'>Entre na sua conta para continuar</p>
                    </div>

                    <form className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="emailLogin" className='text-black-custom-500 font-semibold'>E-mail:</label>
                            
                            <div className='w-full flex relative'>
                                <IoIosMail className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type="email" placeholder='seu@email.com' name="emailLogin" id="emailLogin" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <label htmlFor="passwordLogin" className='text-black-custom-500 font-semibold'>Senha:</label>
                            
                            <div className="w-full flex relative">
                                <RiLockPasswordFill className='text-xl text-black-custom-400 absolute left-2 top-2.5'/>
                                <input type={showPassword ? "text" : "password"} placeholder='*********'  name="passwordLogin" id="passwordLogin" value={senha} onChange={(e) => setSenha(e.target.value)} className='bg-gray-100 border-gray-300 border-2 focus:border-tertiary outline-0 focus:shadow-tertiary transition ease-in-out rounded-md w-full py-1.5 ps-9 pe-4' />
                                
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

                        <p className='text-black-custom-500'>
                            Esqueceu sua senha? 
                            <Link to={'/esqueceuSenha'} className='text-tertiary hover:text-tertiary-400 transition ease-in-out italic'> Recuperar aqui!</Link>
                        </p>

                        <button type='button' onClick={handleLogin} disabled={loading} className='bg-tertiary hover:bg-tertiary-500 transition ease-in-out text-white-custom font-semibold w-[80%] py-1 mt-1.5 rounded-sm cursor-pointer shadow-sm'>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <div className='text-center flex flex-col gap-5 text-black-custom-500'>
                        <div className="flex items-center my-2">
                            <div className="grow border-t border-black-custom-400"></div>
                            
                            <p className="mx-4 whitespace-nowrap">
                                Criar uma conta
                            </p>
                            
                            <div className="grow border-t border-black-custom-400"></div>
                        </div>

                        <p>
                            Não tem uma conta? <Link to={'/cadastro'} className='text-center text-tertiary hover:text-tertiary-400 transition ease-in-out italic'>Criar conta</Link>
                        </p>
                    </div>
                </section>
            </section>
        </>
    )
}