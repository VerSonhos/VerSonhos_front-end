import DashboardLayoutAdmin from '@/layouts/DashboardLayoutAdmin'
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import iconCalendarAdmin from "../../assets/icons/iconCalendarAdmin.png";
import IconCalendarAdmin2 from "../../assets/icons/IconCalendarAdmin2.png";
import IconSettingsAdmin from "../../assets/icons/IconSettingsAdmin.png";
import IconBookAdmin from "../../assets/icons/IconBookAdmin.png";
import CardInformations from './components/CardInformations/CardInformations';
import CardLinks from './components/CardLinks/CardLinks';
import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

import { buscarTodosAgendamentos } from '../../services/agendamentoService';

export default function HomeAdmin() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAgendamentos = async () => {
        try {
            setLoading(true);
            const data = await buscarTodosAgendamentos(); 
            setAgendamentos(data);
            setError(null);
        } catch (err) {
            console.error("Erro ao buscar agendamentos:", err);
            const errMsg = err.response?.data?.message || "Não foi possível carregar os dados de agendamento.";
            setError(errMsg);
            setAgendamentos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    const counts = useMemo(() => {
        const initialCounts = {
            CANCELADO: 0,
            PENDENTE: 0,
            CONFIRMADO: 0,
        };

        return agendamentos.reduce((acc, agendamento) => {
            const status = agendamento.status?.toUpperCase(); 

            if (status === 'CANCELADO' || status === 'REPROVADO' || status === 'RECUSADO') {
                acc.CANCELADO += 1; 
            } else if (status === 'PENDENTE') {
                acc.PENDENTE += 1;
            } else if (status === 'CONFIRMADO') {
                acc.CONFIRMADO += 1;
            }
            
            return acc;
        }, initialCounts);

    }, [agendamentos]);

    const cardInformations = [
        { 
            number: loading ? <Loader2 className="animate-spin w-8 h-8"/> : counts.CANCELADO, 
            text: 'Agendamentos cancelados', 
            color: 'bg-red-500' 
        },
        { 
            number: loading ? <Loader2 className="animate-spin w-8 h-8"/> : counts.PENDENTE, 
            text: 'Agendamentos pendentes', 
            color: 'bg-blue-500' 
        },
        { 
            number: loading ? <Loader2 className="animate-spin w-8 h-8"/> : counts.CONFIRMADO, 
            text: 'Agendamentos confirmados', 
            color: 'bg-green-500' 
        },
    ];
    
    const cards = [
        {
            img: iconCalendarAdmin,
            title: "Verifique os agendamentos",
            desc: "Veja os agendamentos a ser confirmados.",
            button: "Verificar",
            link: "/painelAdminSolicitacao",
        },
        {
            img: IconCalendarAdmin2,
            title: "Acompanhe os agendamentos",
            desc: "Veja os agendamentos confirmados.",
            button: "Ver mais",
            link: "/historicoAgendamentoAdm",
        },
        {
            img: IconBookAdmin,
            title: "Veja o histórico",
            desc: "Veja todas as solicitações de uma visita.",
            button: "Ver mais",
            link: "/historicoAgendamentoAdm",
        },
        {
            img: IconSettingsAdmin,
            title: "Configurações",
            desc: "Gerencie sua conta e preferências.",
            button: "Ver mais",
            link: "/configuracoesAdmin",
        },
    ];

    return (
        <>
            <DashboardLayoutAdmin>
                <section className='w-full p-4 sm:p-6 font-inter flex flex-col gap-5'>
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                        <h1 className="text-2xl font-semibold">Início</h1>

                        <Link
                            to={'/painelAdminSolicitacao'}
                            className="flex items-center gap-2 bg-quintenary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                        >
                            <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                            Veja os agendamentos
                        </Link>
                    </div>

                    <p className='text-3xl text-quintenary font-bold'>Seja bem-vindo, Administrador</p>
                </section>

                {error && (
                    <div className="mx-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p>Erro ao carregar dados: {error}</p>
                    </div>
                )}
                
                <section className='w-full flex flex-col items-center lg:flex-row justify-center gap-15 font-inter my-10'>
                    {cardInformations.map((card, index) => (
                         <CardInformations 
                            key={index}
                            number={card.number}
                            text={card.text}
                            color={card.color}
                         />
                    ))}
                </section>

                <section className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6'>
                    {cards.map((card, i) => (
                        <CardLinks key={i} image={card.img} imageTitle={card.title} title={card.title} desc={card.desc} link={card.link} btnText={card.button} />
                    ))}
                </section>
            </DashboardLayoutAdmin>
        </>
    )
}