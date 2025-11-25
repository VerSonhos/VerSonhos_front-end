import DashboardLayoutAdmin from "../../layouts/DashboardLayoutAdmin";
import HeaderCards from "./Components/HeaderCards";
import TableAgendamento from "./Components/TableAgendamento";
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import { Link } from "react-router-dom";

export default function historicoAgendamentoAdm(){
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

            <section className='w-full flex flex-col items-center lg:flex-row justify-center gap-15 font-inter my-10'>
                <HeaderCards number={'0'} text={'Agendamentos cancelados'} color={'bg-red-500'} />
                <HeaderCards number={'0'} text={'Agendamentos expirados'} color={'bg-blue-500'} />
                <HeaderCards number={'0'} text={'Agendamentos concluídos'} color={'bg-green-500'} />
            </section>
            <TableAgendamento/>
        </DashboardLayoutAdmin>
        </>
    );
}