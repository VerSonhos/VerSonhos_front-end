import { useState, useEffect } from 'react';
import DashboardLayoutAdmin from '@/layouts/DashboardLayoutAdmin'
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import NavSettings from "./components/NavSettings/NavSettings"
import FormSettingsAdmin from "./components/FormSettingsAdmin/FormSettingsAdmin"
import { fetchAdminProfile, updateAdminProfile, deleteAdminAccount } from '@/services/profileServiceAdmin';
import { Link } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import SuccessAlert from '@/components/SuccessAlert/SuccessAlert'; 
import { useNavigate } from 'react-router-dom';

export default function SettingsAdmin() {
    const [activeTab, setActiveTab] = useState('Meu perfil');
    const [profileData, setProfileData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ isVisible: false, message: '', isError: false });
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const { forceLogout } = useAuth();

    const hideNotification = () => {
        setNotification({ isVisible: false, message: '', isError: false });
    };

    useEffect(() => {
        const loadProfile = async () => {
            setIsLoading(true);
            const userEmail = localStorage.getItem('authEmail');

            if (userEmail) {
                try {
                    const data = await fetchAdminProfile(userEmail);
                    setProfileData(data);
                    console.log(data)
                } catch (error) {
                    console.error("Erro ao carregar dados do Admin:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, [refreshKey]);

    const handleSelectTab = (tab) => {
        setActiveTab(tab);
    };

    const handleSaveAdmin = async (fieldName, newValue) => {
        try {
            await updateAdminProfile(fieldName, newValue);
            
            setNotification({
                isVisible: true,
                message: `Campo ${fieldName} atualizado com sucesso!`,
                isError: false,
            });
            setTimeout(hideNotification, 4000);

            setRefreshKey(prev => prev + 1); 

        } catch (error) {
            setNotification({
                isVisible: true,
                message: error.message || "Erro ao salvar alteração.",
                isError: true,
            });

            setTimeout(hideNotification, 4000);
        }
    };
    
    const handleRevogation = async () => {
        const idAdmin = profileData?.idAdmin; 

        if (!idAdmin) {
            setNotification({ isVisible: true, message: "ID do Administrador não encontrado.", isError: true });
            setTimeout(hideNotification, 4000);
            return;
        }

        if (!window.confirm("ATENÇÃO: Você tem certeza que deseja EXCLUIR sua conta de Administrador permanentemente? Esta ação é IRREVERSÍVEL.")) {
            return;
        }

        try {
            await deleteAdminAccount(idAdmin); 

            setNotification({
                isVisible: true,
                message: "Sua conta de Administrador foi excluída. Redirecionando...",
                isError: false,
            });
            setTimeout(hideNotification, 4000);
            
            setTimeout(forceLogout, 3000);

        } catch (error) {
            console.error("Erro ao deletar conta de Admin:", error);
            setNotification({
                isVisible: true,
                message: error.message || "Erro ao solicitar a exclusão da conta. Tente novamente.",
                isError: true,
            });
            setTimeout(hideNotification, 4000);
        }
    };

    if (isLoading) {
        return <DashboardLayoutAdmin><p className='p-6'>Carregando configurações...</p></DashboardLayoutAdmin>;
    }
    

    return (
        <>
            <DashboardLayoutAdmin>
                {notification.isVisible && (
                    <SuccessAlert 
                        message={notification.message}
                        isError={notification.isError}
                        onClose={hideNotification}
                    />
                )}

                <section className='w-full p-4 sm:p-6 font-inter flex flex-col gap-5'>
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                        <h1 className="text-2xl font-semibold">Configurações</h1>

                        <Link
                            to={'/painelAdminSolicitacao'}
                            className="flex items-center gap-2 bg-quintenary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                        >
                            <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                            Veja os agendamentos
                        </Link>
                    </div>

                    <p className='text-xl text-black-custom-400 font-semibold mt-2'>Gerencie seu perfil e informações de acesso da sua conta <span className='font-bold text-quintenary'>VerSonhos</span>.</p>
                </section>

                <section className='w-full p-1 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-10'>
                    <NavSettings activeItem={activeTab} onSelect={handleSelectTab} />
                    
                    {/* 🛑 Passa os dados e funções */}
                    <FormSettingsAdmin 
                        activeItem={activeTab} 
                        dataAdmin={profileData} 
                        handleSaveAdmin={handleSaveAdmin} 
                        handleRevogation={handleRevogation}
                    />
                </section>
            </DashboardLayoutAdmin>
        </>
    )
}