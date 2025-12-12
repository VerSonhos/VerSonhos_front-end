import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FaHome, FaCalendarAlt } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { useAuth } from '@/context/AuthContext'
import Logo from '../../assets/images/LogotipoFundoEscuro.png'
import "./sidebarUser.css"

export default function SideBarUser() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <header className={`sidebar fixed top-0 left-0 bg-tertiary shadow font-inter ${isOpen ? 'open' : ''}`}>
            <div className="logo-details bg-blue-800 w-full px-5">
                <img src={Logo} className={isOpen ? 'block' : 'hidden'} alt="Logo VerSonhos" />

                <div className="iconSideBar w-full flex justify-center items-center" onClick={toggleSidebar}>
                    {
                        isOpen ? <FaBarsStaggered  className='cursor-pointer transition-transform hover:scale-110 text-2xl' />
                        :
                        <FaBars className='cursor-pointer transition-transform hover:scale-110 text-2xl' />
                    }
                </div>
            </div>
    
            <ul className="nav-list px-3.5">
                <li>
                    <Link to={'/painelUsuario'} className="link">
                        <div className='iconSideBar flex justify-center items-center'>
                            <FaHome className='text-2xl' />
                        </div>
                        <span className="links-name">Início</span>
                    </Link>
                    <span className="tooltip">Início</span>
                </li>

                <li>
                    <Link to={'/painelUsuarioAgendarVisita'} className="link">
                        <div className='iconSideBar flex justify-center items-center'>
                            <FaCalendarAlt className='text-2xl' />
                        </div>
                        <span className="links-name">Agendar visita</span>
                    </Link>
                    <span className="tooltip">Agendar visita</span>
                </li>
                
                <li>
                    <Link to={'/statusAgendamento'} className="link">
                        <div className='iconSideBar flex justify-center items-center'>
                            <HiOutlineStatusOnline className='text-2xl' />
                        </div>
                        <span className="links-name">Agendamentos</span>
                    </Link>
                    <span className="tooltip">Agendamentos</span>
                </li>
                
                <li>
                    <Link to={'/configuracoesUsuario'} className="link">
                        <div className='iconSideBar flex justify-center items-center'>
                            <IoMdSettings className='text-2xl' />
                        </div>
                        <span className="links-name">Configuração</span>
                    </Link>
                    <span className="tooltip">Configuração</span>
                </li>

                <li>
                    <Link to={'/'} className="link">
                        <div className='iconSideBar flex justify-center items-center'>
                            <IoArrowBackCircle className='text-2xl' />
                        </div>
                        <span className="links-name">Voltar</span>
                    </Link>
                    <span className="tooltip">Voltar</span>
                </li>
                
                <li className="profile bg-blue-800">
                    <div className="profile-details">
                        <div className="name-job">
                            <div className="name">
                                <p className='font-fredoka font-semibold'>
                                    Nome do Cliente
                                </p>
                            </div>
                            <div className="job">Seja Bem-Vindo</div>
                        </div>
                    </div>
                    
                    <div className='iconSideBar flex justify-center items-center cursor-pointer bg-blue-800' id="log-out" onClick={handleLogout}>
                        <FiLogOut className='text-2xl'/>
                    </div>
                </li>
            </ul>
        </header>
    );
}