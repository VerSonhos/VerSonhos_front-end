import DashboardLayout from "../../layouts/DashboardLayout";
import HeaderCards from "./Components/HeaderCards";
import TableAgendamento from "./Components/TableAgendamento";

export default function historicoAgendamentoAdm(){
    return(
        <>
        <DashboardLayout>
           <section className='w-full flex flex-col items-center lg:flex-row justify-center gap-15 font-inter my-10'>
                <HeaderCards number={'0'} text={'Agendamentos cancelados'} color={'bg-red-500'} />
                <HeaderCards number={'0'} text={'Agendamentos expirados'} color={'bg-blue-500'} />
                <HeaderCards number={'0'} text={'Agendamentos concluídos'} color={'bg-green-500'} />
            </section>
            <TableAgendamento/>
        </DashboardLayout>
        </>
    );
}