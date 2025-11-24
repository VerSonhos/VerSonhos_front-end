import DashboardLayout from '@/layouts/DashboardLayout'
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import iconCalendarAdmin from "../../assets/icons/iconCalendarAdmin.png";
import IconCalendarAdmin2 from "../../assets/icons/IconCalendarAdmin2.png";
import IconSettingsAdmin from "../../assets/icons/IconSettingsAdmin.png";
import IconBookAdmin from "../../assets/icons/IconBookAdmin.png";
import CardInformations from './components/CardInformations/CardInformations';
import CardLinks from './components/CardLinks/CardLinks';
import { Link } from "react-router-dom";

export default function HomeAdmin() {
    const cards = [
        {
            img: iconCalendarAdmin,
            title: "Verifique os agendamentos",
            desc: "Veja os agendamentos a ser confirmados.",
            button: "Verificar",
            link: "/",
        },
        {
            img: IconCalendarAdmin2,
            title: "Acompanhe os agendamentos",
            desc: "Veja os agendamentos confirmados.",
            button: "Ver mais",
            link: "/",
        },
        {
            img: IconBookAdmin,
            title: "Veja o histórico",
            desc: "Veja todas as solicitações de uma visita.",
            button: "Ver mais",
            link: "/",
        },
        {
            img: IconSettingsAdmin,
            title: "Configurações",
            desc: "Gerencie sua conta e preferências.",
            button: "Ver mais",
            link: "/",
        },
    ];

    return (
        <>
            <DashboardLayout>
                <section className='w-full p-4 sm:p-6 font-inter flex flex-col gap-5'>
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                        <h1 className="text-2xl font-semibold">Início</h1>

                        <Link
                            to={'/'}
                            className="flex items-center gap-2 bg-quintenary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
                        >
                            <img src={iconAgendamento} alt="Ícone de calendário" className="w-5 h-5"/>
                            Veja os agendamentos
                        </Link>
                    </div>

                    <p className='text-3xl text-quintenary font-bold'>Seja bem-vindo, Administrador</p>
                </section>

                <section className='w-full flex flex-col items-center lg:flex-row justify-center gap-15 font-inter my-10'>
                    <CardInformations number={'0'} text={'Agendamentos cancelados'} color={'bg-red-500'} />
                    <CardInformations number={'0'} text={'Agendamentos pendentes'} color={'bg-blue-500'} />
                    <CardInformations number={'0'} text={'Agendamentos confirmados'} color={'bg-green-500'} />
                </section>

                <section className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6'>
                    {cards.map((card, i) => (
                        <CardLinks key={i} image={card.img} imageTitle={card.title} title={card.title} desc={card.desc} link={card.link} btnText={card.button} />
                    ))}
                </section>
            </DashboardLayout>
        </>
    )
}