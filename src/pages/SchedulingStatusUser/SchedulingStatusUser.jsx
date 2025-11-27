import DashboardLayoutUser from '@/layouts/DashboardLayoutUser'
import React, { useState, useMemo } from 'react'
import { Link } from "react-router-dom"
import iconAgendamento from "../../assets/icons/icon-agenda.png";
import iconLupa from "../../assets/icons/icon-lupa.png"

const mockAppointments = [
  {
    id: 1,
    date: '05/12/2025',
    time: '14:30',
    service: '', 
    status: 'Confirmado',
    action: 'Ver Detalhes',
    isUpcoming: true,
  },
  {
    id: 2,
    date: '12/12/2025',
    time: '09:00',
    service: '',
    status: 'Confirmado',
    action: 'Ver Detalhes',
    isUpcoming: true,
  },
  {
    id: 3,
    date: '20/11/2025',
    time: '09:00',
    service: '',
    status: 'Confirmar',
    action: 'Reagendar',
    isUpcoming: true,
  },
  {
    id: 4,
    date: '25/10/2025',
    time: '10:00',
    service: '',
    status: 'Concluído',
    action: 'Ver Detalhes',
    isUpcoming: false,
  },
  {
    id: 5,
    date: '20/10/2025',
    time: '15:00',
    service: '',
    status: 'Cancelado',
    action: 'Ver Detalhes',
    isUpcoming: false,
  },
]


const statusMap = {
  Confirmado: {
    style: 'text-green-600 bg-green-100'
  },
  Confirmar: {
    style: 'text-yellow-600 bg-yellow-100'
  },
  Concluído: {
    style: 'text-green-600 bg-green-100'
  },
  Cancelado: {
    style: 'text-red-600 bg-red-100'
  },
}

const getStatusInfo = (status) => {
  const info = statusMap[status] || { style: 'text-gray-500 bg-gray-100' }
  return (
    <span className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold w-fit ${info.style}`}>
      <span>{status}</span>
    </span>
  )
}

const AppointmentCard = ({ appointment }) => {
  const isCanceled = appointment.status === 'Cancelado'
  const buttonClass = isCanceled ? 'bg-red-500 hover:bg-red-600' : 'bg-[#3184EF] hover:bg-[#4391F6]'

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 mb-3 md:hidden">
      <div className="flex justify-between items-start mb-2">
        <p className="text-lg font-semibold text-gray-800">{appointment.date} às {appointment.time}</p>
        {getStatusInfo(appointment.status)}
      </div>
      <p className="text-gray-600 text-sm mb-3">{appointment.service || 'Sem Serviço Associado'}</p>
      <button
        className={`w-full px-3 py-2 text-sm font-semibold rounded text-white transition ${buttonClass}`}
      >
        {appointment.action}
      </button>
    </div>
  )
}

const AppointmentRow = ({ appointment }) => {
  const isUpcoming = appointment.isUpcoming
  const isCanceled = appointment.status === 'Cancelado'

  if (isUpcoming) {
    return (
      <>
        <AppointmentCard appointment={appointment} />
        <tr className="border-b hidden md:table-row">
          <td className="py-3 px-4 text-sm font-medium">
            <p className="font-semibold text-gray-700">{appointment.date}</p>
          </td>
          <td className="py-3 px-4 text-sm">{appointment.time}</td>
          <td className="py-3 px-4 text-sm font-medium">
            {getStatusInfo(appointment.status)}
          </td>
          <td className="py-3 px-4 text-sm">
            <button
              className={`px-3 py-1 text-sm font-semibold rounded ${isCanceled ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-tertiary text-white hover:bg-[#4391F6]'}`}
            >
              {appointment.action}
            </button>
          </td>
        </tr>
      </>
    )
  }
  
  return (
    <tr className="border-b">
      <td className="py-3 px-4 text-xs font-medium text-gray-700">{appointment.date}</td>
      <td className="py-3 px-4 text-xs font-medium">
          {getStatusInfo(appointment.status)}
      </td>
    </tr>
  )
}

export default function SchedulingStatusUser() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const filterOptions = ['Todos', 'Confirmados', 'Cancelados', 'Concluídos']
  const counts = useMemo(() => {
    return mockAppointments.reduce((acc, app) => {
      if (app.isUpcoming) {
        acc.Todos = (acc.Todos || 0) + 1;
        if (app.status === 'Confirmado') acc.Confirmados = (acc.Confirmados || 0) + 1;
        if (app.status === 'Cancelado') acc.Cancelados = (acc.Cancelados || 0) + 1;
        if (app.status === 'Concluído') acc.Concluídos = (acc.Concluídos || 0) + 1;
      }
      return acc;
    }, {});
  }, []);


  const filteredUpcomingAppointments = useMemo(() => {
    const upcoming = mockAppointments.filter(app => app.isUpcoming)
    return upcoming.filter(app => {
      const matchStatus =
        activeFilter === 'Todos' ||
        (activeFilter === 'Confirmados' && app.status === 'Confirmado') ||
        (activeFilter === 'Cancelados' && app.status === 'Cancelado') ||
        (activeFilter === 'Concluídos' && app.status === 'Concluído') ||
        (activeFilter === 'Confirmar' && app.status === 'Confirmar'); 

      const matchSearch =
        app.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.date.includes(searchTerm);

      return matchStatus && matchSearch;
    })
  }, [activeFilter, searchTerm])


  const previousAppointments = mockAppointments.filter(app => !app.isUpcoming)


  return (
    <DashboardLayoutUser>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen"> 
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Agendamentos</h1> 
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Aqui você encontra todos os seus compromissos, confirmados e pendentes.
            </p>
          </div>
         <Link
            to="/painelUsuarioAgendarVisita"
            className="flex items-center gap-2 bg-tertiary hover:bg-[#4391F6] text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
          >
            <img
              src={iconAgendamento}
              alt="Ícone de calendário"
              className="w-5 h-5"
            />
            Faça um agendamento
          </Link>
        </header>

        <hr className="mb-6 border-t border-gray-200" />
        
       
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2 text-sm font-medium w-full lg:w-auto">
            <span className="text-gray-700 font-bold mr-2 hidden sm:block">Filtros:</span>
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-xs sm:text-sm rounded-full transition duration-150 ${
                  activeFilter === filter
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                } w-fit`}
              >
                {filter}
                {counts[filter] !== undefined && <span className="ml-1 text-xs">({counts[filter]})</span>}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-64"> 
            <input
              type="text"
              placeholder="Buscar por datas"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <img 
                src={iconLupa} 
                alt="Ícone de busca" 
                className="w-5 h-7 opacity-70" 
              />
            </span>
          </div>
        </div>

        <section className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Seus Próximos Agendamentos</h2>

          <div className="md:hidden">
            {filteredUpcomingAppointments.length > 0 ? (
              filteredUpcomingAppointments.map(app => (
                <AppointmentCard key={app.id} appointment={app} />
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum agendamento futuro encontrado.</p>
            )}
          </div>


          <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUpcomingAppointments.map(app => (
                  <AppointmentRow key={app.id} appointment={app} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Histórico de Agendamentos Anteriores</h2>
            <button className="flex items-center gap-2 bg-tertiary hover:bg-[#4391F6] text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center">
              Ver Histórico Completo
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previousAppointments.map(app => (
                    <AppointmentRow
                        key={app.id}
                        appointment={{
                            ...app,
                            action: app.status
                        }}
                    />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayoutUser>
  )
}