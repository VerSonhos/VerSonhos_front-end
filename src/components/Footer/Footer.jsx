import { Link } from 'react-router-dom'
import { SiGmail } from "react-icons/si";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import LogoFundoEscuro from '../../assets/images/LogotipoFundoEscuro.png'
import styles from './styles.module.css'

export default function Footer() {
    return (
        <footer className='w-full text-white-custom font-inter'>
            <section className='bg-thirteenth py-6'>
                <img src={LogoFundoEscuro} className='w-64 h-full mx-auto' alt="Logotipo VerSonhos fundo escuro" />
            </section>
            
            <section className='bg-quintenary py-10 flex flex-col justify-around items-center md:flex-row md:items-start gap-5'>
                <section className='w-3xs'>
                    <h2 className='font-fredoka font-semibold text-2xl mb-2 border-b-2 border-white-custom-400 pb-1'>Quem somos?</h2>
                    
                    <p>
                        VerSonhos - Levando esperança e bem-estar a crianças hospitalizadas através da realidade virtual.
                    </p>
                </section>

                <section className='w-3xs'>
                    <h2 className='font-fredoka font-semibold text-2xl mb-2 border-b-2 border-white-custom-400 pb-1'>Institucional</h2>

                    <ul className='flex flex-col gap-2.5'>
                        <li><Link className={styles.effectLink} to={'/'}>Início</Link></li>
                        <li><Link className={styles.effectLink} to={'/sobre'}>Sobre nós</Link></li>
                        <li><Link className={styles.effectLink} to={'/visita'}>Visita</Link></li>
                    </ul>
                </section>

                <section className='w-3xs'>
                    <h2 className='font-fredoka font-semibold text-2xl mb-2 border-b-2 border-white-custom-400 pb-1'>Suporte</h2>

                    <ul className='flex flex-col gap-2.5'>
                        <li><Link className={styles.effectLink} to={'/contato'}>Fale conosco</Link></li>
                        <li><Link className={styles.effectLink} to={'/contato'}>Dúvidas Frequentes(FAQ)</Link></li>
                    </ul>
                </section>

                <section className='w-3xs my-10 md:my-0'>
                    <ul className='flex flex-row justify-center gap-5'>
                        <li className='flex justify-center items-center w-15 h-15 rounded-2xl bg-white-custom shadow-lg hover:scale-110 hover:shadow-red-500 transition ease-in-out '>
                            <a href="mailto:contatoversonhos@gmail.com" target="_blank" className='w-full h-full flex flex-row justify-center items-center'>
                                <SiGmail className='text-red-500 text-5xl' />
                            </a>
                        </li>
                        
                        <li className='flex justify-center items-center w-15 h-15 rounded-2xl bg-white-custom shadow-lg hover:scale-110 hover:shadow-blue-800 transition ease-in-out '>
                            <a href="https://www.linkedin.com/company/versonhos/posts/?feedView=all" target="_blank" className='w-full h-full flex flex-row justify-center items-center'>
                                <FaLinkedin className='text-blue-800 text-5xl' />
                            </a>
                        </li>

                        <li className='flex justify-center items-center w-15 h-15 rounded-2xl bg-white-custom shadow-lg hover:scale-110 hover:shadow-pink-600 transition ease-in-out '>
                            <a href="https://www.instagram.com/versonhos.oficial/" target="_blank" className='w-full h-full flex flex-row justify-center items-center'>
                                <FaInstagram className='text-pink-600 text-5xl' />
                            </a>
                        </li>
                    </ul>
                </section>
            </section>

            <section className='bg-thirteenth text-center py-2'>
                <p>&#169; 2025 VerSonhos - Todos os direitos reservados.</p>
            </section>
        </footer>
    )
}