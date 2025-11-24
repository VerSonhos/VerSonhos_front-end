import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import ImageBg from '../../../assets/images/ImagemCadastro.png'

export default function SideImage() {
    return (
        <>
            <section 
                className="w-[50%] hidden lg:flex flex-col justify-between text-center items-start bg-cover bg-no-repeat bg-center shadow-inner-contrast" 
                style={{ backgroundImage: `url(${ImageBg})` }}
            >
                <Link to={'/login'} className='flex justify-center items-center gap-2 font-inter font-bold text-lg mt-5 ms-5 py-0.5 px-3 rounded-lg bg-tertiary text-white-custom'>
                    <span className='text-tertiary text-xl bg-white-custom rounded-full'>
                        <IoIosArrowBack />
                    </span>

                    Voltar
                </Link>

                <div className='w-full text-white-custom mb-20 text-shadow-lg'>
                    <h2 className='font-fredoka text-3xl font-semibold text-center w-[60%] mx-auto mb-4'>Uma jornada de descobertas começa aqui.</h2>
                    <p className='font-inter text-2xl text-center'>Tecnologia que conecta sonhos e oportunidades</p>
                </div>
            </section>
        </>
    )
}