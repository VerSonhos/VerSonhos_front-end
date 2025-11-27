import { useState } from 'react';
import DashboardLayoutAdmin from '@/layouts/DashboardLayoutAdmin'
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import NavSettings from "./components/NavSettings/NavSettings"
import FormSettingsAdmin from "./components/FormSettingsAdmin/FormSettingsAdmin"
import { Link } from "react-router-dom";

export default function SettingsAdmin() {
    const [activeTab, setActiveTab] = useState('Meu perfil');

    const handleSelectTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <DashboardLayoutAdmin>
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
                    <FormSettingsAdmin activeItem={activeTab} />
                </section>
            </DashboardLayoutAdmin>
        </>
    )
}