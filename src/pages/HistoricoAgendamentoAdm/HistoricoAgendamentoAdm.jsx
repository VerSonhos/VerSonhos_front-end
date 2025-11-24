import DashboardLayout from "../../layouts/DashboardLayout";
import HeaderCards from "./Components/HeaderCards";
import TableAgendamento from "./Components/TableAgendamento";

export default function historicoAgendamentoAdm(){
    return(
        <>
        <DashboardLayout>
            <HeaderCards/>
            <TableAgendamento/>
        </DashboardLayout>
        </>
    );
}