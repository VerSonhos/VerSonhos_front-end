import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import Logo from '../../assets/images/Logotipo.png'
import IconeLogo from '../../assets/images/IconeLogotipo.png'
import styles from './styles.module.css'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`transition-all ease-in-out z-50 px-8 bg-primary shadow-custom-md shadow-black/35 font-inter flex justify-between items-center h-[65px] fixed
        ${isScrolled
            ? 'w-full top-0 right-0 rounded-none' 
            : 'w-[90%] top-5 right-[5%] rounded-full'
        }`}>
            {/* Logo */}
            <section className='w-[70px] sm:w-[200px] md:[225px]'>
                <Link className='w-full h-full' to={'/'}>
                    <img className='hidden sm:block w-full' src={Logo} alt="Logotipo VerSonhos" />
                    <img className='sm:hidden w-[100%]' src={IconeLogo} alt="Ícone logotipo VerSonhos" />
                </Link>
            </section>

            {/* Barra nav normal */}
            <nav className='hidden md:block w-[50%]'>
                <ul className='flex flex-row justify-evenly text-xl'>
                    <li>
                        <Link className={styles.effectLink} to={'/'}>Home</Link>
                    </li>
                    
                    <li>
                        <Link className={styles.effectLink} to={'/sobre'}>Sobre nós</Link>
                    </li>
                    
                    <li>
                        <Link className={styles.effectLink} to={'/visita'}>Visita</Link>
                    </li>

                    <li>
                        <Link className={styles.effectLink} to={'/contato'}>Contato</Link>
                    </li>
                </ul>
            </nav>

            {/* Links btns */}
            <section className='hidden md:flex justify-evenly w-[25%]'>
                <Link className='flex justify-center items-center gap-1 py-1 w-[40%] shadow-md text-eleventh border-3 border-eleventh rounded-full hover:bg-eleventh-500 hover:text-primary active:bg-eleventh-300 active:border-eleventh-100 active:text-primary transition ease-in-out' to={'/doar'}> 
                    <MdFavorite className='text-xl'/> Doar
                </Link>

                <Link className='flex justify-center items-center gap-2 py-1 w-[50%] shadow-md text-primary bg-tertiary rounded-full hover:bg-tertiary-500 transition ease-in-out' to={'/login'}> 
                    <FaUser /> Login
                </Link>
            </section>

            {/* Btns responsivo */}
            <section className='md:hidden flex items-center justify-end w-[70%] gap-2 sm:gap-0'>
                <div className='flex justify-evenly w-[80%]'>
                    <Link className='flex justify-center items-center gap-1 py-1 w-[100%] sm:w-[40%] shadow-md text-eleventh border-3 border-eleventh rounded-full hover:bg-eleventh-500 hover:text-primary active:bg-eleventh-300 active:border-eleventh-100 active:text-primary transition ease-in-out' to={'/doar'}> 
                        <MdFavorite className='text-xl'/> Doar
                    </Link>

                    <Link className='hidden sm:flex justify-center items-center gap-2 py-1 w-[50%] shadow-md text-primary bg-tertiary rounded-full hover:bg-tertiary-500 transition ease-in-out' to={'/login'}> 
                        <FaUser /> Login
                    </Link>
                </div>

                <div className='w-[20%] sm:w-[10%]'>
                    <IoIosMenu 
                        className='text-5xl cursor-pointer transition-transform hover:scale-110'
                        onClick={() => setIsMenuOpen(true)}
                    />
                </div>        
            </section>

            {/* Barra nav responsivo */}
            <section 
                className={`
                    block md:hidden bg-primary shadow-xl/30 z-60 fixed h-screen top-0 right-0 w-[75vw] backdrop-blur-md
                    transform transition-transform duration-500 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-[100%]'} 
                `}
            >
                <div className='w-full flex justify-between items-center px-5 py-1 mb-5 bg-tertiary'>
                    <div className='w-[35%]'>
                        <IoClose 
                            className='text-5xl text-primary cursor-pointer transition-transform hover:scale-110' 
                            onClick={() => setIsMenuOpen(false)} 
                        />
                    </div>      

                    <div className='w-[60%]'>
                        <Link 
                            className='flex sm:hidden justify-center items-center gap-2 py-1 w-[100%] shadow-mdshadow-md text-primary border-3 border-primary rounded-full hover:bg-primary hover:text-tertiary
                            transition ease-in-out' 
                            onClick={() => setIsMenuOpen(false)}
                            to={'/login'}
                        > 
                            <FaUser /> Login
                        </Link>
                    </div>
                </div>

                <nav className='w-full px-10'>
                    <ul className='w-full flex flex-col items-center gap-10 text-xl'>
                        <li>
                            <Link className={styles.effectLink} onClick={() => setIsMenuOpen(false)} to={'/'}>Home</Link>
                        </li>
                        
                        <li>
                            <Link className={styles.effectLink} onClick={() => setIsMenuOpen(false)} to={'/sobre'}>Sobre nós</Link>
                        </li>
                        
                        <li>
                            <Link className={styles.effectLink} onClick={() => setIsMenuOpen(false)} to={'/visita'}>Visita</Link>
                        </li>

                        <li>
                            <Link className={styles.effectLink} onClick={() => setIsMenuOpen(false)} to={'/contato'}>Contato</Link>
                        </li>
                    </ul>
                </nav>
            </section>
        </header>
    )
}