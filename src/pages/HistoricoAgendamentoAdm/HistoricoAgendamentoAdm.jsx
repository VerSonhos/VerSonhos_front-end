import DashboardLayoutAdmin from "../../layouts/DashboardLayoutAdmin";
import HeaderCards from "./Components/HeaderCards";
import TableAgendamento from "./Components/TableAgendamento";
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

import { buscarTodosAgendamentos } from '../../services/agendamentoService';

export default function HistoricoAgendamentoAdm(){
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
            console.error("Erro ao buscar histórico:", err);
            const errMsg = err.response?.data?.message || "Não foi possível carregar o histórico de agendamentos.";
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
            EXPIRADO: 0,
            CONCLUIDO: 0,
        };

        return agendamentos.reduce((acc, agendamento) => {
            const status = agendamento.status?.toUpperCase(); 

            if (status === 'CANCELADO') {
                acc.CANCELADO += 1; 
            } else if (status === 'REPROVADO') {
                acc.CANCELADO += 1;
            } else if (status === 'EXPIRADO') {
                acc.EXPIRADO += 1;
            } else if (status === 'CONCLUIDO') {
                acc.CONCLUIDO += 1;
            }
            
            return acc;
        }, initialCounts);

    }, [agendamentos]);
    
    const cards = [
        { 
            number: loading ? <Loader2 className="animate-spin w-8 h-8"/> : counts.CANCELADO, 
            text: 'Agendamentos cancelados',
            color: 'bg-red-500' 
        },
        { 
            number: loading ? <Loader2 className="animate-spin w-8 h-8"/> : counts.EXPIRADO, 
            text: 'Agendamentos expirados', 
            color: 'bg-blue-500' 
        },
        { 
            number: loading ? <Loader2 className="animate-spin w-8 h-8"/> : counts.CONCLUIDO, 
            text: 'Agendamentos concluídos', 
            color: 'bg-green-500' 
        },
    ];


    return(
        <>
        <DashboardLayoutAdmin>
            <section className='w-full p-4 sm:p-6 font-inter flex flex-col gap-5'>
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                    <h1 className="text-2xl font-semibold">Histórico de agendamentos</h1>

                    <Link
                        to={'/painelAdminSolicitacao'}
                        className="flex items-center gap-2 bg-quintenary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                    >
                        <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                        Veja os agendamentos
                    </Link>
                </div>

                <p className='text-xl text-black-custom-400 font-semibold mt-2'>Visualize todos os agendamentos da <span className='font-bold text-quintenary'>VerSonhos</span>.</p>
            </section>

            {error && (
                <div className="mx-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p>Erro: {error}</p>
                </div>
            )}

            <section className='w-full flex flex-col items-center lg:flex-row justify-center gap-15 font-inter my-10'>
                {cards.map((card, index) => (
                    <HeaderCards 
                        key={index}
                        number={card.number}
                        text={card.text}
                        color={card.color}
                    />
                ))}
            </section>
            
            <TableAgendamento data={agendamentos} loading={loading} />
            
        </DashboardLayoutAdmin>
        </>
    );
}