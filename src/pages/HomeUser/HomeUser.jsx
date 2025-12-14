import DashboardLayoutUser from "../../layouts/DashboardLayoutUser";
import styles from "./styles.module.css";
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import iconcalendario from "../../assets/icons/icon-calendario.png";
import iconcalendario2 from "../../assets/icons/icon-calendario2.png";
import Configuracoes from "../../assets/icons/icon-configuracao.png";
import livro from "../../assets/icons/icon-livro.png";
import { Link } from "react-router-dom"
import { useAuth } from '@/context/AuthContext'

export default function HomeUser() {
  const { logout, email, name } = useAuth();

  const cards = [
    {
      img: iconcalendario,
      title: "Realizar agendamento",
      desc: "Escolha o dia e o horário desejado.",
      button: "Agendar",
      link: "/painelUsuarioAgendarVisita",
    },
    {
      img: iconcalendario2,
      title: "Acompanhe seus agendamentos",
      desc: "Veja os agendamentos confirmados.",
      button: "Ver mais",
      link: "/statusAgendamento" 
    },
    {
      img: livro,
      title: "Veja o histórico",
      desc: "Veja todas as solicitações de uma visita.",
      button: "Ver mais",
      link: "/statusAgendamento" 
    },
    {
      img: Configuracoes,
      title: "Configurações",
      desc: "Gerencie sua conta e preferências.",
      button: "Ver mais",
      link: "/configuracoesUsuario" 
    },
  ];

  return (
    <DashboardLayoutUser>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl font-semibold">Início</h1>
          <Link
            to="/painelUsuarioAgendarVisita"
            className="flex items-center gap-2 bg-tertiary text-white px-5 py-3 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
          >
            <img
              src={iconAgendamento}
              alt="Ícone de calendário"
              className="w-5 h-5"
            />
            Faça um agendamento
          </Link>

        </div>
        <div className="mb-8 text-center sm:text-left">
          <h2 className={styles.welcomeTitle}>
            Que bom ter você aqui, <span>{name || email || 'Cliente'}</span>
          </h2>
          <p className={styles.welcomeDesc}>
            Que tal espalhar mais alegria hoje? Veja suas próximas visitas e
            inspire novos sorrisos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${styles.card} bg-white shadow rounded-lg border hover:shadow-md transition`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-left p-5 h-auto sm:h-40">
                <div className="shrink-0">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
                <div className="flex flex-col justify-between text-center sm:text-left w-full">
                  <div>
                    <h3 className="font-semibold text-quintenary text-lg mb-1">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{card.desc}</p>
                  </div>
                    <Link
                      to={card.link}
                      className="bg-tertiary text-white px-4 py-2 rounded-md transition w-full sm:w-fit mt-3 hover:scale-105 cursor-pointer text-center"
                    >
                      {card.button}
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayoutUser>
  );
}
