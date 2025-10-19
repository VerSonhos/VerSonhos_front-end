import { Link } from 'react-router-dom'
import LogoForm from '../../../assets/images/Logotipo.png'
import { IoIosArrowBack, IoIosMail } from "react-icons/io";
import styles from '../styles.module.css'

export default function SideForm() {
    return (
        <>
            <section className='w-[50%]'>
                <Link to={'/'} className='flex justify-center items-center gap-2 font-inter font-bold text-lg fixed top-5 left-5'>
                    <span className='text-primary text-xl bg-secundary rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar ao ínicio
                </Link>

                <section className='shadow-custom-sm w-[75%] m-auto p-5 rounded-lg'>
                    <img src={LogoForm} alt="Logotipo VerSonhos" className='w-[50%] mx-auto mb-7' />

                    <div className='text-center font-inter mb-7'>
                        <h2 className='font-bold text-2xl mb-2'>Bem-vindo</h2>
                        <p className='text-secundary-400 font-medium'>Entre na sua conta para continuar</p>
                    </div>

                    <form>
                        <div>
                            <label htmlFor="">E-mail:</label>
                            <input type="text" placeholder='sdkjshdhkj' name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="">Senha:</label>
                            <input type="text" placeholder='sdkjshdhkj' name="" id="" />
                        </div>

                        <p className='text-secundary-500'>
                            Esqueceu sua senha? 
                            <Link className='text-tertiary hover:text-tertiary-400 transition ease-in-out italic'> Recuperar aqui!</Link>
                        </p>

                        <button className='bg-tertiary text-primary font-semibold w-[50%] py-0.5 rounded-sm cursor-pointer shadow-sm'>
                            Entrar
                        </button>
                    </form>

                    <p>Criar conta</p>

                    <p>
                        Não tem uma conta? <Link className='text-center text-tertiary hover:text-tertiary-400 transition ease-in-out italic'>Criar conta</Link>
                    </p>
                </section>
            </section>
        </>
    )
}