import { useState, useEffect } from 'react';
import DashboardLayoutUser from '@/layouts/DashboardLayoutUser'
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import NavSettings from "./components/NavSettings/NavSettings"
import FormSettingsUser from "./components/FormSettingsUser/FormSettingsUser"
import { fetchUserProfileByEmail } from '@/services/profileServiceUser';
import { Link } from "react-router-dom";

export default function SettingsUser() {
    const [activeTab, setActiveTab] = useState('Meu perfil');
    const [profileData, setProfileData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            setIsLoading(true);
            const userEmail = localStorage.getItem('authEmail');

            if (userEmail) {
                try {
                    const data = await fetchUserProfileByEmail(userEmail);
                    setProfileData(data);
                    
                    const hasCompany = !!data.empresa;
                    if (activeTab === 'Empresa' && !hasCompany) {
                        setActiveTab('Meu perfil');
                    }
                    
                } catch (error) {
                    console.error("Erro ao carregar dados do usuário no SettingsUser:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleSelectTab = (tab) => {
        setActiveTab(tab);
    };

    const hasCompany = profileData ? !!profileData.empresa : false;

    if (isLoading) {
        return <DashboardLayoutUser><p className='p-6'>Carregando configurações...</p></DashboardLayoutUser>;
    }

    return (
        <>
            <DashboardLayoutUser>
                <section className='w-full p-4 sm:p-6 font-inter flex flex-col gap-5'>
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                        <h1 className="text-2xl font-semibold">Configurações</h1>

                        <Link
                            to={'/painelUsuarioAgendarVisita'}
                            className="flex items-center gap-2 bg-tertiary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                        >
                            <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                            Faça um agendamento
                        </Link>
                    </div>

                    <p className='text-xl text-black-custom-400 font-semibold mt-2'>Gerencie seu perfil e informações de acesso da sua conta <span className='font-bold text-quintenary'>VerSonhos</span>.</p>
                </section>

                <section className='w-full p-1 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-10'>
                    <NavSettings 
                        activeItem={activeTab} 
                        onSelect={handleSelectTab} 
                        hasCompany={hasCompany}
                    /> 
                    
                    <FormSettingsUser 
                        activeItem={activeTab} 
                        profileData={profileData}
                    />
                </section>
            </DashboardLayoutUser>
        </>
    )
}