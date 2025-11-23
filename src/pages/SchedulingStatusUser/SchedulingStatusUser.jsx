import DashboardLayout from '@/layouts/DashboardLayout'
import React, { useState, useMemo } from 'react'
import { Link } from "react-router-dom"
import iconAgendamento from "../../assets/icons/icon-agenda.png";

const mockAppointments = [
  {
    id: 1,
    date: '05/12/2025',
    time: '14:30',
    service: 'Limpeza e Avaliação',
    status: 'Confirmado',
    action: 'Ver Detalhes',
    isUpcoming: true,
  },
  {
    id: 2,
    date: '12/12/2025',
    time: '09:00',
    service: 'Retorno para Aparelho',
    status: 'Confirmado',
    action: 'Ver Detalhes',
    isUpcoming: true,
  },
  {
    id: 3,
    date: '20/11/2025',
    time: '09:00',
    service: 'Retorno para Aparelho',
    status: 'Confirmar', 
    action: 'Reagendar',
    isUpcoming: true,
  },
  {
    id: 4,
    date: '25/10/2025',
    time: '10:00',
    service: 'Limpeza',
    status: 'Concluído',
    action: 'Ver Detalhes',
    isUpcoming: false,
  },
  {
    id: 5,
    date: '20/10/2025',
    time: '15:00',
    service: 'Extração',
    status: 'Cancelado',
    action: 'Ver Detalhes',
    isUpcoming: false,
  },
]


const statusMap = {
  Confirmado: {
    style: 'text-green-600',
  },
  Confirmar: {
    style: 'text-yellow-600',
  },
  Concluído: {
    style: 'text-green-600',
  },
  Cancelado: {
    style: 'text-red-600',
  },
}


const getStatusInfo = (status) => {
  const info = statusMap[status] || { icon: '❓', style: 'text-gray-500' }
  return (
    <span className={`flex items-center space-x-1 ${info.style}`}>
      <span className="text-xl">{info.icon}</span>
      <span>{status}</span>
    </span>
  )
}

const AppointmentRow = ({ appointment }) => {
  const isUpcoming = appointment.isUpcoming
  const isCanceled = appointment.status === 'Cancelado'
  const isConfirmed = appointment.status === 'Confirmado' || appointment.status === 'Concluído'
  const mainIcon = isCanceled ? '❌' : isConfirmed ? '✅' : '🟡'
  const iconColor = isCanceled ? 'text-red-500' : isConfirmed ? 'text-green-500' : 'text-yellow-500'

  if (isUpcoming) {
    return (
      <tr className="border-b">
        <td className="py-3 px-4 text-sm font-medium">
          <p className="font-semibold text-gray-700">{appointment.date}</p>
          <p className="text-xs text-gray-500">{appointment.service}</p>
        </td>
        <td className="py-3 px-4 text-sm">{appointment.time}</td>
        <td className="py-3 px-4 text-sm font-medium">
          {getStatusInfo(appointment.status)}
        </td>
        <td className="py-3 px-4 text-sm">
          <button
            className={`px-3 py-1 text-sm font-semibold rounded bg-blue-500 text-white hover:bg-blue-600`}
          >
            {appointment.action}
          </button>
        </td>
      </tr>
    )
  } else {
    return (
      <tr className="border-b">
        <td className="py-3 px-4 text-sm font-medium">{appointment.date}</td>
        <td className="py-3 px-4 text-sm">
            {isCanceled ? (
                <span className="text-red-600 text-xl">❌</span>
            ) : (
                <span className="text-green-600 text-xl">✅</span>
            )}
        </td>
      </tr>
    )
  }
}

export default function SchedulingStatusUser() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const filters = ['Todos (5)', 'Confirmados (3)', 'Cancelados (1)', 'Concluídos (1)'] 
  const filteredUpcomingAppointments = useMemo(() => {
    const upcoming = mockAppointments.filter(app => app.isUpcoming)
    return upcoming.filter(app => {
      const matchStatus = 
        activeFilter === 'Todos (5)' ||
        (activeFilter === 'Confirmados (3)' && app.status === 'Confirmado') ||
        (activeFilter === 'Cancelados (1)' && app.status === 'Cancelado') ||
        (activeFilter === 'Concluídos (1)' && app.status === 'Concluído');

      const matchSearch = 
        app.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.date.includes(searchTerm);

      return matchStatus && matchSearch;
    })
  }, [activeFilter, searchTerm])
  
  
  const previousAppointments = mockAppointments.filter(app => !app.isUpcoming)


  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
            <p className="text-gray-500 mt-1">
              Aqui você encontra todos os seus compromissos, confirmados e pendentes.
            </p>
          </div>
         <Link
            to="/painelUsuarioAgendarVisita"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center"
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 text-sm font-medium">
            <span className="text-gray-700 font-bold mr-2">Filters</span>
            {['Todos (5)', 'Confirmados (3)', 'Cancelados (1)', 'Concluídos (1)'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full transition duration-150 ${
                  activeFilter === filter
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.split(' ')[0]} 
                {filter.includes('(') && <span className="ml-1 text-xs">({filter.match(/\d+/)[0]})</span>}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por data ou serviço"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              🔍
            </span>
          </div>
        </div>
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Seus Próximos Agendamentos</h2>
          
          <div className="overflow-x-auto">
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
        <section className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Histórico de Agendamentos Anteriores</h2>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-fit hover:scale-105 cursor-pointer text-center justify-center">
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
                    Ações
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
    </DashboardLayout>
  )
}