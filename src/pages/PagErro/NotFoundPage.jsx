import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "../../layouts/MainLayout";
import will from '../../assets/images/willTriste.png'; 

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6 text-white overflow-hidden">

        <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-12 mt-20 md:mt-0">
          <img 
            src={will} 
            alt="Mascote triste" 
            className="max-w-[130px] md:max-w-[210px] w-full h-auto"
          />
        </div>

        <div className="flex flex-col items-center text-center">

          <p className="text-base md:text-2xl font-semibold text-[#03184F] mt-2 md:mt-10 mb-4 md:mb-8 max-w-xs md:max-w-2xl leading-relaxed">
            <span className="block md:hidden">
              Ops! Esta página é um universo inexplorado...  
              Mas não se preocupe, a diversão te espera de volta ao nosso mundo de alegria!
            </span>

            <span className="hidden md:block">
              Ops! Esta página é um universo inexplorado...<br />
              Mas não se preocupe, a diversão te espera de volta<br />
              ao nosso mundo de alegria!
            </span>
          </p>

          <Link
            to="/"
            className="
              px-6 py-3 text-sm md:text-base font-bold leading-5 text-white transition-colors duration-300 transform 
              bg-[#3184EF] rounded-full 
              hover:bg-[#3184EF] hover:bg-[#4391F6] 
              focus:outline-none 
              shadow-xl uppercase tracking-wider
            "
          >
            Voltar para o início
          </Link>

          <p className="mt-4 md:mt-8 text-gray-400 text-sm md:text-base max-w-xs md:max-w-none">
            Vamos te guiar de volta para onde a aventura começa. 🚀
          </p>
        </div>

      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
