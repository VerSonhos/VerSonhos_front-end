import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const SimpleCalendar = ({ dadosEventos }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); 

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  
  const temEvento = (dia) => {
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const mesFormatado = (month + 1) < 10 ? `0${month + 1}` : month + 1;
    const dataString = `${year}-${mesFormatado}-${diaFormatado}`;
    
    
    const eventosDoDia = dadosEventos.filter(d => d.data === dataString);
    
    
    if (eventosDoDia.length > 0) {
       
        return "bg-thirteenth-500"; 
    }
    return null;
  };

  
  const renderDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-14"></div>);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = 
        d === new Date().getDate() && 
        month === new Date().getMonth() && 
        year === new Date().getFullYear();
      
      const marcadorClass = temEvento(d);

      days.push(
        <div 
          key={d} 
          className={`
            relative flex flex-col items-center justify-center h-10 sm:h-14 rounded-lg cursor-pointer hover:bg-gray-100 transition
            ${isToday ? 'bg-blue-50 border border-blue-200 font-bold text-blue-600' : 'text-gray-700'}
          `}
        >
          <span className="text-sm sm:text-base">{d}</span>
         
          {marcadorClass && (
            <span className={`absolute bottom-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${marcadorClass}`}></span>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 font-fredoka">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-thirteenth-500 capitalize">
          {meses[month]} {year}
        </h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <FaChevronLeft />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <FaChevronRight />
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-7 text-center mb-2">
        {diasSemana.map(dia => (
          <div key={dia} className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
            {dia}
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};