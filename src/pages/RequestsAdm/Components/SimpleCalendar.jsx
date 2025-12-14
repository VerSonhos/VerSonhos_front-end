import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const statusColorMap = {
    'PENDENTE': 'bg-yellow-500', 
    'AGUARDANDO APROVACAO': 'bg-yellow-500', 
    'CONFIRMADO': 'bg-green-500', 
    'REPROVADO': 'bg-red-500', 
    'CONCLUIDO': 'bg-blue-500', 
    'CANCELADO': 'bg-gray-500', 
    'EXPIRADO': 'bg-gray-400',
};

const formatarDataParaComparacao = (data) => {
    if (!data || typeof data !== 'string') return '';
    
    if (data.includes('/')) {
        const parts = data.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
    }
    return data.substring(0, 10);
};


const SimpleCalendar = ({ dadosEventos }) => {
    const [currentDate, setCurrentDate] = useState(new Date()); 

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

    
    const getEventMarkers = (dia) => {
        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const mesFormatado = (month + 1) < 10 ? `0${month + 1}` : month + 1;
        const dataStringCalendario = `${year}-${mesFormatado}-${diaFormatado}`;
        
        const eventosDoDia = dadosEventos.filter(d => 
            formatarDataParaComparacao(d.dataAgendada || d.data) === dataStringCalendario
        );
        
        if (eventosDoDia.length === 0) return [];

        const allStatuses = eventosDoDia.map(d => String(d.status).toUpperCase());
        
        const uniqueStatuses = [...new Set(allStatuses)];
        
        return uniqueStatuses.slice(0, 3).map(normalizedStatus => {
            const color = statusColorMap[normalizedStatus];

            return color || 'bg-gray-400'; 
        });
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
            
            const markerClasses = getEventMarkers(d);

            days.push(
                <div 
                    key={d} 
                    className={`
                        relative flex flex-col items-center justify-center h-10 sm:h-14 rounded-lg cursor-pointer hover:bg-gray-100 transition
                        ${isToday ? 'bg-blue-50 border border-blue-200 font-bold text-blue-600' : 'text-gray-700'}
                    `}
                >
                    <span className="text-sm sm:text-base">{d}</span>
                    
                    {markerClasses.length > 0 && (
                        <div className="absolute bottom-1 flex gap-1 justify-center w-full"> 
                            {markerClasses.map((markerClass, index) => (
                                <span 
                                    key={index} 
                                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${markerClass}`}
                                ></span>
                            ))}
                        </div>
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

export default SimpleCalendar;